'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ReleaseOption = 'release' | 'advice' | 'relate';

export default function ReleasePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<ReleaseOption[]>(['release']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const toggleOption = (option: ReleaseOption) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  // Keyword-based supportive response
  const generateResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('alone') || lowerText.includes('lonely')) {
      return 'You\'re not alone. Right now, someone else is feeling exactly what you feel.';
    }
    if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
      return 'It\'s okay to rest. You\'ve been carrying more than anyone knows.';
    }
    if (lowerText.includes('angry') || lowerText.includes('hate')) {
      return 'Your anger is valid. It\'s okay to feel this deeply.';
    }
    if (lowerText.includes('scared') || lowerText.includes('afraid') || lowerText.includes('fear')) {
      return 'Fear is natural. You\'re braver than you think for facing it.';
    }
    if (lowerText.includes('sad') || lowerText.includes('cry') || lowerText.includes('tears')) {
      return 'Let the tears come. They carry what words cannot.';
    }
    if (lowerText.includes('pretend') || lowerText.includes('fake') || lowerText.includes('mask')) {
      return 'Here, you don\'t have to pretend. You are safe to be real.';
    }
    if (lowerText.includes('love') || lowerText.includes('miss')) {
      return 'Love leaves marks. Missing someone means they mattered.';
    }
    if (lowerText.includes('sorry') || lowerText.includes('guilt') || lowerText.includes('regret')) {
      return 'Carrying guilt is heavy. You\'re allowed to forgive yourself.';
    }
    if (lowerText.includes('lost') || lowerText.includes('confused')) {
      return 'Being lost is part of finding your way. You\'re exactly where you need to be.';
    }
    if (lowerText.includes('help') || lowerText.includes('struggling')) {
      return 'Asking for help takes courage. You\'ve already taken the first step.';
    }
    
    // Default supportive response
    return 'Thank you for trusting this space with your truth. What you feel matters.';
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - in production, save to database anonymously
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = generateResponse(content);
    setResponseMessage(response);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Breathing orb */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(13, 148, 136, 0.4), rgba(124, 58, 237, 0.3))',
            animation: 'breathe 4s ease-in-out infinite',
            marginBottom: '48px',
            boxShadow: '0 0 60px rgba(13, 148, 136, 0.3)',
          }}
        />

        {/* Response message */}
        <p
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: '500px',
            marginBottom: '48px',
          }}
        >
          {responseMessage}
        </p>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <button
            onClick={() => router.push('/breathe')}
            style={{
              padding: '16px 32px',
              background: 'rgba(13, 148, 136, 0.2)',
              border: '1px solid rgba(13, 148, 136, 0.4)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(13, 148, 136, 0.3)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'rgba(13, 148, 136, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Breathe with us
          </button>

          {selectedOptions.includes('relate') && (
            <button
              onClick={() => router.push('/feed')}
              style={{
                padding: '16px 32px',
                background: 'rgba(124, 58, 237, 0.2)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.3)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Read similar experiences
            </button>
          )}

          <button
            onClick={() => router.push('/')}
            style={{
              padding: '16px 32px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Return to the stream
          </button>
        </div>

        <style jsx>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'inherit',
        }}
      >
        ← Back to stream
      </button>

      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          marginTop: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '16px',
          }}
        >
          Let it out
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '400px',
          }}
        >
          This is a space to release what you\'ve been carrying.
        </p>
      </div>

      {/* Text area */}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type what you've never been able to say…"
        style={{
          width: '100%',
          maxWidth: '600px',
          minHeight: '200px',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          resize: 'vertical',
          fontFamily: 'Georgia, serif',
          marginBottom: '32px',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(13, 148, 136, 0.5)';
          e.target.style.outline = 'none';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      />

      {/* Options */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '32px',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
          }}
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes('release')}
            onChange={() => toggleOption('release')}
            style={{
              width: '20px',
              height: '20px',
              accentColor: '#0d9488',
              cursor: 'pointer',
            }}
          />
          I just need to release
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
          }}
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes('advice')}
            onChange={() => toggleOption('advice')}
            style={{
              width: '20px',
              height: '20px',
              accentColor: '#0d9488',
              cursor: 'pointer',
            }}
          />
          I would like gentle advice
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
          }}
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes('relate')}
            onChange={() => toggleOption('relate')}
            style={{
              width: '20px',
              height: '20px',
              accentColor: '#0d9488',
              cursor: 'pointer',
            }}
          />
          I want to hear from others who relate
        </label>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!content.trim() || isSubmitting}
        style={{
          padding: '18px 48px',
          background: content.trim() ? '#0d9488' : 'rgba(13, 148, 136, 0.3)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '1.1rem',
          cursor: content.trim() ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          fontFamily: 'inherit',
          fontWeight: 500,
          marginBottom: '24px',
          opacity: isSubmitting ? 0.7 : 1,
        }}
        onMouseOver={e => {
          if (content.trim() && !isSubmitting) {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.background = '#0f766e';
          }
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'scale(1)';
          if (content.trim()) {
            e.currentTarget.style.background = '#0d9488';
          }
        }}
      >
        {isSubmitting ? 'Releasing...' : 'Release Anonymously'}
      </button>

      {/* Privacy note */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.4)',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        No names. No tracking. No judgment.
      </p>
    </div>
  );
}
