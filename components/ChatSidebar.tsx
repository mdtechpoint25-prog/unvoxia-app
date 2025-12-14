'use client';

import { useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isYou?: boolean;
  isOnline?: boolean;
  isGroup?: boolean;
  groupColor?: string;
}

interface ChatSidebarProps {
  activeConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat?: () => void;
}

// Workspace icons - just icons, no text
const WorkspaceIcon = ({ label }: { label: string }) => (
  <div className="workspace-icon">{label}</div>
);

// Logo SVG matching the design
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#d4a855"/>
    <path d="M8 7h3v14H8V7zm9 0h3v14h-3V7z" fill="#1a1a1a"/>
    <path d="M8 12h12v4H8v-4z" fill="#1a1a1a"/>
  </svg>
);

// Settings icon
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

// Plus icon
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Richard Wilson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'I will add you to our team, we...',
    isOnline: true,
  },
  {
    id: '2',
    name: 'ICG chat',
    avatar: '',
    lastMessage: "Jaden: Let's discuss this tom...",
    isGroup: true,
    groupColor: '#a855f7',
  },
  {
    id: '3',
    name: 'Sarah Parker',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'You: Ok, see you soon!',
    isYou: true,
  },
  {
    id: '4',
    name: 'Abubakar Campbell',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'You: Do you think we can do it?',
    isYou: true,
    isOnline: true,
  },
  {
    id: '5',
    name: 'Nathanael Jordan',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: "I'm busy",
  },
  {
    id: '6',
    name: 'Conner Garcia',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'You: Hey, maybe we can meet...',
    isYou: true,
    isOnline: true,
  },
  {
    id: '7',
    name: 'Cynthia Mckay',
    avatar: 'https://i.pravatar.cc/150?img=9',
    lastMessage: 'You: Maybe',
    isYou: true,
  },
  {
    id: '8',
    name: 'Cora Richards',
    avatar: 'https://i.pravatar.cc/150?img=16',
    lastMessage: 'Will you go play?',
    isOnline: true,
  },
  {
    id: '9',
    name: 'Lawrence Patterson',
    avatar: 'https://i.pravatar.cc/150?img=14',
    lastMessage: "I'll ask the guys what they think",
  },
  {
    id: '10',
    name: 'Lukas Mcgowan',
    avatar: 'https://i.pravatar.cc/150?img=17',
    lastMessage: 'You: We can try this strategy I...',
    isYou: true,
  },
  {
    id: '11',
    name: 'Alia Bonner',
    avatar: 'https://i.pravatar.cc/150?img=20',
    lastMessage: 'Had a great time yesterday',
    isOnline: true,
  },
  {
    id: '12',
    name: 'Fletcher Morse',
    avatar: 'https://i.pravatar.cc/150?img=18',
    lastMessage: "You: I need to work, sorry",
    isYou: true,
  },
];

const WORKSPACES = ['Work', 'ICG', 'SP', 'BFF', 'MJ', 'GI'];

export default function ChatSidebar({
  activeConversationId = '2',
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const [conversations] = useState(CONVERSATIONS);

  return (
    <div className="chat-sidebar">
      {/* Left Icon Bar */}
      <div className="icon-bar">
        <div className="logo">
          <LogoIcon />
        </div>
        
        <div className="workspace-list">
          {WORKSPACES.map((ws) => (
            <button key={ws} className="workspace-btn">
              <WorkspaceIcon label={ws} />
            </button>
          ))}
        </div>
        
        <button className="settings-btn">
          <SettingsIcon />
        </button>
      </div>

      {/* Conversations Panel */}
      <div className="conversations-panel">
        <div className="conversations-list">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className={`conversation-item ${activeConversationId === conv.id ? 'active' : ''}`}
              onClick={() => onSelectConversation(conv)}
            >
              <div className="avatar-wrapper">
                {conv.isGroup ? (
                  <div className="group-avatar" style={{ background: conv.groupColor }}>
                    IC
                  </div>
                ) : (
                  <img src={conv.avatar} alt={conv.name} className="avatar-img" />
                )}
                {conv.isOnline && <span className="online-dot" />}
              </div>
              
              <div className="conv-info">
                <span className="conv-name">{conv.name}</span>
                <span className="conv-preview">{conv.lastMessage}</span>
              </div>
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

        .icon-bar {
          width: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 0;
          background: #1a1a1a;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .logo {
          margin-bottom: 24px;
        }

        .workspace-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .workspace-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .workspace-btn:hover {
          background: rgba(212, 168, 85, 0.15);
        }

        .workspace-icon {
          color: #808080;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .workspace-btn:hover .workspace-icon {
          color: #d4a855;
        }

        .settings-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #606060;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .settings-btn:hover {
          color: #d4a855;
        }

        .conversations-panel {
          width: 280px;
          display: flex;
          flex-direction: column;
          background: #1a1a1a;
          position: relative;
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
          padding: 10px 12px;
          border-radius: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.15s;
        }

        .conversation-item:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .conversation-item.active {
          background: rgba(212, 168, 85, 0.1);
        }

        .avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .group-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .online-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
        }

        .conv-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .conv-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .conv-preview {
          font-size: 0.8rem;
          color: #707070;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .new-chat-btn {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          background: #d4a855;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(212, 168, 85, 0.4);
          transition: all 0.2s;
        }

        .new-chat-btn:hover {
          background: #e8c06a;
          transform: translateX(-50%) scale(1.05);
        }

        .conversations-list::-webkit-scrollbar {
          width: 4px;
        }

        .conversations-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .conversations-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
