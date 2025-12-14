'use client';

import { useState } from 'react';

interface ShareButtonProps {
  storyId: string | number;
  title: string;
  slug?: string;
}

export default function ShareButton({ storyId, title, slug }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Use slug if provided, fallback to ID
  const storyPath = slug || storyId;
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/story/${storyPath}`
    : `/story/${storyPath}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track share
      fetch(`/api/stories/${storyId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: 'copy' })
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    setShowMenu(false);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const text = `${title} - Read this story on NOMA`;

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      // Track share
      fetch(`/api/stories/${storyId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform })
      }).catch(() => {});
    }
    setShowMenu(false);
  };

  return (
    <div className="share-wrapper">
      <button 
        className="share-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        🔗 Share
      </button>

      {showMenu && (
        <div className="share-menu">
          <button onClick={handleCopy} className="share-option">
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
          <button onClick={() => handleShare('twitter')} className="share-option">
            𝕏 Twitter
          </button>
          <button onClick={() => handleShare('facebook')} className="share-option">
            📘 Facebook
          </button>
          <button onClick={() => handleShare('whatsapp')} className="share-option">
            💬 WhatsApp
          </button>
          <button onClick={() => handleShare('linkedin')} className="share-option">
            💼 LinkedIn
          </button>
        </div>
      )}

      <style jsx>{`
        .share-wrapper {
          position: relative;
        }
        .share-btn {
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
          transition: all 0.2s;
        }
        .share-btn:hover {
          background: #e5e7eb;
        }
        .share-menu {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          overflow: hidden;
          z-index: 100;
          min-width: 150px;
        }
        .share-option {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          text-align: left;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s;
        }
        .share-option:hover {
          background: #f3f4f6;
        }
        .share-option:not(:last-child) {
          border-bottom: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
