'use client';

import { useState } from 'react';
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
  shareCount: number;
  createdAt: string;
  hasReacted: boolean;
  isFollowing: boolean;
}

interface TextReelProps {
  post: TextReelData;
  onReact: (postId: string) => void;
  onFollow: (username: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
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

export default function TextReel({ post, onReact, onFollow, onComment, onShare }: TextReelProps) {
  const typeStyle = postTypeStyles[post.postType] || postTypeStyles.experience;

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
          justifyContent: 'flex-end',
          padding: '24px',
          paddingBottom: '100px',
          paddingRight: '80px',
        }}
      >
        {/* Post Type Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '6px 12px',
            borderRadius: '16px',
            background: typeStyle.bg,
            marginBottom: '16px',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: typeStyle.text, fontWeight: 500, textTransform: 'capitalize' }}>
            {post.postType}
          </span>
        </div>

        {/* Author Info */}
        <Link
          href={`/profile/${post.username}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            textDecoration: 'none',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            {post.avatarIcon === 'default' ? '👤' : post.avatarIcon}
          </div>

          <div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
              @{post.username}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '8px', fontSize: '0.85rem' }}>
              · {formatTime(post.createdAt)}
            </span>
          </div>
        </Link>

        {/* Post Content */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '1.25rem',
            lineHeight: 1.6,
            fontFamily: 'Georgia, serif',
            marginBottom: '20px',
            maxWidth: '600px',
          }}
        >
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/explore?tag=${tag}`}
                style={{
                  color: '#0d9488',
                  fontSize: '0.9rem',
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
        shareCount={post.shareCount}
        hasReacted={post.hasReacted}
        isFollowing={post.isFollowing}
        onReact={onReact}
        onFollow={onFollow}
        onComment={onComment}
        onShare={onShare}
      />
    </div>
  );
}
