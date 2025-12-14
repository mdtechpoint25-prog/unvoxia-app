'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Avatar mapping
const AVATARS: Record<string, string> = {
  spiral: '🌀', butterfly: '🦋', wave: '🌊', flower: '🌸',
  moon: '🌙', star: '⭐', flame: '🔥', sparkle: '✨',
  leaf: '🍃', mask: '🎭', gem: '💎', rainbow: '🌈',
  cloud: '☁️', heart: '💜', feather: '🪶', lotus: '🪷',
};

// Mock conversation data
const MOCK_CHAT: Record<string, { username: string; avatar: string; messages: Message[] }> = {
  '1': {
    username: 'quietmind_402',
    avatar: 'moon',
    messages: [
      { id: 1, sender: 'them', text: 'Hey, I saw your post about feeling lost. I just wanted to reach out.', time: '2:30 PM' },
      { id: 2, sender: 'me', text: 'Thank you for reaching out. It means a lot that someone noticed.', time: '2:32 PM' },
      { id: 3, sender: 'them', text: 'I\'ve been there. Sometimes just knowing someone else understands helps.', time: '2:35 PM' },
      { id: 4, sender: 'me', text: 'It really does. How did you get through it?', time: '2:40 PM' },
      { id: 5, sender: 'them', text: 'One day at a time. And talking to people who get it, like here.', time: '2:45 PM' },
    ],
  },
  '2': {
    username: 'nightowl_99',
    avatar: 'star',
    messages: [
      { id: 1, sender: 'them', text: 'Your story about healing really resonated with me.', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Thank you! It took a long time to get to this place.', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'Take care of yourself 💚', time: 'Yesterday' },
    ],
  },
  '3': {
    username: 'growthjourney',
    avatar: 'leaf',
    messages: [
      { id: 1, sender: 'me', text: 'I read your post about leaving a toxic workplace. Going through the same thing.', time: '3 days ago' },
      { id: 2, sender: 'them', text: 'It\'s scary but so worth it. Trust yourself.', time: '3 days ago' },
      { id: 3, sender: 'me', text: 'Did you find something better after?', time: '3 days ago' },
      { id: 4, sender: 'them', text: 'Yes, exactly! That\'s how I felt too', time: '3 days ago' },
    ],
  },
};

type Message = {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params?.chatId as string;
  const chat = MOCK_CHAT[chatId];

  const [messages, setMessages] = useState<Message[]>(chat?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now(),
      sender: 'me',
      text: newMessage.trim(),
      time: 'Just now',
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  if (!chat) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p style={{ color: '#fff' }}>Chat not found</p>
        <button
          onClick={() => router.push('/messages')}
          style={{
            padding: '12px 24px',
            background: '#0d9488',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Back to Messages
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => router.push('/messages')}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ←
        </button>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}
        >
          {AVATARS[chat.avatar] || '🌀'}
        </div>
        <div>
          <h1
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              margin: 0,
            }}
          >
            @{chat.username}
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              margin: 0,
            }}
          >
            Anonymous Chat
          </p>
        </div>
      </div>

      {/* Safety Reminder */}
      <div
        style={{
          padding: '8px 20px',
          background: 'rgba(13, 148, 136, 0.08)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.7rem',
            margin: 0,
          }}
        >
          🔒 This conversation is anonymous. Be kind and respectful.
        </p>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '12px 16px',
                borderRadius: msg.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.sender === 'me' ? '#0d9488' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {msg.text}
              </p>
              <p
                style={{
                  color: msg.sender === 'me' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.65rem',
                  margin: '6px 0 0',
                  textAlign: 'right',
                }}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '4px',
          }}
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write a message..."
            rows={1}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: newMessage.trim() ? '#0d9488' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: newMessage.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
