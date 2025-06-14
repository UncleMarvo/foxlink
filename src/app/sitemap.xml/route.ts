import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// Helper function to format date for sitemap
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export async function GET() {
  try {
    // Get all public user profiles
    const profiles = await prisma.user.findMany({
      where: {
        isPublic: true,
      },
      select: {
        username: true,
        updatedAt: true,
      },
    });

    // Base URL from environment variable or default
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.app';

    // Start building the XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    const staticPages = [
      { path: '', priority: '1.0' }, // Homepage
      { path: '/pricing', priority: '0.8' },
      { path: '/privacy', priority: '0.5' },
      { path: '/gdpr', priority: '0.5' },
      { path: '/contact', priority: '0.7' },
    ];

    // Add static pages to sitemap
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add user profile pages
    profiles.forEach(profile => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${profile.username}</loc>\n`;
      xml += `    <lastmod>${formatDate(profile.updatedAt)}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    // Return the XML with appropriate headers
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 