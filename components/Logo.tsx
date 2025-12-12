interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export default function Logo({ size = 40, showText = true, variant = 'full', className = '' }: LogoProps) {
  const iconSize = size;
  const fontSize = size * 0.4;

  const LogoIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1ABC9C" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
        <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16a085" />
          <stop offset="100%" stopColor="#8e44ad" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="20"
        fill="url(#logoGradient)"
      />
      {/* Letter N */}
      <path
        d="M30 70V30L50 55L70 30V70"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Decorative dots */}
      <circle cx="25" cy="25" r="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="75" cy="75" r="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  );

  const LogoText = () => (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
      <span style={{
        fontSize: fontSize,
        fontWeight: 800,
        color: '#1a1a2e',
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-display)'
      }}>
        NOMA
      </span>
      {size >= 40 && (
        <span style={{
          fontSize: fontSize * 0.4,
          fontWeight: 500,
          color: '#6b7280',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          No Mask World
        </span>
      )}
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={className} style={{
      display: 'flex',
      alignItems: 'center',
      gap: size * 0.25,
      textDecoration: 'none'
    }}>
      <LogoIcon />
      {showText && <LogoText />}
    </div>
  );
}

// Small icon for favicon/app icon
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1ABC9C" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#markGradient)" />
      <path
        d="M30 70V30L50 55L70 30V70"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
