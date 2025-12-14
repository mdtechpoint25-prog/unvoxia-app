'use client';

import { useState } from 'react';

interface ActionStackProps {
  postId: string;
  username: string;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  hasReacted: boolean;
  isFollowing: boolean;
  onReact: (postId: string) => void;
  onFollow: (username: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

// Format count for display
function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  if (count < 1000000) return Math.floor(count / 1000) + 'K';
  return (count / 1000000).toFixed(1) + 'M';
}

export default function ActionStack({
  postId,
  username,
  reactionCount,
  commentCount,
  shareCount,
  hasReacted,
  isFollowing,
  onReact,
  onFollow,
  onComment,
  onShare,
}: ActionStackProps) {
  const [animateHeart, setAnimateHeart] = useState(false);

  const handleReact = () => {
    setAnimateHeart(true);
    onReact(postId);
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    transition: 'transform 0.2s ease',
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '1.4rem',
    transition: 'all 0.2s ease',
  };

  const countStyle = {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
  };

  return (
    <div
      style={{
        position: 'absolute',
        right: '12px',
        bottom: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        zIndex: 10,
      }}
    >
      {/* Profile + Follow */}
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <button
          onClick={() => onFollow(username)}
          style={{
            ...buttonStyle,
            position: 'relative',
          }}
          aria-label={isFollowing ? 'Unfollow' : 'Follow'}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: isFollowing ? '2px solid #0d9488' : '2px solid transparent',
            }}
          >
            👤
          </div>
          {/* Follow indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: isFollowing ? '#0d9488' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {isFollowing ? '✓' : '+'}
          </div>
        </button>
      </div>

      {/* I Feel This (Like) */}
      <button
        onClick={handleReact}
        style={buttonStyle}
        aria-label="I Feel This"
      >
        <div
          style={{
            ...iconStyle,
            color: hasReacted ? '#ef4444' : 'rgba(255, 255, 255, 0.9)',
            transform: animateHeart ? 'scale(1.3)' : 'scale(1)',
          }}
        >
          {hasReacted ? '❤️' : '🤍'}
        </div>
        <span style={countStyle}>{formatCount(reactionCount)}</span>
      </button>

      {/* Comment */}
      <button
        onClick={() => onComment(postId)}
        style={buttonStyle}
        aria-label="Comment"
      >
        <div style={{ ...iconStyle, color: 'rgba(255, 255, 255, 0.9)' }}>
          💬
        </div>
        <span style={countStyle}>{formatCount(commentCount)}</span>
      </button>

      {/* Share */}
      <button
        onClick={() => onShare(postId)}
        style={buttonStyle}
        aria-label="Share"
      >
        <div style={{ ...iconStyle, color: 'rgba(255, 255, 255, 0.9)' }}>
          🔁
        </div>
        <span style={countStyle}>{formatCount(shareCount)}</span>
      </button>

      {/* Save/Bookmark */}
      <button
        onClick={() => {}}
        style={buttonStyle}
        aria-label="Save"
      >
        <div style={{ ...iconStyle, color: 'rgba(255, 255, 255, 0.9)' }}>
          🔖
        </div>
      </button>
    </div>
  );
}
