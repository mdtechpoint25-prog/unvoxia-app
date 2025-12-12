import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { username: string } }) {
  // Placeholder: user profile
  return NextResponse.json({ username: params.username, stats: { posts: 0, comments: 0, reactions: 0 } });
}

export async function PATCH() {
  // Placeholder: update user
  return NextResponse.json({ ok: true });
}