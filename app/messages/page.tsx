'use client';

import { useState, useEffect } from 'react';
import ConversationList from '@/components/ConversationList';
import ChatWindow from '@/components/ChatWindow';

interface Conversation {
  partnerId: string;
  partnerUsername: string;
  partnerAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isAnonymous?: boolean;
}

interface ChatRequest {
  id: string;
  requester_id: string;
  message: string;
  created_at: string;
  requester: { username: string; avatar_url: string | null };
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ChatRequest[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatUsername, setNewChatUsername] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const [isAnonymousChat, setIsAnonymousChat] = useState(false);
  const [newChatError, setNewChatError] = useState('');
  const [newChatSuccess, setNewChatSuccess] = useState('');

  useEffect(() => {
    // Get current user from session cookie
    try {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
      if (sessionCookie) {
        const session = JSON.parse(atob(sessionCookie.split('=')[1]));
        setCurrentUserId(session.userId);
      }
    } catch {}

    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (res.ok) {
        setConversations(data.conversations || []);
        setPendingRequests(data.pendingRequests || []);
      }
    } catch (err) {
      console.error('Fetch conversations error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewChat = async () => {
    if (!newChatUsername.trim()) return;
    setNewChatError('');
    setNewChatSuccess('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverUsername: newChatUsername.trim(),
          content: newChatMessage.trim() || 'Hi! I would like to connect with you.',
          isAnonymous: isAnonymousChat
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setNewChatError(data.error || 'Failed to start chat');
        return;
      }

      if (data.type === 'request_sent') {
        setNewChatSuccess(data.message);
        setTimeout(() => {
          setShowNewChat(false);
          setNewChatUsername('');
          setNewChatMessage('');
          setNewChatSuccess('');
          setIsAnonymousChat(false);
        }, 2000);
      } else {
        setShowNewChat(false);
        setNewChatUsername('');
        setNewChatMessage('');
        setIsAnonymousChat(false);
        fetchConversations();
      }
    } catch (err) {
      setNewChatError('Failed to start chat');
    }
  };

  const handleChatRequestAction = async (requestId: string, action: 'accept' | 'decline') => {
    try {
      const res = await fetch(`/api/chat-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (res.ok) {
        fetchConversations();
      }
    } catch (err) {
      console.error('Chat request action error:', err);
    }
  };

  if (!currentUserId) {
    return (
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
            <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
              Sign in to message
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Create an account or log in to connect with others.
            </p>
            <a href="/login" style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Log In
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (selectedConversation) {
    return (
      <main style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        height: 'calc(100vh - 80px)',
        paddingTop: '5rem'
      }}>
        <ChatWindow
          partnerId={selectedConversation.partnerId}
          partnerUsername={selectedConversation.partnerUsername}
          partnerAvatar={selectedConversation.partnerAvatar}
          currentUserId={currentUserId}
          onBack={() => {
            setSelectedConversation(null);
            fetchConversations();
          }}
        />
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ color: '#1a1a2e', margin: 0, fontWeight: 700 }}>Messages</h2>
            <p style={{ color: '#6b7280', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              Consent-based private messaging
            </p>
          </div>
          <button
            onClick={() => setShowNewChat(true)}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>+</span> New Chat
          </button>
        </div>

        {/* Pending Chat Requests */}
        {pendingRequests.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              color: '#1a1a2e', 
              fontSize: '1rem', 
              marginBottom: '0.75rem',
              fontWeight: 600
            }}>
              ?? Pending Requests ({pendingRequests.length})
            </h3>
            {pendingRequests.map((request) => (
              <div 
                key={request.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(26, 188, 156, 0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}>
                    {request.requester?.avatar_url || request.requester?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#1a1a2e' }}>@{request.requester?.username}</strong>
                    <span style={{ color: '#6b7280', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                      wants to connect
                    </span>
                    {request.message && (
                      <p style={{ 
                        color: '#4a5568', 
                        margin: '0.5rem 0',
                        fontSize: '0.9rem',
                        fontStyle: 'italic'
                      }}>
                        "{request.message}"
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => handleChatRequestAction(request.id, 'accept')}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        ? Accept
                      </button>
                      <button
                        onClick={() => handleChatRequestAction(request.id, 'decline')}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#f5f5f5',
                          color: '#666',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conversations List */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid #e5e7eb',
                borderTopColor: '#1ABC9C',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: '#6b7280' }}>Loading conversations...</p>
              <style jsx>{`
                @keyframes spin { to { transform: rotate(360deg); } }
              `}</style>
            </div>
          ) : conversations.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
                No conversations yet
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                Start a new chat to connect with someone!
              </p>
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              onSelect={setSelectedConversation}
            />
          )}
        </div>

        {/* New Chat Modal */}
        {showNewChat && (
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
            zIndex: 100,
            padding: '1rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
                ?? Start a Connection
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Send a chat request. They'll need to accept before you can message each other.
              </p>
              
              <input
                type="text"
                placeholder="Username (e.g., HopefulHeart)"
                value={newChatUsername}
                onChange={(e) => setNewChatUsername(e.target.value.replace('@', ''))}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  marginBottom: '0.75rem',
                  fontSize: '0.95rem'
                }}
              />
              
              <textarea
                placeholder="Write a message to introduce yourself..."
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  marginBottom: '0.75rem',
                  fontSize: '0.95rem',
                  minHeight: '80px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />

              {/* Anonymous Toggle */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem',
                padding: '0.75rem',
                background: isAnonymousChat ? 'rgba(155, 89, 182, 0.1)' : '#f8f9fa',
                borderRadius: '10px'
              }}>
                <button
                  type="button"
                  onClick={() => setIsAnonymousChat(!isAnonymousChat)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isAnonymousChat ? 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)' : '#ddd',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    left: isAnonymousChat ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.3s ease'
                  }} />
                </button>
                <span style={{ fontSize: '0.9rem', color: isAnonymousChat ? '#9B59B6' : '#666' }}>
                  {isAnonymousChat ? '?? Anonymous Mode' : '?? Show Identity'}
                </span>
              </div>

              {newChatError && (
                <div style={{ 
                  padding: '0.75rem',
                  background: '#fee2e2',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem'
                }}>
                  {newChatError}
                </div>
              )}
              
              {newChatSuccess && (
                <div style={{ 
                  padding: '0.75rem',
                  background: '#d1fae5',
                  borderRadius: '8px',
                  color: '#059669',
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem'
                }}>
                  ? {newChatSuccess}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    setShowNewChat(false);
                    setNewChatUsername('');
                    setNewChatMessage('');
                    setNewChatError('');
                    setNewChatSuccess('');
                    setIsAnonymousChat(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartNewChat}
                  disabled={!newChatUsername.trim()}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: newChatUsername.trim() 
                      ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)'
                      : '#e5e7eb',
                    color: newChatUsername.trim() ? '#fff' : '#9ca3af',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: newChatUsername.trim() ? 'pointer' : 'not-allowed',
                    fontWeight: 600
                  }}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}