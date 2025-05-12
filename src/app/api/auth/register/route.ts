import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { hash } from 'bcryptjs';

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
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 