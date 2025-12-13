'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  users: number;
  posts: number;
  comments: number;
  messages: number;
}

interface Analytics {
  growth: {
    newUsers: number;
    newPosts: number;
    newMessages: number;
    activeUsers: number;
  };
  engagement: {
    avgPostsPerUser: number;
    avgReactionsPerPost: number;
  };
  content: {
    categoryBreakdown: { category: string; count: number }[];
    anonymous: number;
    public: number;
  };
  moderation: {
    pending: number;
    resolved: number;
  };
}

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  status: string;
  created_at: string;
  post_count?: number;
  message_count?: number;
  flagged_content_count?: number;
}

interface Content {
  id: string;
  content: string;
  created_at: string;
  username: string;
  category?: string;
  reaction_count?: number;
  comment_count?: number;
  flag_count?: number;
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

interface Prompt {
  id: string;
  prompt: string;
  created_at: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, comments: 0, messages: 0 });
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'moderation' | 'communications' | 'prompts'>('dashboard');
  const [contentType, setContentType] = useState<'posts' | 'comments'>('posts');
  const [userSearch, setUserSearch] = useState('');
  const [contentSearch, setContentSearch] = useState('');
  
  const [newPrompt, setNewPrompt] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [warningForm, setWarningForm] = useState({ reason: '', severity: 'mild', message: '' });
  const [commForm, setCommForm] = useState({ type: 'all', subject: '', message: '', recipients: [] });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [statsRes, analyticsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/analytics'),
        fetch('/api/admin/users/bulk?limit=100')
      ]);
      
      if (statsRes.status === 403 || statsRes.status === 401) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
        setFlaggedPosts(statsData.flaggedPosts || []);
      }
      
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
      
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }

      fetchPrompts();
    } catch (err) {
      console.error('Fetch error:', err);
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

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/admin/content?type=${contentType}&search=${contentSearch}`);
      const data = await res.json();
      if (res.ok) {
        setContent(data.data || []);
      }
    } catch (err) {
      console.error('Fetch content error:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'content') {
      fetchContent();
    }
  }, [activeTab, contentType, contentSearch]);

  const handleUserAction = async (userId: string, action: 'activate' | 'muted' | 'banned' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to DELETE this user? This cannot be undone!')) {
      return;
    }
    
    try {
      const method = action === 'delete' ? 'DELETE' : 'PATCH';
      const body = action === 'delete' ? undefined : JSON.stringify({ status: action });
      
      const res = await fetch(`/api/admin/users/${userId}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });
      
      if (res.ok) {
        fetchInitialData();
      }
    } catch (err) {
      console.error('User action error:', err);
    }
  };

  const handleDeleteContent = async (id: string, type: 'post' | 'comment') => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const res = await fetch('/api/admin/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type })
      });
      
      if (res.ok) {
        fetchContent();
      }
    } catch (err) {
      console.error('Delete content error:', err);
    }
  };

  const handleSendWarning = async () => {
    if (!selectedUser || !warningForm.reason) return;
    
    setSending(true);
    try {
      const res = await fetch('/api/admin/warnings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.id,
          ...warningForm
        })
      });
      
      if (res.ok) {
        alert('Warning sent successfully!');
        setSelectedUser(null);
        setWarningForm({ reason: '', severity: 'mild', message: '' });
      }
    } catch (err) {
      console.error('Send warning error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleSendCommunication = async () => {
    if (!commForm.subject || !commForm.message) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!confirm(`Send "${commForm.subject}" to ${commForm.type} users?`)) return;
    
    setSending(true);
    try {
      const res = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commForm)
      });
      
      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        setCommForm({ type: 'all', subject: '', message: '', recipients: [] });
      }
    } catch (err) {
      console.error('Send communication error:', err);
    } finally {
      setSending(false);
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

  const handleDeletePrompt = async (id: string) => {
    if (!confirm('Delete this prompt?')) return;
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
        fetchInitialData();
      }
    } catch (err) {
      console.error('Flag action error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

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
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>��️</div>
          <h1 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Access Denied</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            You need administrator privileges to access this page.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ color: '#666' }}>Loading admin panel...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fa', padding: '0' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        padding: '1.5rem 2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>
              🛡️ Admin Dashboard
            </h1>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
              NOMA Platform Management
            </p>
          </div>
          <Link href="/" style={{
            padding: '0.5rem 1.5rem',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            ← Back to Site
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '0.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          overflow: 'auto'
        }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'users', label: '👥 Users' },
            { id: 'content', label: '📝 Content' },
            { id: 'moderation', label: '🚨 Moderation' },
            { id: 'communications', label: '📧 Communications' },
            { id: 'prompts', label: '✨ Prompts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#666',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { label: 'Total Users', value: stats.users, icon: '👥', color: '#3498db' },
                { label: 'Total Posts', value: stats.posts, icon: '📝', color: '#2ecc71' },
                { label: 'Total Comments', value: stats.comments, icon: '💬', color: '#9b59b6' },
                { label: 'Total Messages', value: stats.messages, icon: '✉️', color: '#e67e22' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  borderLeft: `4px solid ${stat.color}`
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.25rem' }}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {analytics && (
              <>
                <div style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                    📈 Growth Metrics (Last 30 Days)
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>New Users</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#3498db' }}>
                        +{analytics.growth.newUsers}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>New Posts</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2ecc71' }}>
                        +{analytics.growth.newPosts}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Active Users (7d)</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#9b59b6' }}>
                        {analytics.growth.activeUsers}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Avg Posts/User</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#e67e22' }}>
                        {analytics.engagement.avgPostsPerUser}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                    📊 Content Distribution
                  </h2>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {analytics.content.categoryBreakdown.map((cat: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, color: '#666', fontWeight: 500 }}>{cat.category}</div>
                        <div style={{ flex: 3, background: '#f5f7fa', borderRadius: '8px', height: '24px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                            width: `${(cat.count / stats.posts) * 100}%`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: '0.5rem',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            minWidth: '30px'
                          }}>
                            {cat.count}
                          </div>
                        </div>
                        <div style={{ width: '60px', textAlign: 'right', color: '#666', fontSize: '0.85rem' }}>
                          {Math.round((cat.count / stats.posts) * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ color: '#1a1a2e', fontSize: '1.25rem', margin: 0 }}>
                  👥 User Management ({users.length})
                </h2>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    width: '300px',
                    maxWidth: '100%'
                  }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f5f7fa', textAlign: 'left' }}>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>User</th>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>Email</th>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>Activity</th>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>Joined</th>
                      <th style={{ padding: '1rem', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(u => 
                        userSearch === '' || 
                        u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase())
                      )
                      .slice(0, 50)
                      .map((user) => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f5f7fa' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600, color: '#1a1a2e' }}>@{user.username}</div>
                            {user.role === 'admin' && (
                              <span style={{
                                fontSize: '0.75rem',
                                background: '#ffd700',
                                color: '#000',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '4px',
                                fontWeight: 600
                              }}>ADMIN</span>
                            )}
                          </td>
                          <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>{user.email}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              background: user.status === 'active' ? '#d1f4e0' : user.status === 'muted' ? '#fff3cd' : '#f8d7da',
                              color: user.status === 'active' ? '#0f5132' : user.status === 'muted' ? '#664d03' : '#721c24'
                            }}>
                              {user.status}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>
                            {user.post_count || 0} posts • {user.message_count || 0} msgs
                            {(user.flagged_content_count || 0) > 0 && (
                              <span style={{ color: '#e74c3c', marginLeft: '0.5rem' }}>
                                🚨 {user.flagged_content_count}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>
                            {formatDate(user.created_at)}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => setSelectedUser(user)}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  background: '#fff3cd',
                                  color: '#664d03',
                                  border: '1px solid #ffc107',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  fontWeight: 500
                                }}
                              >
                                ⚠️ Warn
                              </button>
                              {user.status !== 'muted' && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'muted')}
                                  style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#f8d7da',
                                    color: '#721c24',
                                    border: '1px solid #f5c6cb',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 500
                                  }}
                                >
                                  🔇 Mute
                                </button>
                              )}
                              {user.status !== 'banned' && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'banned')}
                                  style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 500
                                  }}
                                >
                                  🚫 Ban
                                </button>
                              )}
                              {user.status !== 'active' && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'activate')}
                                  style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#d1f4e0',
                                    color: '#0f5132',
                                    border: '1px solid #a3cfbb',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 500
                                  }}
                                >
                                  ✅ Activate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedUser && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem'
              }}>
                <div style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: '12px',
                  maxWidth: '500px',
                  width: '100%',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ color: '#1a1a2e', marginBottom: '1.5rem' }}>
                    ⚠️ Send Warning to @{selectedUser.username}
                  </h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                      Severity
                    </label>
                    <select
                      value={warningForm.severity}
                      onChange={(e) => setWarningForm({...warningForm, severity: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <option value="mild">Mild - Friendly Reminder</option>
                      <option value="moderate">Moderate - Warning</option>
                      <option value="severe">Severe - Final Warning</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                      Reason *
                    </label>
                    <input
                      type="text"
                      value={warningForm.reason}
                      onChange={(e) => setWarningForm({...warningForm, reason: e.target.value})}
                      placeholder="e.g., Inappropriate content"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                      Additional Message (Optional)
                    </label>
                    <textarea
                      value={warningForm.message}
                      onChange={(e) => setWarningForm({...warningForm, message: e.target.value})}
                      placeholder="Additional context for the warning..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setWarningForm({ reason: '', severity: 'mild', message: '' });
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#f5f7fa',
                        color: '#666',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendWarning}
                      disabled={sending || !warningForm.reason}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: sending ? '#ccc' : 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {sending ? 'Sending...' : 'Send Warning'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['posts', 'comments'].map(type => (
                    <button
                      key={type}
                      onClick={() => setContentType(type as any)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: contentType === type ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' : '#f5f7fa',
                        color: contentType === type ? '#fff' : '#666',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search content..."
                  value={contentSearch}
                  onChange={(e) => setContentSearch(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    width: '300px',
                    maxWidth: '100%'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {content.map((item) => (
                  <div key={item.id} style={{
                    padding: '1rem',
                    background: '#f5f7fa',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontWeight: 600, color: '#1a1a2e' }}>@{item.username}</span>
                        {item.category && (
                          <span style={{
                            marginLeft: '0.5rem',
                            padding: '0.125rem 0.5rem',
                            background: '#1ABC9C',
                            color: '#fff',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {item.category}
                          </span>
                        )}
                        {(item.flag_count || 0) > 0 && (
                          <span style={{ marginLeft: '0.5rem', color: '#e74c3c' }}>
                            🚨 {item.flag_count} flags
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#999', fontSize: '0.85rem' }}>
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <p style={{ color: '#666', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                      {item.content}
                    </p>
                    {contentType === 'posts' && (
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#999', marginBottom: '0.75rem' }}>
                        <span>❤️ {item.reaction_count || 0}</span>
                        <span>💬 {item.comment_count || 0}</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteContent(item.id, contentType === 'posts' ? 'post' : 'comment')}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
                {content.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                    No content found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                🚨 Flagged Content ({flaggedPosts.filter(f => f.status === 'pending').length} pending)
              </h2>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {flaggedPosts
                  .filter(f => f.status === 'pending')
                  .map((flag) => (
                    <div key={flag.id} style={{
                      padding: '1.5rem',
                      background: '#fff3cd',
                      borderRadius: '8px',
                      border: '2px solid #ffc107'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontWeight: 600, color: '#664d03' }}>
                            Reported by @{flag.reporter.username}
                          </span>
                          <span style={{ color: '#999', fontSize: '0.85rem', marginLeft: '1rem' }}>
                            {formatDate(flag.created_at)}
                          </span>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: '#dc3545',
                          color: '#fff',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          {flag.reason}
                        </span>
                      </div>
                      
                      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fff', borderRadius: '6px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>
                          Original post by @{flag.posts.users.username}:
                        </div>
                        <p style={{ color: '#333', margin: 0 }}>{flag.posts.content}</p>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          onClick={() => handleFlagAction(flag.id, 'dismiss')}
                          style={{
                            padding: '0.5rem 1.5rem',
                            background: '#6c757d',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          ✓ Dismiss
                        </button>
                        <button
                          onClick={() => handleFlagAction(flag.id, 'action')}
                          style={{
                            padding: '0.5rem 1.5rem',
                            background: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          ⚠️ Take Action
                        </button>
                      </div>
                    </div>
                  ))}
                
                {flaggedPosts.filter(f => f.status === 'pending').length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                    <p>No pending reports. All clear!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div>
            <div style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              maxWidth: '800px'
            }}>
              <h2 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                📧 Send Communication
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Recipients
                </label>
                <select
                  value={commForm.type}
                  onChange={(e) => setCommForm({...commForm, type: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Users (Last 7 days)</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Subject *
                </label>
                <input
                  type="text"
                  value={commForm.subject}
                  onChange={(e) => setCommForm({...commForm, subject: e.target.value})}
                  placeholder="Email subject"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Message *
                </label>
                <textarea
                  value={commForm.message}
                  onChange={(e) => setCommForm({...commForm, message: e.target.value})}
                  placeholder="Your message content..."
                  rows={8}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                onClick={handleSendCommunication}
                disabled={sending || !commForm.subject || !commForm.message}
                style={{
                  padding: '0.75rem 2rem',
                  background: sending ? '#ccc' : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {sending ? '📤 Sending...' : '📧 Send Communication'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div>
            <div style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                ✨ Daily Prompts Management
              </h2>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Enter new daily prompt..."
                  style={{
                    flex: 1,
                    minWidth: '250px',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <button
                  onClick={handleAddPrompt}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  + Add Prompt
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {prompts.map((prompt) => (
                  <div key={prompt.id} style={{
                    padding: '1.5rem',
                    background: '#f5f7fa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#1a1a2e', margin: '0 0 0.5rem', fontSize: '1.05rem' }}>
                        {prompt.prompt}
                      </p>
                      <span style={{ color: '#999', fontSize: '0.85rem' }}>
                        Added {formatDate(prompt.created_at)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeletePrompt(prompt.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                {prompts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                    No prompts yet. Add your first one!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
