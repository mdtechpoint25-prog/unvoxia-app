'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STORIES, STORY_CATEGORIES } from '@/lib/stories-data';

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  // Filter and sort stories
  const filteredStories = STORIES
    .filter(story => !selectedCategory || story.categoryId === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.reactions - a.reactions;
      }
      return 0; // Keep original order for 'latest'
    });

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      padding: '5rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '0.75rem'
          }}>
            All Stories
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {STORIES.length} real stories of healing, struggle, and hope. Every voice matters.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: !selectedCategory ? '2px solid #1ABC9C' : '1px solid #e5e7eb',
                background: !selectedCategory ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                color: !selectedCategory ? '#1ABC9C' : '#6b7280',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              All ({STORIES.length})
            </button>
            {STORY_CATEGORIES.map(cat => {
              const count = STORIES.filter(s => s.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: selectedCategory === cat.id ? '2px solid #1ABC9C' : '1px solid #e5e7eb',
                    background: selectedCategory === cat.id ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                    color: selectedCategory === cat.id ? '#1ABC9C' : '#6b7280',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
          </p>
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
                cursor: 'pointer'
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
                cursor: 'pointer'
              }}
            >
              Most Popular
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))'
        }}>
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.id}`}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e5e7eb',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'block'
              }}
            >
              {/* Category & Time */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{story.emoji}</span>
                <span style={{
                  color: '#1ABC9C',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  {story.category}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  color: '#9ca3af',
                  fontSize: '0.8rem'
                }}>
                  {story.timeAgo}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '0.75rem',
                lineHeight: 1.4
              }}>
                {story.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                color: '#4b5563',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                {story.excerpt}
              </p>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem'
                }}>
                  {story.emoji}
                </div>
                <span style={{
                  fontWeight: 600,
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  {story.anonymous}
                </span>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#6b7280',
                fontSize: '0.85rem'
              }}>
                <span>💚 {story.reactions}</span>
                <span>💬 {story.comments}</span>
                <span>👁️ {story.views.toLocaleString()}</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  color: '#1ABC9C',
                  fontWeight: 600
                }}>
                  Read Story →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#fff',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>No stories found</h3>
            <p style={{ color: '#6b7280' }}>Try selecting a different category</p>
          </div>
        )}

        {/* Share CTA */}
        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Your Story Could Help Someone
          </h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            maxWidth: '500px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6
          }}>
            Sharing your experience anonymously can bring healing to both you and others who may be going through the same thing.
          </p>
          <Link
            href="/share"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: '#fff',
              color: '#1ABC9C',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            ✍️ Share Your Story
          </Link>
        </div>
      </div>
    </main>
  );
}
