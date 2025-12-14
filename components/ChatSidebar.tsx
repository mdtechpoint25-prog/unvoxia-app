'use client';

import { useState } from 'react';
import Image from 'next/image';

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

interface WorkspaceGroup {
  id: string;
  name: string;
  conversations: Conversation[];
}

interface ChatSidebarProps {
  workspaces: WorkspaceGroup[];
  activeConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat?: () => void;
}

const MOCK_WORKSPACES: WorkspaceGroup[] = [
  {
    id: 'work',
    name: 'Work',
    conversations: [
      {
        id: '1',
        name: 'Richard Wilson',
        initials: 'RW',
        lastMessage: 'I will add you to our team, we...',
        timestamp: '2h ago',
        isOnline: true,
      },
    ],
  },
  {
    id: 'icg',
    name: 'ICG',
    conversations: [
      {
        id: '2',
        name: 'ICG chat',
        initials: 'IC',
        lastMessage: "Jaden: Let's discuss this tom...",
        timestamp: '30m ago',
        isGroup: true,
        unreadCount: 3,
      },
    ],
  },
  {
    id: 'sp',
    name: 'SP',
    conversations: [
      {
        id: '3',
        name: 'Sarah Parker',
        initials: 'SP',
        lastMessage: 'You: Ok, see you soon!',
        timestamp: '1h ago',
      },
    ],
  },
  {
    id: 'bff',
    name: 'BFF',
    conversations: [
      {
        id: '4',
        name: 'Abubakar Campbell',
        initials: 'AC',
        lastMessage: 'You: Do you think we can do it?',
        timestamp: '3h ago',
        isOnline: true,
      },
    ],
  },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '5',
    name: 'Nathanael Jordan',
    initials: 'NJ',
    lastMessage: "I'm busy",
    timestamp: '4h ago',
  },
  {
    id: '6',
    name: 'Conner Garcia',
    initials: 'CG',
    lastMessage: 'You: Hey, maybe we can meet...',
    timestamp: '5h ago',
    isOnline: true,
  },
  {
    id: '7',
    name: 'Cynthia Mckay',
    initials: 'CM',
    lastMessage: 'You: Maybe',
    timestamp: '6h ago',
  },
  {
    id: '8',
    name: 'Cora Richards',
    initials: 'CR',
    lastMessage: 'Will you go play?',
    timestamp: '1d ago',
    isOnline: true,
  },
  {
    id: '9',
    name: 'Lawrence Patterson',
    initials: 'LP',
    lastMessage: "I'll ask the guys what they think",
    timestamp: '1d ago',
  },
  {
    id: '10',
    name: 'Lukas Mcgowan',
    initials: 'LM',
    lastMessage: 'You: We can try this strategy I...',
    timestamp: '2d ago',
  },
  {
    id: '11',
    name: 'Alia Bonner',
    initials: 'AB',
    lastMessage: 'Had a great time yesterday',
    timestamp: '2d ago',
    isOnline: true,
  },
  {
    id: '12',
    name: 'Fletcher Morse',
    initials: 'FM',
    lastMessage: "You: I need to work, sorry",
    timestamp: '3d ago',
  },
];

// Logo icon component
const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#d4a855"/>
    <path d="M10 8h4v16h-4V8zm8 0h4v16h-4V8z" fill="#1a1a1a"/>
    <path d="M10 14h12v4H10v-4z" fill="#1a1a1a"/>
  </svg>
);

// Settings icon
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

// Plus icon for new chat
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function ChatSidebar({
  workspaces = MOCK_WORKSPACES,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const [conversations] = useState(MOCK_CONVERSATIONS);

  return (
    <div className="chat-sidebar">
      {/* Workspace Navigation */}
      <div className="workspace-nav">
        <div className="logo-container">
          <LogoIcon />
        </div>
        
        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
            className="workspace-btn"
            title={workspace.name}
          >
            {workspace.name}
          </button>
        ))}
        
        <div className="workspace-spacer" />
        
        <button className="workspace-btn settings-btn" title="Settings">
          <SettingsIcon />
        </button>
      </div>

      {/* Conversations List */}
      <div className="conversations-panel">
        {/* All conversations */}
        <div className="conversations-list">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className={`conversation-item ${activeConversationId === conv.id ? 'active' : ''}`}
              onClick={() => onSelectConversation(conv)}
            >
              <div className="avatar-container">
                {conv.avatar ? (
                  <Image 
                    src={conv.avatar} 
                    alt={conv.name} 
                    width={44} 
                    height={44}
                    className="avatar-img"
                  />
                ) : (
                  <div className={`avatar-initials ${conv.isGroup ? 'group' : ''}`}>
                    {conv.initials || conv.name.charAt(0)}
                  </div>
                )}
                {conv.isOnline && <span className="online-indicator" />}
              </div>
              
              <div className="conversation-info">
                <div className="conversation-header">
                  <span className="conversation-name">{conv.name}</span>
                  <span className="conversation-time">{conv.timestamp}</span>
                </div>
                <p className="conversation-preview">{conv.lastMessage}</p>
              </div>
              
              {conv.unreadCount && conv.unreadCount > 0 && (
                <span className="unread-badge">{conv.unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* New Chat Button */}
        <button className="new-chat-btn" onClick={onNewChat}>
          <PlusIcon />
        </button>
      </div>

      <style jsx>{`
        .chat-sidebar {
          display: flex;
          height: 100%;
          background: #1a1a1a;
        }

        .workspace-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 72px;
          padding: 16px 0;
          background: #1a1a1a;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo-container {
          margin-bottom: 24px;
        }

        .workspace-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.08);
          color: #b3b3b3;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .workspace-btn:hover {
          background: rgba(212, 168, 85, 0.15);
          color: #d4a855;
        }

        .workspace-spacer {
          flex: 1;
        }

        .settings-btn {
          color: #808080;
        }

        .conversations-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #1a1a1a;
          position: relative;
          min-width: 280px;
          max-width: 320px;
        }

        .conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .conversation-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
        }

        .conversation-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .conversation-item.active {
          background: rgba(212, 168, 85, 0.12);
        }

        .avatar-container {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-initials {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a855 0%, #c49a4a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .avatar-initials.group {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
        }

        .avatar-img {
          border-radius: 50%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #4ade80;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
        }

        .conversation-info {
          flex: 1;
          min-width: 0;
        }

        .conversation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .conversation-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #ffffff;
        }

        .conversation-time {
          font-size: 0.7rem;
          color: #808080;
        }

        .conversation-preview {
          font-size: 0.8rem;
          color: #808080;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }

        .unread-badge {
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          background: #d4a855;
          color: #1a1a1a;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .new-chat-btn {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: #d4a855;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(212, 168, 85, 0.4);
          transition: all 0.2s ease;
        }

        .new-chat-btn:hover {
          background: #e8c06a;
          transform: translateX(-50%) scale(1.05);
        }

        /* Scrollbar styling */
        .conversations-list::-webkit-scrollbar {
          width: 6px;
        }

        .conversations-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .conversations-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .conversations-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
