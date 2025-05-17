import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';

// Helper to send verification email
async function sendVerificationEmail(userEmail: string) {
  const token = randomUUID();
  // Set expiry from env or default to 60 minutes
  const expiresMinutes = Number(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_MINUTES) || 60;
  const expires = new Date(Date.now() + expiresMinutes * 60 * 1000);

  // Store token in VerificationToken table
  await prisma.verificationToken.create({
    data: {
      identifier: userEmail,
      token,
      expires,
    },
  });

  // Send email using Resend
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(userEmail)}`;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Your App <onboarding@yourdomain.com>',
    to: userEmail,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });

  /*
  // SMTP code (commented out for future use)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    to: userEmail,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });
  */
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username } = await req.json();
    if (!name || !email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Username format validation
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernamePattern.test(username)) {
      return NextResponse.json({ error: 'Username must be 3-20 characters, letters, numbers, or underscores only.' }, { status: 400 });
    }
    // Check if username is taken (case-insensitive)
    const existingUsername = await prisma.user.findFirst({ where: { username: { equals: username, mode: 'insensitive' } } });
    if (existingUsername) {
      return NextResponse.json({ error: 'Username is already taken.' }, { status: 400 });
    }
    // Check if email is taken
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email is already registered.' }, { status: 400 });
    }
    // Hash password
    const hashed = await hash(password, 10);
    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        username,
        emailVerified: null, // Explicitly set as unverified
      },
    });
    // Send verification email
    await sendVerificationEmail(email);
    return NextResponse.json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 