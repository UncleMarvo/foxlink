import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Load env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const avatarsBucket = process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET || 'avatars';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: NextRequest) {
  // Parse the multipart form data
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const userId = formData.get('userId') as string | null;

  if (!file || !userId) {
    return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
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