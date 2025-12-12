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
    content: 'Taking time to breathe and reflect today.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Reflection',
    reactions: 156,
    comments: 23
  },
  {
    id: 'reel-2',
    username: 'HopefulHeart',
    content: 'Small steps lead to big changes.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Motivation',
    reactions: 234,
    comments: 45
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

  return (
    <main style={{
      maxWidth: '450px',
      margin: '0 auto',
      padding: '1rem',
      minHeight: '100vh',
      background: '#1a1a1a'
    }}>
      <h2 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>
        Reels
      </h2>
      
      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading reels...</p>
      ) : reels.length === 0 ? (
        <div>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
            No video reels yet. Here are some samples:
          </p>
          {sampleReels.map((reel) => (
            <ReelCard key={reel.id} {...reel} />
          ))}
        </div>
      ) : (
        reels.map((reel) => (
          <ReelCard
            key={reel.id}
            id={reel.id}
            username={reel.users?.username || 'Anonymous'}
            content={reel.content}
            videoUrl={reel.media_url}
            category={reel.category || 'Reflection'}
            reactions={0}
            comments={reel.comments_count || 0}
          />
        ))
      )}
    </main>
  );
}