'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'love-relationships', name: 'Love & Relationships', emoji: '💔', description: 'Heartbreak, dating, romance' },
  { id: 'mental-health', name: 'Mental Health', emoji: '🧠', description: 'Anxiety, depression, therapy' },
  { id: 'marriage-family', name: 'Marriage & Family', emoji: '💍', description: 'Spouse, children, parenting' },
  { id: 'job-stress', name: 'Jobs & Career', emoji: '💼', description: 'Work stress, job loss, career' },
  { id: 'home-trauma', name: 'Family Trauma', emoji: '🏠', description: 'Childhood, parents, abuse' },
  { id: 'loneliness', name: 'Loneliness', emoji: '😔', description: 'Isolation, no friends' },
  { id: 'secrets', name: 'Confessions', emoji: '🔒', description: 'Secrets, guilt, shame' },
  { id: 'healing-growth', name: 'Healing & Growth', emoji: '🌱', description: 'Recovery, self-improvement' },
  { id: 'health', name: 'Health Struggles', emoji: '🩺', description: 'Illness, chronic pain' },
  { id: 'other', name: 'Other', emoji: '💭', description: 'Anything else' }
];

const ANONYMOUS_NAMES = [
  'Healing Soul', 'Rising Phoenix', 'Silent Strength', 'Brave Heart',
  'Gentle Spirit', 'Quiet Warrior', 'Hopeful Heart', 'Seeking Light',
  'Finding Peace', 'Growing Stronger', 'Inner Light', 'Peaceful Mind'
];

