'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role?: 'admin' | 'member';
  isCurrentUser?: boolean;
}

interface FileItem {
  id: string;
  name: string;
  type: 'photo' | 'file' | 'link';
  preview?: string;
  count?: number;
}

interface ChatMembersProps {
  members?: Member[];
  files?: FileItem[];
}

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Richard Wilson', role: 'admin' },
  { id: '2', name: 'You', isCurrentUser: true },
  { id: '3', name: 'Jaden Perker' },
  { id: '4', name: 'Conner Garcia' },
  { id: '5', name: 'Lawrence Patterson' },
];

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'Photos', type: 'photo', count: 115 },
  { id: '2', name: 'Files', type: 'file', count: 208 },
  { id: '3', name: 'Shared links', type: 'link', count: 47 },
];

// Icons
const PhotoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ 
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ChatMembers({
  members = MOCK_MEMBERS,
  files = MOCK_FILES,
}: ChatMembersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    photos: true,
    files: false,
    links: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <PhotoIcon />;
      case 'file':
        return <FileIcon />;
      case 'link':
        return <LinkIcon />;
      default:
        return <FileIcon />;
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
    <div className="chat-members">
      {/* Members Section */}
      <div className="section">
        <h3 className="section-title">Members</h3>
        <div className="members-list">
          {members.map((member) => (
            <div key={member.id} className="member-item">
              <div 
                className="member-avatar"
                style={{ background: getAvatarColor(member.name) }}
              >
                {member.avatar ? (
                  <Image 
                    src={member.avatar} 
                    alt={member.name}
                    width={36}
                    height={36}
                    className="avatar-img"
                  />
                ) : (
                  <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>
              <span className="member-name">
                {member.isCurrentUser ? 'You' : member.name}
              </span>
              {member.role === 'admin' && (
                <span className="admin-badge">Admin</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div className="section">
        <h3 className="section-title">Files</h3>
        
        {/* Photos */}
        <button 
          className="file-category"
          onClick={() => toggleSection('photos')}
        >
          <div className="category-info">
            <PhotoIcon />
            <span className="category-count">115 photos</span>
          </div>
          <ChevronIcon expanded={expandedSections.photos} />
        </button>
        
        {expandedSections.photos && (
          <div className="photo-grid">
            <div className="photo-item">
              <Image
                src="/original-6cba10c1ba27f5f9c7fee5a1381aa1de.webp"
                alt="Photo 1"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="photo-item">
              <Image
                src="/original-99e65cf9fa036d9fb855c8c614021298.webp"
                alt="Photo 2"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        {/* Files */}
        <button 
          className="file-category"
          onClick={() => toggleSection('files')}
        >
          <div className="category-info">
            <FileIcon />
            <span className="category-count">208 files</span>
          </div>
          <ChevronIcon expanded={expandedSections.files} />
        </button>

        {/* Links */}
        <button 
          className="file-category"
          onClick={() => toggleSection('links')}
        >
          <div className="category-info">
            <LinkIcon />
            <span className="category-count">47 shared links</span>
          </div>
          <ChevronIcon expanded={expandedSections.links} />
        </button>
      </div>

      <style jsx>{`
        .chat-members {
          width: 280px;
          background: #1f1f1f;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
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
          gap: 12px;
        }

        .member-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 0.7rem;
          flex-shrink: 0;
        }

        .avatar-img {
          border-radius: 50%;
          object-fit: cover;
        }

        .member-name {
          flex: 1;
          color: #e0e0e0;
          font-size: 0.9rem;
        }

        .admin-badge {
          font-size: 0.7rem;
          color: #808080;
          background: rgba(255, 255, 255, 0.08);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .file-category {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #e0e0e0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.2s ease;
        }

        .file-category:hover {
          color: #d4a855;
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-count {
          font-size: 0.9rem;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 12px 0;
        }

        .photo-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          background: #2d2d2d;
        }

        /* Scrollbar */
        .chat-members::-webkit-scrollbar {
          width: 6px;
        }

        .chat-members::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-members::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        @media (max-width: 1200px) {
          .chat-members {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
