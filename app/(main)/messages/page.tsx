'use client';

import { useState, useEffect } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatView from '@/components/ChatView';
import ChatMembers from '@/components/ChatMembers';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  lastMessage: string;
  timestamp: string;
  isOnline?: boolean;
  unreadCount?: number;
  isGroup?: boolean;
}

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>({
    id: '2',
    name: 'ICG chat',
    initials: 'IC',
    lastMessage: "Jaden: Let's discuss this tom...",
    timestamp: '30m ago',
    isGroup: true,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setIsMobileSidebarOpen(false);
  };

  const handleNewChat = () => {
    console.log('New chat clicked');
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  const handleJoinCall = () => {
    console.log('Joining call');
  };

  return (
    <div className="messages-page">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="menu-btn"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1 className="mobile-title">
          {activeConversation?.name || 'Messages'}
        </h1>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="chat-layout">
        {/* Left Sidebar */}
        <div className={`sidebar-container ${isMobileSidebarOpen ? 'open' : ''}`}>
          <ChatSidebar
            workspaces={[]}
            activeConversationId={activeConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Main Chat View */}
        <div className="chat-container">
          {activeConversation ? (
            <ChatView
              chatName={activeConversation.name}
              onSendMessage={handleSendMessage}
              onJoinCall={handleJoinCall}
            />
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <span className="empty-icon">💬</span>
                <h2>Select a conversation</h2>
                <p>Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Members */}
        <div className="members-container">
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .menu-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .chat-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .sidebar-container {
          flex-shrink: 0;
          height: 100%;
          overflow: hidden;
        }

        .chat-container {
          flex: 1;
          min-width: 0;
          height: 100%;
          overflow: hidden;
        }

        .members-container {
          flex-shrink: 0;
          height: 100%;
          overflow: hidden;
        }

        .no-chat-selected {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #242424;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
        }

        .empty-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 16px;
        }

        .empty-state h2 {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #808080;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .members-container {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          .sidebar-overlay {
            display: block;
          }

          .sidebar-container {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar-container.open {
            transform: translateX(0);
          }

          .chat-layout {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
