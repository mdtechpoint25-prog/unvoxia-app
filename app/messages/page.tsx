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
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatUsername, setNewChatUsername] = useState('');
  const [newChatError, setNewChatError] = useState('');

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

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverUsername: newChatUsername.trim(),
          content: 'Hi! I would like to connect with you.'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setNewChatError(data.error || 'Failed to start chat');
        return;
      }

      setShowNewChat(false);
      setNewChatUsername('');
      fetchConversations();
    } catch (err) {
      setNewChatError('Failed to start chat');
    }
  };

  if (!currentUserId) {
    return (
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
          <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Sign in to message</h3>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            Create an account or log in to send anonymous messages.
          </p>
          <a href="/login" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#1ABC9C',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Log In
          </a>
        </div>
      </main>
    );
  }

  if (selectedConversation) {
    return (
      <main style={{ maxWidth: '700px', margin: '0 auto', height: 'calc(100vh - 80px)' }}>
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
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '0' }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minHeight: 'calc(100vh - 80px)'
      }}>
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
            zIndex: 100
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              width: '90%',
              maxWidth: '400px'
            }}>
              <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Start New Chat</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Enter the username of the person you want to message.
              </p>
              <input
                type="text"
                placeholder="Username (e.g., @HopefulHeart)"
                value={newChatUsername}
                onChange={(e) => setNewChatUsername(e.target.value.replace('@', ''))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '0.5rem'
                }}
              />
              {newChatError && (
                <p style={{ color: '#FF6F91', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {newChatError}
                </p>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() => {
                    setShowNewChat(false);
                    setNewChatUsername('');
                    setNewChatError('');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartNewChat}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#1ABC9C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#888' }}>Loading conversations...</p>
          </div>
        ) : (
          <ConversationList
            conversations={conversations}
            onSelect={setSelectedConversation}
            onNewChat={() => setShowNewChat(true)}
          />
        )}
      </div>
    </main>
  );
}