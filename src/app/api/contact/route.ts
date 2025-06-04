import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// POST /api/contact
// Accepts contact form submissions and saves them to the database.
export async function POST(req: NextRequest) {
  try {
    const { email, subject, message } = await req.json();

    // Basic validation
    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Save the contact message to the database
    await prisma.contactMessage.create({
      data: {
        email,
        subject,
        message,
      },
    });

    // Respond with success
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log and respond with error
    console.error('Failed to save contact message:', error);
    return NextResponse.json({ error: 'Failed to save contact message.' }, { status: 500 });
  }
} 