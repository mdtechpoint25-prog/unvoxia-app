import { supabaseAdmin } from '@/lib/supabase';

/**
 * Fetch tags for multiple posts
 * Returns a map of post_id -> array of tag names
 */
export async function getTagsForPosts(postIds: string[]): Promise<Record<string, string[]>> {
  if (postIds.length === 0) {
    return {};
  }

  // Get post_tags links
  const { data: postTagLinks } = await supabaseAdmin
    .from('post_tags')
    .select('post_id, tag_id')
    .in('post_id', postIds);

  if (!postTagLinks || postTagLinks.length === 0) {
    return {};
  }

  // Get unique tag IDs
  const tagIds = [...new Set(postTagLinks.map(pt => pt.tag_id))];

  // Fetch tag names
  const { data: tagData } = await supabaseAdmin
    .from('tags')
    .select('id, name')
    .in('id', tagIds);

  // Create tag ID to name map
  const tagMap = new Map(tagData?.map(t => [t.id, t.name]) || []);

  // Build post_id to tag names map
  const tagsByPost: Record<string, string[]> = {};
  postTagLinks.forEach((pt) => {
    if (!tagsByPost[pt.post_id]) {
      tagsByPost[pt.post_id] = [];
    }
    const tagName = tagMap.get(pt.tag_id);
    if (tagName) {
      tagsByPost[pt.post_id].push(tagName);
    }
  });

  return tagsByPost;
}

/**
 * Fetch tags with weights for algorithm scoring
 * Returns post_id -> array of {id, name} objects
 */
export async function getTagsWithIdsForPosts(postIds: string[]): Promise<Record<string, { id: number; name: string }[]>> {
  if (postIds.length === 0) {
    return {};
  }

  // Get post_tags links
  const { data: postTagLinks } = await supabaseAdmin
    .from('post_tags')
    .select('post_id, tag_id')
    .in('post_id', postIds);

  if (!postTagLinks || postTagLinks.length === 0) {
    return {};
  }

  // Get unique tag IDs
  const tagIds = [...new Set(postTagLinks.map(pt => pt.tag_id))];

  // Fetch tag names
  const { data: tagData } = await supabaseAdmin
    .from('tags')
    .select('id, name')
    .in('id', tagIds);

  // Create tag ID to data map
  const tagMap = new Map(tagData?.map(t => [t.id, { id: t.id, name: t.name }]) || []);

  // Build post_id to tag data map
  const tagsByPost: Record<string, { id: number; name: string }[]> = {};
  postTagLinks.forEach((pt) => {
    if (!tagsByPost[pt.post_id]) {
      tagsByPost[pt.post_id] = [];
    }
    const tagData = tagMap.get(pt.tag_id);
    if (tagData) {
      tagsByPost[pt.post_id].push(tagData);
    }
  });

  return tagsByPost;
}
