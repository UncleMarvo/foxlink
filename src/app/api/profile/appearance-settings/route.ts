import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// GET: Fetch user's appearance settings
export async function GET(req: NextRequest) {

  console.log(`***** DEBUG: Appearance settings: ${JSON.stringify(req.json(), null, 2)}`);

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`***** DEBUG: Session: ${JSON.stringify(session, null, 2)}`);

  const config = await prisma.userConfigs.findUnique({
    where: { user_id: session.user.id },
    select: { theme: true, font_size: true, show_background_pattern: true },
  });

  console.log(`***** DEBUG: Config: ${JSON.stringify(config, null, 2)}`);

  return NextResponse.json(
    config || {
      theme: 'oceanBreeze',
      font_size: 'medium',
      show_background_pattern: true,
    }
  );
}

// POST: Upsert user's appearance settings
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Only call req.json() once
  const body = await req.json();
  console.log("***** DEBUG: Appearance settings:", body);
  const { theme, font_size, show_background_pattern } = body;
  // Backend validation for allowed values
  const allowedThemes = ['OceanBreeze', 'ForestRetreat', 'Twilight', 'Amber', 'Azure', 'Sunbeam'];
  const allowedFontSizes = ['small', 'medium', 'large'];
  if (!allowedThemes.includes(theme)) {
    return NextResponse.json({ error: 'Invalid theme selected.' }, { status: 400 });
  }
  if (!allowedFontSizes.includes(font_size)) {
    return NextResponse.json({ error: 'Invalid font size selected.' }, { status: 400 });
  }
  try {
    await prisma.userConfigs.upsert({
      where: { user_id: session.user.id },
      update: { theme, font_size, show_background_pattern, updated_at: new Date() },
      create: {
        user_id: session.user.id,
        theme,
        font_size,
        show_background_pattern,
        updated_at: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save settings.' }, { status: 500 });
  }
} 