'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MessagesPage() {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('ICG chat');

  const conversations = [
    {
      id: 1,
      name: 'Richard Wilson',
      lastMessage: 'I will add you to our team, we...',
      avatar: 'https://i.pravatar.cc/150?img=12',
      online: true,
      time: '6:25 pm'
    },
    {
      id: 2,
      name: 'ICG chat',
      lastMessage: 'Jaden: Let\'s discuss this tom...',
      avatar: null,
      isGroup: true,
      time: '6:25 pm',
      initial: 'IC'
    },
    {
      id: 3,
      name: 'Sarah Parker',
      lastMessage: 'You: Ok, see you soon!',
      avatar: 'https://i.pravatar.cc/150?img=5',
      online: true,
      time: '6:24 pm'
    },
    {
      id: 4,
      name: 'Abubakar Campbell',
      lastMessage: 'You: Do you think we can do it?',
      avatar: 'https://i.pravatar.cc/150?img=15',
      online: false,
      time: '6:20 pm'
    },
    {
      id: 5,
      name: 'Nathanael Jordan',
      lastMessage: 'I\'m busy',
      avatar: 'https://i.pravatar.cc/150?img=8',
      online: true,
      time: '6:15 pm'
    },
    {
      id: 6,
      name: 'Conner Garcia',
      lastMessage: 'You: Hey, maybe we can meet...',
      avatar: 'https://i.pravatar.cc/150?img=3',
      online: false,
      time: '6:10 pm'
    },
    {
      id: 7,
      name: 'Cynthia Mckay',
      lastMessage: 'You: Maybe',
      avatar: 'https://i.pravatar.cc/150?img=9',
      online: true,
      time: '6:05 pm'
    },
    {
      id: 8,
      name: 'Cora Richards',
      lastMessage: 'Will you go play?',
      avatar: 'https://i.pravatar.cc/150?img=11',
      online: false,
      time: '6:00 pm'
    },
    {
      id: 9,
      name: 'Lawrence Patterson',
      lastMessage: 'I miss the guys what they think',
      avatar: 'https://i.pravatar.cc/150?img=7',
      online: true,
      time: '5:55 pm'
    },
    {
      id: 10,
      name: 'Lukas Mcgowan',
      lastMessage: 'You: We can try this strategy I...',
      avatar: 'https://i.pravatar.cc/150?img=14',
      online: false,
      time: '5:50 pm'
    },
    {
      id: 11,
      name: 'Alia Bonner',
      lastMessage: 'I had a great time yesterday',
      avatar: 'https://i.pravatar.cc/150?img=16',
      online: true,
      time: '5:45 pm'
    },
    {
      id: 12,
      name: 'Fletcher Morse',
      lastMessage: 'You: I need to work, sorry',
      avatar: 'https://i.pravatar.cc/150?img=13',
      online: true,
      time: '5:40 pm'
    }
  ];

  const members = [
    { name: 'Richard Wilson', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'You', role: null, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Jaden Parker', role: null, avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Conner Garcia', role: null, avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Lawrence Patterson', role: null, avatar: 'https://i.pravatar.cc/150?img=7' }
  ];

  const messages = [
    {
      id: 1,
      type: 'system',
      author: 'Richard Wilson',
      text: 'added You',
      time: '6:15 pm',
      date: '9 Sep 2024'
    },
    {
      id: 2,
      type: 'message',
      author: 'Conner Garcia',
      text: 'Hey guys! Don\'t forget about our meeting next week! I\'ll be waiting for you at the \'Cozy Corner\' cafe at 6:00 PM. Don\'t be late!',
      time: '6:25 pm',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 3,
      type: 'message',
      author: 'Richard Wilson',
      text: 'Absolutely, I\'ll be there! Looking forward to catching up and discussing everything.',
      time: '6:25 pm',
      avatar: 'https://i.pravatar.cc/150?img=12',
      date: '10 Sep 2024'
    },
    {
      id: 4,
      type: 'message',
      author: 'Lawrence Patterson',
      text: '@wilson @jparker I have a new game plan',
      time: '6:25 pm',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    {
      id: 5,
      type: 'message',
      author: 'Jaden Parker',
      text: 'Let\'s discuss this tomorrow',
      time: '6:25 pm',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  return (
    <div className="discord-layout">
      {/* Left Sidebar - Server List */}
      <div className="server-sidebar">
        <div className="server-logo">
          <div className="logo-icon">S</div>
        </div>
        
        <div className="server-list">
          <div className="server-item active">Work</div>
          <div className="server-item highlighted">IC</div>
          <div className="server-item">SP</div>
          <div className="server-item">BFF</div>
          <div className="server-item">MJ</div>
          <div className="server-item">GI</div>
        </div>
        
        <div className="server-bottom">
          <div className="server-item settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11.03L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11.03L19.5,12L19.43,12.97L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
            </svg>
          </div>
          <div className="add-server">+</div>
        </div>
      </div>

      {/* Middle Sidebar - Conversations */}
      <div className="conversation-sidebar">
        <div className="conversation-header">
          <div className="header-user">
            <img src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" />
            <div className="user-info">
              <div className="username">Richard Wilson</div>
              <div className="user-status">I will add you to our team, we...</div>
            </div>
          </div>
          
          <div className="header-title">
            <h2>ICG chat</h2>
          </div>
          
          <div className="header-actions">
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <button className="settings-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11.03L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11.03L19.5,12L19.43,12.97L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
              </svg>
            </button>
            <div className="notification-badge">2</div>
            <img src="https://i.pravatar.cc/150?img=1" alt="You" className="user-avatar" />
          </div>
        </div>

        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedChat === conv.name ? 'active' : ''}`}
              onClick={() => setSelectedChat(conv.name)}
            >
              <div className="conv-avatar">
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.name} />
                ) : (
                  <div className="avatar-placeholder">{conv.initial || conv.name.charAt(0)}</div>
                )}
                {conv.online && <div className="online-dot" />}
              </div>
              <div className="conv-content">
                <div className="conv-header">
                  <span className="conv-name">{conv.name}</span>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <div className="conv-message">{conv.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="chat-header">
          <div className="chat-title">
            <h1>{selectedChat}</h1>
          </div>
          
          <div className="chat-actions">
            <button className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62,10.79C6.57,10.62 6.54,10.45 6.54,10.25C6.54,9.79 6.67,9.37 6.93,9C7.19,8.63 7.5,8.36 7.85,8.17C8.2,7.98 8.57,7.88 8.95,7.88C9.33,7.88 9.7,7.98 10.05,8.17C10.4,8.36 10.71,8.63 10.97,9C11.23,9.37 11.36,9.79 11.36,10.25C11.36,10.45 11.33,10.62 11.28,10.79L18.07,14.54C18.22,14.31 18.42,14.12 18.66,13.97C18.9,13.82 19.17,13.74 19.45,13.74C19.73,13.74 20,13.82 20.24,13.97C20.48,14.12 20.68,14.31 20.83,14.54L22,15.39L20.83,16.24C20.68,16.47 20.48,16.66 20.24,16.81C20,16.96 19.73,17.04 19.45,17.04C19.17,17.04 18.9,16.96 18.66,16.81C18.42,16.66 18.22,16.47 18.07,16.24L11.28,20C11.33,20.16 11.36,20.33 11.36,20.53C11.36,20.99 11.23,21.41 10.97,21.78C10.71,22.15 10.4,22.42 10.05,22.61C9.7,22.8 9.33,22.9 8.95,22.9C8.57,22.9 8.2,22.8 7.85,22.61C7.5,22.42 7.19,22.15 6.93,21.78C6.67,21.41 6.54,20.99 6.54,20.53C6.54,20.33 6.57,20.16 6.62,20L2.07,17.61C1.92,17.84 1.72,18.03 1.48,18.18C1.24,18.33 0.97,18.41 0.69,18.41C0.41,18.41 0.14,18.33 -0.1,18.18C-0.34,18.03 -0.54,17.84 -0.69,17.61L-1.86,16.76L-0.69,15.91C-0.54,15.68 -0.34,15.49 -0.1,15.34C0.14,15.19 0.41,15.11 0.69,15.11C0.97,15.11 1.24,15.19 1.48,15.34C1.72,15.49 1.92,15.68 2.07,15.91L6.62,18.3C6.57,18.14 6.54,17.97 6.54,17.77C6.54,17.31 6.67,16.89 6.93,16.52C7.19,16.15 7.5,15.88 7.85,15.69C8.2,15.5 8.57,15.4 8.95,15.4C9.33,15.4 9.7,15.5 10.05,15.69C10.4,15.88 10.71,16.15 10.97,16.52C11.23,16.89 11.36,17.31 11.36,17.77C11.36,17.97 11.33,18.14 11.28,18.3L18.07,22.05C18.22,21.82 18.42,21.63 18.66,21.48C18.9,21.33 19.17,21.25 19.45,21.25C19.73,21.25 20,21.33 20.24,21.48C20.48,21.63 20.68,21.82 20.83,22.05L22,22.9L20.83,23.75C20.68,23.98 20.48,24.17 20.24,24.32C20,24.47 19.73,24.55 19.45,24.55C19.17,24.55 18.9,24.47 18.66,24.32C18.42,24.17 18.22,23.98 18.07,23.75L11.28,19.98C11.33,20.14 11.36,20.31 11.36,20.51C11.36,20.97 11.23,21.39 10.97,21.76C10.71,22.13 10.4,22.4 10.05,22.59C9.7,22.78 9.33,22.88 8.95,22.88C8.57,22.88 8.2,22.78 7.85,22.59C7.5,22.4 7.19,22.13 6.93,21.76C6.67,21.39 6.54,20.97 6.54,20.51C6.54,20.31 6.57,20.14 6.62,19.98L2.07,17.59C1.92,17.82 1.72,18.01 1.48,18.16C1.24,18.31 0.97,18.39 0.69,18.39C0.41,18.39 0.14,18.31 -0.1,18.16C-0.34,18.01 -0.54,17.82 -0.69,17.59L-1.86,16.74L-0.69,15.89C-0.54,15.66 -0.34,15.47 -0.1,15.32C0.14,15.17 0.41,15.09 0.69,15.09C0.97,15.09 1.24,15.17 1.48,15.32C1.72,15.47 1.92,15.66 2.07,15.89L6.62,18.28C6.57,18.12 6.54,17.95 6.54,17.75C6.54,17.29 6.67,16.87 6.93,16.5C7.19,16.13 7.5,15.86 7.85,15.67C8.2,15.48 8.57,15.38 8.95,15.38C9.33,15.38 9.7,15.48 10.05,15.67C10.4,15.86 10.71,16.13 10.97,16.5C11.23,16.87 11.36,17.29 11.36,17.75C11.36,17.95 11.33,18.12 11.28,18.28L18.07,22.03C18.22,21.8 18.42,21.61 18.66,21.46C18.9,21.31 19.17,21.23 19.45,21.23C19.73,21.23 20,21.31 20.24,21.46C20.48,21.61 20.68,21.8 20.83,22.03L22,22.88L20.83,23.73C20.68,23.96 20.48,24.15 20.24,24.3C20,24.45 19.73,24.53 19.45,24.53C19.17,24.53 18.9,24.45 18.66,24.3C18.42,24.15 18.22,23.96 18.07,23.73L11.28,19.96C11.33,20.12 11.36,20.29 11.36,20.49"/>
              </svg>
            </button>
            <button className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
              </svg>
            </button>
            <button className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
              </svg>
            </button>
            <button className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,21V19H15V21H13V19H11V21H9V19H7V21H5V19A2,2 0 0,1 3,17V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V17A2,2 0 0,1 19,19V21H17M19,17V5H5V17H19Z" />
              </svg>
            </button>
            <img src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" className="chat-user-avatar" />
          </div>
        </div>

        <div className="hero-image">
          <img src="/api/placeholder/800/300" alt="Chat background" />
        </div>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className="message-wrapper">
              {msg.date && <div className="date-divider">{msg.date}</div>}
              
              {msg.type === 'system' ? (
                <div className="system-message">
                  <span className="system-icon">?</span>
                  <span><strong>{msg.author}</strong> {msg.text}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
              ) : (
                <div className="message">
                  <div className="message-avatar">
                    <img src={msg.avatar} alt={msg.author} />
                    <div className="online-indicator" />
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <strong className="message-author">{msg.author}</strong>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="video-call-notification">
            <div className="call-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
              </svg>
            </div>
            <span><strong>Richard Wilson</strong> started a video call</span>
            <button className="join-call-btn">Join</button>
          </div>
        </div>

        <div className="message-input-container">
          <button className="attach-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
            </svg>
          </button>
          
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          
          <button className="voice-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
            </svg>
          </button>
          
          <button className="send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Sidebar - Members & Files */}
      <div className="right-sidebar">
        <div className="sidebar-actions">
          <button className="action-icon phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62,10.79C6.57,10.62 6.54,10.45 6.54,10.25C6.54,9.79 6.67,9.37 6.93,9C7.19,8.63 7.5,8.36 7.85,8.17C8.2,7.98 8.57,7.88 8.95,7.88C9.33,7.88 9.7,7.98 10.05,8.17C10.4,8.36 10.71,8.63 10.97,9C11.23,9.37 11.36,9.79 11.36,10.25C11.36,10.45 11.33,10.62 11.28,10.79L18.07,14.54C18.22,14.31 18.42,14.12 18.66,13.97C18.9,13.82 19.17,13.74 19.45,13.74C19.73,13.74 20,13.82 20.24,13.97C20.48,14.12 20.68,14.31 20.83,14.54L22,15.39L20.83,16.24C20.68,16.47 20.48,16.66 20.24,16.81C20,16.96 19.73,17.04 19.45,17.04C19.17,17.04 18.9,16.96 18.66,16.81C18.42,16.66 18.22,16.47 18.07,16.24L11.28,20C11.33,20.16 11.36,20.33 11.36,20.53C11.36,20.99 11.23,21.41 10.97,21.78C10.71,22.15 10.4,22.42 10.05,22.61C9.7,22.8 9.33,22.9 8.95,22.9C8.57,22.9 8.2,22.8 7.85,22.61C7.5,22.42 7.19,22.15 6.93,21.78C6.67,21.41 6.54,20.99 6.54,20.53C6.54,20.33 6.57,20.16 6.62,20L2.07,17.61C1.92,17.84 1.72,18.03 1.48,18.18C1.24,18.33 0.97,18.41 0.69,18.41C0.41,18.41 0.14,18.33 -0.1,18.18C-0.34,18.03 -0.54,17.84 -0.69,17.61L-1.86,16.76L-0.69,15.91C-0.54,15.68 -0.34,15.49 -0.1,15.34C0.14,15.19 0.41,15.11 0.69,15.11C0.97,15.11 1.24,15.19 1.48,15.34C1.72,15.49 1.92,15.68 2.07,15.91L6.62,18.3C6.57,18.14 6.54,17.97 6.54,17.77C6.54,17.31 6.67,16.89 6.93,16.52C7.19,16.15 7.5,15.88 7.85,15.69C8.2,15.5 8.57,15.4 8.95,15.4C9.33,15.4 9.7,15.5 10.05,15.69C10.4,15.88 10.71,16.15 10.97,16.52C11.23,16.89 11.36,17.31 11.36,17.77C11.36,17.97 11.33,18.14 11.28,18.3L18.07,22.05C18.22,21.82 18.42,21.63 18.66,21.48C18.9,21.33 19.17,21.25 19.45,21.25C19.73,21.25 20,21.33 20.24,21.48C20.48,21.63 20.68,21.82 20.83,22.05L22,22.9L20.83,23.75C20.68,23.98 20.48,24.17 20.24,24.32C20,24.47 19.73,24.55 19.45,24.55C19.17,24.55 18.9,24.47 18.66,24.32C18.42,24.17 18.22,23.98 18.07,23.75L11.28,19.98C11.33,20.14 11.36,20.31 11.36,20.51C11.36,20.97 11.23,21.39 10.97,21.76C10.71,22.13 10.4,22.4 10.05,22.59C9.7,22.78 9.33,22.88 8.95,22.88C8.57,22.88 8.2,22.78 7.85,22.59C7.5,22.4 7.19,22.13 6.93,21.76C6.67,21.39 6.54,20.97 6.54,20.51C6.54,20.31 6.57,20.14 6.62,19.98L2.07,17.59C1.92,17.82 1.72,18.01 1.48,18.16C1.24,18.31 0.97,18.39 0.69,18.39C0.41,18.39 0.14,18.31 -0.1,18.16C-0.34,18.01 -0.54,17.82 -0.69,17.59L-1.86,16.74L-0.69,15.89C-0.54,15.66 -0.34,15.47 -0.1,15.32C0.14,15.17 0.41,15.09 0.69,15.09C0.97,15.09 1.24,15.17 1.48,15.32C1.72,15.47 1.92,15.66 2.07,15.89L6.62,18.28C6.57,18.12 6.54,17.95 6.54,17.75C6.54,17.29 6.67,16.87 6.93,16.5C7.19,16.13 7.5,15.86 7.85,15.67C8.2,15.48 8.57,15.38 8.95,15.38C9.33,15.38 9.7,15.48 10.05,15.67C10.4,15.86 10.71,16.13 10.97,16.5C11.23,16.87 11.36,17.29 11.36,17.75C11.36,17.95 11.33,18.12 11.28,18.28L18.07,22.03C18.22,21.8 18.42,21.61 18.66,21.46C18.9,21.31 19.17,21.23 19.45,21.23C19.73,21.23 20,21.31 20.24,21.46C20.48,21.61 20.68,21.8 20.83,22.03L22,22.88L20.83,23.73C20.68,23.96 20.48,24.15 20.24,24.3C20,24.45 19.73,24.53 19.45,24.53C19.17,24.53 18.9,24.45 18.66,24.3C18.42,24.15 18.22,23.96 18.07,23.73L11.28,19.96C11.33,20.12 11.36,20.29 11.36,20.49"/>
            </svg>
          </button>
          <button className="action-icon video">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
            </svg>
          </button>
          <button className="action-icon share">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
            </svg>
          </button>
          <button className="action-icon users">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14M8.5 8C8.5 9.7 7.2 11 5.5 11S2.5 9.7 2.5 8 3.8 5 5.5 5 8.5 6.3 8.5 8M7 18V20H0V18C0 16.3 2.7 15 6 15S12 16.3 12 18H7Z" />
            </svg>
          </button>
        </div>

        <div className="members-section">
          <h3>Members</h3>
          <div className="members-list">
            {members.map((member, index) => (
              <div key={index} className="member-item">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                  <div className="online-indicator" />
                </div>
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  {member.role && <span className="member-role">{member.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="files-section">
          <div className="files-header">
            <h3>Files</h3>
          </div>
          
          <div className="file-category">
            <div className="file-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span>115 photos</span>
              <button className="expand-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>
            </div>
            
            <div className="photos-preview">
              <div className="photo-grid">
                <div className="photo-item">
                  <img src="/api/placeholder/60/60" alt="Photo 1" />
                </div>
                <div className="photo-item">
                  <img src="/api/placeholder/60/60" alt="Photo 2" />
                </div>
              </div>
            </div>
          </div>

          <div className="file-category">
            <div className="file-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span>208 files</span>
              <button className="expand-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="file-category">
            <div className="file-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.59,13.41C11,13.8 11,14.4 10.59,14.81C10.2,15.2 9.6,15.2 9.19,14.81L7.77,13.39L6.36,14.8L10.59,19L14.8,14.81L13.39,13.4L12,14.79L10.59,13.41M14.8,9.19L10.59,5L6.36,9.19L7.77,10.6L9.19,9.19C9.6,8.8 10.2,8.8 10.59,9.19C11,9.6 11,10.2 10.59,10.61L12,12L13.39,10.6L14.8,9.19Z" />
              </svg>
              <span>47 shared links</span>
              <button className="expand-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .discord-layout {
          display: flex;
          height: 100vh;
          background: #2f3136;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #dcddde;
          overflow: hidden;
        }

        /* Server Sidebar */
        .server-sidebar {
          width: 72px;
          background: #202225;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 0;
          border-right: 1px solid #3a3a3a;
        }

        .server-logo {
          margin-bottom: 8px;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: #e8b639;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          transition: border-radius 0.2s ease;
        }

        .logo-icon:hover {
          border-radius: 16px;
        }

        .server-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .server-item {
          width: 48px;
          height: 48px;
          background: #36393f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #dcddde;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .server-item.active {
          background: #5865f2;
          color: white;
        }

        .server-item.highlighted {
          background: #e8b639;
          color: #000;
          border-radius: 16px;
        }

        .server-item:hover {
          border-radius: 16px;
          background: #5865f2;
          color: white;
        }

        .server-bottom {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .add-server {
          width: 48px;
          height: 48px;
          background: #36393f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #43b581;
          font-size: 24px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-server:hover {
          border-radius: 16px;
          background: #43b581;
          color: white;
        }

        .settings svg {
          width: 20px;
          height: 20px;
        }

        /* Conversation Sidebar */
        .conversation-sidebar {
          width: 300px;
          background: #2f3136;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #3a3a3a;
        }

        .conversation-header {
          padding: 16px;
          border-bottom: 1px solid #3a3a3a;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .header-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-info {
          flex: 1;
        }

        .username {
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 2px;
        }

        .user-status {
          font-size: 12px;
          color: #b9bbbe;
        }

        .header-title h2 {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin: 16px 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .search-btn, .settings-btn {
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          color: #b9bbbe;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .search-btn:hover, .settings-btn:hover {
          background: #3a3a3a;
          color: #dcddde;
        }

        .notification-badge {
          background: #f04747;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          top: -2px;
          right: 40px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .conversation-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 8px;
        }

        .conversation-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
          margin-bottom: 2px;
        }

        .conversation-item:hover {
          background: #3a3a3a;
        }

        .conversation-item.active {
          background: #40444b;
        }

        .conv-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .conv-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: #5865f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .online-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          background: #43b581;
          border: 3px solid #2f3136;
          border-radius: 50%;
        }

        .conv-content {
          flex: 1;
          min-width: 0;
        }

        .conv-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }

        .conv-name {
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
        }

        .conv-time {
          font-size: 11px;
          color: #72767d;
        }

        .conv-message {
          font-size: 12px;
          color: #b9bbbe;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Main Chat Area */
        .main-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #36393f;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #40444b;
          background: #36393f;
        }

        .chat-title h1 {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .chat-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          color: #b9bbbe;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #40444b;
          color: #dcddde;
        }

        .chat-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .hero-image {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
        }

        .messages-container {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-wrapper {
          margin-bottom: 8px;
        }

        .date-divider {
          text-align: center;
          color: #72767d;
          font-size: 12px;
          font-weight: 600;
          margin: 24px 0 8px 0;
          position: relative;
        }

        .date-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #40444b;
          z-index: -1;
        }

        .date-divider span {
          background: #36393f;
          padding: 0 8px;
        }

        .system-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #72767d;
          font-size: 14px;
          padding: 4px 0;
        }

        .system-icon {
          color: #43b581;
          font-weight: bold;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 4px 0;
          transition: background 0.2s ease;
        }

        .message:hover {
          background: rgba(4, 4, 5, 0.07);
        }

        .message-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .message-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          background: #43b581;
          border: 3px solid #36393f;
          border-radius: 50%;
        }

        .message-content {
          flex: 1;
          min-width: 0;
        }

        .message-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .message-author {
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
        }

        .message-time {
          font-size: 12px;
          color: #72767d;
        }

        .message-text {
          font-size: 16px;
          line-height: 1.375;
          color: #dcddde;
          margin: 0;
        }

        .video-call-notification {
          background: #40444b;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 8px 0;
        }

        .call-icon {
          width: 32px;
          height: 32px;
          background: #43b581;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .join-call-btn {
          background: #43b581;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          margin-left: auto;
        }

        .join-call-btn:hover {
          background: #3aa76d;
        }

        .message-input-container {
          padding: 24px;
          background: #40444b;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .attach-btn, .voice-btn {
          width: 44px;
          height: 44px;
          background: #40444b;
          border: none;
          color: #b9bbbe;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .attach-btn:hover, .voice-btn:hover {
          background: #36393f;
          color: #dcddde;
        }

        .message-input {
          flex: 1;
          background: #40444b;
          border: none;
          outline: none;
          color: #dcddde;
          font-size: 16px;
          padding: 12px 16px;
          border-radius: 24px;
        }

        .message-input::placeholder {
          color: #72767d;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          background: #5865f2;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .send-btn:hover {
          background: #4752c4;
        }

        /* Right Sidebar */
        .right-sidebar {
          width: 240px;
          background: #2f3136;
          border-left: 1px solid #40444b;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
        }

        .sidebar-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .action-icon {
          width: 48px;
          height: 48px;
          background: #40444b;
          border: 1px solid #72767d;
          border-radius: 50%;
          color: #dcddde;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-icon:hover {
          border-color: #dcddde;
        }

        .action-icon.phone { background: #43b581; border-color: #43b581; }
        .action-icon.video { background: #5865f2; border-color: #5865f2; }
        .action-icon.share { background: #faa61a; border-color: #faa61a; }

        .members-section {
          margin-bottom: 32px;
        }

        .members-section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .member-item:hover {
          background: #40444b;
        }

        .member-avatar {
          position: relative;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .member-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .member-name {
          font-size: 14px;
          color: #ffffff;
          font-weight: 500;
        }

        .member-role {
          background: #5865f2;
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .files-section {
          flex: 1;
        }

        .files-header {
          margin-bottom: 16px;
        }

        .files-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }

        .file-category {
          margin-bottom: 16px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: #40444b;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .file-item:hover {
          background: #36393f;
        }

        .file-item span {
          flex: 1;
          font-size: 14px;
          color: #dcddde;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #72767d;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .expand-btn:hover {
          background: #36393f;
          color: #dcddde;
        }

        .photos-preview {
          margin-top: 8px;
          padding-left: 24px;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
        }

        .photo-item {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
        }

        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 1200px) {
          .right-sidebar {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .conversation-sidebar {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .server-sidebar {
            display: none;
          }
          
          .main-chat {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-gray-950 flex items-center justify-between px-4 z-50 border-b border-gray-800">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">ICG chat</h1>
        <button onClick={() => setRightPanelOpen(!rightPanelOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {(sidebarOpen || rightPanelOpen) && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => { setSidebarOpen(false); setRightPanelOpen(false); }}
        />
      )}

      {/* Left Sidebar - Channels */}
      <div className={`w-60 bg-gray-800 flex flex-col fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Server List Placeholder */}
        <div className="h-12 bg-gray-950 flex items-center px-3 shadow-md">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
            S
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* Channel Categories */}
          <div className="px-2 mt-4">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">Work</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>ICG</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>SP</span>
              </div>
            </div>
          </div>

          <div className="px-2 mt-4">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">BFF</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>MJ</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>GI</span>
              </div>
            </div>
          </div>

          {/* Direct Messages */}
          <div className="px-2 mt-6">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-2">Direct Messages</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Richard Wilson</div>
                  <div className="text-xs text-gray-400 truncate">I will add you to our team...</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=5" alt="Sarah Parker" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Sarah Parker</div>
                  <div className="text-xs text-gray-400 truncate">You: Ok, see you soon!</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=15" alt="Abubakar Campbell" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Abubakar Campbell</div>
                  <div className="text-xs text-gray-400 truncate">You: Do you think we can do it?</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=8" alt="Nathanael Jordan" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Nathanael Jordan</div>
                  <div className="text-xs text-gray-400 truncate">I'm busy</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Conner Garcia</div>
                  <div className="text-xs text-gray-400 truncate">You: Hey, maybe we can meet...</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=9" alt="Cynthia Mckay" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Cynthia Mckay</div>
                  <div className="text-xs text-gray-400 truncate">You: Maybe</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Server Button */}
        <div className="h-14 bg-gray-950 flex items-center justify-center">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-2xl text-black font-bold hover:rounded-2xl transition-all cursor-pointer">
            +
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 pt-14 lg:pt-0">
        {/* Header - Desktop Only */}
        <div className="hidden lg:flex h-12 bg-gray-950 items-center px-4 shadow-md border-b border-gray-800">
          <h1 className="text-lg font-semibold text-white">ICG chat</h1>
          <div className="ml-auto flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-800 rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-yellow-500 rounded-full" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col relative">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=1200"
                alt="Background"
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900" />
            </div>

            <div className="relative flex-1 overflow-y-auto p-4 space-y-4">
              {/* Date Separator */}
              <div className="text-center text-xs text-gray-500 my-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full">9 Sep 2024</span>
              </div>

              {/* System Message */}
              <div className="flex items-center justify-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span>Richard Wilson added You</span>
                <span className="text-xs text-gray-500 ml-2">6.15 pm</span>
              </div>

              {/* Messages */}
              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Conner Garcia</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Hey guys! Don't forget about our meeting next week! I'll be waiting for you at the "Cozy Corner" cafe at 6:00 PM. Don't be late!</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Richard Wilson</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Absolutely, I'll be there! Looking forward to catching up and discussing everything.</p>
                </div>
              </div>

              {/* Another Date Separator */}
              <div className="text-center text-xs text-gray-500 my-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full">10 Sep 2024</span>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=14" alt="Lawrence Patterson" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Lawrence Patterson</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">@rwilson @jparker I have a new game plan</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=8" alt="Jaden Parker" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Jaden Parker</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Let's discuss this tomorrow</p>
                </div>
              </div>

              {/* Video Call Started */}
              <div className="flex items-center justify-center space-x-3 py-4 bg-gray-800/30 rounded-lg mx-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300"><span className="text-yellow-500 font-medium">Richard Wilson</span> started a video call</span>
                <button className="bg-green-600 hover:bg-green-500 px-5 py-1.5 rounded-lg text-sm font-medium text-white transition-colors">
                  Join
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div className="relative p-4">
              <div className="flex items-center bg-gray-800 rounded-full px-4">
                <button className="p-2 text-gray-400 hover:text-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 bg-transparent py-3 px-2 focus:outline-none text-gray-200"
                />
                <button className="p-2 text-gray-400 hover:text-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-2 ml-1 bg-yellow-500 rounded-full text-gray-900 hover:bg-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Members & Files */}
          <div className={`w-64 bg-gray-800 flex flex-col border-l border-gray-700 fixed lg:relative inset-y-0 right-0 z-50 transform transition-transform duration-300 ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            {/* Action Buttons */}
            <div className="p-3 flex space-x-2 border-b border-gray-700">
              <button className="w-9 h-9 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 transition-colors hover:bg-yellow-500/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </button>
            </div>

            {/* Members */}
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-3">Members</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm flex-1">Richard Wilson</span>
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">Admin</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=3" alt="You" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm">You</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=8" alt="Jaden Perker" fill className="rounded-full object-cover" />
                  </div>
                  <span className="text-sm">Jaden Perker</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm">Conner Garcia</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=14" alt="Lawrence Patterson" fill className="rounded-full object-cover" />
                  </div>
                  <span className="text-sm">Lawrence Patterson</span>
                </div>
              </div>
            </div>

            {/* Files */}
            <div className="p-4 flex-1 overflow-y-auto">
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-3">Files</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">115 photos</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative h-20 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200"
                        alt="Preview 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-20 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200"
                        alt="Preview 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">208 files</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm">47 shared links</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
