import { NextResponse } from 'next/server';
import { execute } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

// Update a prompt
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt text is required' }, { status: 400 });
    }

    await execute(
      'UPDATE daily_prompts SET prompt = ? WHERE id = ? AND user_id IS NULL',
      [prompt.trim(), id]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin prompt PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a prompt
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await execute(
      'DELETE FROM daily_prompts WHERE id = ? AND user_id IS NULL',
      [id]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin prompt DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
