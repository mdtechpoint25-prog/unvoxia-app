'use client';

import { useState, useRef } from 'react';

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
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '1.25rem' }}>??</div>
          <div style={{ fontSize: '0.8rem' }}>{reactions}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '1.25rem' }}>??</div>
          <div style={{ fontSize: '0.8rem' }}>{comments}</div>
        </div>
      </div>
    </div>
  );
}
