'use client';

import { useState } from 'react';
import { REACTIONS } from '@/lib/constants';

interface ReactionButtonProps {
  postId: string;
  reactions: { emoji: string; user_id: string }[];
  currentUserId?: string;
}

export default function ReactionButton({ postId, reactions, currentUserId }: ReactionButtonProps) {
  const [localReactions, setLocalReactions] = useState(reactions);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const reactionCounts = localReactions.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userReactions = new Set(
    localReactions.filter(r => r.user_id === currentUserId).map(r => r.emoji)
  );

  const handleReaction = async (emoji: string) => {
    setLoading(true);
    setShowPicker(false);

    try {
      const res = await fetch(`/api/posts/${postId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.action === 'added') {
        setLocalReactions([...localReactions, { emoji, user_id: currentUserId || '' }]);
      } else {
        setLocalReactions(localReactions.filter(
          r => !(r.emoji === emoji && r.user_id === currentUserId)
        ));
      }
    } catch (err) {
      console.error('Reaction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalReactions = localReactions.length;

  // Get emoji display for a reaction type
  const getReactionDisplay = (type: string) => {
    const reaction = REACTIONS[type as keyof typeof REACTIONS];
    return reaction ? reaction.emoji : type;
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Show existing reactions */}
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.35rem 0.65rem',
              background: userReactions.has(emoji) 
                ? 'linear-gradient(135deg, rgba(26, 188, 156, 0.15) 0%, rgba(155, 89, 182, 0.15) 100%)' 
                : '#f5f5f5',
              border: userReactions.has(emoji) ? '1px solid #1ABC9C' : '1px solid #e5e7eb',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{getReactionDisplay(emoji)}</span>
            <span style={{ color: '#2C3E50', fontWeight: 500 }}>{count}</span>
          </button>
        ))}
        
        {/* Add reaction button */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          disabled={loading}
          style={{
            padding: '0.35rem 0.65rem',
            background: showPicker ? 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)' : '#f5f5f5',
            color: showPicker ? '#fff' : '#666',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease'
          }}
        >
          {totalReactions === 0 ? '+ React' : '+'}
        </button>
      </div>

      {/* NOMA Reaction Picker */}
      {showPicker && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          marginBottom: '0.5rem',
          background: '#fff',
          borderRadius: '16px',
          padding: '0.75rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: '0.25rem',
          zIndex: 10
        }}>
          {Object.entries(REACTIONS).map(([key, { emoji, label }]) => (
            <button
              key={key}
              onClick={() => handleReaction(key)}
              disabled={loading}
              title={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.75rem',
                background: userReactions.has(key) 
                  ? 'linear-gradient(135deg, rgba(26, 188, 156, 0.2) 0%, rgba(155, 89, 182, 0.2) 100%)' 
                  : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
              <span style={{ 
                fontSize: '0.65rem', 
                color: '#666',
                fontWeight: 500
              }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
