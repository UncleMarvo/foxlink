import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// Helper to get country from IP using geo-IP API
async function getCountryFromRequest(req: NextRequest): Promise<string | null> {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') return null;
  const geoipApiUrl = process.env.GEOIP_API_URL || 'https://ipapi.co/';
  try {
    const res = await fetch(`${geoipApiUrl}${ip}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.country || null;
  } catch {
    return null;
  }
}

// In-memory store for rate limiting (IP -> { count, firstRequestTimestamp })
const rateLimitMap = new Map();
// List of common bot keywords for user-agent detection
const botKeywords = ['bot', 'crawl', 'spider'];

// POST: Record a profile view
export async function POST(req: NextRequest) {
  try {
    // --- Bot Detection ---
    const userAgent = req.headers.get('user-agent') || '';
    if (botKeywords.some(keyword => userAgent.toLowerCase().includes(keyword))) {
      // Block known bots
      return NextResponse.json({ error: 'Bot traffic is not allowed.' }, { status: 403 });
    }

    // --- Rate Limiting ---
    // Use IP address as the key (for demo; in production, use a more robust method)
    // Note: req.ip is not available in Next.js API routes, so we use x-forwarded-for
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 1 minute default
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
    let entry = rateLimitMap.get(ip);
    if (!entry || now - entry.firstRequestTimestamp > windowMs) {
      // New window
      entry = { count: 1, firstRequestTimestamp: now };
    } else {
      entry.count += 1;
    }
    rateLimitMap.set(ip, entry);
    if (entry.count > maxRequests) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // Parse and validate input
    const { userId, referrer, country: clientCountry } = await req.json();

    // Validate userId is present and a string
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
    }
    // Validate optional fields if present
    if (referrer && typeof referrer !== 'string') {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 400 });
    }
    if (clientCountry && typeof clientCountry !== 'string' && clientCountry !== null) {
      return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }

    // Server-side geo-IP lookup if country not provided
    let country = clientCountry || null;
    if (!country) {
      country = await getCountryFromRequest(req);
    }

    // Create analytics record for profile view
    try {
      await prisma.analytics.create({
        data: {
          userId,
          type: 'profile_view',
          referrer: referrer || null,
          country: country || null,
          linkId: null, // Not associated with a specific link
          abTestGroup: null,
          ip: ip || null,
        },
      });
    } catch (err) {
      // If analytics creation fails, treat as critical error
      await reportError({
        error: new CriticalError('Failed to create analytics record: ' + (err as Error).message),
        endpoint: '/api/analytics/view',
        method: 'POST',
        additionalContext: { userId, referrer, country, ip }
      });
      return NextResponse.json({ error: 'Failed to record profile view' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log and report all other errors
    await reportError({
      error: err as Error,
      endpoint: '/api/analytics/view',
      method: 'POST',
    });
    return NextResponse.json({ error: 'Failed to record profile view' }, { status: 500 });
  }
} 