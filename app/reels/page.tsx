'use client';

import { useState, useEffect } from 'react';
import ReelCard from '@/components/ReelCard';

interface Reel {
  id: string;
  content: string;
  category: string;
  media_url: string;
  comments_count: number;
  users: {
    username: string;
  };
}

const sampleReels = [
  {
    id: 'reel-1',
    username: 'MindfulMoment',
    content: 'Taking time to breathe and reflect today. Small moments of peace make the biggest difference. ??',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Life',
    reactions: 156,
    comments: 23
  },
  {
    id: 'reel-2',
    username: 'HopefulHeart',
    content: 'Small steps lead to big changes. Every day is a new opportunity to grow. ?',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Support',
    reactions: 234,
    comments: 45
  },
  {
    id: 'reel-3',
    username: 'AuthenticSoul',
    content: 'Being real is the greatest gift you can give yourself. No filters, no masks. ??',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Thoughts',
    reactions: 189,
    comments: 32
  }
];

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch('/api/posts?category=all');
        const data = await res.json();
        if (res.ok) {
          // Filter posts that have video media
          const videoReels = data.posts.filter((p: any) => 
            p.media_url && (p.media_url.includes('.mp4') || p.media_url.includes('.mov') || p.media_url.includes('.webm'))
          );
          setReels(videoReels);
        }
      } catch (err) {
        console.error('Fetch reels error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const displayReels = reels.length > 0 ? reels.map((reel) => ({
    id: reel.id,
    username: reel.users?.username || 'Anonymous',
    content: reel.content,
    videoUrl: reel.media_url,
    category: reel.category || 'Life',
    likes: 0,
    comments: reel.comments_count || 0,
    shares: 0
  })) : sampleReels.map((reel) => ({
    ...reel,
    likes: reel.reactions,
    shares: 0
  }));

  return (
    <main style={{
      width: '100%',
      maxWidth: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50
    }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 1.5rem',
        background: 'linear-gradient(rgba(0,0,0,0.8), transparent)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a 
          href="/feed" 
          style={{ 
            color: '#fff', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </a>
        <h2 style={{ 
          color: '#fff', 
          margin: 0, 
          fontSize: '1.1rem',
          fontWeight: 600
        }}>
          Reels
        </h2>
        <div style={{ width: '60px' }}></div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.2)',
            borderTopColor: '#1ABC9C',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '1rem', color: '#888' }}>Loading reels...</p>
          <style jsx>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      ) : (
        /* Snap Scroll Container */
        <div style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth'
        }}>
          {displayReels.map((reel) => (
            <ReelCard key={reel.id} {...reel} />
          ))}
          
          {/* End Message */}
          <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            scrollSnapAlign: 'start',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 100%)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>?</div>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>You're all caught up!</h3>
            <p style={{ color: '#888', marginTop: '0.5rem' }}>Come back later for more authentic content</p>
            <a 
              href="/feed"
              style={{
                marginTop: '1.5rem',
                padding: '0.875rem 2rem',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                color: '#fff',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Back to Feed
            </a>
          </div>
        </div>
      )}
    </main>
  );
}