import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STORIES, getStoryById, STORY_CATEGORIES } from '@/lib/stories-data';

// Generate static params for all stories
export async function generateStaticParams() {
  return STORIES.map((story) => ({
    id: story.id.toString(),
  }));
}

// Generate metadata for each story
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

  // Get related stories from same category
  const relatedStories = STORIES
    .filter(s => s.categoryId === story.categoryId && s.id !== story.id)
    .slice(0, 3);

  // Format content paragraphs
  const paragraphs = story.content.split('\n\n');

  return (
    <main style={{ 
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 50%, #1ABC9C 100%)',
        padding: '5rem 1rem 3rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Link 
              href="/experiences" 
              style={{ 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              Experiences
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>›</span>
            <Link 
              href={`/experiences?category=${story.categoryId}`}
              style={{ 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              {story.category}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Story</span>
          </div>

          {/* Category Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>{story.emoji}</span>
            <span style={{ 
              color: '#1ABC9C', 
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              {story.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: 1.3
          }}>
            {story.title}
          </h1>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                {story.emoji}
              </div>
              <div>
                <div style={{
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {story.anonymous}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.85rem'
                }}>
                  {story.timeAgo}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
              marginLeft: 'auto'
            }}>
              <span>👁️ {story.views.toLocaleString()} views</span>
              <span>💚 {story.reactions}</span>
              <span>💬 {story.comments}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '2rem'
      }}>
        {/* Main Content */}
        <article style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Story Content */}
          <div style={{
            fontSize: '1.1rem',
            lineHeight: 1.9,
            color: '#374151'
          }}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} style={{
                marginBottom: '1.5rem',
                textAlign: 'justify'
              }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            {story.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#f3f4f6',
                  color: '#6b7280',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #1ABC9C, #16a085)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(26, 188, 156, 0.3)'
              }}
            >
              💚 Support ({story.reactions})
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              💬 Comment ({story.comments})
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              🔗 Share
            </button>
          </div>

          {/* Comment Section Placeholder */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              💬 Comments ({story.comments})
            </h3>
            
            {/* Comment Input */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <textarea
                placeholder="Share words of support or your own experience..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  resize: 'vertical',
                  minHeight: '100px',
                  marginBottom: '1rem'
                }}
              />
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #1ABC9C, #16a085)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Post Comment
              </button>
            </div>

            {/* Sample Comments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Compassionate Soul', time: '2 hours ago', text: 'Thank you for sharing this. Your courage to speak about this will help so many others. You are not alone. 💚' },
                { name: 'Fellow Traveler', time: '4 hours ago', text: 'I went through something similar. It gets better, I promise. Sending you strength and healing.' },
                { name: 'Hopeful Heart', time: '6 hours ago', text: 'This resonated with me so deeply. Thank you for putting into words what I could never express.' }
              ].map((comment, i) => (
                <div
                  key={i}
                  style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #9B59B6, #1ABC9C)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {comment.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '0.9rem' }}>
                      {comment.name}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                      • {comment.time}
                    </span>
                  </div>
                  <p style={{
                    color: '#4b5563',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1rem',
                background: 'transparent',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                color: '#6b7280',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              View All {story.comments} Comments
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Share CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✍️</div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Have a Similar Story?
            </h3>
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.9,
              marginBottom: '1rem',
              lineHeight: 1.5
            }}>
              Your experience could help someone else feel less alone.
            </p>
            <Link
              href="/share"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#fff',
                color: '#1ABC9C',
                fontWeight: 600,
                borderRadius: '8px',
                textDecoration: 'none'
              }}
            >
              Share Your Story
            </Link>
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '1rem'
              }}>
                Related Stories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedStories.map((related) => (
                  <Link
                    key={related.id}
                    href={`/story/${related.id}`}
                    style={{
                      display: 'block',
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#1a1a2e',
                      marginBottom: '0.5rem',
                      lineHeight: 1.4
                    }}>
                      {related.title}
                    </h4>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      💚 {related.reactions} • 💬 {related.comments}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Browse Categories */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '1rem'
            }}>
              Browse Categories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {STORY_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/experiences?category=${cat.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    background: cat.id === story.categoryId ? 'rgba(26, 188, 156, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{cat.emoji}</span>
                  <span style={{
                    flex: 1,
                    color: cat.id === story.categoryId ? '#1ABC9C' : '#374151',
                    fontWeight: cat.id === story.categoryId ? 600 : 500,
                    fontSize: '0.9rem'
                  }}>
                    {cat.name}
                  </span>
                  <span style={{
                    color: '#9ca3af',
                    fontSize: '0.8rem'
                  }}>
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Resources */}
          <div style={{
            background: '#fef3c7',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid #fcd34d'
          }}>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#92400e',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🆘 Need Support?
            </h3>
            <p style={{
              fontSize: '0.8rem',
              color: '#92400e',
              lineHeight: 1.5,
              marginBottom: '0.75rem'
            }}>
              If you're in crisis or need immediate help, please reach out to a crisis helpline.
            </p>
            <Link
              href="/safety"
              style={{
                fontSize: '0.8rem',
                color: '#92400e',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              View Resources →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
