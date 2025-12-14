'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ size = 'md', color = '#0d9488', text }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: { width: 20, border: 2 },
    md: { width: 32, border: 3 },
    lg: { width: 48, border: 4 },
  };

  const { width, border } = sizeMap[size];

  return (
    <div className="loading-container">
      <div 
        className="spinner"
        style={{
          width: `${width}px`,
          height: `${width}px`,
          borderWidth: `${border}px`,
          borderColor: `rgba(255,255,255,0.1)`,
          borderTopColor: color,
        }}
      />
      {text && <p className="loading-text">{text}</p>}

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px;
        }

        .spinner {
          border-style: solid;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
