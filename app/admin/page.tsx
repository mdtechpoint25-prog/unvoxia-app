'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  users: number;
  posts: number;
  comments: number;
  messages: number;
}

interface RecentPost {
  id: string;
  content: string;
  category: string;
  created_at: string;
  users: { username: string };
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, comments: 0, messages: 0 });
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats);
          setCategoryStats(data.categoryStats || {});
          setRecentPosts(data.recentPosts || []);
        }
      } catch (err) {
        console.error('Fetch admin stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Admin Dashboard</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Manage content, users, and platform settings.
      </p>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading stats...</p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: '#1ABC9C',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats.users}</div>
              <div>Total Users</div>
            </div>
            <div style={{
              background: '#FF6B35',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats.posts}</div>
              <div>Total Posts</div>
            </div>
            <div style={{
              background: '#9B59B6',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats.comments}</div>
              <div>Comments</div>
            </div>
            <div style={{
              background: '#4DA8DA',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats.messages}</div>
              <div>Messages</div>
            </div>
          </div>

          {/* Category Distribution */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Posts by Category</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.entries(categoryStats).map(([cat, count]) => (
                <div key={cat} style={{
                  padding: '0.5rem 1rem',
                  background: '#f5f5f5',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: '#2C3E50' }}>{cat}</span>
                  <span style={{ color: '#1ABC9C', marginLeft: '0.5rem', fontWeight: 600 }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Recent Posts</h3>
            {recentPosts.length === 0 ? (
              <p style={{ color: '#888' }}>No posts yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentPosts.map((post) => (
                  <div key={post.id} style={{
                    padding: '0.75rem',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <strong style={{ color: '#2C3E50' }}>@{post.users?.username || 'Anonymous'}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#888' }}>{formatDate(post.created_at)}</span>
                      </div>
                      <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
                        {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#1ABC9C',
                      color: '#fff',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      {post.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <div style={{
        background: '#f5f5f5',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>???</div>
        <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Moderation Tools</h3>
        <p style={{ color: '#888', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          AI-powered content moderation coming soon.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '300px',
          margin: '0 auto',
          textAlign: 'left',
          color: '#2C3E50'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#1ABC9C' }}>&#10003;</span> View platform stats
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#1ABC9C' }}>&#10003;</span> Monitor recent posts
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Flag/remove content
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Manage user badges
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: '#2C3E50',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
