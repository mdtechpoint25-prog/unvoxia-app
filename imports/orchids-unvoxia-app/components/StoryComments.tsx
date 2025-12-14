'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  content: string;
  anonymousName: string;
  createdAt: string;
  reactions: number;
  replies?: Comment[];
}

interface StoryCommentsProps {
  storyId: string | number;
  initialCount?: number;
  isStatic?: boolean;
}

const ANONYMOUS_NAMES = [
  'Compassionate Soul', 'Supporting Heart', 'Caring Friend', 'Gentle Voice',
  'Kind Spirit', 'Warm Heart', 'Healing Presence', 'Understanding Soul'
];

export default function StoryComments({ storyId, initialCount = 0, isStatic = false }: StoryCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    setAnonymousName(ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)]);
    if (!isStatic) {
      fetchComments();
    }
  }, [storyId, isStatic]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stories/${storyId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
        setTotal(data.pagination?.total || initialCount);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim() || submitting) return;
    
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment.trim(),
          anonymousName: anonymousName.trim() || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post comment');
      }

      // Add new comment to list
      setComments(prev => [data.comment, ...prev]);
      setTotal(prev => prev + 1);
      setNewComment('');
      setShowNameInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">💬 Comments ({total})</h3>
      
      {/* Comment Input */}
      <div className="comment-input-box">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share words of support or your own experience..."
          className="comment-textarea"
          rows={3}
          maxLength={2000}
        />
        
        {showNameInput && (
          <div className="name-input-row">
            <input
              type="text"
              value={anonymousName}
              onChange={(e) => setAnonymousName(e.target.value)}
              placeholder="Your anonymous name"
              className="name-input"
              maxLength={30}
            />
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}

        <div className="comment-actions">
          <button
            className="name-toggle"
            onClick={() => setShowNameInput(!showNameInput)}
            type="button"
          >
            Posting as: <strong>{anonymousName}</strong> ✏️
          </button>
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim() || submitting || newComment.trim().length < 5}
            className="submit-btn"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.anonymousName.charAt(0)}
                </div>
                <span className="comment-name">{comment.anonymousName}</span>
                <span className="comment-time">• {formatTime(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              <div className="comment-footer">
                <button className="heart-btn">
                  ❤️ {comment.reactions || 0}
                </button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="reply-card">
                      <div className="comment-header">
                        <div className="reply-avatar">{reply.anonymousName.charAt(0)}</div>
                        <span className="comment-name">{reply.anonymousName}</span>
                        <span className="comment-time">• {formatTime(reply.createdAt)}</span>
                      </div>
                      <p className="comment-text">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-comments">
          <p>Be the first to share words of support 💚</p>
        </div>
      )}

      <style jsx>{`
        .comments-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }
        .comments-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        .comment-input-box {
          background: #f8fafc;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .comment-textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
          line-height: 1.5;
        }
        .comment-textarea:focus {
          outline: none;
          border-color: #1ABC9C;
        }
        .name-input-row {
          margin-top: 0.75rem;
        }
        .name-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.875rem;
        }
        .name-input:focus {
          outline: none;
          border-color: #1ABC9C;
        }
        .error-msg {
          background: #fef2f2;
          color: #dc2626;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.813rem;
          margin-top: 0.5rem;
        }
        .comment-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .name-toggle {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.813rem;
          cursor: pointer;
        }
        .name-toggle:hover {
          color: #1ABC9C;
        }
        .submit-btn {
          padding: 0.625rem 1.25rem;
          background: #1ABC9C;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #16a085;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .loading {
          text-align: center;
          color: #64748b;
          padding: 2rem;
        }
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .comment-card {
          background: #f8fafc;
          border-radius: 10px;
          padding: 1rem;
        }
        .comment-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .comment-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9B59B6, #1ABC9C);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .reply-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1ABC9C, #3498db);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.625rem;
          font-weight: 600;
        }
        .comment-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.875rem;
        }
        .comment-time {
          color: #94a3b8;
          font-size: 0.75rem;
        }
        .comment-text {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }
        .comment-footer {
          margin-top: 0.5rem;
        }
        .heart-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.813rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .heart-btn:hover {
          background: #fee2e2;
          color: #ef4444;
        }
        .replies {
          margin-top: 0.75rem;
          padding-left: 1.5rem;
          border-left: 2px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .reply-card {
          padding: 0.5rem 0;
        }
        .no-comments {
          text-align: center;
          color: #64748b;
          padding: 2rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .no-comments p {
          margin: 0;
          font-size: 0.938rem;
        }
      `}</style>
    </div>
  );
}
