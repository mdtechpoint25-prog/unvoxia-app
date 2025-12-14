'use client';

import { useState, useCallback } from 'react';

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
  const [animatingButtons, setAnimatingButtons] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<{ id: number; type: string }[]>([]);

  const triggerAnimation = useCallback((buttonId: string) => {
    setAnimatingButtons((prev) => new Set(prev).add(buttonId));
    setTimeout(() => {
      setAnimatingButtons((prev) => {
        const next = new Set(prev);
        next.delete(buttonId);
        return next;
      });
    }, 400);
  }, []);

  const spawnParticles = useCallback((type: string) => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      type,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  }, []);

  const handleReact = () => {
    triggerAnimation('react');
    if (!hasReacted) {
      spawnParticles('heart');
    }
    onReact(postId);
  };

  const handleSave = () => {
    triggerAnimation('save');
    if (!hasSaved) {
      spawnParticles('bookmark');
    }
    onSave(postId);
  };

  const handleComment = () => {
    triggerAnimation('comment');
    onComment(postId);
  };

  const handleReport = () => {
    triggerAnimation('report');
    onReport(postId);
  };

  const isAnimating = (id: string) => animatingButtons.has(id);

  return (
    <div
      style={{
        position: 'absolute',
        right: '12px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        zIndex: 10,
      }}
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <FloatingParticle key={particle.id} type={particle.type} />
      ))}

      {/* I Feel This (Like) */}
      <ActionButton
        onClick={handleReact}
        isAnimating={isAnimating('react')}
        isActive={hasReacted}
        activeColor="rgba(239, 68, 68, 0.2)"
        activeTextColor="#ef4444"
        emoji={hasReacted ? '❤️' : '🤍'}
        count={reactionCount}
        label="Feel"
      />

      {/* Support (Comment) */}
      <ActionButton
        onClick={handleComment}
        isAnimating={isAnimating('comment')}
        isActive={false}
        emoji="💬"
        count={commentCount}
        label="Support"
      />

      {/* Save/Bookmark */}
      <ActionButton
        onClick={handleSave}
        isAnimating={isAnimating('save')}
        isActive={hasSaved}
        activeColor="rgba(13, 148, 136, 0.2)"
        activeTextColor="#0d9488"
        emoji={hasSaved ? '🔖' : '📑'}
        label="Save"
      />

      {/* Report */}
      <ActionButton
        onClick={handleReport}
        isAnimating={isAnimating('report')}
        isActive={false}
        emoji="🚩"
        small
      />
    </div>
  );
}

// Individual Action Button Component
interface ActionButtonProps {
  onClick: () => void;
  isAnimating: boolean;
  isActive: boolean;
  activeColor?: string;
  activeTextColor?: string;
  emoji: string;
  count?: number;
  label?: string;
  small?: boolean;
}

function ActionButton({
  onClick,
  isAnimating,
  isActive,
  activeColor = 'rgba(0, 0, 0, 0.3)',
  activeTextColor = '#fff',
  emoji,
  count,
  label,
  small = false,
}: ActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        transform: isPressed ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          width: small ? '36px' : '48px',
          height: small ? '36px' : '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontSize: small ? '1.1rem' : '1.6rem',
          background: isActive ? activeColor : 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(10px)',
          transform: isAnimating ? 'scale(1.25)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: isActive
            ? `0 0 20px ${activeColor}`
            : '0 4px 15px rgba(0, 0, 0, 0.2)',
          animation: isAnimating && isActive ? 'heartBeat 0.5s ease' : 'none',
        }}
      >
        {emoji}
      </div>
      {count !== undefined && (
        <span
          style={{
            fontSize: '0.75rem',
            color: isActive ? activeTextColor : 'rgba(255, 255, 255, 0.8)',
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}
        >
          {formatCount(count)}
        </span>
      )}
      {!count && label && !small && (
        <span
          style={{
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

// Floating Particle Animation
function FloatingParticle({ type }: { type: string }) {
  const emoji = type === 'heart' ? '❤️' : '🔖';
  const randomX = Math.random() * 60 - 30;
  const randomRotate = Math.random() * 360;

  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '1.2rem',
        pointerEvents: 'none',
        animation: 'floatUpFade 0.8s ease-out forwards',
        transform: `translateX(${randomX}px) rotate(${randomRotate}deg)`,
      }}
    >
      {emoji}
      <style jsx>{`
        @keyframes floatUpFade {
          0% {
            opacity: 1;
            transform: translateX(${randomX}px) translateY(0) rotate(${randomRotate}deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(${randomX}px) translateY(-80px) rotate(${randomRotate + 180}deg) scale(0.5);
          }
        }
      `}</style>
    </span>
  );
}
