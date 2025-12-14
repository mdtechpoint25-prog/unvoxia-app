'use client';

import { useState } from 'react';
import ReactionButton from './ReactionButton';
import CommentSection from './CommentSection';
import ReportButton from './ReportButton';

export interface PostCardProps {
  id: string;
  username: string;
  avatar?: string | null;
  timestamp: string;
  category: string;
  content: string;
  mediaUrl?: string | null;
  initialReactions?: { emoji: string; user_id: string }[];
  commentsCount: number;
  currentUserId?: string;
  interactive?: boolean;
  isAnonymous?: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

export default function PostCard({
  id,
  username,
  avatar,
  timestamp,
  category,
  content,
  mediaUrl,
  initialReactions = [],
  commentsCount,
  currentUserId,
  interactive = true,
  isAnonymous = false
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialReactions?.length || 0);

  const displayName = isAnonymous ? 'Anonymous' : username;
  const displayAvatar = isAnonymous ? null : (avatar || username.charAt(0).toUpperCase());

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const loadComments = async () => {
    if (comments.length > 0) return;
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      const data = await res.json();
      if (res.ok) setComments(data.comments);
    } catch (err) {
      console.error('Load comments error:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleToggleComments = () => {
    if (!showComments) loadComments();
    setShowComments(!showComments);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentAdded = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="post-card-modern">
      {/* Header */}
      <div className="post-header-modern">
        <div className="post-avatar-section">
          <div className="post-avatar-modern">
            {isAnonymous ? (
              <UserIcon />
            ) : avatar ? (
              <img src={avatar} alt={displayName} />
            ) : (
              displayAvatar
            )}
            {!isAnonymous && <div className="online-indicator" />}
          </div>
          <div className="post-user-info">
            <div className="post-username">
              {displayName}
            </div>
            <div className="post-timestamp">
              {formatTime(timestamp)}
            </div>
          </div>
        </div>
        
        {interactive && (
          <div className="post-menu-wrapper">
            <button
              className="post-menu-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreIcon />
            </button>
            {showMenu && (
              <div className="post-menu-dropdown">
                <ReportButton postId={id} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="post-content-modern">
        <p className="post-text">
          {content}
        </p>
        
        <div className="post-category-tag">
          #{category}
        </div>
      </div>

      {/* Media */}
      {mediaUrl && (
        <div className="post-media-modern">
          <img src={mediaUrl} alt="post media" />
        </div>
      )}
      
      {/* Actions */}
      {interactive && (
        <div className="post-actions-modern">
          <button
            className={`action-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <HeartIcon filled={isLiked} />
            <span>{likeCount}</span>
          </button>
          
          <button
            className="action-button"
            onClick={handleToggleComments}
          >
            <CommentIcon />
            <span>{commentsCount}</span>
          </button>
          
          <button className="action-button">
            <ShareIcon />
            <span>Share</span>
          </button>
        </div>
      )}

      {/* Comments Section */}
      {showComments && interactive && (
        <div className="comments-section-modern">
          {loadingComments ? (
            <div className="loading-comments">Loading comments...</div>
          ) : (
            <CommentSection
              postId={id}
              comments={comments}
              onCommentAdded={handleCommentAdded}
            />
          )}
        </div>
      )}

      <style jsx>{`
        .post-card-modern {
          background: #2a2a2a;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 12px;
          border: 1px solid #3a3a3a;
          transition: all 0.2s ease;
        }

        .post-card-modern:hover {
          border-color: #4a4a4a;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .post-header-modern {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .post-avatar-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .post-avatar-modern {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8b639 0%, #f5c84a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-weight: 600;
          font-size: 1.1rem;
          overflow: hidden;
        }

        .post-avatar-modern img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #22c55e;
          border: 2px solid #2a2a2a;
          border-radius: 50%;
        }

        .post-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .post-username {
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
          line-height: 1.2;
        }

        .post-timestamp {
          font-size: 0.8rem;
          color: #888888;
          line-height: 1.2;
        }

        .post-menu-wrapper {
          position: relative;
        }

        .post-menu-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: #888888;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .post-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .post-menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: #3a3a3a;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          border: 1px solid #4a4a4a;
          overflow: hidden;
          z-index: 10;
          min-width: 150px;
        }

        .post-content-modern {
          margin-bottom: 16px;
        }

        .post-text {
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 12px 0;
          white-space: pre-wrap;
        }

        .post-category-tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          background: rgba(232, 182, 57, 0.15);
          color: #e8b639;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .post-media-modern {
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
        }

        .post-media-modern img {
          width: 100%;
          height: auto;
          display: block;
        }

        .post-actions-modern {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 16px;
          border-top: 1px solid #3a3a3a;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #888888;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .action-button.liked {
          color: #ff4757;
        }

        .comments-section-modern {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #3a3a3a;
        }

        .loading-comments {
          color: #888888;
          font-size: 0.9rem;
          text-align: center;
          padding: 12px;
        }

        @media (max-width: 768px) {
          .post-card-modern {
            padding: 16px;
            border-radius: 12px;
          }

          .post-actions-modern {
            gap: 16px;
          }

          .action-button {
            font-size: 0.8rem;
            padding: 6px 8px;
          }
        }
      `}</style>
    </div>
  );
}

