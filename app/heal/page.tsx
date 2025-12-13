'use client';

import { useState, useEffect } from 'react';
import { MOODS } from '@/lib/compassionate-responses';

type Post = {
  id: number;
  content: string;
  category: string;
  created_at: string;
  response?: string;
};

export default function HealPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/heal');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (category: string) => {
    const mood = MOODS.find(m => m.value === category);
    return mood?.emoji || '💭';
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(p => p.category === filter);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '6rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '0.75rem'
          }}>
            Stories of Healing
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#7a8a9a',
            maxWidth: '600px',
            margin: '0 auto 1rem',
            lineHeight: 1.6
          }}>
            Anonymous voices finding support and compassion. You are not alone.
          </p>

          {/* Disclaimer */}
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '12px',
            padding: '1rem',
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#856404',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '1.5rem auto 0'
          }}>
            <strong>Disclaimer:</strong> NOMA provides emotional support and peer connection. 
            It does not replace professional medical or mental health services.
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '50px',
              border: filter === 'all' ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
              background: filter === 'all' ? 'rgba(26, 188, 156, 0.1)' : '#fff',
              color: filter === 'all' ? '#1ABC9C' : '#6b7280',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            All Stories
          </button>
          {MOODS.map(mood => (
            <button
              key={mood.value}
              onClick={() => setFilter(mood.value)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '50px',
                border: filter === mood.value ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
                background: filter === mood.value ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                color: filter === mood.value ? '#1ABC9C' : '#6b7280',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem'
              }}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: '#9ca3af'
          }}>
            Loading stories...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              No stories yet. Be the first to share.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>
                      {getMoodEmoji(post.category)}
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#1ABC9C',
                      textTransform: 'capitalize'
                    }}>
                      Anonymous
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#9ca3af'
                  }}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Content */}
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#2C3E50',
                  marginBottom: '1.5rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {post.content}
                </p>

                {/* Compassionate Response */}
                {post.response && (
                  <div style={{
                    padding: '1.25rem',
                    background: 'rgba(26, 188, 156, 0.05)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #1ABC9C'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '1.25rem',
                        flexShrink: 0
                      }}>
                        💚
                      </span>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#5a6c7d',
                        lineHeight: 1.6,
                        margin: 0,
                        fontStyle: 'italic'
                      }}>
                        {post.response}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
