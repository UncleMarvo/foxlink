import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { sendContactEmail } from '@/lib/email';

// POST /api/contact
// Accepts contact/feedback form submissions and saves them to the Feedback table.
export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json();

    // Get session to check if user is logged in
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session?.user;

    // Validation
    if (!isLoggedIn && (!name || !email)) {
      return NextResponse.json({ error: 'Name and Email are required.' }, { status: 400 });
    }
    if (!type || !message) {
      return NextResponse.json({ error: 'Type and Message are required.' }, { status: 400 });
    }

    // Prepare feedback data
    const feedbackData: any = {
      type,
      message,
      createdAt: new Date(),
    };
    if (isLoggedIn) {
      feedbackData.userId = session.user.id;
      feedbackData.name = session.user.name || null;
      feedbackData.email = session.user.email || null;
    } else {
      feedbackData.userId = null;
      feedbackData.name = name;
      feedbackData.email = email;
    }

    // Save the feedback to the database
    await prisma.feedback.create({
      data: feedbackData,
    });

    // Send email notification
    try {
      await sendContactEmail({
        name: feedbackData.name || 'Anonymous',
        email: feedbackData.email || 'no-email@example.com',
        type,
        message,
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send contact email:', emailError);
    }

    // Respond with success
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log and respond with error
    console.error('Failed to save feedback:', error);
    return NextResponse.json({ error: 'Failed to save feedback.' }, { status: 500 });
  }
} 