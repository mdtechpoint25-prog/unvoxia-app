'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Reel {
  id: number;
  username: string;
  avatar: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isFollowing: boolean;
}

const SAMPLE_REELS: Reel[] = [
  {
    id: 1,
    username: "healingjourney",
    avatar: "https://i.pravatar.cc/150?img=1",
    videoUrl: "/videos/reel1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop",
    caption: "Learning to love myself one day at a time 🌱 #SelfLove #Healing",
    likes: 1234,
    comments: 89,
    shares: 45,
    isLiked: false,
    isFollowing: false
  },
  {
    id: 2,
    username: "mindful_moments",
    avatar: "https://i.pravatar.cc/150?img=2",
    videoUrl: "/videos/reel2.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&h=700&fit=crop",
    caption: "5 minute meditation changed my life ✨ #Mindfulness #MentalHealth",
    likes: 2341,
    comments: 156,
    shares: 78,
    isLiked: false,
    isFollowing: true
  },
  {
    id: 3,
    username: "authentic_self",
    avatar: "https://i.pravatar.cc/150?img=3",
    videoUrl: "/videos/reel3.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop",
    caption: "Here's what therapy actually taught me 💭 #TherapyWorks #Growth",
    likes: 3456,
    comments: 234,
    shares: 123,
    isLiked: false,
    isFollowing: false
  },
  {
    id: 4,
    username: "brave_survivor",
    avatar: "https://i.pravatar.cc/150?img=4",
    videoUrl: "/videos/reel4.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=700&fit=crop",
    caption: "My journey from rock bottom to recovery 💪 #Resilience #Hope",
    likes: 4567,
    comments: 312,
    shares: 189,
    isLiked: false,
    isFollowing: false
  },
  {
    id: 5,
    username: "inner_peace",
    avatar: "https://i.pravatar.cc/150?img=5",
    videoUrl: "/videos/reel5.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=700&fit=crop",
    caption: "How I stopped people-pleasing and found myself 🦋 #Boundaries #SelfCare",
    likes: 2789,
    comments: 145,
    shares: 92,
    isLiked: false,
    isFollowing: true
  }
];

function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function ReelsPage() {
const [currentIndex, setCurrentIndex] = useState(0);
const [reels, setReels] = useState(SAMPLE_REELS);
const [isPlaying, setIsPlaying] = useState(true);
const [showHeart, setShowHeart] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);
const touchStartY = useRef(0);

const currentReel = reels[currentIndex];

const handleLike = () => {
  setReels(prev => prev.map((r, idx) => 
    idx === currentIndex 
      ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
      : r
  ));
};

const handleDoubleTap = () => {
  if (!currentReel.isLiked) {
    handleLike();
  }
  setShowHeart(true);
  setTimeout(() => setShowHeart(false), 800);
};

const handleFollow = () => {
  setReels(prev => prev.map((r, idx) => 
    idx === currentIndex 
      ? { ...r, isFollowing: !r.isFollowing }
      : r
  ));
};

const goToNext = () => {
  if (currentIndex < reels.length - 1) {
    setCurrentIndex(currentIndex + 1);
  }
};

const goToPrevious = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
  }
};

// Touch handlers for swipe
const handleTouchStart = (e: React.TouchEvent) => {
  touchStartY.current = e.touches[0].clientY;
};

const handleTouchEnd = (e: React.TouchEvent) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY.current - touchEndY;
    
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToNext();
    else goToPrevious();
  }
};

