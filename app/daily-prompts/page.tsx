'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@/components/PromptCard';
import PostCard from '@/components/PostCard';
import ReflectionCalendar from '@/components/ReflectionCalendar';

const DAILY_PROMPTS = [
  'What is one fear you would like to release today?',
  'List three things that brought you joy this week.',
  'What small goal can you set for yourself today?',
  'Write a message of hope to someone who might be struggling.',
  'What are you grateful for right now?',
  'Describe a moment when you felt proud of yourself.',
  'What would you tell your younger self?',
  'What is one thing you learned about yourself recently?',
  'What does self-care mean to you?',
  'Write about a time you overcame a challenge.',
  'What gives you hope for the future?',
  'What is something you need to forgive yourself for?',
  'Who has had a positive impact on your life?',
  'What would make today a good day?'
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
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Get today's prompt based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const promptIndex = dayOfYear % DAILY_PROMPTS.length;
    setTodayPrompt(DAILY_PROMPTS[promptIndex]);

    // Fetch responses (posts with Daily Tips category)
    const fetchResponses = async () => {
      try {
        const res = await fetch('/api/posts?category=Daily%20Tips&limit=50');
        const data = await res.json();
        if (res.ok) {
          setResponses(data.posts);
          // Extract unique dates from responses for calendar
          const dates = data.posts.map((p: Post) => 
            new Date(p.created_at).toISOString().split('T')[0]
          );
          setCompletedDays([...new Set(dates)] as string[]);
        }
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
        const res = await fetch('/api/posts?category=Daily%20Tips&limit=50');
        const data = await res.json();
        if (res.ok) {
          setResponses(data.posts);
          const dates = data.posts.map((p: Post) => 
            new Date(p.created_at).toISOString().split('T')[0]
          );
          setCompletedDays([...new Set(dates)] as string[]);
        }
      } catch (err) {
        console.error('Refresh error:', err);
      }
    }, 1000);
  };

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h2 style={{ color: '#2C3E50', margin: 0 }}>Daily Reflection</h2>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            background: showCalendar ? '#1ABC9C' : '#f5f5f5',
            color: showCalendar ? '#fff' : '#2C3E50',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ?? {showCalendar ? 'Hide Calendar' : 'View Calendar'}
        </button>
      </div>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        Take a moment to reflect and share your thoughts anonymously.
      </p>

      {showCalendar && <ReflectionCalendar completedDays={completedDays} />}

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