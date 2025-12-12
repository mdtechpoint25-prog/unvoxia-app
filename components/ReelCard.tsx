'use client';

import { useState, useRef, useEffect } from 'react';

interface ReelCardProps {
  id: string;
  username: string;
  avatarUrl?: string;
  content: string;
  audioTitle?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isActive?: boolean;
}

export default function ReelCard({
  id,
  username,
  avatarUrl,
  content,
  audioTitle,
  likes,
  comments,
  shares,
  isLiked = false,
  isActive = false
}: ReelCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLike = async () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      await fetch(`/api/reels/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: liked ? 'unlike' : 'like' })
      });
    } catch (err) {
      setLiked(liked);
      setLikeCount(likes);
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '600px',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      {/* Content Display */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <p style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 500,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '90%'
        }}>
          {content}
        </p>
      </div>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        pointerEvents: 'none'
      }} />

      {/* Action Buttons - Right Side */}
      <div style={{
        position: 'absolute',
        right: '1rem',
        bottom: '8rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Like */}
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: liked ? '#e74c3c' : 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: liked ? 'scale(1.1)' : 'scale(1)'
          }}>
            <span style={{ fontSize: '1.25rem' }}>{liked ? 'Heart' : 'Heart-O'}</span>
          </div>
          <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 500 }}>
            {likeCount}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.25rem' }}>Chat</span>
          </div>
          <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 500 }}>
            {comments}
          </span>
        </button>

        {/* Share */}
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.25rem' }}>Share</span>
          </div>
          <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 500 }}>
            {shares}
          </span>
        </button>
      </div>

      {/* Bottom Info */}
      <div style={{
        position: 'relative',
        padding: '1.5rem',
        zIndex: 1
      }}>
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            border: '2px solid #fff'
          }}>
            {avatarUrl || username.charAt(0).toUpperCase()}
          </div>
          <div>
            <span style={{ color: '#fff', fontWeight: 600 }}>@{username}</span>
          </div>
          <button style={{
            marginLeft: 'auto',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid #fff',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            Follow
          </button>
        </div>

        {/* Audio Info */}
        {audioTitle && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.85rem'
          }}>
            <span>Music</span>
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px'
            }}>
              {audioTitle}
            </span>
          </div>
        )}
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: '#fff',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          zIndex: 10
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, color: '#1a1a2e', fontWeight: 600 }}>
              Comments ({comments})
            </h3>
            <button
              onClick={() => setShowComments(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              X
            </button>
          </div>
          <div style={{ padding: '1rem', color: '#6b7280', textAlign: 'center' }}>
            Comments coming soon...
          </div>
        </div>
      )}
    </div>
  );
}

