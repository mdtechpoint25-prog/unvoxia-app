'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TextReel, { TextReelData } from '@/components/TextReel';
import FeedNav from '@/components/FeedNav';
import CommentSheet from '@/components/CommentSheet';
import CreateButton from '@/components/CreateButton';

// Mock data - in production, fetch from API
const mockPosts: TextReelData[] = [
  {
    id: '1',
    username: 'silentvoice_83',
    avatarIcon: 'spiral',
    content: 'I smile at work every day, but when I get home, I feel empty and exhausted. I don\'t know how long I can keep pretending.',
    postType: 'experience',
    tags: ['burnout', 'lonely', 'work'],
    reactionCount: 1247,
    commentCount: 89,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '2',
    username: 'quietmind_402',
    avatarIcon: 'butterfly',
    content: 'Does anyone else feel like they\'re living the same day over and over? I wake up, work, sleep, repeat. When did life become so automatic?',
    postType: 'question',
    tags: ['depression', 'life', 'meaning'],
    reactionCount: 892,
    commentCount: 156,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '3',
    username: 'healingjourney_21',
    avatarIcon: 'lotus',
    content: 'Today I finally told my therapist about the thing I\'ve been hiding for years. My hands were shaking but I did it. Small wins matter.',
    postType: 'experience',
    tags: ['healing', 'therapy', 'growth'],
    reactionCount: 3421,
    commentCount: 312,
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    hasReacted: true,
    hasSaved: true,
  },
  {
    id: '4',
    username: 'anonymous_heart',
    avatarIcon: 'heart',
    content: 'I still love someone who hurt me deeply. Everyone says I should move on, but feelings don\'t follow logic. How do you unlove someone?',
    postType: 'question',
    tags: ['love', 'heartbreak', 'healing'],
    reactionCount: 2156,
    commentCount: 423,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '5',
    username: 'midnightthoughts',
    avatarIcon: 'moon',
    content: 'To whoever needs to hear this: you are not a burden. Your problems are not too much. You deserve space to exist fully, messily, honestly.',
    postType: 'advice',
    tags: ['support', 'selfcare', 'reminder'],
    reactionCount: 5678,
    commentCount: 234,
    createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '6',
    username: 'broken_but_breathing',
    avatarIcon: 'wave',
    content: 'I haven\'t told anyone this, but I\'ve been crying every night for the past month. Everyone thinks I\'m fine because I laugh the loudest in every room.',
    postType: 'release',
    tags: ['depression', 'mask', 'lonely'],
    reactionCount: 4521,
    commentCount: 567,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '7',
    username: 'finding_myself',
    avatarIcon: 'star',
    content: 'After 3 years of numbness, I felt something today. It was just a sunset, but I actually stopped to look at it. Maybe this is the beginning.',
    postType: 'experience',
    tags: ['hope', 'healing', 'growth'],
    reactionCount: 2890,
    commentCount: 145,
    createdAt: new Date(Date.now() - 36 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
  {
    id: '8',
    username: 'unseen_stories',
    avatarIcon: 'feather',
    content: 'Sometimes the bravest thing you can do is admit you\'re not okay. Not to fix it, not to get sympathy — just to stop pretending.',
    postType: 'advice',
    tags: ['truth', 'authenticity', 'courage'],
    reactionCount: 3456,
    commentCount: 201,
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    hasReacted: false,
    hasSaved: false,
  },
];

export default function ForYouPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<TextReelData[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPostId, setReportPostId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  // Handle scroll to detect current post
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / viewportHeight);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < posts.length) {
        setCurrentIndex(newIndex);
      }
    };

    // Wheel handling for desktop
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;
      lastScrollTime.current = now;

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(posts.length - 1, currentIndex + direction));
      
      if (newIndex !== currentIndex) {
        container.scrollTo({
          top: newIndex * window.innerHeight,
          behavior: 'smooth',
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, posts.length]);

  const handleReact = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hasReacted: !post.hasReacted,
          reactionCount: post.hasReacted ? post.reactionCount - 1 : post.reactionCount + 1,
        };
      }
      return post;
    }));
    // TODO: Call API
  }, []);

  const handleSave = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, hasSaved: !post.hasSaved };
      }
      return post;
    }));
    // TODO: Call API
  }, []);

  const handleComment = useCallback((postId: string) => {
    setActivePostId(postId);
    setShowComments(true);
  }, []);

  const handleReport = useCallback((postId: string) => {
    setReportPostId(postId);
    setShowReportModal(true);
  }, []);

  const handleTabChange = (tab: 'foryou' | 'following') => {
    setActiveTab(tab);
    // TODO: Fetch different posts based on tab
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0f172a',
        zIndex: 1,
      }}
    >
      {/* Top Navigation */}
      <FeedNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Feed Container */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {posts.map((post) => (
          <TextReel
            key={post.id}
            post={post}
            onReact={handleReact}
            onComment={handleComment}
            onSave={handleSave}
            onReport={handleReport}
          />
        ))}
      </div>

      {/* Create Button */}
      <CreateButton />

      {/* Comment Sheet */}
      {showComments && activePostId && (
        <CommentSheet
          postId={activePostId}
          onClose={() => setShowComments(false)}
        />
      )}

      {/* Report Modal */}
      {showReportModal && reportPostId && (
        <ReportModal
          postId={reportPostId}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav currentPath="/foryou" />
    </div>
  );
}

// Report Modal Component
function ReportModal({ postId, onClose }: { postId: string; onClose: () => void }) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    'Harmful content',
    'Harassment or bullying',
    'Spam or misleading',
    'Self-harm or suicide',
    'Other',
  ];

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setIsSubmitting(true);
    
    try {
      // TODO: Call API
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitted(true);
      setTimeout(onClose, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '1.5rem',
          maxWidth: '400px',
          width: '100%',
        }}
        onClick={e => e.stopPropagation()}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <span style={{ fontSize: '3rem' }}>✓</span>
            <p style={{ color: '#fff', marginTop: '1rem' }}>Report submitted. Thank you.</p>
          </div>
        ) : (
          <>
            <h3 style={{ color: '#fff', margin: '0 0 1rem', fontSize: '1.25rem' }}>
              Report this post
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Why are you reporting this content?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {reasons.map(reason => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: selectedReason === reason ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: selectedReason === reason ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: selectedReason ? '#ef4444' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: selectedReason ? 'pointer' : 'not-allowed',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Bottom Navigation Component
function BottomNav({ currentPath }: { currentPath: string }) {
  const router = useRouter();

  const navItems = [
    { path: '/foryou', icon: '🏠', label: 'Home' },
    { path: '/explore', icon: '🔍', label: 'Explore' },
    { path: '/notifications', icon: '🔔', label: 'Inbox' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px',
            opacity: currentPath === item.path ? 1 : 0.6,
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
