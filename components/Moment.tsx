'use client';

export type MomentType = 'confession' | 'validation' | 'guidance' | 'prompt' | 'reassurance';

export interface MomentData {
  id: string;
  type: MomentType;
  content: string;
  emotionTag?: string;
}

interface MomentProps {
  moment: MomentData;
  index: number;
}

// Soft gradient backgrounds that rotate
const backgrounds = [
  'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
  'linear-gradient(180deg, #042f2e 0%, #134e4a 50%, #042f2e 100%)',
  'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
  'linear-gradient(180deg, #0c4a6e 0%, #075985 50%, #0c4a6e 100%)',
];

// Subtle accent colors by type
const typeColors: Record<MomentType, string> = {
  confession: 'rgba(168, 162, 158, 0.6)',
  validation: 'rgba(20, 184, 166, 0.7)',
  guidance: 'rgba(124, 58, 237, 0.7)',
  prompt: 'rgba(251, 191, 36, 0.7)',
  reassurance: 'rgba(236, 72, 153, 0.6)',
};

export default function Moment({ moment, index }: MomentProps) {
  const bgIndex = index % backgrounds.length;
  
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: backgrounds[bgIndex],
        position: 'relative',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle floating orb */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${typeColors[moment.type]} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.4,
          animation: 'breathe 8s ease-in-out infinite',
        }}
      />

      {/* Content container */}
      <div
        style={{
          maxWidth: '360px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Small type indicator - very subtle */}
        {moment.type === 'prompt' && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Reflection
          </div>
        )}

        {/* Main content */}
        <p
          style={{
            fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.6,
            margin: 0,
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.01em',
          }}
        >
          {moment.type === 'confession' && '"'}
          {moment.content}
          {moment.type === 'confession' && '"'}
        </p>

        {/* Emotion tag - very subtle */}
        {moment.emotionTag && (
          <div
            style={{
              marginTop: '2rem',
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            #{moment.emotionTag}
          </div>
        )}
      </div>

      {/* Scroll indicator - only on first moment */}
      {index === 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.4)',
            animation: 'fadeInUp 2s ease-out 1s both',
          }}
        >
          <span style={{ fontSize: '0.75rem' }}>scroll gently</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ animation: 'bounce 2s ease-in-out infinite' }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
