'use client';

import { useState, useEffect } from 'react';
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const charLimit = 1500;
  const charCount = content.length;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

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

    setShowSuccess(true);
    setTimeout(() => {
      router.push('/foryou');
    }, 1500);
  };

  if (showSuccess) {
    return <SuccessAnimation />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
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
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
            padding: '8px',
            transition: 'transform 0.2s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isSubmitting ? 'scale(0.95)' : 'scale(1)',
            boxShadow: content.trim() ? '0 4px 15px rgba(13, 148, 136, 0.3)' : 'none',
          }}
          onMouseDown={(e) => content.trim() && (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Posting...
            </span>
          ) : 'Post'}
        </button>
      </header>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Post Type Selector */}
        <div 
          style={{ 
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.1s',
          }}
        >
          <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', marginBottom: '12px', display: 'block' }}>
            What kind of post is this?
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {postTypes.map((type, index) => (
              <button
                key={type.value}
                onClick={() => setPostType(type.value)}
                style={{
                  padding: '14px',
                  background: postType === type.value ? 'rgba(13, 148, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: postType === type.value ? '2px solid #0d9488' : '2px solid transparent',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: postType === type.value ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: postType === type.value ? '0 0 20px rgba(13, 148, 136, 0.2)' : 'none',
                  opacity: isVisible ? 1 : 0,
                  animationDelay: `${0.15 + index * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  if (postType !== type.value) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (postType !== type.value) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span 
                    style={{ 
                      fontSize: '1.2rem',
                      animation: postType === type.value ? 'wiggle 0.5s ease' : 'none',
                    }}
                  >
                    {type.icon}
                  </span>
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
        <div 
          style={{ 
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.2s',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: focusedField === 'content' ? '2px solid rgba(13, 148, 136, 0.6)' : '2px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: focusedField === 'content' ? '0 0 30px rgba(13, 148, 136, 0.15)' : 'none',
            }}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, charLimit))}
              onFocus={() => setFocusedField('content')}
              onBlur={() => setFocusedField(null)}
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
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                resize: 'vertical',
                fontFamily: 'Georgia, "Times New Roman", serif',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <span 
              style={{ 
                color: charCount > charLimit * 0.9 ? '#ef4444' : 'rgba(255, 255, 255, 0.4)', 
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
              }}
            >
              {charCount}/{charLimit}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div 
          style={{ 
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.3s',
          }}
        >
          <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', marginBottom: '12px', display: 'block' }}>
            Add tags (up to 5)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {suggestedTags.map((tag, index) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '8px 14px',
                    background: isSelected ? 'rgba(13, 148, 136, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1px solid #0d9488' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    color: isSelected ? '#0d9488' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    animation: isSelected ? 'pop 0.3s ease' : 'none',
                  }}
                  onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                  onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div 
          style={{ 
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.35s',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
            }}
          >
            <div>
              <span style={{ color: '#fff', fontSize: '0.95rem' }}>Allow responses</span>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                Let others leave supportive comments
              </p>
            </div>
            <div
              onClick={() => setAllowComments(!allowComments)}
              style={{
                width: '50px',
                height: '28px',
                borderRadius: '14px',
                background: allowComments ? '#0d9488' : 'rgba(255, 255, 255, 0.2)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: allowComments ? '25px' : '3px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </label>
        </div>

        {/* Privacy Note */}
        <div
          style={{
            padding: '16px',
            background: 'rgba(124, 58, 237, 0.1)',
            borderRadius: '14px',
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.4s',
            animation: isVisible ? 'breathe 4s ease-in-out infinite' : 'none',
            animationDelay: '1s',
          }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
            🔒 Your post will be anonymous. Only your username is visible.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.01); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}

// Success Animation Component
function SuccessAnimation() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease forwards',
      }}
    >
      {/* Success checkmark */}
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          boxShadow: '0 0 60px rgba(13, 148, 136, 0.3)',
        }}
      >
        <span style={{ fontSize: '3rem', animation: 'pop 0.5s ease 0.2s forwards' }}>✓</span>
      </div>

      <h2
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 600,
          marginTop: '24px',
          animation: 'fadeInUp 0.5s ease 0.3s forwards',
          opacity: 0,
        }}
      >
        Posted!
      </h2>

      <p
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '1rem',
          marginTop: '8px',
          animation: 'fadeInUp 0.5s ease 0.4s forwards',
          opacity: 0,
        }}
      >
        Your voice has been heard.
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
