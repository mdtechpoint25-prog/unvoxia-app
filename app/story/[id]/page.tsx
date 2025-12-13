import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STORIES, getStoryById, STORY_CATEGORIES } from '@/lib/stories-data';
import StoryReactions from '@/components/StoryReactions';
import StoryComments from '@/components/StoryComments';
import ShareButton from '@/components/ShareButton';

export async function generateStaticParams() {
  return STORIES.map((story) => ({
    id: story.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = getStoryById(parseInt(id));
  
  if (!story) {
    return { title: 'Story Not Found - NOMA' };
  }

  return {
    title: `${story.title} | NOMA Experiences`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: 'article',
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = getStoryById(parseInt(id));

  if (!story) {
    notFound();
  }

  const relatedStories = STORIES
    .filter(s => s.categoryId === story.categoryId && s.id !== story.id)
    .slice(0, 3);

  const paragraphs = story.content.split('\n\n');

  return (
    <main className="story-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="breadcrumb">
            <Link href="/experiences">Experiences</Link>
            <span>›</span>
            <Link href={`/experiences?category=${story.categoryId}`}>{story.category}</Link>
            <span>›</span>
            <span className="current">Story</span>
          </div>

          <div className="category-badge">
            <span className="badge-emoji">{story.emoji}</span>
            <span className="badge-text">{story.category}</span>
          </div>

          <h1 className="title">{story.title}</h1>

          <div className="meta">
            <div className="author">
              <div className="avatar">{story.emoji}</div>
              <div className="author-info">
                <div className="author-name">{story.anonymous}</div>
                <div className="author-time">{story.timeAgo}</div>
              </div>
            </div>
            <div className="stats">
              <span>👁️ {story.views.toLocaleString()}</span>
              <span>💚 {story.reactions}</span>
              <span>💬 {story.comments}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="content-wrapper">
        <article className="article">
          <div className="story-content">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {story.tags && story.tags.length > 0 && (
            <div className="tags">
              {story.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}

          <div className="actions">
            <StoryReactions 
              storyId={story.id} 
              initialReactions={story.reactions} 
              isStatic={true}
            />
            <a href="#comments" className="comment-btn">
              💬 Comment ({story.comments})
            </a>
            <ShareButton storyId={story.id} title={story.title} />
          </div>

          <div id="comments">
            <StoryComments 
              storyId={story.id} 
              initialCount={story.comments}
              isStatic={false}
            />
          </div>
        </article>

        <aside className="sidebar">
          <div className="sidebar-card">
            <h3>Related Stories</h3>
            {relatedStories.length > 0 ? (
              <div className="related-list">
                {relatedStories.map((related) => (
                  <Link href={`/story/${related.id}`} key={related.id} className="related-item">
                    <span className="related-emoji">{related.emoji}</span>
                    <div className="related-info">
                      <div className="related-title">{related.title}</div>
                      <div className="related-meta">by {related.anonymous}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="no-related">No related stories yet</p>
            )}
          </div>

          <div className="sidebar-card">
            <h3>Categories</h3>
            <div className="category-list">
              {STORY_CATEGORIES.map((cat) => (
                <Link 
                  href={`/experiences?category=${cat.id}`} 
                  key={cat.id}
                  className="category-link"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-card cta-card">
            <h3>Share Your Story</h3>
            <p>Have a story to share? Your experience could help someone else.</p>
            <Link href="/share" className="cta-btn">Share Anonymously →</Link>
          </div>
        </aside>
      </div>

      <style>{`
        .story-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .hero {
          background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1ABC9C 100%);
          padding: 4rem 1rem 2.5rem;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          font-size: 0.813rem;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
        }
        .breadcrumb a:hover {
          color: #fff;
        }
        .breadcrumb span {
          color: rgba(255,255,255,0.5);
        }
        .breadcrumb .current {
          color: rgba(255,255,255,0.9);
        }
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.1);
          padding: 0.4rem 0.875rem;
          border-radius: 20px;
          margin-bottom: 1rem;
        }
        .badge-emoji {
          font-size: 1.125rem;
        }
        .badge-text {
          color: #1ABC9C;
          font-weight: 600;
          font-size: 0.813rem;
        }
        .title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        .meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1ABC9C, #9B59B6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
        }
        .author-name {
          color: #fff;
          font-weight: 600;
          font-size: 0.938rem;
        }
        .author-time {
          color: rgba(255,255,255,0.6);
          font-size: 0.813rem;
        }
        .stats {
          display: flex;
          gap: 1rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.813rem;
        }

        .content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem 3rem;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .content-wrapper {
            grid-template-columns: 1fr;
          }
        }

        .article {
          background: #fff;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid #e2e8f0;
        }
        .story-content {
          font-size: 0.975rem;
          line-height: 1.85;
          color: #374151;
        }
        .story-content p {
          margin-bottom: 1.25rem;
          text-align: justify;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        .tag {
          background: #f3f4f6;
          color: #6b7280;
          padding: 0.375rem 0.875rem;
          border-radius: 16px;
          font-size: 0.813rem;
          font-weight: 500;
        }
        .actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          flex-wrap: wrap;
        }
        .comment-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          background: #f3f4f6;
          color: #374151;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .comment-btn:hover {
          background: #e5e7eb;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .sidebar-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.25rem;
          border: 1px solid #e2e8f0;
        }
        .sidebar-card h3 {
          font-size: 0.938rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        .related-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .related-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.625rem;
          background: #f8fafc;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .related-item:hover {
          background: #f1f5f9;
        }
        .related-emoji {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .related-title {
          font-size: 0.813rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .related-meta {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.25rem;
        }
        .no-related {
          font-size: 0.813rem;
          color: #64748b;
        }
        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .category-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: #f8fafc;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.813rem;
          color: #475569;
          transition: all 0.2s;
        }
        .category-link:hover {
          background: #f0fdf4;
          color: #166534;
        }
        .cta-card {
          background: linear-gradient(135deg, rgba(26, 188, 156, 0.1), rgba(155, 89, 182, 0.1));
          border-color: rgba(26, 188, 156, 0.3);
        }
        .cta-card p {
          font-size: 0.813rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .cta-btn {
          display: block;
          text-align: center;
          padding: 0.625rem 1rem;
          background: #1ABC9C;
          color: #fff;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: background 0.2s;
        }
        .cta-btn:hover {
          background: #16a085;
        }
      `}</style>
    </main>
  );
}
