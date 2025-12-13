'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCircleById, getRandomAnonymousLabel, SUPPORT_REACTIONS } from '@/lib/healing-circles';

type Post = {
  id: number;
  content: string;
  anonymous_label: string;
  created_at: string;
  support_reactions: any[];
  comments_count: number;
};

// Metadata will be generated dynamically via page title updates
export default function CirclePage() {
  const params = useParams();
  const router = useRouter();
  const circleId = params?.circleId as string;
  const circle = getCircleById(circleId);

  // Update page title for SEO
  useEffect(() => {
    if (circle) {
      document.title = `${circle.name} – Anonymous Support Circle | NOMA`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Join the ${circle.name} healing circle. Share experiences and find anonymous support. ${circle.description}`);
      }
    }
  }, [circle]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareForm, setShowShareForm] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'experience' | 'advice' | 'release'>('experience');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!circle) return;
    fetchPosts();
  }, [circle]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/circles/${circleId}/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newPost.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/circles/${circleId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPost.trim(),
          post_type: postType,
          anonymous_label: getRandomAnonymousLabel()
        })
      });

      if (res.ok) {
        setNewPost('');
        setShowShareForm(false);
        fetchPosts();
      }
    } catch (error) {
      alert('Failed to post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!circle) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Circle not found</h2>
          <button
            onClick={() => router.push('/circles')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#1ABC9C',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Back to Circles
          </button>
        </div>
      </main>
    );
  }

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
        {/* Circle Header */}
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          borderLeft: `4px solid ${circle.color}`
        }}>
          <button
            onClick={() => router.push('/circles')}
            style={{
              background: 'none',
              border: 'none',
              color: '#7a8a9a',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all circles
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '3rem' }}>{circle.emoji}</span>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: '#2C3E50',
              margin: 0
            }}>
              {circle.name}
            </h1>
          </div>
          
          <p style={{
            fontSize: '1rem',
            color: '#7a8a9a',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            {circle.description}
          </p>

          <button
            onClick={() => setShowShareForm(!showShareForm)}
            style={{
              padding: '0.875rem 2rem',
              background: `linear-gradient(135deg, ${circle.color} 0%, ${circle.color}dd 100%)`,
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: `0 4px 16px ${circle.color}40`
            }}
          >
            {showShareForm ? '✕ Cancel' : '+ Share in this Circle'}
          </button>
        </div>

        {/* Share Form */}
        {showShareForm && (
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#2C3E50',
              marginBottom: '1rem'
            }}>
              Share Your Story
            </h3>

            {/* Post Type Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#5a6c7d',
                marginBottom: '0.75rem'
              }}>
                What would you like to share?
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem'
              }}>
                {[
                  { value: 'experience', label: 'Share Experience', emoji: '💭' },
                  { value: 'advice', label: 'Seek Advice', emoji: '🙋' },
                  { value: 'release', label: 'Just Release', emoji: '🌊' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPostType(type.value as any)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: postType === type.value ? `2px solid ${circle.color}` : '2px solid #e5e7eb',
                      background: postType === type.value ? `${circle.color}15` : '#fff',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: postType === type.value ? circle.color : '#6b7280',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{type.emoji}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={
                postType === 'experience' 
                  ? 'Share your experience... You are completely anonymous.'
                  : postType === 'advice'
                  ? 'What do you need advice on? Others will support you.'
                  : 'Release what you need to let out. Comments will be limited to support only.'
              }
              maxLength={1500}
              rows={8}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#2C3E50',
                resize: 'vertical',
                fontFamily: 'inherit',
                marginBottom: '1rem'
              }}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
                {1500 - newPost.length} characters remaining
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!newPost.trim() || submitting}
              style={{
                width: '100%',
                padding: '1rem',
                background: !newPost.trim() || submitting ? '#d1d5db' : circle.color,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: !newPost.trim() || submitting ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {submitting ? 'Posting...' : 'Post Anonymously'}
            </button>
          </div>
        )}

        {/* Posts Feed */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
            Loading voices...
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{circle.emoji}</div>
            <h3 style={{ fontSize: '1.25rem', color: '#2C3E50', marginBottom: '0.5rem' }}>
              Be the first voice
            </h3>
            <p style={{ fontSize: '1rem', color: '#7a8a9a' }}>
              Share your story and start the healing conversation.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {posts.map((post) => (
              <article
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontWeight: 600,
                    color: circle.color,
                    fontSize: '0.95rem'
                  }}>
                    {post.anonymous_label}
                  </span>
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

                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#2C3E50',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '1.25rem'
                }}>
                  {post.content}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  {SUPPORT_REACTIONS.slice(0, 3).map((reaction) => (
                    <button
                      key={reaction.value}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(26, 188, 156, 0.05)',
                        border: '1px solid rgba(26, 188, 156, 0.2)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: '#1ABC9C',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.label}</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
