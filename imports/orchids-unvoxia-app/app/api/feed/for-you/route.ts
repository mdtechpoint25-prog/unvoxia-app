import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getTagsWithIdsForPosts, getTagsForPosts } from '@/lib/tags';

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

// GET /api/feed/for-you - Get personalized "For You" feed
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    // If authenticated, use personalized feed
    if (auth) {
      const { user } = auth;

      // Get blocked users
      const { data: blockedUsers } = await supabaseAdmin
        .from('blocked_users')
        .select('blocked_id')
        .eq('blocker_id', user.id);

      const blockedIds = blockedUsers?.map(b => b.blocked_id) || [];

      // Get muted words
      const { data: mutedWords } = await supabaseAdmin
        .from('muted_words')
        .select('word')
        .eq('user_id', user.id);

      const muted = mutedWords?.map(m => m.word.toLowerCase()) || [];

      // Get user's interests (tags they've engaged with)
      const { data: interests } = await supabaseAdmin
        .from('user_interests')
        .select('tag_id, weight')
        .eq('user_id', user.id)
        .order('weight', { ascending: false })
        .limit(20);

      const interestTagIds = interests?.map(i => i.tag_id) || [];

      // Get users they follow
      const { data: following } = await supabaseAdmin
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id);

      const followingIds = following?.map(f => f.following_id) || [];

      // Get posts with scoring
      let query = supabaseAdmin
        .from('posts')
        .select(`
          *,
          users:user_id (username, avatar_icon)
        `)
        .eq('is_flagged', false)
        .order('created_at', { ascending: false })
        .limit(limit * 2); // Get extra to allow for filtering

      if (blockedIds.length > 0) {
        query = query.not('user_id', 'in', `(${blockedIds.join(',')})`);
      }

      if (cursor) {
        query = query.lt('created_at', cursor);
      }

      const { data: posts, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Fetch tags for all posts
      const postIds = posts?.map(p => p.id) || [];
      const tagsByPost = await getTagsWithIdsForPosts(postIds);

      // Check if user has reacted to these posts
      const { data: reactions } = await supabaseAdmin
        .from('reactions')
        .select('post_id')
        .eq('user_id', user.id)
        .in('post_id', postIds);

      const reactedPostIds = new Set(reactions?.map(r => r.post_id) || []);

      // Score and filter posts
      const scoredPosts = posts?.map(post => {
        const postTags = tagsByPost[post.id] || [];
        const postTagNames = postTags.map(t => t.name);

        // Filter out posts with muted words
        if (muted.some(word => post.content.toLowerCase().includes(word))) {
          return null;
        }

        // Calculate score
        let score = 0;

        // Boost for followed users
        if (followingIds.includes(post.user_id)) {
          score += 5;
        }

        // Boost for matching interests
        const matchingInterests = postTags.filter(t => interestTagIds.includes(t.id));
        score += matchingInterests.length * 4;

        // Boost for engagement
        score += Math.log(Math.max(post.reaction_count, 1));
        score += Math.log(Math.max(post.comment_count, 1)) * 0.5;

        // Recency decay (posts older than 24h get penalty)
        const ageInHours = (Date.now() - new Date(post.created_at).getTime()) / 3600000;
        score -= ageInHours * 0.02;

        // Add some randomness for discovery
        score += Math.random() * 0.5;

        return {
          ...post,
          tags: postTagNames,
          has_reacted: reactedPostIds.has(post.id),
          is_following: followingIds.includes(post.user_id),
          _score: score
        };
      }).filter(Boolean) as Array<{
        id: string;
        created_at: string;
        tags: string[];
        has_reacted: boolean;
        is_following: boolean;
        _score: number;
        [key: string]: unknown;
      }>;

      // Sort by score and take limit
      scoredPosts.sort((a, b) => b._score - a._score);
      const finalPosts = scoredPosts.slice(0, limit).map(({ _score, ...post }) => post);

      return NextResponse.json({
        posts: finalPosts,
        next_cursor: finalPosts.length > 0 ? finalPosts[finalPosts.length - 1].created_at : null
      });
    }

    // For non-authenticated users, return trending posts
    let query = supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .eq('is_flagged', false)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('reaction_count', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch tags for all posts
    const postIds = posts?.map(p => p.id) || [];
    const tagsByPost = await getTagsForPosts(postIds);

    const enrichedPosts = posts?.map(post => ({
      ...post,
      tags: tagsByPost[post.id] || [],
      has_reacted: false,
      is_following: false
    })) || [];

    return NextResponse.json({
      posts: enrichedPosts,
      next_cursor: posts && posts.length === limit ? posts[posts.length - 1].created_at : null
    });

  } catch (error) {
    console.error('For You feed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