// Keyboard navigation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'j') goToNext();
    if (e.key === 'ArrowUp' || e.key === 'k') goToPrevious();
    if (e.key === ' ') setIsPlaying(p => !p);
    if (e.key === 'l') handleLike();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex]);

  return (
    <div className="reels-page">
      {/* Header */}
      <header className="reels-header">
        <Link href="/foryou" className="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>
        <h1>Reels</h1>
        <button className="cam-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </button>
      </header>

      {/* Main Reel Viewer */}
      <main 
        className="reels-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="reel-wrapper" onDoubleClick={handleDoubleTap}>
          {/* Video/Thumbnail */}
          <div className="reel-video" onClick={() => setIsPlaying(!isPlaying)}>
            <Image
              src={currentReel.thumbnailUrl}
              alt={currentReel.caption}
              fill
              className="video-thumbnail"
              priority
            />
            <div className="video-gradient"></div>
            
            {/* Double tap heart animation */}
            {showHeart && (
              <div className="heart-animation">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#ff2d55">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            )}
            
            {/* Play/Pause indicator */}
            {!isPlaying && (
              <div className="play-indicator">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button className="nav-btn prev" onClick={goToPrevious}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
          )}
          {currentIndex < reels.length - 1 && (
            <button className="nav-btn next" onClick={goToNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          )}

          {/* Overlay Info */}
          <div className="reel-overlay">
            <div className="reel-info">
              <div className="user-bar">
                <div className="user-avatar">
                  <Image src={currentReel.avatar} alt={currentReel.username} width={40} height={40} className="avatar-img" />
                </div>
                <span className="username">@{currentReel.username}</span>
                <button 
                  className={`follow-btn ${currentReel.isFollowing ? 'following' : ''}`}
                  onClick={handleFollow}
                >
                  {currentReel.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
              <p className="caption">{currentReel.caption}</p>
              <div className="audio-info">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <span>Original Audio - {currentReel.username}</span>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="actions-bar">
              <button className="action-btn avatar-action">
                <div className="sidebar-avatar">
                  <Image src={currentReel.avatar} alt={currentReel.username} width={44} height={44} className="avatar-img" />
                </div>
                <div className="follow-plus">+</div>
              </button>

              <button className={`action-btn ${currentReel.isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={currentReel.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{formatCount(currentReel.likes)}</span>
              </button>

              <button className="action-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{formatCount(currentReel.comments)}</span>
              </button>

              <button className="action-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <span>{formatCount(currentReel.shares)}</span>
              </button>

              <button className="action-btn bookmark-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>

              <button className="action-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progress-dots">
          {reels.map((_, idx) => (
            <button 
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'viewed' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </main>

      <style jsx>{`
        .reels-page {
          background: #000;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #fff;
        }

        .reels-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn, .cam-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-btn:hover, .cam-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .reels-header h1 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .reels-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .reel-wrapper {
          width: 100%;
          max-width: 500px;
          height: calc(100vh - 72px);
          position: relative;
          background: #000;
        }

        .reel-video {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
        }

        .video-thumbnail {
          object-fit: cover;
        }

        .video-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%);
          pointer-events: none;
        }

        .heart-animation {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: heartPop 0.8s ease-out forwards;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes heartPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }

        .play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.8;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .nav-btn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 5;
        }

        .nav-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: translateX(-50%) scale(1.1);
        }

        .nav-btn.prev {
          top: 20px;
        }

        .nav-btn.next {
          bottom: 80px;
        }

        .reel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          z-index: 2;
        }

        .reel-info {
          flex: 1;
          min-width: 0;
        }

        .user-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #fff;
        }

        .avatar-img {
          border-radius: 50%;
          object-fit: cover;
        }

        .username {
          font-weight: 600;
          font-size: 0.938rem;
        }

        .follow-btn {
          margin-left: auto;
          padding: 0.375rem 1rem;
          border-radius: 6px;
          border: 1px solid #fff;
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: 0.813rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .follow-btn:hover {
          background: #fff;
          color: #000;
        }

        .follow-btn.following {
          background: rgba(255, 255, 255, 0.2);
          border-color: transparent;
        }

        .caption {
          font-size: 0.938rem;
          line-height: 1.5;
          margin: 0 0 0.5rem 0;
          max-width: 85%;
        }

        .audio-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.813rem;
          opacity: 0.9;
        }

        .actions-bar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          transform: scale(1.1);
        }

        .action-btn:active {
          transform: scale(0.95);
        }

        .action-btn.liked {
          color: #ff2d55;
        }

        .action-btn span {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .avatar-action {
          position: relative;
        }

        .sidebar-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #fff;
        }

        .follow-plus {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 18px;
          background: #ff2d55;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
        }

        .bookmark-btn svg {
          transition: fill 0.2s;
        }

        .bookmark-btn:hover svg {
          fill: #fff;
        }

        .progress-dots {
          position: absolute;
          top: 80px;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 5;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot.active {
          background: #fff;
          height: 20px;
          border-radius: 2px;
        }

        .dot.viewed {
          background: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 768px) {
          .reel-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
