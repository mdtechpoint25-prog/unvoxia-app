'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  media_url: string | null;
  created_at: string;
}

interface ChatWindowProps {
  partnerId: string;
  partnerUsername: string;
  partnerAvatar: string | null;
  currentUserId: string;
  onBack: () => void;
}

export default function ChatWindow({
  partnerId,
  partnerUsername,
  partnerAvatar,
  currentUserId,
  onBack
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${partnerId}`);
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error('Fetch messages error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [partnerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/messages/${partnerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...messages, data.message]);
        setNewMessage('');
      }
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderBottom: '1px solid #eee',
        background: '#fff'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#2C3E50'
          }}
        >
          &larr;
        </button>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#9B59B6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600
        }}>
          {partnerAvatar && partnerAvatar.length <= 4 ? (
            partnerAvatar
          ) : (
            partnerUsername.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <strong style={{ color: '#2C3E50' }}>@{partnerUsername}</strong>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>Anonymous chat</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        background: '#f5f5f5'
      }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Start the conversation with a supportive message.
          </p>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isOwn ? '#1ABC9C' : '#fff',
                  color: isOwn ? '#fff' : '#2C3E50',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  {msg.media_url && (
                    <img
                      src={msg.media_url}
                      alt="media"
                      style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '0.5rem' }}
                    />
                  )}
                  <div style={{
                    fontSize: '0.7rem',
                    marginTop: '0.25rem',
                    opacity: 0.7,
                    textAlign: 'right'
                  }}>
                    {formatTime(msg.created_at)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '1rem',
        borderTop: '1px solid #eee',
        background: '#fff'
      }}>
        <input
          type="text"
          placeholder="Type a supportive message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '24px',
            fontSize: '0.95rem'
          }}
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {sending ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
