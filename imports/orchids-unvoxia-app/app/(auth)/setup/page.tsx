'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AVATAR_ICONS = [
  { id: 'spiral', emoji: '🌀', label: 'Spiral' },
  { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
  { id: 'wave', emoji: '🌊', label: 'Wave' },
  { id: 'flower', emoji: '🌸', label: 'Flower' },
  { id: 'moon', emoji: '🌙', label: 'Moon' },
  { id: 'star', emoji: '⭐', label: 'Star' },
  { id: 'flame', emoji: '🔥', label: 'Flame' },
  { id: 'sparkle', emoji: '💫', label: 'Sparkle' },
  { id: 'leaf', emoji: '🌿', label: 'Leaf' },
  { id: 'mask', emoji: '🎭', label: 'Mask' },
  { id: 'gem', emoji: '💎', label: 'Gem' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
  { id: 'cloud', emoji: '☁️', label: 'Cloud' },
  { id: 'heart', emoji: '💜', label: 'Heart' },
  { id: 'feather', emoji: '🪶', label: 'Feather' },
  { id: 'lotus', emoji: '🪷', label: 'Lotus' },
];

export default function SetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('spiral');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Username validation regex
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  // Check username availability with debounce
  useEffect(() => {
    if (!username || !usernameRegex.test(username)) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const res = await fetch(`/api/users/check-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        setIsAvailable(data.available);
      } catch {
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const validateUsername = (value: string): string => {
    if (value.length < 3) return 'At least 3 characters';
    if (value.length > 20) return 'Maximum 20 characters';
    if (!usernameRegex.test(value)) return 'Letters, numbers, underscores only';
    return '';
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(value);
    setError(validateUsername(value));
  };

  const handleSubmit = async () => {
    if (!username || !isAvailable || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          avatar_icon: selectedAvatar,
        }),
      });

      if (res.ok) {
        router.push('/foryou');
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAvatarEmoji = AVATAR_ICONS.find(a => a.id === selectedAvatar)?.emoji || '🌀';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          top: '20%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          Choose a name that protects you
        </h1>

        {/* Preview avatar */}
        <div
          style={{
            fontSize: '4rem',
            marginBottom: '2rem',
            marginTop: '1rem',
          }}
        >
          {selectedAvatarEmoji}
        </div>

        {/* Username input */}
        <div style={{ width: '100%', marginBottom: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: `2px solid ${
                error ? '#ef4444' : 
                isAvailable === true ? '#0d9488' : 
                isAvailable === false ? '#ef4444' : 
                'rgba(255, 255, 255, 0.1)'
              }`,
              padding: '0.75rem 1rem',
              transition: 'border-color 0.2s ease',
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', marginRight: '0.25rem' }}>@</span>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="your_anonymous_name"
              maxLength={20}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
            {isChecking && (
              <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>...</span>
            )}
            {!isChecking && isAvailable === true && (
              <span style={{ color: '#0d9488' }}>✓</span>
            )}
            {!isChecking && isAvailable === false && (
              <span style={{ color: '#ef4444' }}>✗</span>
            )}
          </div>

          {/* Error/status message */}
          <p
            style={{
              fontSize: '0.8rem',
              color: error || isAvailable === false ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
              marginTop: '0.5rem',
              minHeight: '1.2rem',
            }}
          >
            {error || (isAvailable === false ? 'Username taken' : 'Anonymous. No real identity.')}
          </p>
        </div>

        {/* Avatar selector */}
        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1rem',
            }}
          >
            Pick your avatar
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '0.5rem',
            }}
          >
            {AVATAR_ICONS.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  fontSize: '1.5rem',
                  background: selectedAvatar === avatar.id 
                    ? 'rgba(13, 148, 136, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: selectedAvatar === avatar.id 
                    ? '2px solid #0d9488' 
                    : '2px solid transparent',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={avatar.label}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!username || !isAvailable || isSubmitting}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#fff',
            background: username && isAvailable && !isSubmitting
              ? 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '12px',
            cursor: username && isAvailable && !isSubmitting ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Setting up...' : 'Continue →'}
        </button>
      </div>
    </main>
  );
}
