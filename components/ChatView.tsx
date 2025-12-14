'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system' | 'media' | 'call';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

interface ChatViewProps {
  chatName: string;
  messages?: Message[];
  currentUserId?: string;
  onSendMessage?: (message: string) => void;
  onJoinCall?: () => void;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'system',
    senderName: 'System',
    content: 'Richard Wilson added You',
    timestamp: '9 Sep 2024',
    type: 'system',
  },
  {
    id: '2',
    senderId: 'conner',
    senderName: 'Conner Garcia',
    content: "Hey guys! Don't forget about our meeting next week! I'll be waiting for you at the 'Cozy Corner' cafe at 6:00 PM. Don't be late!",
    timestamp: '6.15 pm',
    type: 'text',
  },
  {
    id: '3',
    senderId: 'richard',
    senderName: 'Richard Wilson',
    content: "Absolutely, I'll be there! Looking forward to catching up and discussing everything.",
    timestamp: '6.25 pm',
    type: 'text',
  },
  {
    id: '4',
    senderId: 'system',
    senderName: 'System',
    content: '10 Sep 2024',
    timestamp: '10 Sep 2024',
    type: 'system',
  },
  {
    id: '5',
    senderId: 'lawrence',
    senderName: 'Lawrence Patterson',
    content: '@rwilson @jparker I have a new game plan',
    timestamp: '6.25 pm',
    type: 'text',
  },
  {
    id: '6',
    senderId: 'jaden',
    senderName: 'Jaden Parker',
    content: "Let's discuss this tomorrow",
    timestamp: '6.25 pm',
    type: 'text',
  },
  {
    id: '7',
    senderId: 'richard',
    senderName: 'Richard Wilson',
    content: 'Started a video call',
    timestamp: 'Just now',
    type: 'call',
  },
];

// Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const AttachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 17v5"/>
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76Z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function ChatView({
  chatName = 'ICG chat',
  messages = MOCK_MESSAGES,
  currentUserId = 'me',
  onSendMessage,
  onJoinCall,
}: ChatViewProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #d4a855 0%, #c49a4a 100%)',
      'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
      'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="chat-view">
      {/* Chat Header */}
      <div className="chat-header">
        <h1 className="chat-title">{chatName}</h1>
        
        <div className="header-actions">
          <div className="search-box">
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
          </div>
          
          <button className="header-btn" title="Settings">
            <SettingsIcon />
          </button>
          
          <button className="header-btn" title="Notifications">
            <BellIcon />
          </button>
          
          <div className="user-avatar">
            <div className="avatar-circle">
              <span>U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Area */}
      <div className="media-preview">
        <div className="media-container">
          <Image
            src="/original-5b86f48f37f12cb67444d8aa7a3dd79e.webp"
            alt="Shared media"
            fill
            style={{ objectFit: 'cover' }}
            className="media-image"
          />
        </div>
      </div>

      {/* Chat Action Buttons */}
      <div className="chat-actions-bar">
        <button className="action-btn active" title="Call">
          <PhoneIcon />
        </button>
        <button className="action-btn" title="Video">
          <VideoIcon />
        </button>
        <button className="action-btn" title="Pin">
          <PinIcon />
        </button>
        <button className="action-btn" title="Members">
          <UsersIcon />
        </button>
      </div>

      {/* Messages Area */}
      <div className="messages-area">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.type}`}>
            {message.type === 'system' ? (
              <div className="system-message">
                {message.content.includes('Sep 2024') ? (
                  <span className="date-badge">{message.content}</span>
                ) : (
                  <span className="system-text">
                    <ArrowIcon /> {message.content}
                  </span>
                )}
              </div>
            ) : message.type === 'call' ? (
              <div className="call-message">
                <div className="message-avatar">
                  <div 
                    className="avatar-circle small"
                    style={{ background: getAvatarColor(message.senderName) }}
                  >
                    {message.senderName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="call-content">
                  <PhoneIcon />
                  <span className="call-text">
                    <strong>{message.senderName}</strong> started a video call
                  </span>
                </div>
                <button className="join-btn" onClick={onJoinCall}>Join</button>
              </div>
            ) : (
              <div className="chat-message">
                <div className="message-avatar">
                  <div 
                    className="avatar-circle small"
                    style={{ background: getAvatarColor(message.senderName) }}
                  >
                    {message.senderName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="sender-name">{message.senderName}</span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <p className="message-text">{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input-area">
        <button className="input-action-btn">
          <AttachIcon />
        </button>
        
        <div className="input-wrapper">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a message..."
            className="message-input"
          />
        </div>
        
        <button className="input-action-btn">
          <MicIcon />
        </button>
        
        <button 
          className="send-btn"
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </button>
      </div>

      <style jsx>{`
        .chat-view {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #242424;
          flex: 1;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chat-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 16px;
          color: #808080;
        }

        .search-input {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
          width: 150px;
        }

        .search-input::placeholder {
          color: #808080;
        }

        .header-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: rgba(255, 255, 255, 0.08);
          color: #b3b3b3;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .header-btn:hover {
          background: rgba(212, 168, 85, 0.15);
          color: #d4a855;
        }

        .user-avatar .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a855 0%, #c49a4a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .media-preview {
          padding: 16px 24px;
        }

        .media-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 16/9;
          border-radius: 16px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .media-image {
          border-radius: 16px;
        }

        .chat-actions-bar {
          display: flex;
          gap: 8px;
          padding: 0 24px 16px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.08);
          color: #b3b3b3;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-btn:hover,
        .action-btn.active {
          background: rgba(212, 168, 85, 0.15);
          color: #d4a855;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-wrapper.system {
          display: flex;
          justify-content: center;
        }

        .system-message {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .date-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          color: #b3b3b3;
        }

        .system-text {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #808080;
          font-size: 0.85rem;
        }

        .chat-message {
          display: flex;
          gap: 12px;
        }

        .message-avatar .avatar-circle.small {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 0.7rem;
        }

        .message-content {
          flex: 1;
        }

        .message-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .sender-name {
          font-weight: 600;
          color: #d4a855;
          font-size: 0.9rem;
        }

        .message-time {
          color: #808080;
          font-size: 0.75rem;
        }

        .message-text {
          color: #e0e0e0;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .call-message {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .call-content {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          color: #b3b3b3;
        }

        .call-text {
          font-size: 0.9rem;
        }

        .call-text strong {
          color: #d4a855;
        }

        .join-btn {
          padding: 8px 24px;
          border-radius: 8px;
          border: none;
          background: #4ade80;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .join-btn:hover {
          background: #22c55e;
        }

        .message-input-area {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: #1a1a1a;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .input-wrapper {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 12px 20px;
        }

        .message-input {
          width: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }

        .message-input::placeholder {
          color: #808080;
        }

        .input-action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #808080;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .input-action-btn:hover {
          color: #d4a855;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #d4a855;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .send-btn:hover:not(:disabled) {
          background: #e8c06a;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Scrollbar */
        .messages-area::-webkit-scrollbar {
          width: 6px;
        }

        .messages-area::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
