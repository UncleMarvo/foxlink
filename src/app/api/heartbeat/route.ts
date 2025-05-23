import { NextResponse } from 'next/server';

// GET /api/heartbeat
export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
} 