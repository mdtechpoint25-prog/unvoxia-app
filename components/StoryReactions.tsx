'use client';

import { useState, useEffect } from 'react';

interface ReactionButtonProps {
  storyId: string | number;
  initialReactions?: number;
  isStatic?: boolean;
}

const REACTIONS = [
  { type: 'heart', emoji: '❤️', label: 'Love' },
  { type: 'hug', emoji: '🤗', label: 'Hug' },
  { type: 'support', emoji: '💪', label: 'Strength' },
  { type: 'relate', emoji: '🙋', label: 'Relate' },
  { type: 'pray', emoji: '🙏', label: 'Pray' }
];

export default function StoryReactions({ storyId, initialReactions = 0, isStatic = false }: ReactionButtonProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [total, setTotal] = useState(initialReactions);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [byType, setByType] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isStatic) {
      fetchReactions();
    }
  }, [storyId, isStatic]);

  const fetchReactions = async () => {
    try {
      const res = await fetch(`/api/stories/${storyId}/reactions`);
      if (res.ok) {
        const data = await res.json();
        setTotal(data.total || initialReactions);
        setUserReaction(data.userReaction);
        setByType(data.byType || {});
      }
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  };

  const handleReaction = async (type: string) => {
    if (loading || isStatic) return;
    
    setLoading(true);
    setShowPicker(false);

    // Optimistic update
    const wasReacted = userReaction === type;
    setUserReaction(wasReacted ? null : type);
    setTotal(prev => wasReacted ? prev - 1 : (userReaction ? prev : prev + 1));

    try {
      const res = await fetch(`/api/stories/${storyId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: type })
      });

      if (res.ok) {
        const data = await res.json();
        setTotal(data.total);
        setUserReaction(data.userReaction);
        setByType(data.byType || {});
      }
    } catch (error) {
      console.error('Failed to add reaction:', error);
      // Revert on error
      setUserReaction(wasReacted ? type : null);
      setTotal(prev => wasReacted ? prev + 1 : prev - 1);
    } finally {
      setLoading(false);
    }
  };

  const selectedReaction = REACTIONS.find(r => r.type === userReaction);

  return (
    <div className="reaction-wrapper">
      <button
        className={`reaction-main ${userReaction ? 'reacted' : ''}`}
        onClick={() => setShowPicker(!showPicker)}
        disabled={loading}
      >
        <span className="reaction-emoji">{selectedReaction?.emoji || '💚'}</span>
        <span>Support</span>
        <span className="reaction-count">({total})</span>
      </button>

      {showPicker && (
        <div className="reaction-picker">
          {REACTIONS.map(reaction => (
            <button
              key={reaction.type}
              className={`picker-item ${userReaction === reaction.type ? 'active' : ''}`}
              onClick={() => handleReaction(reaction.type)}
              title={reaction.label}
            >
              <span className="picker-emoji">{reaction.emoji}</span>
              {byType[reaction.type] ? (
                <span className="picker-count">{byType[reaction.type]}</span>
              ) : null}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .reaction-wrapper {
          position: relative;
        }
        .reaction-main {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          background: ${userReaction ? 'linear-gradient(135deg, #1ABC9C, #16a085)' : '#f3f4f6'};
          color: ${userReaction ? '#fff' : '#374151'};
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .reaction-main:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .reaction-emoji {
          font-size: 1.1rem;
        }
        .reaction-count {
          font-weight: 500;
          opacity: 0.9;
        }
        .reaction-picker {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          display: flex;
          gap: 0.25rem;
          background: #fff;
          padding: 0.5rem;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 100;
        }
        .picker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.125rem;
          padding: 0.5rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .picker-item:hover {
          background: #f3f4f6;
          transform: scale(1.1);
        }
        .picker-item.active {
          background: rgba(26, 188, 156, 0.1);
        }
        .picker-emoji {
          font-size: 1.5rem;
        }
        .picker-count {
          font-size: 0.688rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
