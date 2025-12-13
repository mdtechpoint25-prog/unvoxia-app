'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STORIES, STORY_CATEGORIES, getFeaturedStories, getTrendingStories } from '@/lib/stories-data';

// Get the stories from the data file
const FEATURED_STORIES = getFeaturedStories();
const TRENDING_STORIES = getTrendingStories();
const LATEST_STORIES = STORIES.filter(s => !s.featured).slice(0, 10);
const CATEGORIES = STORY_CATEGORIES.map(cat => ({
  ...cat,
  // Add some realistic counts
  count: Math.floor(Math.random() * 800) + 200
}));

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 50%, #1ABC9C 100%)',
        padding: '4rem 1rem 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(26, 188, 156, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(155, 89, 182, 0.3) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Explore Real Experiences From Our Community
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.7
            }}>
              Thousands of anonymous stories shared by people just like you. 
              Read, connect, and know that you're not alone.
            </p>

            {/* Search Bar */}
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <div style={{
                flex: 1,
                position: 'relative'
              }}>
                <input
                  type="text"
                  placeholder="Search stories, topics, or feelings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <svg
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af'
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                style={{
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #1ABC9C, #16a085)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(26, 188, 156, 0.4)'
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Featured Stories */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {FEATURED_STORIES.map((story) => (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{story.emoji}</span>
                  <span style={{
                    color: '#1ABC9C',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {story.category}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem'
                  }}>
                    {story.timeAgo}
                  </span>
                </div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  lineHeight: 1.4
                }}>
                  {story.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  {story.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.875rem'
                }}>
                  <span>💚 {story.reactions}</span>
                  <span>💬 {story.comments}</span>
                  <span style={{ marginLeft: 'auto', color: '#1ABC9C' }}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        padding: '3rem 1rem',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1a1a2e'
            }}>
              Browse Communities
            </h2>
            <Link
              href="/circles"
              style={{
                color: '#1ABC9C',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              View All Communities →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem'
          }}>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                style={{
                  background: selectedCategory === category.id ? 'linear-gradient(135deg, #1ABC9C, #16a085)' : '#f8f9fa',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.emoji}</div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: selectedCategory === category.id ? '#fff' : '#1a1a2e',
                  marginBottom: '0.25rem'
                }}>
                  {category.name}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: selectedCategory === category.id ? 'rgba(255,255,255,0.8)' : '#6b7280'
                }}>
                  {category.count.toLocaleString()} stories
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{
        padding: '3rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '2rem'
        }}>
          {/* Stories Feed */}
          <div>
            {/* Sort Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a2e'
              }}>
                {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Latest Stories'}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setSortBy('latest')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: sortBy === 'latest' ? '#1ABC9C' : '#e5e7eb',
                    color: sortBy === 'latest' ? '#fff' : '#6b7280',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: sortBy === 'popular' ? '#1ABC9C' : '#e5e7eb',
                    color: sortBy === 'popular' ? '#fff' : '#6b7280',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Popular
                </button>
              </div>
            </div>

            {/* Story Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LATEST_STORIES.map((story) => (
                <article
                  key={story.id}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
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
                        fontWeight: 600,
                        color: '#1a1a2e',
                        fontSize: '0.9rem'
                      }}>
                        {story.anonymous}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        {story.category} • {story.timeAgo}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1a1a2e',
                    marginBottom: '0.75rem',
                    lineHeight: 1.4
                  }}>
                    {story.title}
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem'
                  }}>
                    {story.excerpt}
                  </p>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>💚</span>
                      <span>{story.reactions}</span>
                    </button>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        padding: '0.5rem',
                        borderRadius: '8px'
                      }}
                    >
                      <span>💬</span>
                      <span>{story.comments}</span>
                    </button>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        padding: '0.5rem',
                        borderRadius: '8px'
                      }}
                    >
                      <span>🔗</span>
                      <span>Share</span>
                    </button>
                    <Link
                      href={`/story/${story.id}`}
                      style={{
                        marginLeft: 'auto',
                        color: '#1ABC9C',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textDecoration: 'none'
                      }}
                    >
                      Read Full Story →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <button
              style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1.5rem',
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                color: '#1ABC9C',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              Load More Stories
            </button>
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Share CTA */}
            <div style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              color: '#fff'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✍️</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '0.75rem'
              }}>
                Share Your Story
              </h3>
              <p style={{
                fontSize: '0.9rem',
                opacity: 0.9,
                marginBottom: '1.25rem',
                lineHeight: 1.6
              }}>
                Your experience could help someone else. Share anonymously and connect with others who understand.
              </p>
              <Link
                href="/share"
                style={{
                  display: 'inline-block',
                  padding: '0.875rem 2rem',
                  background: '#fff',
                  color: '#1ABC9C',
                  fontWeight: 600,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
              >
                Share Now
              </Link>
            </div>

            {/* Trending Stories */}
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
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🔥 Trending Now
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {TRENDING_STORIES.map((story, index) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.id}`}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      background: '#f8f9fa',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: index < 3 ? 'linear-gradient(135deg, #1ABC9C, #16a085)' : '#e5e7eb',
                      color: index < 3 ? '#fff' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#1a1a2e',
                        lineHeight: 1.4,
                        marginBottom: '0.25rem'
                      }}>
                        {story.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        💚 {story.reactions} • {story.category}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
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
                📋 Community Guidelines
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: '#92400e',
                lineHeight: 1.5,
                marginBottom: '0.75rem'
              }}>
                All stories are moderated for safety. Be respectful, supportive, and protect privacy.
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
                Read Full Guidelines →
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: '1rem'
              }}>
                Community Stats
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1ABC9C'
                  }}>
                    5,200+
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Stories</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#9B59B6'
                  }}>
                    12,400+
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Members</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile CTA (fixed) */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        zIndex: 50,
        display: 'none' // Show only on mobile via CSS
      }} className="mobile-cta">
        <Link
          href="/share"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #1ABC9C, #16a085)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(26, 188, 156, 0.4)'
          }}
        >
          ✍️ Share Your Experience
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
          aside {
            order: -1;
          }
        }
        @media (max-width: 640px) {
          .mobile-cta {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
