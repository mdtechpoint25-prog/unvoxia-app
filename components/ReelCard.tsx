'use client';

import { useState, useRef } from 'react';

interface Comment {
  id: string;
  content: string;
  users: { username: string };
  created_at: string;
}

interface ReelCardProps {
  id: string;
  username: string;
  content: string;
  videoUrl: string;
  category: string;
  reactions: number;
  comments: number;
}

export default function ReelCard({
  id,
  username,
  content,
  videoUrl,
  category,
  reactions,
  comments
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [reactionsCount, setReactionsCount] = useState(reactions);
  const [hasReacted, setHasReacted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReaction = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji: '??' })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.action === 'added') {
          setReactionsCount(r => r + 1);
          setHasReacted(true);
        } else {
          setReactionsCount(r => Math.max(0, r - 1));
          setHasReacted(false);
        }
      }
    } catch (err) {
      console.error('Reaction error:', err);
    }
  };

  const openComments = async () => {
    setShowComments(true);
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      const data = await res.json();
      if (res.ok) {
        setCommentsList(data.comments || []);
      }
    } catch (err) {
      console.error('Fetch comments error:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment })
      });

      if (res.ok) {
        const data = await res.json();
        setCommentsList([...commentsList, data.comment]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Submit comment error:', err);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      aspectRatio: '9/16',
      background: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '1rem'
    }}>
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer'
        }}
      />
      
      {!isPlaying && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '1.5rem', marginLeft: '4px' }}>&#9658;</span>
        </div>
      )}

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#9B59B6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}>
            {username.charAt(0).toUpperCase()}
          </span>
          <strong>{username}</strong>
          <span style={{ fontSize: '0.8rem', color: '#1ABC9C' }}>{category}</span>
        </div>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>{content}</p>
      </div>

      <div style={{
        position: 'absolute',
        right: '1rem',
        bottom: '5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <button
          onClick={toggleMute}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isMuted ? '??' : '??'}
        </button>
        <button
          onClick={handleReaction}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff'
          }}
        >
          <div style={{ fontSize: '1.25rem' }}>{hasReacted ? '??' : '??'}</div>
          <div style={{ fontSize: '0.8rem' }}>{reactionsCount}</div>
        </button>
        <button
          onClick={openComments}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff'
          }}
        >
          <div style={{ fontSize: '1.25rem' }}>??</div>
          <div style={{ fontSize: '0.8rem' }}>{comments}</div>
        </button>
      </div>

      {/* Comments Overlay */}
      {showComments && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ color: '#fff', margin: 0 }}>Comments</h3>
            <button
              onClick={() => setShowComments(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem'
          }}>
            {loadingComments ? (
              <p style={{ color: '#888', textAlign: 'center' }}>Loading...</p>
            ) : commentsList.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center' }}>No comments yet. Be the first!</p>
            ) : (
              commentsList.map((c) => (
                <div key={c.id} style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#1ABC9C' }}>@{c.users?.username || 'Anonymous'}</strong>
                  <p style={{ color: '#fff', margin: '0.25rem 0', fontSize: '0.9rem' }}>{c.content}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={submitComment} style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1rem',
                background: '#1ABC9C',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
