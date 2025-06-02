import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';

// Load env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const avatarsBucket = process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET || 'avatars';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: NextRequest) {
  // Authenticate user
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Parse the multipart form data
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  // Use the authenticated user's ID
  const userId = session.user.id;
  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }
  // Backend validation: only allow JPG/PNG and max 5MB
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG and PNG files are allowed.' }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size must be 5MB or less.' }, { status: 400 });
  }

  // Create a unique file path
  const ext = file.name.split('.').pop();
  const filePath = `${userId}/avatar.${ext}`;

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from(avatarsBucket)
    .upload(filePath, buffer, { upsert: true, contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get the public URL
  const { data } = supabase.storage.from(avatarsBucket).getPublicUrl(filePath);

  return NextResponse.json({ publicUrl: data.publicUrl });
}