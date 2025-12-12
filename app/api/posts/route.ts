import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder: list posts
  return NextResponse.json({ posts: [] });
}

export async function POST() {
  // Placeholder: create post
  return NextResponse.json({ ok: true });
}