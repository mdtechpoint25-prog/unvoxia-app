'use client';

import { useState } from 'react';

const SUPPORTIVE_EMOJIS = ['heart', 'hug', 'strength', 'hope', 'peace'];
const EMOJI_MAP: Record<string, string> = {
  heart: '??',
  hug: '??',
  strength: '??',
  hope: '??',
  peace: '???'
};

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

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              background: userReactions.has(emoji) ? '#e8f8f5' : '#f5f5f5',
              border: userReactions.has(emoji) ? '1px solid #1ABC9C' : '1px solid #ddd',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            <span>{EMOJI_MAP[emoji] || emoji}</span>
            <span style={{ color: '#2C3E50' }}>{count}</span>
          </button>
        ))}
        <button
          onClick={() => setShowPicker(!showPicker)}
          disabled={loading}
          style={{
            padding: '0.25rem 0.5rem',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          +
        </button>
        {totalReactions > 0 && (
          <span style={{ color: '#888', fontSize: '0.85rem' }}>
            {totalReactions} reaction{totalReactions !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {showPicker && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '0.5rem',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          padding: '0.5rem',
          display: 'flex',
          gap: '0.25rem',
          zIndex: 10
        }}>
          {SUPPORTIVE_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                padding: '0.25rem'
              }}
            >
              {EMOJI_MAP[emoji]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
