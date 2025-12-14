"use client";

import { useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  const [activeChat, setActiveChat] = useState("ICG chat");

  const conversations = [
    { id: 1, name: "Richard Wilson", message: "I will add you to our team, we...", avatar: "/images/avatar1.jpg", online: true },
    { id: 2, name: "ICG chat", message: "Jaden: Let's discuss this tom...", avatar: "/images/avatar2.jpg", group: true },
    { id: 3, name: "Sarah Parker", message: "You: Ok, see you soon!", avatar: "/images/avatar3.jpg", online: true },
    { id: 4, name: "Abubakar Campbell", message: "You: Do you think we can do it?", avatar: "/images/avatar4.jpg", online: false },
    { id: 5, name: "Nathanael Jordan", message: "I'm busy", avatar: "/images/avatar5.jpg", online: true },
    { id: 6, name: "Conner Garcia", message: "You: Hey, maybe we can meet...", avatar: "/images/avatar6.jpg", online: false },
    { id: 7, name: "Cynthia Mckay", message: "You: Maybe", avatar: "/images/avatar7.jpg", online: true },
    { id: 8, name: "Cora Richards", message: "Will you go play?", avatar: "/images/avatar8.jpg", online: false },
    { id: 9, name: "Lawrence Patterson", message: "I miss the guys what they think", avatar: "/images/avatar9.jpg", online: true },
    { id: 10, name: "Lukas Mcgowan", message: "You: We can try this strategy I...", avatar: "/images/avatar10.jpg", online: false },
    { id: 11, name: "Alia Bonner", message: "I had a great time yesterday", avatar: "/images/avatar11.jpg", online: true },
    { id: 12, name: "Fletcher Morse", message: "You: I need to work, sorry", avatar: "/images/avatar12.jpg", online: true },
  ];

  const members = [
    { id: 1, name: "Richard Wilson", role: "Admin", avatar: "/images/avatar1.jpg", online: true },
    { id: 2, name: "You", avatar: "/images/avatar-you.jpg", online: true },
    { id: 3, name: "Jaden Parker", avatar: "/images/avatar-jaden.jpg", online: false },
    { id: 4, name: "Conner Garcia", avatar: "/images/avatar-conner.jpg", online: true },
    { id: 5, name: "Lawrence Patterson", avatar: "/images/avatar-lawrence.jpg", online: false },
  ];

  const messages = [
    { id: 1, author: "Richard Wilson", text: "added You", time: "6:15 pm", system: true, date: "9 Sep 2024" },
    { id: 2, author: "Conner Garcia", text: "Hey guys! Don't forget about our meeting next week! I'll be waiting for you at the 'Cozy Corner' cafe at 6:00 PM. Don't be late!", time: "6:25 pm", avatar: "/images/avatar-conner.jpg" },
    { id: 3, author: "Richard Wilson", text: "Absolutely, I'll be there! Looking forward to catching up and discussing everything.", time: "6:25 pm", avatar: "/images/avatar1.jpg", date: "10 Sep 2024" },
    { id: 4, author: "Lawrence Patterson", text: "@wilson @jparker I have a new game plan", time: "6:25 pm", avatar: "/images/avatar-lawrence.jpg" },
    { id: 5, author: "Jaden Parker", text: "Let's discuss this tomorrow", time: "6:25 pm", avatar: "/images/avatar-jaden.jpg" },
  ];

  return (
    <div className="chat-app">
      {/* LEFT SIDEBAR */}
      <aside className="left-sidebar">
        <div className="logo">
          <div className="logo-circle">
            <span className="logo-letter">S</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-circle active">Work</button>
          <button className="nav-circle highlight">IC</button>
          <button className="nav-circle">SP</button>
          <button className="nav-circle">BFF</button>
          <button className="nav-circle">MJ</button>
          <button className="nav-circle">GI</button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-circle settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
            </svg>
          </button>
          <button className="add-circle">+</button>
        </div>
      </aside>

      {/* CONVERSATIONS PANEL */}
      <aside className="conversations-panel">
        <div className="conversations-header">
          <h2>Messages</h2>
          <button className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>

        <div className="conversations-list">
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              className={`conversation-item ${activeChat === conv.name ? 'active' : ''}`}
              onClick={() => setActiveChat(conv.name)}
            >
              <div className="conv-avatar">
                <div className="avatar-placeholder" style={{ background: `hsl(${conv.id * 35}, 70%, 60%)` }}>
                  {conv.name.charAt(0)}
                </div>
                {conv.online && <span className="status-dot"></span>}
              </div>
              <div className="conv-info">
                <div className="conv-header">
                  <h3>{conv.name}</h3>
                </div>
                <p className="conv-message">{conv.message}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="main-chat">
        <header className="chat-header">
          <div className="chat-title-area">
            <h1 className="chat-title">{activeChat}</h1>
          </div>
          <div className="chat-actions">
            <button className="icon-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="icon-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
              </svg>
            </button>
            <div className="avatar-group">
              <div className="small-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>R</div>
            </div>
          </div>
        </header>

        <div className="chat-hero">
          <div className="hero-image">
            <div className="hero-placeholder"></div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className="message-wrapper">
              {msg.date && <div className="date-separator">{msg.date}</div>}
              
              {msg.system ? (
                <div className="system-message">
                  <span className="sys-icon">→</span>
                  <span><strong>{msg.author}</strong> {msg.text}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
              ) : (
                <div className="message">
                  <div className="msg-avatar">
                    <div className="avatar-placeholder" style={{ background: `hsl(${msg.id * 40}, 65%, 55%)` }}>
                      {msg.author.charAt(0)}
                    </div>
                    <span className="status-indicator"></span>
                  </div>
                  <div className="msg-content">
                    <div className="msg-header">
                      <strong className="msg-author">{msg.author}</strong>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                    <p className="msg-text">{msg.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="video-call-banner">
            <span className="call-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </span>
            <span><strong>Richard Wilson</strong> started a video call</span>
            <button className="join-btn">Join</button>
          </div>
        </div>

        <div className="message-input-area">
          <button className="attach-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          <input type="text" placeholder="Write a message..." className="message-input" />
          <button className="voice-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
            </svg>
          </button>
          <button className="send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="right-sidebar">
        <div className="sidebar-actions">
          <button className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
          <button className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </button>
          <button className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </button>
          <button className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </button>
        </div>

        <div className="members-section">
          <h3 className="section-title">Members</h3>
          <div className="members-list">
            {members.map((member) => (
              <div key={member.id} className="member-item">
                <div className="member-avatar">
                  <div className="avatar-placeholder" style={{ background: `hsl(${member.id * 50}, 60%, 55%)` }}>
                    {member.name.charAt(0)}
                  </div>
                  {member.online && <span className="online-dot"></span>}
                </div>
                <span className="member-name">{member.name}</span>
                {member.role && <span className="member-role">{member.role}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="files-section">
          <div className="section-header">
            <h3 className="section-title">Files</h3>
          </div>
          
          <div className="files-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>116 photos</span>
            <button className="expand-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
          </div>

          <div className="files-preview">
            <div className="preview-grid">
              <div className="preview-img"></div>
              <div className="preview-img"></div>
            </div>
          </div>

          <div className="files-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
              <polyline points="13 2 13 9 20 9"/>
            </svg>
            <span>208 files</span>
            <button className="expand-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          <div className="files-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span>47 shared links</span>
            <button className="expand-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .chat-app {
          display: grid;
          grid-template-columns: 80px 320px 1fr 280px;
          height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }

        /* LEFT SIDEBAR */
        .left-sidebar {
          background: #000000;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 0;
          gap: 32px;
        }

        .logo {
          margin-bottom: 8px;
        }

        .logo-circle {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #c4e84b, #b8e62d);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-letter {
          font-size: 24px;
          font-weight: 700;
          color: #000;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .nav-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a1a1a;
          color: #888;
          border: none;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-circle.active {
          background: #2a2a2a;
          color: #fff;
        }

        .nav-circle.highlight {
          background: #1a1a1a;
          color: #fff;
          border: 2px solid #888;
        }

        .nav-circle.settings {
          background: transparent;
          color: #666;
        }

        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: auto;
        }

        .add-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #c4e84b;
          color: #000;
          border: none;
          font-size: 24px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s;
        }

        /* CONVERSATIONS PANEL */
        .conversations-panel {
          background: #141414;
          border-right: 1px solid #1f1f1f;
          display: flex;
          flex-direction: column;
        }

        .conversations-header {
          padding: 20px 20px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f1f1f;
        }

        .conversations-header h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .search-icon {
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .search-icon:hover {
          background: #1f1f1f;
          color: #fff;
        }

        .conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .conversation-item {
          display: flex;
          gap: 12px;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .conversation-item:hover {
          background: #1a1a1a;
        }

        .conversation-item.active {
          background: #1f1f1f;
        }

        .conv-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          color: #fff;
        }

        .status-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #10b981;
          border: 2px solid #141414;
          border-radius: 50%;
        }

        .conv-info {
          flex: 1;
          min-width: 0;
        }

        .conv-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .conv-header h3 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .conv-message {
          font-size: 13px;
          color: #888;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* MAIN CHAT */
        .main-chat {
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: #000;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f1f1f;
        }

        .chat-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .chat-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          background: #1a1a1a;
          border: none;
          color: #888;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #2a2a2a;
          color: #fff;
        }

        .avatar-group {
          display: flex;
          margin-left: 8px;
        }

        .small-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #fff;
          border: 2px solid #000;
        }

        .chat-hero {
          padding: 20px 24px;
          background: #000;
          border-bottom: 1px solid #1f1f1f;
        }

        .hero-image {
          border-radius: 16px;
          overflow: hidden;
          height: 200px;
        }

        .hero-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3a2a1a 0%, #1a1a0a 50%, #2a3a1a 100%);
          position: relative;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .date-separator {
          text-align: center;
          color: #666;
          font-size: 12px;
          font-weight: 500;
          margin: 12px 0;
        }

        .system-message {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #888;
          padding: 8px 0;
        }

        .sys-icon {
          color: #666;
        }

        .message {
          display: flex;
          gap: 12px;
        }

        .msg-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .msg-avatar .avatar-placeholder {
          width: 40px;
          height: 40px;
          font-size: 15px;
        }

        .status-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #10b981;
          border: 2px solid #0a0a0a;
          border-radius: 50%;
        }

        .msg-content {
          flex: 1;
        }

        .msg-header {
          display: flex;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .msg-author {
          font-size: 14px;
          font-weight: 600;
        }

        .msg-time {
          font-size: 12px;
          color: #666;
        }

        .msg-text {
          font-size: 14px;
          color: #ccc;
          line-height: 1.5;
          margin: 0;
        }

        .video-call-banner {
          background: #1a1a1a;
          padding: 14px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          margin-top: 8px;
        }

        .call-icon {
          color: #fff;
          display: flex;
        }

        .join-btn {
          margin-left: auto;
          padding: 8px 20px;
          background: #c4e84b;
          color: #000;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .join-btn:hover {
          background: #b8d840;
        }

        .message-input-area {
          padding: 16px 24px;
          background: #000;
          border-top: 1px solid #1f1f1f;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .attach-btn, .voice-btn, .send-btn {
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .attach-btn:hover, .voice-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .send-btn {
          background: #1a1a1a;
          color: #fff;
        }

        .send-btn:hover {
          background: #2a2a2a;
        }

        .message-input {
          flex: 1;
          background: #1a1a1a;
          border: none;
          padding: 12px 16px;
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .message-input::placeholder {
          color: #666;
        }

        /* RIGHT SIDEBAR */
        .right-sidebar {
          background: #000;
          border-left: 1px solid #1f1f1f;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-actions {
          display: flex;
          justify-content: space-around;
          padding: 12px 0;
        }

        .action-icon {
          width: 44px;
          height: 44px;
          background: #1a1a1a;
          border: none;
          color: #888;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-icon:hover {
          background: #2a2a2a;
          color: #fff;
        }

        .members-section {
          background: #0a0a0a;
          border-radius: 12px;
          padding: 16px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .member-avatar {
          position: relative;
        }

        .member-avatar .avatar-placeholder {
          width: 36px;
          height: 36px;
          font-size: 14px;
        }

        .online-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 9px;
          height: 9px;
          background: #10b981;
          border: 2px solid #000;
          border-radius: 50%;
        }

        .member-name {
          font-size: 14px;
          font-weight: 500;
        }

        .member-role {
          margin-left: auto;
          font-size: 12px;
          color: #888;
          background: #1a1a1a;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .files-section {
          background: #0a0a0a;
          border-radius: 12px;
          padding: 16px;
        }

        .section-header {
          margin-bottom: 16px;
        }

        .files-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-bottom: 1px solid #1a1a1a;
          font-size: 13px;
          color: #ccc;
        }

        .files-item:last-child {
          border-bottom: none;
        }

        .files-item svg {
          color: #888;
        }

        .expand-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .files-preview {
          padding: 12px 0 8px;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .preview-img {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #2a3a1a 0%, #1a2a0a 100%);
          border-radius: 8px;
        }

        @media (max-width: 1400px) {
          .right-sidebar {
            display: none;
          }
          .chat-app {
            grid-template-columns: 80px 320px 1fr;
          }
        }

        @media (max-width: 1024px) {
          .conversations-panel {
            display: none;
          }
          .chat-app {
            grid-template-columns: 80px 1fr;
          }
        }

        @media (max-width: 768px) {
          .left-sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            flex-direction: row;
            height: 64px;
            padding: 0 20px;
            z-index: 100;
            border-top: 1px solid #1f1f1f;
          }
          .chat-app {
            grid-template-columns: 1fr;
            padding-bottom: 64px;
          }
          .sidebar-nav {
            flex-direction: row;
          }
          .sidebar-bottom {
            flex-direction: row;
            margin-top: 0;
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
}