export default function ShareStoryPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storySlug, setStorySlug] = useState<string | null>(null);

  useEffect(() => {
    setAnonymousName(ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)]);
  }, []);

  const handleSubmit = async () => {
    if (submitting) return;
    
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          categoryId,
          anonymousName: anonymousName.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to share story');
      }

      setSuccess(true);
      setStoryId(data.storyId);
      setStorySlug(data.slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  const selectedCategory = CATEGORIES.find(c => c.id === categoryId);

  if (success) {
    return (
      <main className="share-page">
        <div className="share-container success-container">
          <div className="success-icon">✨</div>
          <h1>Your Story Has Been Shared!</h1>
          <p>Thank you for having the courage to share your experience. Your story may help someone going through the same thing.</p>
          
          <div className="success-actions">
            {storySlug && (
              <Link href={`/story/${storySlug}`} className="btn btn-primary">
                View Your Story
              </Link>
            )}
            <Link href="/experiences" className="btn btn-secondary">
              Browse Stories
            </Link>
            <button onClick={() => {
              setSuccess(false);
              setStep(1);
              setTitle('');
              setContent('');
              setCategoryId('');
              setStoryId(null);
              setStorySlug(null);
            }} className="btn btn-outline">
              Share Another Story
            </button>
          </div>
        </div>

        <style jsx>{`
          .share-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 2rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .share-container {
            max-width: 600px;
            width: 100%;
            background: #fff;
            border-radius: 16px;
            padding: 2.5rem;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          }
          .success-container {
            text-align: center;
          }
          .success-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
          }
          .success-container h1 {
            font-size: 1.75rem;
            color: #1e293b;
            margin-bottom: 0.75rem;
          }
          .success-container p {
            font-size: 0.938rem;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .success-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .btn {
            padding: 0.875rem 1.5rem;
            border-radius: 8px;
            font-size: 0.938rem;
            font-weight: 600;
            text-decoration: none;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
          }
          .btn-primary {
            background: #1ABC9C;
            color: #fff;
          }
          .btn-primary:hover {
            background: #16a085;
          }
          .btn-secondary {
            background: #e2e8f0;
            color: #475569;
          }
          .btn-secondary:hover {
            background: #cbd5e1;
          }
          .btn-outline {
            background: transparent;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }
          .btn-outline:hover {
            background: #f8fafc;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="share-page">
      <div className="share-container">
        <div className="progress-bar">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">Category</span>
          </div>
          <div className="step-line" />
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Title</span>
          </div>
          <div className="step-line" />
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">Story</span>
          </div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h2>What's your story about?</h2>
            <p className="subtitle">Choose a category that best fits your experience</p>
            
            <div className="category-grid">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`category-card ${categoryId === cat.id ? 'selected' : ''}`}
                >
                  <span className="cat-emoji">{cat.emoji}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-desc">{cat.description}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep(2)} 
              disabled={!categoryId}
              className="btn btn-primary btn-next"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Give your story a title</h2>
            <p className="subtitle">A compelling title helps others connect with your experience</p>
            
            <div className="selected-category">
              <span>{selectedCategory?.emoji}</span>
              <span>{selectedCategory?.name}</span>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learning to Love Myself After Years of Self-Doubt"
              className="title-input"
              maxLength={150}
            />
            <div className="char-count">{title.length}/150 characters</div>

            <div className="name-section">
              <label>Your anonymous name</label>
              <input
                type="text"
                value={anonymousName}
                onChange={(e) => setAnonymousName(e.target.value)}
                placeholder="e.g., Healing Soul"
                className="name-input"
                maxLength={30}
              />
              <p className="name-hint">This is how you'll appear. Feel free to change it or keep the suggested name.</p>
            </div>

            <div className="btn-group">
              <button onClick={() => setStep(1)} className="btn btn-secondary">
                ← Back
              </button>
              <button 
                onClick={() => setStep(3)} 
                disabled={title.trim().length < 10}
                className="btn btn-primary"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Share your story</h2>
            <p className="subtitle">Take your time. Your words matter and may help someone else.</p>
            
            <div className="story-preview">
              <span className="preview-cat">{selectedCategory?.emoji} {selectedCategory?.name}</span>
              <h3>{title}</h3>
              <span className="preview-author">by {anonymousName}</span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your story here...

You can share:
• What happened and how it made you feel
• How you've been coping or struggling  
• What you've learned or wish you knew
• Any advice for others in similar situations

Remember: You are completely anonymous. No one will know who you are."
              className="content-textarea"
              rows={12}
            />
            <div className="char-count">
              {content.length} characters 
              {content.length < 100 && <span className="min-hint">(minimum 100)</span>}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="btn-group">
              <button onClick={() => setStep(2)} className="btn btn-secondary" disabled={submitting}>
                ← Back
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={content.trim().length < 100 || submitting}
                className="btn btn-primary btn-submit"
              >
                {submitting ? 'Sharing...' : 'Share My Story ✨'}
              </button>
            </div>

            <div className="privacy-note">
              <span className="lock-icon">🔒</span>
              <p><strong>Your privacy is protected.</strong> We don't collect names, emails, or IP addresses. Your submission is completely anonymous.</p>
            </div>
          </div>
        )}

        <div className="safety-notice">
          <strong>⚠️ Crisis Support:</strong> If you're experiencing thoughts of self-harm, please contact a crisis helpline.
          <a href="tel:0722178177">Kenya: 0722 178 177 (Befrienders)</a>
        </div>
      </div>

      <style jsx>{`
        .share-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
        }
        .share-container {
          max-width: 700px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.813rem;
          font-weight: 600;
        }
        .step.active .step-num {
          background: #1ABC9C;
          color: #fff;
        }
        .step-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .step.active .step-label {
          color: #1ABC9C;
        }
        .step-line {
          width: 40px;
          height: 2px;
          background: #e2e8f0;
          margin: 0 0.5rem;
        }
        .step-content h2 {
          font-size: 1.375rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .subtitle {
          font-size: 0.875rem;
          color: #64748b;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.875rem 0.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .category-card:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .category-card.selected {
          border-color: #1ABC9C;
          background: rgba(26, 188, 156, 0.05);
        }
        .cat-emoji {
          font-size: 1.5rem;
        }
        .cat-name {
          font-size: 0.813rem;
          font-weight: 600;
          color: #334155;
          text-align: center;
        }
        .cat-desc {
          font-size: 0.688rem;
          color: #94a3b8;
          text-align: center;
        }
        .selected-category {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f0fdf4;
          border-radius: 20px;
          font-size: 0.875rem;
          color: #166534;
          margin-bottom: 1rem;
        }
        .title-input {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .title-input:focus {
          outline: none;
          border-color: #1ABC9C;
        }
        .char-count {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: right;
          margin-bottom: 1.5rem;
        }
        .min-hint {
          color: #f59e0b;
          margin-left: 0.25rem;
        }
        .name-section {
          margin-bottom: 1.5rem;
        }
        .name-section label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .name-input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.938rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          color: #1e293b;
          margin-bottom: 0.375rem;
        }
        .name-input:focus {
          outline: none;
          border-color: #1ABC9C;
        }
        .name-hint {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0;
        }
        .story-preview {
          background: #f8fafc;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .preview-cat {
          font-size: 0.75rem;
          color: #64748b;
        }
        .story-preview h3 {
          font-size: 1rem;
          color: #1e293b;
          margin: 0.25rem 0;
        }
        .preview-author {
          font-size: 0.813rem;
          color: #94a3b8;
        }
        .content-textarea {
          width: 100%;
          padding: 1rem;
          font-size: 0.938rem;
          line-height: 1.7;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          color: #1e293b;
          resize: vertical;
          min-height: 250px;
          font-family: inherit;
        }
        .content-textarea:focus {
          outline: none;
          border-color: #1ABC9C;
        }
        .content-textarea::placeholder {
          color: #94a3b8;
        }
        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .btn-group {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .btn {
          flex: 1;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-size: 0.938rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-primary {
          background: #1ABC9C;
          color: #fff;
        }
        .btn-primary:hover:not(:disabled) {
          background: #16a085;
        }
        .btn-secondary {
          background: #e2e8f0;
          color: #475569;
        }
        .btn-secondary:hover:not(:disabled) {
          background: #cbd5e1;
        }
        .btn-next {
          width: 100%;
          margin-top: 0.5rem;
        }
        .btn-submit {
          min-width: 180px;
        }
        .privacy-note {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(26, 188, 156, 0.05);
          border-radius: 10px;
          border-left: 3px solid #1ABC9C;
        }
        .lock-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .privacy-note p {
          font-size: 0.813rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        .safety-notice {
          margin-top: 1.5rem;
          padding: 0.875rem 1rem;
          background: #fffbeb;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #92400e;
          line-height: 1.5;
        }
        .safety-notice a {
          display: block;
          color: #b45309;
          margin-top: 0.25rem;
        }
        @media (max-width: 600px) {
          .share-container {
            padding: 1.5rem;
          }
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .step-label {
            display: none;
          }
          .step-line {
            width: 30px;
          }
        }
      `}</style>
    </main>
  );
}
