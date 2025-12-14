import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from '@/lib/supabase';

// Helper to get user from auth header
async function getAuthUser(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

// POST /api/users/mute-words - Add muted words
export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;
    const { words } = await request.json();

    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json(
        { error: 'Words array is required' },
        { status: 400 }
      );
    }

    // Normalize and filter words
    const normalizedWords = words
      .map((w: string) => w.toLowerCase().trim())
      .filter((w: string) => w.length >= 2 && w.length <= 50);

    if (normalizedWords.length === 0) {
      return NextResponse.json(
        { error: 'No valid words provided' },
        { status: 400 }
      );
    }

    // Get existing muted words
    const { data: existingWords } = await supabase
      .from('muted_words')
      .select('word')
      .eq('user_id', user.id);

    const existingSet = new Set(existingWords?.map(w => w.word) || []);
    const newWords = normalizedWords.filter((w: string) => !existingSet.has(w));

    if (newWords.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Words already muted',
        muted_words: Array.from(existingSet)
      });
    }

    // Insert new muted words
    const { error: insertError } = await supabase
      .from('muted_words')
      .insert(newWords.map((word: string) => ({ user_id: user.id, word })));

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to add muted words' },
        { status: 500 }
      );
    }

    const allWords = [...existingSet, ...newWords];

    return NextResponse.json({
      success: true,
      message: `Added ${newWords.length} muted word(s)`,
      muted_words: allWords
    });

  } catch (error) {
    console.error('Add muted words error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/users/mute-words - Get muted words list
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;

    const { data: mutedWords, error } = await supabase
      .from('muted_words')
      .select('id, word')
      .eq('user_id', user.id)
      .order('word');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      muted_words: mutedWords || []
    });

  } catch (error) {
    console.error('Get muted words error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/mute-words - Remove muted words
export async function DELETE(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;
    const { searchParams } = new URL(request.url);
    const word_id = searchParams.get('word_id');
    const word = searchParams.get('word');

    if (!word_id && !word) {
      return NextResponse.json(
        { error: 'Word ID or word is required' },
        { status: 400 }
      );
    }

    let deleteQuery = supabase
      .from('muted_words')
      .delete()
      .eq('user_id', user.id);

    if (word_id) {
      deleteQuery = deleteQuery.eq('id', parseInt(word_id));
    } else if (word) {
      deleteQuery = deleteQuery.eq('word', word.toLowerCase().trim());
    }

    const { error } = await deleteQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Muted word removed'
    });

  } catch (error) {
    console.error('Remove muted word error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
