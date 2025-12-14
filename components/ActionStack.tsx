'use client';

import { useState } from 'react';

interface ActionStackProps {
  postId: string;
  username: string;
  reactionCount: number;
  commentCount: number;
  hasReacted: boolean;
  hasSaved: boolean;
  onReact: (postId: string) => void;
  onComment: (postId: string) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
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
  reactionCount,
  commentCount,
  hasReacted,
  hasSaved,
  onReact,
  onComment,
  onSave,
  onReport,
}: ActionStackProps) {
  const [animateHeart, setAnimateHeart] = useState(false);
  const [animateSave, setAnimateSave] = useState(false);

  const handleReact = () => {
    setAnimateHeart(true);
    onReact(postId);
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const handleSave = () => {
    setAnimateSave(true);
    onSave(postId);
    setTimeout(() => setAnimateSave(false), 300);
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
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '1.5rem',
    transition: 'all 0.2s ease',
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
  };

  const countStyle = {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
  };

  return (
    <div
      style={{
        position: 'absolute',
        right: '12px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        zIndex: 10,
      }}
    >
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
            transform: animateHeart ? 'scale(1.2)' : 'scale(1)',
            background: hasReacted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {hasReacted ? '❤️' : '🤍'}
        </div>
        <span style={countStyle}>{formatCount(reactionCount)}</span>
      </button>

      {/* Support (Comment) */}
      <button
        onClick={() => onComment(postId)}
        style={buttonStyle}
        aria-label="Support"
      >
        <div style={{ ...iconStyle, color: 'rgba(255, 255, 255, 0.9)' }}>
          💬
        </div>
        <span style={countStyle}>{formatCount(commentCount)}</span>
      </button>

      {/* Save/Bookmark */}
      <button
        onClick={handleSave}
        style={buttonStyle}
        aria-label="Save"
      >
        <div
          style={{
            ...iconStyle,
            color: hasSaved ? '#0d9488' : 'rgba(255, 255, 255, 0.9)',
            transform: animateSave ? 'scale(1.2)' : 'scale(1)',
            background: hasSaved ? 'rgba(13, 148, 136, 0.2)' : 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {hasSaved ? '🔖' : '📑'}
        </div>
      </button>

      {/* Report */}
      <button
        onClick={() => onReport(postId)}
        style={buttonStyle}
        aria-label="Report"
      >
        <div
          style={{
            ...iconStyle,
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.25rem',
          }}
        >
          🚩
        </div>
      </button>
    </div>
  );
}
