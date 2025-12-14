'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  author: string;
  username: string;
  avatar: string;
  timeAgo: string;
  content: string;
  mood: string;
  moodEmoji: string;
  moodColor: string;
  category: string;
  likes: number;
  comments: number;
  supportHugs: number;
  isLiked: boolean;
  isAnonymous: boolean;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    author: "Healing Journey",
    username: "healingjourney",
    avatar: "HJ",
    timeAgo: "2h ago",
    content: "Today I finally told my therapist about the thing I've been hiding for months. My heart was racing, my hands were shaking, but I did it. And she didn't judge me. She just listened. I feel lighter than I have in years. If you're carrying something heavy, please know that sharing it won't break you—it might actually free you. 💚",
    mood: "Relieved",
    moodEmoji: "😌",
    moodColor: "#10b981",
    category: "Mental Health",
    likes: 234,
    comments: 45,
    supportHugs: 89,
    isLiked: false,
    isAnonymous: false
  },
  {
    id: 2,
    author: "Anonymous",
    username: "anonymous_soul",
    avatar: "AS",
    timeAgo: "4h ago",
    content: "I'm 35 and still living with my parents because I can't afford to move out. Everyone my age is buying houses, getting married, having kids. And I'm here, feeling like I failed at adulting. The shame is overwhelming. Anyone else feel stuck like this?",
    mood: "Struggling",
    moodEmoji: "😔",
    moodColor: "#6366f1",
    category: "Life Challenges",
    likes: 412,
    comments: 167,
    supportHugs: 234,
    isLiked: false,
    isAnonymous: true
  },
  {
    id: 3,
    author: "Brave Heart",
    username: "braveheart_warrior",
    avatar: "BH",
    timeAgo: "6h ago",
    content: "Update: I left my toxic job today. No backup plan, no safety net. I'm terrified but also... alive? For the first time in 3 years, I feel like I can breathe. My mental health is worth more than a paycheck. I don't know what comes next, but I know I made the right choice.",
    mood: "Empowered",
    moodEmoji: "💪",
    moodColor: "#f59e0b",
    category: "Work & Career",
    likes: 567,
    comments: 89,
    supportHugs: 312,
    isLiked: false,
    isAnonymous: false
  },
  {
    id: 4,
    author: "Silent Strength",
    username: "silent_strength",
    avatar: "SS",
    timeAgo: "8h ago",
    content: "My partner and I had the 'Do we want kids?' conversation last night. We realized we want completely different futures. We've been together 7 years. I don't know if love is enough when you want fundamentally different lives. I'm heartbroken but I think we both know what this means.",
    mood: "Heartbroken",
    moodEmoji: "💔",
    moodColor: "#ef4444",
    category: "Relationships",
    likes: 189,
    comments: 76,
    supportHugs: 145,
    isLiked: false,
    isAnonymous: false
  },
  {
    id: 5,
    author: "Morning Light",
    username: "morning_light",
    avatar: "ML",
    timeAgo: "10h ago",
    content: "Small win today: I got out of bed before noon. I showered. I ate a real meal. Depression makes every basic task feel impossible, so these tiny victories matter. To anyone else fighting this battle—I see you. Your struggle is valid. And I'm proud of you for surviving another day. 🌅",
    mood: "Hopeful",
    moodEmoji: "🌱",
    moodColor: "#8b5cf6",
    category: "Mental Health",
    likes: 678,
    comments: 123,
    supportHugs: 456,
    isLiked: false,
    isAnonymous: false
  }
];

