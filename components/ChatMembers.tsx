'use client';

import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role?: 'admin';
  isYou?: boolean;
}

const MEMBERS: Member[] = [
  { id: '1', name: 'Richard Wilson', avatar: 'https://i.pravatar.cc/150?img=12', role: 'admin' },
  { id: '2', name: 'You', avatar: 'https://i.pravatar.cc/150?img=3', isYou: true },
  { id: '3', name: 'Jaden Perker', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '4', name: 'Conner Garcia', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '5', name: 'Lawrence Patterson', avatar: 'https://i.pravatar.cc/150?img=14' },
];

// Icons
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76Z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const PhotoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ChatMembers() {
  const [photosOpen, setPhotosOpen] = useState(true);
  const [filesOpen, setFilesOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);

  return (
    <div className="chat-members">
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn active"><PhoneIcon /></button>
        <button className="action-btn"><VideoIcon /></button>
        <button className="action-btn"><PinIcon /></button>
        <button className="action-btn"><UsersIcon /></button>
      </div>

      {/* Members Section */}
      <div className="section">
        <h3 className="section-title">Members</h3>
        <div className="members-list">
          {MEMBERS.map((member) => (
            <div key={member.id} className="member-row">
              <img src={member.avatar} alt={member.name} className="member-avatar" />
              <span className="member-name">{member.name}</span>
              {member.role === 'admin' && <span className="admin-tag">Admin</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div className="section">
        <h3 className="section-title">Files</h3>
        
        {/* Photos */}
        <button className="file-row" onClick={() => setPhotosOpen(!photosOpen)}>
          <PhotoIcon />
          <span className="file-count">115 photos</span>
          <ChevronIcon open={photosOpen} />
        </button>
        {photosOpen && (
          <div className="photo-grid">
            <img src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200&h=200&fit=crop" alt="Photo 1" />
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" alt="Photo 2" />
          </div>
        )}

        {/* Files */}
        <button className="file-row" onClick={() => setFilesOpen(!filesOpen)}>
          <FileIcon />
          <span className="file-count">208 files</span>
          <ChevronIcon open={filesOpen} />
        </button>

        {/* Links */}
        <button className="file-row" onClick={() => setLinksOpen(!linksOpen)}>
          <LinkIcon />
          <span className="file-count">47 shared links</span>
          <ChevronIcon open={linksOpen} />
        </button>
      </div>

      <style jsx>{`
        .chat-members {
          width: 260px;
          background: #1f1f1f;
          border-left: 1px solid rgba(255,255,255,0.06);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-start;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.06);
          color: #808080;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .action-btn:hover, .action-btn.active {
          background: rgba(212,168,85,0.15);
          color: #d4a855;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 12px 0;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .member-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .member-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .member-name {
          flex: 1;
          color: #e0e0e0;
          font-size: 0.9rem;
        }

        .admin-tag {
          font-size: 0.7rem;
          color: #707070;
          background: rgba(255,255,255,0.06);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .file-row {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          color: #c0c0c0;
          transition: all 0.15s;
        }

        .file-row:hover {
          color: #d4a855;
        }

        .file-count {
          flex: 1;
          text-align: left;
          font-size: 0.9rem;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 10px 0;
        }

        .photo-grid img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 8px;
        }

        .chat-members::-webkit-scrollbar { width: 4px; }
        .chat-members::-webkit-scrollbar-track { background: transparent; }
        .chat-members::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        @media (max-width: 1200px) {
          .chat-members { display: none; }
        }
      `}</style>
    </div>
  );
}
