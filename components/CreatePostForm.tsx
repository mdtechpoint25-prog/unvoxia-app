'use client';

import { useState, useRef } from 'react';
import { CATEGORIES } from '@/lib/constants';

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Reflection');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Maximum size is 50MB');
      return;
    }

    setMediaFile(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim() && !mediaFile) {
      setError('Please write something or add media to share');
      return;
    }

    setLoading(true);
    let mediaUrl = null;

    try {
      // Upload media if present
      if (mediaFile) {
        setUploadProgress('Uploading media...');
        const formData = new FormData();
        formData.append('file', mediaFile);

        const uploadRes = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Failed to upload media');

        mediaUrl = uploadData.url;
        setUploadProgress('');
      }

      // Create post
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, category, media_url: mediaUrl })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');

      setContent('');
      setCategory('Reflection');
      removeMedia();
      onPostCreated?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  const isVideo = mediaFile?.type.startsWith('video/');

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1rem' }}>
        Share Your Thoughts
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind? Share anonymously..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            resize: 'vertical',
            fontFamily: 'inherit',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        />

        {mediaPreview && (
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            {isVideo ? (
              <video
                src={mediaPreview}
                controls
                style={{ width: '100%', maxHeight: '300px', borderRadius: '8px' }}
              />
            ) : (
              <img
                src={mediaPreview}
                alt="Preview"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
            <button
              type="button"
              onClick={removeMedia}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              &times;
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            style={{
              padding: '0.5rem 1rem',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ?? Add Media
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: '#fff'
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#1ABC9C',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {loading ? (uploadProgress || 'Posting...') : 'Post'}
          </button>
        </div>
        {error && <p style={{ color: '#FF6F91', marginTop: '0.5rem' }}>{error}</p>}
        <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Max file size: 50MB. Supported: Images and videos up to 10 minutes.
        </p>
      </form>
    </div>
  );
}
