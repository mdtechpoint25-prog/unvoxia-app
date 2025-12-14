'use client';

import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readingTime: number;
  isFeatured: boolean;
  date: string;
}

// Static blog posts (would come from API/database in production)
const blogPosts: BlogPost[] = [
  {
    slug: 'welcome-to-noma',
    title: 'Welcome to NOMA: A World Without Masks',
    excerpt: 'Discover NOMA, the safe space where you can share your authentic self without judgment. Learn how our platform creates space for genuine human connection.',
    author: 'NOMA Team',
    category: 'general',
    readingTime: 5,
    isFeatured: true,
    date: '2025-01-01',
  },
  {
    slug: 'understanding-anonymous-sharing',
    title: 'The Power of Anonymous Sharing',
    excerpt: 'Learn why anonymity creates space for authentic healing and connection. Research shows anonymous expression can accelerate emotional recovery.',
    author: 'NOMA Team',
    category: 'mental-health',
    readingTime: 4,
    isFeatured: true,
    date: '2025-01-05',
  },
  {
    slug: 'circles-community-guide',
    title: 'Finding Your Circle: A Guide to NOMA Communities',
    excerpt: 'Discover how Circles bring together people who truly understand your journey. From Love & Relationships to Mental Health, find your people.',
    author: 'NOMA Team',
    category: 'community',
    readingTime: 4,
    isFeatured: false,
    date: '2025-01-10',
  },
  {
    slug: 'mental-health-resources',
    title: 'Mental Health Support & Resources',
    excerpt: 'Important resources for when you need more than words. Crisis hotlines, therapy options, and self-care tools compiled for your wellbeing.',
    author: 'NOMA Team',
    category: 'mental-health',
    readingTime: 6,
    isFeatured: false,
    date: '2025-01-12',
  },
  {
    slug: 'noma-story-features',
    title: 'How to Share Your Story on NOMA',
    excerpt: 'A complete guide to crafting and sharing your experiences. Learn the types of posts, writing tips, and how to engage with the community.',
    author: 'NOMA Team',
    category: 'features',
    readingTime: 4,
    isFeatured: false,
    date: '2025-01-15',
  },
  {
    slug: 'privacy-and-safety',
    title: 'Your Privacy and Safety on NOMA',
    excerpt: 'Understanding how we protect your identity and wellbeing. Learn about our moderation, data security, and your privacy controls.',
    author: 'NOMA Team',
    category: 'features',
    readingTime: 5,
    isFeatured: false,
    date: '2025-01-18',
  },
];

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'general', label: 'General' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'community', label: 'Community' },
  { id: 'features', label: 'Features' },
  { id: 'announcements', label: 'Announcements' },
];

const categoryIcons: Record<string, string> = {
  general: '📖',
  'mental-health': '🧠',
  community: '👥',
  features: '✨',
  announcements: '📢',
  relationships: '❤️',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredPosts = blogPosts.filter(post => post.isFeatured);
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-content">
          <span className="hero-badge">NOMA Blog</span>
          <h1>Understanding NOMA</h1>
          <p>
            Discover the philosophy behind No Mask World. Learn about anonymous sharing, 
            authentic connection, and how NOMA is reshaping the way we support each other.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-section">
        <h2>Featured Articles</h2>
        <div className="featured-grid">
          {featuredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="featured-card">
              <div className="featured-badge">Featured</div>
              <div className="featured-content">
                <span className="category-tag">
                  {categoryIcons[post.category]} {post.category.replace('-', ' ')}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="card-meta">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="posts-section">
        <h2>
          {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.label}
        </h2>
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
              <div className="post-icon">
                {categoryIcons[post.category] || '📄'}
              </div>
              <div className="post-content">
                <span className="category-tag small">
                  {post.category.replace('-', ' ')}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="card-meta">
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="cta-content">
          <h2>Ready to Share Your Story?</h2>
          <p>
            Join thousands who have found healing through authentic expression. 
            Your voice matters. Your experience can help others.
          </p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-primary">Join NOMA</Link>
            <Link href="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Explore NOMA</h2>
        <div className="links-grid">
          <Link href="/about" className="quick-link">
            <span className="link-icon">🎭</span>
            <span>About NOMA</span>
          </Link>
          <Link href="/circles" className="quick-link">
            <span className="link-icon">👥</span>
            <span>Communities</span>
          </Link>
          <Link href="/stories" className="quick-link">
            <span className="link-icon">📖</span>
            <span>Read Stories</span>
          </Link>
          <Link href="/contact" className="quick-link">
            <span className="link-icon">💬</span>
            <span>Contact Us</span>
          </Link>
          <Link href="/privacy" className="quick-link">
            <span className="link-icon">🔒</span>
            <span>Privacy Policy</span>
          </Link>
          <Link href="/terms" className="quick-link">
            <span className="link-icon">📋</span>
            <span>Terms of Service</span>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-bottom: 4rem;
        }

        /* Hero */
        .blog-hero {
          position: relative;
          padding: 6rem 1.5rem 4rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--overlay-medium);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 1.5rem;
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .hero-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }

        .glow-1 {
          width: 400px;
          height: 400px;
          background: var(--accent);
          top: -150px;
          left: -100px;
        }

        .glow-2 {
          width: 300px;
          height: 300px;
          background: #7c3aed;
          bottom: -100px;
          right: -50px;
        }

        /* Featured Section */
        .featured-section {
          padding: 0 1.5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .featured-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .featured-card {
          position: relative;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .featured-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          background: var(--accent);
          color: var(--bg-primary);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 100px;
        }

        .featured-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .featured-content p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .category-tag {
          display: inline-block;
          font-size: 0.8125rem;
          color: var(--accent);
          text-transform: capitalize;
        }

        .category-tag.small {
          font-size: 0.75rem;
        }

        .card-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        /* Category Filter */
        .category-filter {
          padding: 0 1.5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .filter-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .filter-scroll::-webkit-scrollbar {
          display: none;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .filter-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg-primary);
        }

        /* Posts Grid */
        .posts-section {
          padding: 0 1.5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .posts-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-transform: capitalize;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .post-card {
          display: flex;
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.25rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .post-card:hover {
          border-color: var(--accent);
          background: var(--bg-surface-elevated);
        }

        .post-icon {
          font-size: 1.75rem;
          flex-shrink: 0;
        }

        .post-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0.25rem 0 0.5rem;
          line-height: 1.4;
        }

        .post-content p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* CTA Section */
        .blog-cta {
          padding: 3rem 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content {
          background: linear-gradient(135deg, var(--accent), #7c3aed);
          border-radius: 24px;
          padding: 3rem 2rem;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          margin-bottom: 1.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: #fff;
          color: var(--accent);
          font-weight: 600;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-weight: 600;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Quick Links */
        .quick-links {
          padding: 0 1.5rem 4rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .quick-links h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          text-align: center;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        .quick-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .quick-link:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .link-icon {
          font-size: 1.5rem;
        }

        .quick-link span:last-child {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-hero {
            padding: 4rem 1rem 3rem;
          }

          .featured-grid {
            grid-template-columns: 1fr;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
