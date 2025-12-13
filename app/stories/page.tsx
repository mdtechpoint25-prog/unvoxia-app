'use client';

import { useState } from 'react';

const healingStories = [
  {
    id: 1,
    title: 'Finding Light in Darkness',
    content: 'After months of feeling lost, I finally reached out for help. It wasn\'t easy, but taking that first step changed everything. You don\'t have to suffer alone.',
    mood: '🌅',
    category: 'Hope',
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Learning to Be Kind to Myself',
    content: 'I used to be my own worst critic. Slowly, I\'m learning that self-compassion isn\'t weakness—it\'s strength. Be gentle with yourself.',
    mood: '💚',
    category: 'Self-Love',
    date: '5 days ago'
  },
  {
    id: 3,
    title: 'It\'s Okay to Not Be Okay',
    content: 'Society tells us to always be strong, but it\'s okay to struggle. It\'s okay to cry. It\'s okay to ask for support. Your feelings are valid.',
    mood: '🕊️',
    category: 'Validation',
    date: '1 week ago'
  },
  {
    id: 4,
    title: 'Small Steps Forward',
    content: 'Progress isn\'t always linear. Some days are harder than others. But each small step counts, even when it doesn\'t feel like it.',
    mood: '🌱',
    category: 'Progress',
    date: '1 week ago'
  },
  {
    id: 5,
    title: 'The Power of Being Heard',
    content: 'Someone finally listened without judgment. They didn\'t try to fix me—they just heard me. Sometimes that\'s all we need.',
    mood: '👂',
    category: 'Connection',
    date: '2 weeks ago'
  },
  {
    id: 6,
    title: 'Healing Takes Time',
    content: 'There\'s no timeline for healing. Don\'t rush yourself. Don\'t compare your journey to others. You\'re exactly where you need to be.',
    mood: '⏳',
    category: 'Patience',
    date: '2 weeks ago'
  }
];

export default function StoriesPage() {
  const [filter, setFilter] = useState('all');

  const categories = ['Hope', 'Self-Love', 'Validation', 'Progress', 'Connection', 'Patience'];

  const filteredStories = filter === 'all' 
    ? healingStories 
    : healingStories.filter(s => s.category === filter);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '6rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '0.75rem'
          }}>
            Healing Stories
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#7a8a9a',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Real stories of hope, resilience, and healing. You are not alone.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '2.5rem'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '50px',
              border: filter === 'all' ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
              background: filter === 'all' ? 'rgba(26, 188, 156, 0.1)' : '#fff',
              color: filter === 'all' ? '#1ABC9C' : '#6b7280',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            All Stories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '50px',
                border: filter === cat ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
                background: filter === cat ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                color: filter === cat ? '#1ABC9C' : '#6b7280',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
        }}>
          {filteredStories.map((story) => (
            <article
              key={story.id}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '2rem'
                }}>
                  {story.mood}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}>
                  {story.category}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#2C3E50',
                marginBottom: '0.75rem',
                lineHeight: 1.3
              }}>
                {story.title}
              </h3>

              {/* Content */}
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#5a6c7d',
                marginBottom: '1.25rem'
              }}>
                {story.content}
              </p>

              {/* Footer */}
              <div style={{
                fontSize: '0.85rem',
                color: '#9ca3af'
              }}>
                {story.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
