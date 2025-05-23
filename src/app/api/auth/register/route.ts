import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username, acceptedTerms, termsVersion } = await req.json();
    if (!name || !email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Require T&Cs acceptance
    if (!acceptedTerms || termsVersion !== '1.0') {
      return NextResponse.json({ error: 'You must accept the latest Terms and Conditions to register.' }, { status: 400 });
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
        acceptedTerms, // Store acceptance from request
        termsVersion,  // Store version from request
      },
    });
    // Generate verification token
    const token = randomUUID();
    const expiresMinutes = Number(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_MINUTES) || 60;
    const expires = new Date(Date.now() + expiresMinutes * 60 * 1000);
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });
    // Construct verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;
    // Send verification email using the new utility
    await sendVerificationEmail({ to: email, verificationUrl });
    return NextResponse.json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/auth/register',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 