'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// SVG Icons
const ShieldIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

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
  role?: string;
  status: string;
  created_at: string;
}

interface Prompt {
  id: string;
  prompt: string;
  created_at: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, comments: 0, messages: 0 });
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'flagged' | 'users' | 'prompts'>('overview');
  const [newPrompt, setNewPrompt] = useState('');
  const [editingPrompt, setEditingPrompt] = useState<string | null>(null);
  const [editPromptText, setEditPromptText] = useState('');

  useEffect(() => {
    fetchStats();
    fetchPrompts();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      
      if (res.status === 403 || res.status === 401) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
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

  const fetchPrompts = async () => {
    try {
      const res = await fetch('/api/admin/prompts');
      const data = await res.json();
      if (res.ok) {
        setPrompts(data.prompts || []);
      }
    } catch (err) {
      console.error('Fetch prompts error:', err);
    }
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim()) return;
    try {
      const res = await fetch('/api/admin/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: newPrompt })
      });
      if (res.ok) {
        setNewPrompt('');
        fetchPrompts();
      }
    } catch (err) {
      console.error('Add prompt error:', err);
    }
  };

  const handleUpdatePrompt = async (id: string) => {
    if (!editPromptText.trim()) return;
    try {
      const res = await fetch(`/api/admin/prompts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: editPromptText })
      });
      if (res.ok) {
        setEditingPrompt(null);
        setEditPromptText('');
        fetchPrompts();
      }
    } catch (err) {
      console.error('Update prompt error:', err);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prompt?')) return;
    try {
      const res = await fetch(`/api/admin/prompts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPrompts();
      }
    } catch (err) {
      console.error('Delete prompt error:', err);
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

  // Access Denied Screen
  if (accessDenied) {
    return (
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <ShieldIcon />
          </div>
          <h1 style={{ color: '#1a1a2e', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Access Denied
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            You don't have permission to access the admin dashboard. 
            This area is restricted to administrators only.
          </p>
          <Link 
            href="/feed"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Go to Feed
          </Link>
        </div>
      </main>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTopColor: '#1ABC9C',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#6b7280' }}>Loading admin dashboard...</p>
          <style jsx>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </main>
    );
  }

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
          border: '1px solid #e5e7eb',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: 'Chart' },
            { id: 'flagged', label: `Flagged ${pendingFlags > 0 ? `(${pendingFlags})` : ''}`, icon: 'Flag' },
            { id: 'users', label: 'Users', icon: 'Users' },
            { id: 'prompts', label: 'Prompts', icon: 'Edit' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                minWidth: '100px',
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
                    { label: 'Total Users', value: stats.users, color: '#1ABC9C' },
                    { label: 'Total Posts', value: stats.posts, color: '#FF6B35' },
                    { label: 'Comments', value: stats.comments, color: '#9B59B6' },
                    { label: 'Messages', value: stats.messages, color: '#4DA8DA' }
                  ].map((stat, i) => (
                    <div key={i} style={{
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                      borderRadius: '16px',
                      padding: '1.5rem',
                      color: '#fff'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                      <div style={{ opacity: 0.9 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Category Stats */}
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '1.5rem',
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
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                    Recent Posts
                  </h3>
                  {recentPosts.length === 0 ? (
                    <p style={{ color: '#6b7280' }}>No posts yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {recentPosts.slice(0, 5).map((post) => (
                        <div key={post.id} style={{
                          padding: '1rem',
                          background: '#f8f9fa',
                          borderRadius: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#1a1a2e' }}>
                              {post.is_anonymous ? 'Anonymous' : `@${post.users?.username || 'Unknown'}`}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{formatDate(post.created_at)}</span>
                          </div>
                          <p style={{ margin: 0, color: '#4a5568', fontSize: '0.9rem' }}>
                            {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                          </p>
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
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                  Flagged Posts
                </h3>
                {flaggedPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: '#6b7280' }}>No flagged posts. Community is behaving well!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {flaggedPosts.map((flag) => (
                      <div key={flag.id} style={{
                        padding: '1rem',
                        background: flag.status === 'pending' ? '#fef2f2' : '#f8f9fa',
                        border: flag.status === 'pending' ? '1px solid #fecaca' : '1px solid #e5e7eb',
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
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{formatDate(flag.created_at)}</span>
                        </div>
                        <p style={{ margin: '0.5rem 0', color: '#4a5568', fontSize: '0.9rem' }}>
                          {flag.posts?.content || 'Post content unavailable'}
                        </p>
                        <p style={{ margin: '0.5rem 0', color: '#6b7280', fontSize: '0.85rem' }}>
                          <strong>Reason:</strong> {flag.reason}
                        </p>
                        {flag.status === 'pending' && (
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                            <button
                              onClick={() => handleFlagAction(flag.id, 'dismiss')}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#f5f5f5',
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
                                background: '#dc2626',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600
                              }}
                            >
                              Remove Post
                            </button>
                          </div>
                        )}
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
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                  User Management
                </h3>
                {users.length === 0 ? (
                  <p style={{ color: '#6b7280' }}>No users found.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568' }}>User</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568' }}>Status</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568' }}>Joined</th>
                          <th style={{ padding: '0.75rem', textAlign: 'right', color: '#4a5568' }}>Actions</th>
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
                                  <button onClick={() => handleUserAction(user.id, 'activate')} style={{
                                    padding: '0.35rem 0.75rem', background: '#d1fae5', color: '#059669',
                                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
                                  }}>Activate</button>
                                )}
                                {user.status !== 'muted' && (
                                  <button onClick={() => handleUserAction(user.id, 'mute')} style={{
                                    padding: '0.35rem 0.75rem', background: '#fef3c7', color: '#d97706',
                                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
                                  }}>Mute</button>
                                )}
                                {user.status !== 'banned' && (
                                  <button onClick={() => handleUserAction(user.id, 'ban')} style={{
                                    padding: '0.35rem 0.75rem', background: '#fee2e2', color: '#dc2626',
                                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
                                  }}>Ban</button>
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

            {/* Prompts Tab */}
            {activeTab === 'prompts' && (
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
                  Daily Prompts Management
                </h3>
                
                {/* Add New Prompt */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '12px' }}>
                  <h4 style={{ color: '#4a5568', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Add New Prompt</h4>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Enter a new daily prompt..."
                      value={newPrompt}
                      onChange={(e) => setNewPrompt(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '0.95rem'
                      }}
                    />
                    <button
                      onClick={handleAddPrompt}
                      disabled={!newPrompt.trim()}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: newPrompt.trim() ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' : '#e5e7eb',
                        color: newPrompt.trim() ? '#fff' : '#9ca3af',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: newPrompt.trim() ? 'pointer' : 'not-allowed',
                        fontWeight: 600
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Prompts List */}
                {prompts.length === 0 ? (
                  <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                    No prompts yet. Add your first daily prompt above.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {prompts.map((prompt) => (
                      <div key={prompt.id} style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                      }}>
                        {editingPrompt === prompt.id ? (
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                              type="text"
                              value={editPromptText}
                              onChange={(e) => setEditPromptText(e.target.value)}
                              style={{
                                flex: 1,
                                padding: '0.5rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px'
                              }}
                            />
                            <button
                              onClick={() => handleUpdatePrompt(prompt.id)}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#1ABC9C',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingPrompt(null); setEditPromptText(''); }}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#f5f5f5',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ margin: 0, color: '#4a5568', flex: 1 }}>{prompt.prompt}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                              <button
                                onClick={() => { setEditingPrompt(prompt.id); setEditPromptText(prompt.prompt); }}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  background: '#e0f2fe',
                                  color: '#0284c7',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem'
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePrompt(prompt.id)}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  background: '#fee2e2',
                                  color: '#dc2626',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem'
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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

