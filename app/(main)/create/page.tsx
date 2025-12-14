'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PostType = 'experience' | 'question' | 'advice' | 'release';

const postTypes: { value: PostType; label: string; description: string; icon: string }[] = [
  { value: 'experience', label: 'Experience', description: 'Share something you went through', icon: '📖' },
  { value: 'question', label: 'Question', description: 'Ask for thoughts or perspectives', icon: '❓' },
  { value: 'advice', label: 'Advice', description: 'Offer wisdom or support', icon: '💡' },
  { value: 'release', label: 'Release', description: 'Just let it out, no response needed', icon: '🌊' },
];

const suggestedTags = [
  'love', 'relationships', 'depression', 'anxiety', 'work', 'family',
  'loneliness', 'healing', 'selfcare', 'burnout', 'hope', 'growth',
];

export default function CreatePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<PostType>('experience');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allowComments, setAllowComments] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const charLimit = 1500;
  const charCount = content.length;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : prev.length < 5 ? [...prev, tag] : prev
    );
  };

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // TODO: Call API to create post
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push('/foryou');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>

        <h1 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          New Post
        </h1>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          style={{
            background: content.trim() ? '#0d9488' : 'rgba(13, 148, 136, 0.3)',
            border: 'none',
            borderRadius: '20px',
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: '8px 20px',
            cursor: content.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </header>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Post Type Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', marginBottom: '12px', display: 'block' }}>
            What kind of post is this?
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {postTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setPostType(type.value)}
                style={{
                  padding: '12px',
                  background: postType === type.value ? 'rgba(13, 148, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: postType === type.value ? '1px solid #0d9488' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{type.icon}</span>
                  <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{type.label}</span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', margin: 0 }}>
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ marginBottom: '24px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, charLimit))}
            placeholder={
              postType === 'experience' ? "What happened? How did it make you feel?" :
              postType === 'question' ? "What's on your mind? What do you want to understand?" :
              postType === 'advice' ? "What wisdom do you want to share?" :
              "Let it out. No one will judge you here."
            }
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              resize: 'vertical',
              fontFamily: 'Georgia, serif',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(13, 148, 136, 0.5)';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <span style={{ 
              color: charCount > charLimit * 0.9 ? '#ef4444' : 'rgba(255, 255, 255, 0.4)', 
              fontSize: '0.8rem' 
            }}>
              {charCount}/{charLimit}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', marginBottom: '12px', display: 'block' }}>
            Add tags (up to 5)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '8px 14px',
                  background: selectedTags.includes(tag) ? 'rgba(13, 148, 136, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedTags.includes(tag) ? '1px solid #0d9488' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  color: selectedTags.includes(tag) ? '#0d9488' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <span style={{ color: '#fff', fontSize: '0.95rem' }}>Allow responses</span>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                Let others leave supportive comments
              </p>
            </div>
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                accentColor: '#0d9488',
                cursor: 'pointer',
              }}
            />
          </label>
        </div>

        {/* Privacy Note */}
        <div
          style={{
            padding: '16px',
            background: 'rgba(124, 58, 237, 0.1)',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
            🔒 Your post will be anonymous. Only your username is visible.
          </p>
        </div>
      </div>
    </div>
  );
}
