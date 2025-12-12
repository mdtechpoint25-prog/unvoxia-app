'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { REPORT_REASONS } from '@/lib/constants';

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
  is_anonymous: boolean;
  users: { username: string };
}

interface FlaggedPost {
  id: string;
  post_id: string;
  reason: string;
  status: string;
  created_at: string;
  posts: { content: string; users: { username: string } };
  reporter: { username: string };
}

interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, comments: 0, messages: 0 });
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'flagged' | 'users'>('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setCategoryStats(data.categoryStats || {});
        setRecentPosts(data.recentPosts || []);
        setFlaggedPosts(data.flaggedPosts || []);
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Fetch admin stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFlagAction = async (flagId: string, action: 'dismiss' | 'action') => {
    try {
      const res = await fetch(`/api/admin/flagged/${flagId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        fetchStats();
      }
    } catch (err) {
      console.error('Flag action error:', err);
    }
  };

  const handleUserAction = async (userId: string, action: 'mute' | 'ban' | 'activate') => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action === 'activate' ? 'active' : action === 'mute' ? 'muted' : 'banned' })
      });
      if (res.ok) {
        fetchStats();
      }
    } catch (err) {
      console.error('User action error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const pendingFlags = flaggedPosts.filter(f => f.status === 'pending').length;

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#1a1a2e', margin: 0, fontWeight: 700 }}>Admin Dashboard</h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0' }}>
            Manage content, users, and platform moderation.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '1.5rem',
          background: '#fff',
          padding: '0.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '??' },
            { id: 'flagged', label: `Flagged Posts ${pendingFlags > 0 ? `(${pendingFlags})` : ''}`, icon: '??' },
            { id: 'users', label: 'Users', icon: '??' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' 
                  : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#4a5568',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '3rem',
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
            <p style={{ color: '#6b7280' }}>Loading...</p>
            <style jsx>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { label: 'Total Users', value: stats.users, color: '#1ABC9C', icon: '??' },
                    { label: 'Total Posts', value: stats.posts, color: '#FF6B35', icon: '??' },
                    { label: 'Comments', value: stats.comments, color: '#9B59B6', icon: '??' },
                    { label: 'Messages', value: stats.messages, color: '#4DA8DA', icon: '??' }
                  ].map((stat, i) => (
                    <div key={i} style={{
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                      borderRadius: '16px',
                      padding: '1.5rem',
                      color: '#fff'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                      <div style={{ opacity: 0.9 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Category Distribution */}
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #e5e7eb',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                    Posts by Category
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {Object.entries(categoryStats).map(([cat, count]) => (
                      <div key={cat} style={{
                        padding: '0.5rem 1rem',
                        background: '#f8f9fa',
                        border: '1px solid #e5e7eb',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ color: '#4a5568' }}>{cat}</span>
                        <span style={{ color: '#1ABC9C', marginLeft: '0.5rem', fontWeight: 600 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                    Recent Posts
                  </h3>
                  {recentPosts.length === 0 ? (
                    <p style={{ color: '#6b7280' }}>No posts yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {recentPosts.map((post) => (
                        <div key={post.id} style={{
                          padding: '1rem',
                          background: '#f8f9fa',
                          borderRadius: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                              <strong style={{ color: '#1a1a2e' }}>
                                {post.is_anonymous ? '?? Anonymous' : `@${post.users?.username || 'Unknown'}`}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{formatDate(post.created_at)}</span>
                            </div>
                            <p style={{ margin: 0, color: '#4a5568', fontSize: '0.9rem', lineHeight: 1.5 }}>
                              {post.content.length > 120 ? `${post.content.substring(0, 120)}...` : post.content}
                            </p>
                          </div>
                          <span style={{
                            padding: '0.35rem 0.75rem',
                            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap'
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

            {/* Flagged Posts Tab */}
            {activeTab === 'flagged' && (
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                  ?? Flagged Posts
                </h3>
                {flaggedPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>?</div>
                    <p style={{ color: '#6b7280' }}>No flagged posts. The community is behaving well!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {flaggedPosts.map((flag) => (
                      <div key={flag.id} style={{
                        padding: '1rem',
                        background: flag.status === 'pending' 
                          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%)'
                          : '#f8f9fa',
                        border: flag.status === 'pending' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid #e5e7eb',
                        borderRadius: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.5rem',
                            background: flag.status === 'pending' ? '#fef2f2' : '#f0fdf4',
                            color: flag.status === 'pending' ? '#dc2626' : '#16a34a',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {flag.status.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            {formatDate(flag.created_at)}
                          </span>
                        </div>
                        <p style={{ 
                          margin: '0.5rem 0', 
                          color: '#4a5568',
                          fontSize: '0.9rem',
                          padding: '0.75rem',
                          background: '#fff',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          {flag.posts?.content || 'Post content unavailable'}
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '0.75rem'
                        }}>
                          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                            <strong>Reason:</strong> {flag.reason}
                            <br />
                            <strong>Reported by:</strong> @{flag.reporter?.username || 'Unknown'}
                          </div>
                          {flag.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleFlagAction(flag.id, 'dismiss')}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: '#f5f5f5',
                                  color: '#4a5568',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem'
                                }}
                              >
                                Dismiss
                              </button>
                              <button
                                onClick={() => handleFlagAction(flag.id, 'action')}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  fontWeight: 600
                                }}
                              >
                                Take Action
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                  ?? User Management
                </h3>
                {users.length === 0 ? (
                  <p style={{ color: '#6b7280' }}>No users found.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>User</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Status</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Joined</th>
                          <th style={{ padding: '0.75rem', textAlign: 'right', color: '#4a5568', fontWeight: 600 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '0.75rem' }}>
                              <strong style={{ color: '#1a1a2e' }}>@{user.username}</strong>
                              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{user.email}</div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background: user.status === 'active' ? '#d1fae5' : user.status === 'muted' ? '#fef3c7' : '#fee2e2',
                                color: user.status === 'active' ? '#059669' : user.status === 'muted' ? '#d97706' : '#dc2626'
                              }}>
                                {user.status}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.85rem' }}>
                              {formatDate(user.created_at)}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                {user.status !== 'active' && (
                                  <button
                                    onClick={() => handleUserAction(user.id, 'activate')}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      background: '#d1fae5',
                                      color: '#059669',
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      fontSize: '0.8rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    Activate
                                  </button>
                                )}
                                {user.status !== 'muted' && (
                                  <button
                                    onClick={() => handleUserAction(user.id, 'mute')}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      background: '#fef3c7',
                                      color: '#d97706',
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      fontSize: '0.8rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    Mute
                                  </button>
                                )}
                                {user.status !== 'banned' && (
                                  <button
                                    onClick={() => handleUserAction(user.id, 'ban')}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      background: '#fee2e2',
                                      color: '#dc2626',
                                      border: 'none',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      fontSize: '0.8rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    Ban
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