export default function AuthenticFeedPage() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [filterMood, setFilterMood] = useState<string | null>(null);

  const moods = [
    { label: "All", value: null, emoji: "✨" },
    { label: "Struggling", value: "Struggling", emoji: "😔" },
    { label: "Hopeful", value: "Hopeful", emoji: "🌱" },
    { label: "Heartbroken", value: "Heartbroken", emoji: "💔" },
    { label: "Empowered", value: "Empowered", emoji: "💪" },
    { label: "Relieved", value: "Relieved", emoji: "😌" }
  ];

  const filteredPosts = filterMood 
    ? posts.filter(p => p.mood === filterMood)
    : posts;

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleHug = (postId: number) => {
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, supportHugs: p.supportHugs + 1 }
        : p
    ));
  };

  return (
    <div className="authentic-feed">
      {/* Header */}
      <header className="feed-header">
        <div className="header-top">
          <Link href="/foryou" className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1>Authentic Feed</h1>
          <button className="filter-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
        </div>

        <p className="feed-subtitle">Real people, real feelings, zero filters</p>

        {/* Mood Filter */}
        <div className="mood-filter">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`mood-chip ${filterMood === mood.value ? 'active' : ''}`}
              onClick={() => setFilterMood(mood.value)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <main className="feed-content">
        {filteredPosts.map((post) => (
          <article key={post.id} className="post-card">
            {/* Post Header */}
            <div className="post-header">
              <div className="author-info">
                <div className="avatar" style={{ background: `linear-gradient(135deg, ${post.moodColor}, #8b5cf6)` }}>
                  {post.avatar}
                </div>
                <div className="author-details">
                  <div className="author-name">
                    {post.isAnonymous && (
                      <svg className="anon-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5a5 5 0 0 0 5-5v0a5 5 0 0 0-5-5z"/>
                        <path d="M3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v1H3v-1z"/>
                      </svg>
                    )}
                    <span>{post.author}</span>
                  </div>
                  <div className="post-meta">
                    <span className="mood-tag" style={{ background: post.moodColor }}>
                      {post.moodEmoji} {post.mood}
                    </span>
                    <span className="separator">•</span>
                    <span className="time">{post.timeAgo}</span>
                  </div>
                </div>
              </div>
              <button className="more-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p>{post.content}</p>
              <span className="category-tag">{post.category}</span>
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <button 
                className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{post.likes}</span>
              </button>

              <button className="action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{post.comments}</span>
              </button>

              <button className="action-btn hug-btn" onClick={() => handleHug(post.id)}>
                <span className="hug-emoji">🤗</span>
                <span>{post.supportHugs} Hugs</span>
              </button>

              <button className="action-btn share-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Create Post FAB */}
      <button className="fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <style jsx>{`
        .authentic-feed {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding-bottom: 80px;
        }

        .feed-header {
          background: rgba(26, 26, 26, 0.9);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(20px);
        }

        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem 0.75rem;
        }

        .back-btn, .filter-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: none;
          background: var(--overlay-medium);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-btn:hover, .filter-btn:hover {
          background: var(--overlay-high);
          transform: scale(1.05);
        }

        .feed-header h1 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, var(--accent), var(--accent-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feed-subtitle {
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0 0 1rem 0;
          padding: 0 1.25rem;
        }

        .mood-filter {
          display: flex;
          gap: 0.5rem;
          padding: 0 1.25rem 1rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .mood-filter::-webkit-scrollbar {
          display: none;
        }

        .mood-chip {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-size: 0.813rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mood-chip:hover {
          background: var(--overlay-medium);
          border-color: var(--accent);
          color: var(--text-primary);
        }

        .mood-chip.active {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg-primary);
        }

        .mood-emoji {
          font-size: 1rem;
        }

        .feed-content {
          max-width: 680px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
        }

        .post-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s;
        }

        .post-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .author-info {
          display: flex;
          gap: 0.75rem;
          flex: 1;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          flex-shrink: 0;
          color: white;
        }

        .author-details {
          flex: 1;
          min-width: 0;
        }

        .author-name {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .anon-icon {
          color: var(--text-muted);
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.813rem;
        }

        .mood-tag {
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          color: #fff;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .separator {
          color: var(--text-muted);
        }

        .time {
          color: var(--text-muted);
        }

        .more-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .more-btn:hover {
          background: var(--overlay-low);
          color: var(--text-primary);
        }

        .post-content {
          margin-bottom: 1.25rem;
        }

        .post-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0 0 1rem 0;
        }

        .category-tag {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          background: rgba(212, 168, 85, 0.1);
          border: 1px solid rgba(212, 168, 85, 0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 500;
        }

        .post-actions {
          display: flex;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
        }

        .action-btn:hover {
          background: var(--overlay-low);
          color: var(--text-primary);
        }

        .action-btn.liked {
          color: #ff3b5c;
        }

        .hug-btn:hover {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
        }

        .hug-emoji {
          font-size: 1.125rem;
        }

        .share-btn {
          margin-left: auto;
        }

        .fab {
          position: fixed;
          bottom: 100px;
          right: 1.5rem;
          width: 60px;
          height: 60px;
          border-radius: 18px;
          border: none;
          background: var(--accent);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(212, 168, 85, 0.3);
          transition: all 0.2s;
          z-index: 9;
        }

        .fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
        }

        @media (max-width: 768px) {
          .post-card {
            margin: 0 0 1rem;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
        }
      `}</style>
    </div>
  );
}
