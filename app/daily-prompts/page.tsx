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
  const [streakCount, setStreakCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get today's prompt based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const promptIndex = dayOfYear % DAILY_PROMPTS.length;
    setTodayPrompt(DAILY_PROMPTS[promptIndex]);

    // Get current user
    try {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
      if (sessionCookie) {
        const session = JSON.parse(atob(sessionCookie.split('=')[1]));
        setCurrentUserId(session.userId);
      }
    } catch {}

    // Fetch responses (posts with Feelings category)
    const fetchResponses = async () => {
      try {
        const res = await fetch('/api/posts?category=Feelings&limit=50');
        const data = await res.json();
        if (res.ok) {
          setResponses(data.posts);
          // Extract unique dates from responses for calendar
          const dates = data.posts.map((p: Post) => 
            new Date(p.created_at).toISOString().split('T')[0]
          );
          setCompletedDays([...new Set(dates)] as string[]);
          // Calculate streak (simplified - consecutive days ending today)
          calculateStreak([...new Set(dates)] as string[]);
        }
      } catch (err) {
        console.error('Fetch responses error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const calculateStreak = (dates: string[]) => {
    if (dates.length === 0) {
      setStreakCount(0);
      return;
    }

    const sortedDates = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if latest entry is today or yesterday
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
      setStreakCount(0);
      return;
    }

    let streak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const next = new Date(sortedDates[i + 1]);
      const diff = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
    setStreakCount(streak);
  };

  const handleRespond = () => {
    // Refresh responses after submitting
    setTimeout(async () => {
      try {
        const res = await fetch('/api/posts?category=Feelings&limit=50');
        const data = await res.json();
        if (res.ok) {
          setResponses(data.posts);
          const dates = data.posts.map((p: Post) => 
            new Date(p.created_at).toISOString().split('T')[0]
          );
          setCompletedDays([...new Set(dates)] as string[]);
          calculateStreak([...new Set(dates)] as string[]);
        }
      } catch (err) {
        console.error('Refresh error:', err);
      }
    }, 1000);
  };

  const getStreakBadge = () => {
    if (streakCount >= 30) return { icon: '?', label: 'Month Streak!', color: '#FFD700' };
    if (streakCount >= 7) return { icon: '??', label: 'Week Streak!', color: '#FF6B35' };
    if (streakCount >= 3) return { icon: '?', label: 'Building Momentum', color: '#9B59B6' };
    if (streakCount >= 1) return { icon: '??', label: 'Started!', color: '#1ABC9C' };
    return null;
  };

  const badge = getStreakBadge();

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header with Streak Badge */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '0.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ 
              color: '#1a1a2e', 
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: 700
            }}>
              Daily Reflection
            </h2>
            <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>
              Take a moment to reflect and share your authentic thoughts.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Streak Badge */}
            {badge && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: `linear-gradient(135deg, ${badge.color}20 0%, ${badge.color}10 100%)`,
                border: `1px solid ${badge.color}40`,
                borderRadius: '20px'
              }}>
                <span style={{ fontSize: '1.25rem' }}>{badge.icon}</span>
                <div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: badge.color,
                    lineHeight: 1
                  }}>
                    {streakCount}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>
                    {badge.label}
                  </div>
                </div>
              </div>
            )}
            
            {/* Calendar Toggle */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              style={{
                background: showCalendar 
                  ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' 
                  : '#f5f5f5',
                color: showCalendar ? '#fff' : '#4a5568',
                border: showCalendar ? 'none' : '1px solid #e2e8f0',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 500
              }}
            >
              ?? {showCalendar ? 'Hide' : 'Calendar'}
            </button>
          </div>
        </div>

        {/* Calendar */}
        {showCalendar && (
          <div style={{ marginBottom: '1.5rem' }}>
            <ReflectionCalendar completedDays={completedDays} />
          </div>
        )}

        {/* Today's Prompt */}
        <PromptCard prompt={todayPrompt} onRespond={handleRespond} />

        {/* Community Reflections */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          marginTop: '2rem', 
          marginBottom: '1rem' 
        }}>
          <h3 style={{ color: '#1a1a2e', margin: 0, fontWeight: 600 }}>
            Community Reflections
          </h3>
          <span style={{
            padding: '0.25rem 0.75rem',
            background: '#f0f9ff',
            color: '#1ABC9C',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: 500
          }}>
            {responses.length} shared
          </span>
        </div>

        {loading ? (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid #e5e7eb',
              borderTopColor: '#1ABC9C',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#6b7280' }}>Loading reflections...</p>
            <style jsx>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : responses.length === 0 ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>??</div>
            <p style={{ color: '#6b7280' }}>No reflections yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {responses.map((post) => (
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
                currentUserId={currentUserId || undefined}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}