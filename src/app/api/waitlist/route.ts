import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { sendWaitlistEmail } from '@/lib/email';

// POST /api/waitlist
// Handles waitlist signups for different features
export async function POST(req: NextRequest) {
  try {
    const { email, topic } = await req.json();

    // Validation
    if (!email || !topic) {
      return NextResponse.json({ error: 'Email and topic are required.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // Validate topic
    const validTopics = ['community', 'help_center', 'integrations', 'api'];
    if (!validTopics.includes(topic)) {
      return NextResponse.json({ error: 'Invalid topic.' }, { status: 400 });
    }

    // Check if user is already on the waitlist for this topic
    const existingSignup = await prisma.waitlist.findUnique({
      where: {
        email_topic: {
          email: email.toLowerCase(),
          topic: topic
        }
      }
    });

    if (existingSignup) {
      return NextResponse.json({ 
        error: 'You are already on the waitlist for this feature.',
        alreadySignedUp: true 
      }, { status: 409 });
    }

    // Add to waitlist
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email: email.toLowerCase(),
        topic: topic,
      }
    });

    // Send confirmation email
    try {
      await sendWaitlistEmail({
        email: email,
        topic: topic,
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send waitlist confirmation email:', emailError);
    }

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added to waitlist!',
      id: waitlistEntry.id 
    });

  } catch (error) {
    console.error('Failed to add to waitlist:', error);
    return NextResponse.json({ error: 'Failed to add to waitlist.' }, { status: 500 });
  }
}

// GET /api/waitlist
// Admin endpoint to view waitlist entries (optional)
export async function GET(req: NextRequest) {
  try {
    // This could be used for admin purposes to view waitlist entries
    // For now, we'll keep it simple and not implement admin access
    return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
  } catch (error) {
    console.error('Failed to fetch waitlist:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist.' }, { status: 500 });
  }
}
