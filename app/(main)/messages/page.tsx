'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatView from '@/components/ChatView';
import ChatMembers from '@/components/ChatMembers';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  isOnline?: boolean;
  isGroup?: boolean;
}

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation>({
    id: '2',
    name: 'ICG chat',
    lastMessage: "Jaden: Let's discuss this tom...",
    isGroup: true,
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="messages-page">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1 className="mobile-title">{activeConversation?.name || 'Messages'}</h1>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && <div className="overlay" onClick={() => setIsMobileSidebarOpen(false)} />}

      {/* Main Layout */}
      <div className="chat-layout">
        <div className={`sidebar-wrap ${isMobileSidebarOpen ? 'open' : ''}`}>
          <ChatSidebar
            activeConversationId={activeConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewChat={() => {}}
          />
        </div>

        <div className="chat-wrap">
          <ChatView chatName={activeConversation.name} onSendMessage={() => {}} onJoinCall={() => {}} />
        </div>

        <div className="members-wrap">
          <ChatMembers />
        </div>
      </div>

      <style jsx>{`
        .messages-page {
          height: 100vh;
          background: #1a1a1a;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .mobile-header {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .menu-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 40;
        }

        .chat-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .sidebar-wrap {
          flex-shrink: 0;
          height: 100%;
        }

        .chat-wrap {
          flex: 1;
          min-width: 0;
          height: 100%;
        }

        .members-wrap {
          flex-shrink: 0;
          height: 100%;
        }

        @media (max-width: 1200px) {
          .members-wrap { display: none; }
        }

        @media (max-width: 768px) {
          .mobile-header { display: flex; }
          .overlay { display: block; }
          
          .sidebar-wrap {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .sidebar-wrap.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
