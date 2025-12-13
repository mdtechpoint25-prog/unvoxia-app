'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { STORIES, STORY_CATEGORIES, getFeaturedStories, getTrendingStories } from '@/lib/stories-data';

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const featured = getFeaturedStories();
  const trending = getTrendingStories();

  const filteredStories = useMemo(() => {
    let result = STORIES;
    
    if (selectedCategory) {
      result = result.filter(s => s.categoryId === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.excerpt.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    
    if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.reactions - a.reactions);
    }
    
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="experiences-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Real Stories From Real People</h1>
          <p>Thousands of anonymous experiences shared by our community. Read, connect, and know you're not alone.</p>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search stories, topics, or feelings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>

          {/* Featured */}
          <div className="featured-grid">
            {featured.slice(0, 3).map((story) => (
              <Link href={`/story/${story.id}`} key={story.id} className="featured-card">
                <div className="featured-header">
                  <span className="featured-emoji">{story.emoji}</span>
                  <span className="featured-cat">{story.category}</span>
                  <span className="featured-time">{story.timeAgo}</span>
                </div>
                <h3>{story.title}</h3>
                <p>{story.excerpt}</p>
                <div className="featured-footer">
                  <span>💚 {story.reactions}</span>
                  <span>💬 {story.comments}</span>
                  <span className="read-more">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>Browse by Topic</h2>
            <button 
              className="clear-btn"
              onClick={() => setSelectedCategory(null)}
              style={{ opacity: selectedCategory ? 1 : 0 }}
            >
              Clear Filter
            </button>
          </div>
          <div className="categories-grid">
            {STORY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="content-grid">
          {/* Feed */}
          <div className="feed">
            <div className="feed-header">
              <h2>
                {selectedCategory 
                  ? STORY_CATEGORIES.find(c => c.id === selectedCategory)?.name 
                  : 'All Stories'}
                <span className="story-count">({filteredStories.length})</span>
              </h2>
              <div className="sort-btns">
                <button 
                  className={sortBy === 'latest' ? 'active' : ''}
                  onClick={() => setSortBy('latest')}
                >Latest</button>
                <button 
                  className={sortBy === 'popular' ? 'active' : ''}
                  onClick={() => setSortBy('popular')}
                >Popular</button>
              </div>
            </div>

            <div className="stories-list">
              {filteredStories.length > 0 ? (
                filteredStories.map((story) => (
                  <Link href={`/story/${story.id}`} key={story.id} className="story-card">
                    <div className="story-header">
                      <span className="story-emoji">{story.emoji}</span>
                      <span className="story-cat">{story.category}</span>
                      <span className="story-time">{story.timeAgo}</span>
                    </div>
                    <h3 className="story-title">{story.title}</h3>
                    <p className="story-excerpt">{story.excerpt}</p>
                    <div className="story-footer">
                      <span className="story-author">by {story.anonymous}</span>
                      <div className="story-stats">
                        <span>👁️ {story.views.toLocaleString()}</span>
                        <span>💚 {story.reactions}</span>
                        <span>💬 {story.comments}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-results">
                  <p>No stories found. Try a different search or category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-card">
              <h3>🔥 Trending</h3>
              <div className="trending-list">
                {trending.slice(0, 5).map((story) => (
                  <Link href={`/story/${story.id}`} key={story.id} className="trending-item">
                    <span className="trending-emoji">{story.emoji}</span>
                    <div className="trending-info">
                      <span className="trending-title">{story.title}</span>
                      <span className="trending-stats">💚 {story.reactions}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-card cta-card">
              <h3>✨ Share Your Story</h3>
              <p>Your experience could help someone going through the same thing.</p>
              <Link href="/share" className="share-btn">Share Anonymously →</Link>
            </div>

            <div className="sidebar-card">
              <h3>📊 Community Stats</h3>
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-num">2,547</span>
                  <span className="stat-label">Stories Shared</span>
                </div>
                <div className="stat">
                  <span className="stat-num">18.2K</span>
                  <span className="stat-label">Words of Support</span>
                </div>
                <div className="stat">
                  <span className="stat-num">45.8K</span>
                  <span className="stat-label">Hearts Given</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style jsx>{`
        .experiences-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1ABC9C 100%);
          padding: 3rem 1rem 2.5rem;
        }
        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .hero h1 {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .hero > p, .hero-inner > p {
          font-size: 0.938rem;
          color: rgba(255,255,255,0.8);
          margin-bottom: 1.5rem;
        }
        .search-bar {
          max-width: 500px;
          margin: 0 auto 2rem;
          display: flex;
          gap: 0.5rem;
        }
        .search-bar input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: none;
          font-size: 0.875rem;
          background: rgba(255,255,255,0.95);
        }
        .search-btn {
          padding: 0.75rem 1.25rem;
          background: #1ABC9C;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
        }

        /* Featured */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          text-align: left;
        }
        .featured-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1.25rem;
          border: 1px solid rgba(255,255,255,0.15);
          text-decoration: none;
          transition: all 0.2s;
        }
        .featured-card:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .featured-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
        }
        .featured-emoji {
          font-size: 1.125rem;
        }
        .featured-cat {
          color: #1ABC9C;
          font-weight: 500;
        }
        .featured-time {
          margin-left: auto;
          color: rgba(255,255,255,0.5);
        }
        .featured-card h3 {
          color: #fff;
          font-size: 0.938rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .featured-card p {
          color: rgba(255,255,255,0.7);
          font-size: 0.813rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .featured-footer {
          display: flex;
          gap: 0.75rem;
          color: rgba(255,255,255,0.6);
          font-size: 0.75rem;
        }
        .read-more {
          margin-left: auto;
          color: #1ABC9C;
        }

        /* Categories */
        .categories-section {
          padding: 2rem 1rem;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
        }
        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-header h2 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
        }
        .clear-btn {
          background: none;
          border: none;
          color: #1ABC9C;
          font-size: 0.813rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.625rem;
        }
        .category-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.875rem 0.5rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .category-btn:hover {
          border-color: #1ABC9C;
          background: #f0fdf4;
        }
        .category-btn.active {
          background: #1ABC9C;
          border-color: #1ABC9C;
        }
        .category-btn.active .cat-name,
        .category-btn.active .cat-count {
          color: #fff;
        }
        .cat-emoji {
          font-size: 1.375rem;
        }
        .cat-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #334155;
          text-align: center;
        }
        .cat-count {
          font-size: 0.688rem;
          color: #94a3b8;
        }

        /* Main Content */
        .main-content {
          padding: 2rem 1rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .sidebar {
            order: -1;
          }
        }

        /* Feed */
        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .feed-header h2 {
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
        }
        .story-count {
          font-weight: 400;
          color: #64748b;
          margin-left: 0.25rem;
        }
        .sort-btns {
          display: flex;
          gap: 0.25rem;
        }
        .sort-btns button {
          padding: 0.375rem 0.875rem;
          border: none;
          border-radius: 6px;
          background: #e2e8f0;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        .sort-btns button.active {
          background: #1ABC9C;
          color: #fff;
        }

        /* Story Cards */
        .stories-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .story-card {
          background: #fff;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          border: 1px solid #e2e8f0;
          text-decoration: none;
          transition: all 0.2s;
        }
        .story-card:hover {
          border-color: #1ABC9C;
          box-shadow: 0 2px 8px rgba(26, 188, 156, 0.1);
        }
        .story-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.375rem;
        }
        .story-emoji {
          font-size: 1.125rem;
        }
        .story-cat {
          font-size: 0.75rem;
          color: #1ABC9C;
          font-weight: 500;
        }
        .story-time {
          margin-left: auto;
          font-size: 0.688rem;
          color: #94a3b8;
        }
        .story-title {
          font-size: 0.938rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.375rem;
          line-height: 1.4;
        }
        .story-excerpt {
          font-size: 0.813rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 0.625rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .story-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
        }
        .story-author {
          color: #94a3b8;
        }
        .story-stats {
          display: flex;
          gap: 0.75rem;
          color: #64748b;
        }
        .no-results {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }

        /* Sidebar */
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sidebar-card {
          background: #fff;
          border-radius: 10px;
          padding: 1rem;
          border: 1px solid #e2e8f0;
        }
        .sidebar-card h3 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }
        .trending-list {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .trending-item {
          display: flex;
          gap: 0.625rem;
          padding: 0.5rem;
          background: #f8fafc;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .trending-item:hover {
          background: #f0fdf4;
        }
        .trending-emoji {
          font-size: 1rem;
          flex-shrink: 0;
        }
        .trending-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }
        .trending-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #334155;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .trending-stats {
          font-size: 0.688rem;
          color: #64748b;
        }

        /* CTA Card */
        .cta-card {
          background: linear-gradient(135deg, rgba(26,188,156,0.08), rgba(155,89,182,0.08));
          border-color: rgba(26,188,156,0.2);
        }
        .cta-card p {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .share-btn {
          display: block;
          text-align: center;
          padding: 0.625rem;
          background: #1ABC9C;
          color: #fff;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.813rem;
        }
        .share-btn:hover {
          background: #16a085;
        }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .stat {
          text-align: center;
          padding: 0.5rem;
          background: #f8fafc;
          border-radius: 6px;
        }
        .stat-num {
          display: block;
          font-size: 0.938rem;
          font-weight: 700;
          color: #1ABC9C;
        }
        .stat-label {
          font-size: 0.625rem;
          color: #64748b;
        }
      `}</style>
    </main>
  );
}
