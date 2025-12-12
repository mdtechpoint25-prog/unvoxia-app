'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@/components/PromptCard';
import PostCard from '@/components/PostCard';

const DAILY_PROMPTS = [
  'What is one fear you would like to release today?',
  'List three things that brought you joy this week.',
  'What small goal can you set for yourself today?',
  'Write a message of hope to someone who might be struggling.',
  'What are you grateful for right now?',
  'Describe a moment when you felt proud of yourself.',
  'What would you tell your younger self?'
];

interface Post {
  id: string;
  content: string;
  category: string;
  created_at: string;
  comments_count: number;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

export default function DailyPromptsPage() {
  const [todayPrompt, setTodayPrompt] = useState('');
  const [responses, setResponses] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get today's prompt based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const promptIndex = dayOfYear % DAILY_PROMPTS.length;
    setTodayPrompt(DAILY_PROMPTS[promptIndex]);

    // Fetch responses (posts with Daily Tips category)
    const fetchResponses = async () => {
      try {
        const res = await fetch('/api/posts?category=Daily%20Tips');
        const data = await res.json();
        if (res.ok) setResponses(data.posts);
      } catch (err) {
        console.error('Fetch responses error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleRespond = () => {
    // Refresh responses after submitting
    setTimeout(async () => {
      try {
        const res = await fetch('/api/posts?category=Daily%20Tips');
        const data = await res.json();
        if (res.ok) setResponses(data.posts);
      } catch (err) {
        console.error('Refresh error:', err);
      }
    }, 1000);
  };

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Daily Reflection</h2>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        Take a moment to reflect and share your thoughts anonymously.
      </p>

      <PromptCard prompt={todayPrompt} onRespond={handleRespond} />

      <h3 style={{ color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
        Community Reflections
      </h3>

      {loading ? (
        <p style={{ color: '#888' }}>Loading reflections...</p>
      ) : responses.length === 0 ? (
        <p style={{ color: '#888' }}>No reflections yet. Be the first to share!</p>
      ) : (
        responses.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.users?.username || 'Anonymous'}
            avatar={post.users?.avatar_url}
            timestamp={post.created_at}
            category={post.category}
            content={post.content}
            commentsCount={post.comments_count || 0}
            initialReactions={[]}
            interactive={true}
          />
        ))
      )}
    </main>
  );
}