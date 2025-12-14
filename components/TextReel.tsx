'use client';

import Link from 'next/link';
import ActionStack from './ActionStack';

export interface TextReelData {
  id: string;
  username: string;
  avatarIcon: string;
  content: string;
  postType: 'experience' | 'question' | 'advice' | 'release';
  tags: string[];
  reactionCount: number;
  commentCount: number;
  createdAt: string;
  hasReacted: boolean;
  hasSaved: boolean;
}

interface TextReelProps {
  post: TextReelData;
  onReact: (postId: string) => void;
  onComment: (postId: string) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
}

// Format relative time
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}

// Post type badge colors
const postTypeStyles: Record<string, { bg: string; text: string }> = {
  experience: { bg: 'rgba(13, 148, 136, 0.2)', text: '#0d9488' },
  question: { bg: 'rgba(124, 58, 237, 0.2)', text: '#7c3aed' },
  advice: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' },
  release: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
};

// Avatar emoji mapping
const AVATAR_EMOJIS: Record<string, string> = {
  spiral: '🌀', butterfly: '🦋', wave: '🌊', flower: '🌸', moon: '🌙', star: '⭐',
  flame: '🔥', sparkle: '💫', leaf: '🌿', mask: '🎭', gem: '💎', rainbow: '🌈',
  cloud: '☁️', heart: '💜', feather: '🪶', lotus: '🪷', default: '👤',
};

export default function TextReel({ post, onReact, onComment, onSave, onReport }: TextReelProps) {
  const typeStyle = postTypeStyles[post.postType] || postTypeStyles.experience;
  const avatarEmoji = AVATAR_EMOJIS[post.avatarIcon] || AVATAR_EMOJIS.default;

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        background: '#0f172a',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '24px',
          paddingRight: '80px',
        }}
      >
        {/* Post Content - Large centered text */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            lineHeight: 1.6,
            fontFamily: 'Georgia, serif',
            marginBottom: '24px',
            maxWidth: '600px',
          }}
        >
          {post.content}
        </p>

        {/* Bottom info bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Author */}
          <Link
            href={`/profile/${post.username}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{avatarEmoji}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              @{post.username}
            </span>
          </Link>

          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>

          {/* Post type */}
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              background: typeStyle.bg,
              color: typeStyle.text,
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {post.postType}
          </span>

          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>

          {/* Time */}
          <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
            {formatTime(post.createdAt)}
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/explore?tag=${tag}`}
                style={{
                  color: 'rgba(13, 148, 136, 0.9)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right-Side Action Stack */}
      <ActionStack
        postId={post.id}
        username={post.username}
        reactionCount={post.reactionCount}
        commentCount={post.commentCount}
        hasReacted={post.hasReacted}
        hasSaved={post.hasSaved}
        onReact={onReact}
        onComment={onComment}
        onSave={onSave}
        onReport={onReport}
      />
    </div>
  );
}
