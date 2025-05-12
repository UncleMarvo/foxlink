import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// Helper to get country from IP using ipapi.co
async function getCountryFromRequest(req: NextRequest): Promise<string | null> {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') return null;
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
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

// POST: Record a link click
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
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10;
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
    const { linkId, abTestGroup, referrer, country: clientCountry } = await req.json();

    // Validate linkId is present and is a string (could add UUID check if needed)
    if (!linkId || typeof linkId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid linkId' }, { status: 400 });
    }
    // Validate optional fields if present
    if (abTestGroup && typeof abTestGroup !== 'string') {
      return NextResponse.json({ error: 'Invalid abTestGroup' }, { status: 400 });
    }
    if (referrer && typeof referrer !== 'string') {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 400 });
    }
    if (clientCountry && typeof clientCountry !== 'string') {
      return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }

    // Server-side geo-IP lookup if country not provided
    let country = clientCountry || null;
    if (!country) {
      country = await getCountryFromRequest(req);
    }

    // Find the link and user
    const link = await prisma.link.findUnique({ where: { id: linkId } });
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    // Create analytics record
    await prisma.analytics.create({
      data: {
        linkId,
        userId: link.userId,
        type: 'link_click', // Always 'link_click' for this endpoint
        abTestGroup: abTestGroup || null,
        referrer: referrer || null,
        country: country || null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log the error for debugging
    console.error('Error recording analytics click:', err);
    return NextResponse.json({ error: 'Failed to record click' }, { status: 500 });
  }
} 