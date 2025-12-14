'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system' | 'date' | 'call';
}

interface ChatViewProps {
  chatName: string;
  onSendMessage?: (message: string) => void;
  onJoinCall?: () => void;
}

const MESSAGES: Message[] = [
  { id: '0', senderId: 'system', senderName: '', senderAvatar: '', content: '9 Sep 2024', timestamp: '', type: 'date' },
  { id: '1', senderId: 'system', senderName: '', senderAvatar: '', content: 'Richard Wilson added You', timestamp: '6.15 pm', type: 'system' },
  { id: '2', senderId: 'conner', senderName: 'Conner Garcia', senderAvatar: 'https://i.pravatar.cc/150?img=11', content: "Hey guys! Don't forget about our meeting next week! I'll be waiting for you at the 'Cozy Corner' cafe at 6:00 PM. Don't be late!", timestamp: '6.25 pm', type: 'text' },
  { id: '3', senderId: 'richard', senderName: 'Richard Wilson', senderAvatar: 'https://i.pravatar.cc/150?img=12', content: "Absolutely, I'll be there! Looking forward to catching up and discussing everything.", timestamp: '6.25 pm', type: 'text' },
  { id: '4', senderId: 'system', senderName: '', senderAvatar: '', content: '10 Sep 2024', timestamp: '', type: 'date' },
  { id: '5', senderId: 'lawrence', senderName: 'Lawrence Patterson', senderAvatar: 'https://i.pravatar.cc/150?img=14', content: '@rwilson @jparker I have a new game plan', timestamp: '6.25 pm', type: 'text' },
  { id: '6', senderId: 'jaden', senderName: 'Jaden Parker', senderAvatar: 'https://i.pravatar.cc/150?img=8', content: "Let's discuss this tomorrow", timestamp: '6.25 pm', type: 'text' },
  { id: '7', senderId: 'richard', senderName: 'Richard Wilson', senderAvatar: 'https://i.pravatar.cc/150?img=12', content: '', timestamp: '', type: 'call' },
];

// Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const AttachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function ChatView({
  chatName = 'ICG chat',
  onSendMessage,
  onJoinCall,
}: ChatViewProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

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

  return (
    <div className="chat-view">
      {/* Chat Header */}
      <div className="chat-header">
        <h1 className="chat-title">{chatName}</h1>
        
        <div className="header-right">
          <div className="search-box">
            <SearchIcon />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          
          <button className="header-btn"><SettingsIcon /></button>
          <button className="header-btn"><BellIcon /></button>
          
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/150?img=3" alt="You" />
          </div>
        </div>
      </div>

      {/* Messages Area with Media */}
      <div className="messages-area">
        {/* Shared Media at top */}
        <div className="shared-media">
          <img src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=800&h=450&fit=crop" alt="Shared" />
        </div>

        {/* Messages */}
        <div className="messages-list">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.type}`}>
              {msg.type === 'date' && (
                <div className="date-pill">{msg.content}</div>
              )}
              
              {msg.type === 'system' && (
                <div className="system-msg">
                  <ArrowIcon />
                  <span>{msg.content}</span>
                  <span className="time">{msg.timestamp}</span>
                </div>
              )}
              
              {msg.type === 'text' && (
                <div className="text-msg">
                  <img src={msg.senderAvatar} alt={msg.senderName} className="msg-avatar" />
                  <div className="msg-content">
                    <div className="msg-header">
                      <span className="sender-name">{msg.senderName}</span>
                      <span className="msg-time">{msg.timestamp}</span>
                    </div>
                    <p className="msg-text">{msg.content}</p>
                  </div>
                </div>
              )}
              
              {msg.type === 'call' && (
                <div className="call-msg">
                  <img src={msg.senderAvatar} alt="Richard Wilson" className="msg-avatar" />
                  <div className="call-info">
                    <PhoneIcon />
                    <span><strong>Richard Wilson</strong> started a video call</span>
                  </div>
                  <button className="join-btn" onClick={onJoinCall}>Join</button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="input-area">
        <button className="input-btn"><AttachIcon /></button>
        <div className="input-wrapper">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a message..."
          />
        </div>
        <button className="input-btn"><MicIcon /></button>
        <button className="send-btn" onClick={handleSend}><SendIcon /></button>
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
          padding: 12px 20px;
          background: #1f1f1f;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .chat-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 14px;
          color: #707070;
        }

        .search-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          width: 120px;
        }

        .search-input::placeholder { color: #707070; }

        .header-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: #a0a0a0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-btn:hover { background: rgba(212,168,85,0.15); color: #d4a855; }

        .user-avatar img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
        }

        .shared-media {
          margin-bottom: 16px;
          border-radius: 16px;
          overflow: hidden;
          max-width: 400px;
        }

        .shared-media img {
          width: 100%;
          display: block;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message-row.date {
          display: flex;
          justify-content: center;
          margin: 8px 0;
        }

        .date-pill {
          background: rgba(255,255,255,0.1);
          padding: 6px 16px;
          border-radius: 16px;
          font-size: 0.75rem;
          color: #a0a0a0;
        }

        .system-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #707070;
          font-size: 0.85rem;
        }

        .system-msg .time {
          margin-left: auto;
          font-size: 0.75rem;
        }

        .text-msg {
          display: flex;
          gap: 12px;
        }

        .msg-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .msg-content { flex: 1; }

        .msg-header {
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

        .msg-time {
          color: #606060;
          font-size: 0.75rem;
        }

        .msg-text {
          color: #e0e0e0;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .call-msg {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .call-info {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          color: #a0a0a0;
          font-size: 0.9rem;
        }

        .call-info strong { color: #d4a855; }

        .join-btn {
          padding: 8px 24px;
          border-radius: 8px;
          border: none;
          background: #22c55e;
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .join-btn:hover { background: #16a34a; }

        .input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: #1f1f1f;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .input-wrapper {
          flex: 1;
          background: rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 12px 18px;
        }

        .input-wrapper input {
          width: 100%;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
        }

        .input-wrapper input::placeholder { color: #606060; }

        .input-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #606060;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-btn:hover { color: #d4a855; }

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
        }

        .send-btn:hover { background: #e8c06a; }

        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
