import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// PATCH /api/admin/users/[id]
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { action } = await req.json();

  if (!id || !action) {
    return NextResponse.json({ error: 'Missing user id or action.' }, { status: 400 });
  }

  // Supported actions: deactivate, reactivate, makeAdmin, revokeAdmin, forceVerify
  let data = {};
  if (action === 'deactivate') {
    data = { emailVerified: null };
  } else if (action === 'reactivate') {
    data = { emailVerified: new Date() };
  } else if (action === 'makeAdmin') {
    data = { role: 'ADMIN' };
  } else if (action === 'revokeAdmin') {
    data = { role: 'USER' };
  } else if (action === 'forceVerify') {
    // Force email verification by setting emailVerified to now
    data = { emailVerified: new Date() };
  } else {
    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
    },
  });

  return NextResponse.json({ user });
}

// GET /api/admin/users/[id]
// Fetch a single user's details for admin view
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing user id.' }, { status: 400 });
  }
  // Fetch user details from the database
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      premium: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  return NextResponse.json({ user });
}

// DELETE /api/admin/users/[id]
// Admin deletes a user and all related data
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing user id.' }, { status: 400 });
  }
  try {
    // Delete the user and all related data (cascades if set in schema)
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
  }
} 