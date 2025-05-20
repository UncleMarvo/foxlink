import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

// PATCH /api/admin/feedback/[id]
// Allows admin to update the feedback response and mark as resolved
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing feedback id.' }, { status: 400 });
  }
  const { response } = await req.json();
  if (!response || typeof response !== 'string') {
    return NextResponse.json({ error: 'Response is required.' }, { status: 400 });
  }
  try {
    const updated = await prisma.feedback.update({
      where: { id },
      data: { response },
      select: {
        id: true,
        message: true,
        response: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json({ feedback: { ...updated, status: 'resolved' } });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update feedback.' }, { status: 500 });
  }
}

// GET /api/admin/feedback/[id]
// Fetch feedback details by ID for admin view
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing feedback id.' }, { status: 400 });
  }
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
      select: {
        id: true,
        message: true,
        response: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found.' }, { status: 404 });
    }
    const status = feedback.response ? 'resolved' : 'open';
    return NextResponse.json({ feedback: { ...feedback, status } });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch feedback.' }, { status: 500 });
  }
} 