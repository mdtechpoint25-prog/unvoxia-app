'use client';

import { useState, useEffect, useRef } from 'react';
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
  isActive?: boolean;
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

// Post type badge colors with emotional tints
const postTypeStyles: Record<string, { bg: string; text: string; glow: string; ambientColor: string }> = {
  experience: { 
    bg: 'rgba(13, 148, 136, 0.2)', 
    text: '#0d9488', 
    glow: 'rgba(13, 148, 136, 0.3)',
    ambientColor: 'rgba(124, 255, 178, 0.08)' // Hope green tint
  },
  question: { 
    bg: 'rgba(124, 58, 237, 0.2)', 
    text: '#7c3aed', 
    glow: 'rgba(124, 58, 237, 0.3)',
    ambientColor: 'rgba(124, 58, 237, 0.08)' // Purple tint
  },
  advice: { 
    bg: 'rgba(59, 130, 246, 0.2)', 
    text: '#3b82f6', 
    glow: 'rgba(59, 130, 246, 0.3)',
    ambientColor: 'rgba(59, 130, 246, 0.08)' // Blue tint
  },
  release: { 
    bg: 'rgba(255, 122, 122, 0.2)', 
    text: '#FF7A7A', 
    glow: 'rgba(255, 122, 122, 0.3)',
    ambientColor: 'rgba(255, 122, 122, 0.06)' // Pain red tint
  },
};

// Avatar emoji mapping
const AVATAR_EMOJIS: Record<string, string> = {
  spiral: '🌀', butterfly: '🦋', wave: '🌊', flower: '🌸', moon: '🌙', star: '⭐',
  flame: '🔥', sparkle: '💫', leaf: '🌿', mask: '🎭', gem: '💎', rainbow: '🌈',
  cloud: '☁️', heart: '💜', feather: '🪶', lotus: '🪷', default: '👤',
};

export default function TextReel({ post, isActive = true, onReact, onComment, onSave, onReport }: TextReelProps) {
  const typeStyle = postTypeStyles[post.postType] || postTypeStyles.experience;
  const avatarEmoji = AVATAR_EMOJIS[post.avatarIcon] || AVATAR_EMOJIS.default;
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animation when becoming active
  useEffect(() => {
    if (isActive && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, hasAnimated]);

  // Reset animation when scrolling away and back
  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      setHasAnimated(false);
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        background: '#0E0F14',
        scrollSnapAlign: 'start',
        overflow: 'hidden',
      }}
    >
      {/* Emotional ambient background overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, transparent 0%, ${typeStyle.ambientColor} 50%, transparent 100%)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Top fade gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(180deg, #0E0F14 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Bottom fade gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(0deg, #0E0F14 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      {/* Ambient Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${typeStyle.glow} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: isVisible ? 0.6 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Area - Centered */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px 24px',
          paddingRight: '80px',
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        {/* Post Content - Large centered text (TikTok style) */}
        <p
          style={{
            color: '#FFFFFF',
            fontSize: 'clamp(22px, 5vw, 28px)',
            lineHeight: 1.55,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            marginBottom: '32px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.1s',
          }}
        >
          {post.content}
        </p>

        {/* Bottom info bar with staggered animation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.25s',
          }}
        >
          {/* Author with hover effect */}
          <Link
            href={`/profile/${post.username}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              padding: '4px 8px',
              borderRadius: '20px',
              transition: 'background 0.2s ease',
            }}
          >
            <span 
              style={{ 
                fontSize: '1.25rem',
                animation: isVisible ? 'floatGentle 4s ease-in-out infinite' : 'none',
              }}
            >
              {avatarEmoji}
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              @{post.username}
            </span>
          </Link>

          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>

          {/* Post type badge with subtle glow */}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              background: typeStyle.bg,
              color: typeStyle.text,
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'capitalize',
              boxShadow: `0 0 20px ${typeStyle.glow}`,
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

        {/* Tags with staggered entrance */}
        {post.tags.length > 0 && (
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              marginTop: '12px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.35s',
            }}
          >
            {post.tags.map((tag, index) => (
              <Link
                key={tag}
                href={`/explore?tag=${tag}`}
                style={{
                  color: 'rgba(13, 148, 136, 0.9)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                  transitionDelay: `${0.4 + index * 0.05}s`,
                }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right-Side Action Stack with entrance animation */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.3s',
        }}
      >
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

      {/* Inline animation keyframes */}
      <style jsx>{`
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          75% { transform: translateY(-3px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
}
