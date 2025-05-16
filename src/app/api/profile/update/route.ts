import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  // Get session to ensure user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse multipart form data
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const avatarFile = formData.get('avatar') as File | null;
  const avatarUrlFromForm = formData.get('avatarUrl') as string | null;

  let avatarUrl: string | undefined = undefined;

  // Handle avatar upload if present
  if (avatarFile && avatarFile.size > 0) {
    const ext = path.extname(avatarFile.name) || '.png';
    const fileName = `${session.user.email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}${ext}`;
    const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
    await fs.mkdir(avatarsDir, { recursive: true });
    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(avatarsDir, fileName);
    await fs.writeFile(filePath, buffer);
    avatarUrl = `/avatars/${fileName}`;
  }

  // Update user in the database
  try {
    const updateData: any = { name, bio };
    if (avatarUrl) {
      updateData.image = avatarUrl;
    } else if (avatarUrlFromForm) {
      updateData.image = avatarUrlFromForm;
    }
    await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });
    return NextResponse.json({ success: true, avatar: avatarUrl });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
} 