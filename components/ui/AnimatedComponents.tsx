'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// ANIMATED BUTTON
// ============================================
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  style,
  ...props
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '0.85rem' },
    md: { padding: '12px 24px', fontSize: '0.95rem' },
    lg: { padding: '16px 32px', fontSize: '1.05rem' },
  };

  const variantStyles = {
    primary: {
      background: '#0d9488',
      color: '#fff',
      boxShadow: isPressed ? 'none' : '0 4px 15px rgba(13, 148, 136, 0.3)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    ghost: {
      background: 'transparent',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    danger: {
      background: '#dc2626',
      color: '#fff',
      boxShadow: isPressed ? 'none' : '0 4px 15px rgba(220, 38, 38, 0.3)',
    },
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      onMouseDown={(e) => {
        setIsPressed(true);
        addRipple(e);
        props.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setIsPressed(false);
        props.onMouseUp?.(e);
      }}
      onMouseLeave={(e) => {
        setIsPressed(false);
        props.onMouseLeave?.(e);
      }}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: '10px',
            height: '10px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
      {loading ? (
        <span
          style={{
            width: '18px',
            height: '18px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}

// ============================================
// ANIMATED CARD
// ============================================
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function AnimatedCard({ children, delay = 0, hover = true, onClick, style }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? 'translateY(-4px) scale(1.01)'
            : 'translateY(0) scale(1)'
          : 'translateY(20px) scale(0.98)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// ANIMATED REACTION BUTTON
// ============================================
interface ReactionButtonProps {
  emoji: string;
  count: number;
  isActive: boolean;
  onToggle: () => void;
  label?: string;
}

export function AnimatedReaction({ emoji, count, isActive, onToggle, label }: ReactionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isActive) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <span
        style={{
          fontSize: '1.8rem',
          filter: isActive ? 'none' : 'grayscale(80%)',
          transform: isAnimating ? 'scale(1.4)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          animation: isAnimating ? 'heartBeat 0.6s ease' : 'none',
        }}
      >
        {emoji}
      </span>
      <span
        style={{
          color: isActive ? '#0d9488' : 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.75rem',
          fontWeight: isActive ? 600 : 400,
          transition: 'color 0.2s ease',
        }}
      >
        {count > 0 ? formatCount(count) : label || ''}
      </span>
    </button>
  );
}

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

// ============================================
// ANIMATED AVATAR
// ============================================
interface AnimatedAvatarProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  float?: boolean;
  onClick?: () => void;
}

export function AnimatedAvatar({ emoji, size = 'md', glow = false, float = false, onClick }: AnimatedAvatarProps) {
  const sizes = {
    sm: { width: '32px', height: '32px', fontSize: '1rem' },
    md: { width: '48px', height: '48px', fontSize: '1.5rem' },
    lg: { width: '64px', height: '64px', fontSize: '2rem' },
    xl: { width: '96px', height: '96px', fontSize: '3rem' },
  };

  return (
    <div
      onClick={onClick}
      style={{
        ...sizes[size],
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        animation: float ? 'floatGentle 4s ease-in-out infinite' : undefined,
        boxShadow: glow ? '0 0 20px rgba(13, 148, 136, 0.4)' : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
      }}
    >
      {emoji}
    </div>
  );
}

// ============================================
// SKELETON LOADER
// ============================================
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '1em', circle = false, style }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : '8px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }}
    />
  );
}

// ============================================
// ANIMATED TEXT (Typewriter Effect)
// ============================================
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 50, delay = 0, onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed, onComplete]);

  return (
    <span>
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: '#0d9488',
          marginLeft: '2px',
          animation: 'blink 1s infinite',
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  );
}

// ============================================
// FADE IN VIEW (Intersection Observer)
// ============================================
interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  style?: React.CSSProperties;
}

export function FadeInView({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  style,
}: FadeInViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const transforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transforms[direction],
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// BOTTOM SHEET (Animated Modal)
// ============================================
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onTransitionEnd={() => !isOpen && setIsAnimating(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#0f172a',
          borderRadius: '24px 24px 0 0',
          padding: '20px',
          maxHeight: '85vh',
          overflowY: 'auto',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: '40px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            margin: '0 auto 16px',
          }}
        />
        {title && (
          <h2
            style={{
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

// ============================================
// TOAST NOTIFICATION
// ============================================
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: { bg: 'rgba(13, 148, 136, 0.9)', icon: '✓' },
    error: { bg: 'rgba(220, 38, 38, 0.9)', icon: '✕' },
    info: { bg: 'rgba(124, 58, 237, 0.9)', icon: 'ℹ' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: isExiting ? 'translateX(-50%) translateY(-20px)' : 'translateX(-50%) translateY(0)',
        opacity: isExiting ? 0 : 1,
        background: colors[type].bg,
        backdropFilter: 'blur(8px)',
        padding: '12px 20px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 2000,
        animation: 'fadeInDown 0.3s ease forwards',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{colors[type].icon}</span>
      <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{message}</span>
    </div>
  );
}

// ============================================
// PULL TO REFRESH
// ============================================
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (startY.current === 0 || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 100));
    }
  }, [isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 60 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY.current = 0;
  }, [pullDistance, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
      {/* Pull indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: `translateX(-50%) translateY(${pullDistance - 50}px)`,
          opacity: pullDistance > 20 ? 1 : 0,
          transition: pullDistance === 0 ? 'all 0.3s ease' : 'none',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#0d9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isRefreshing ? 'spin 0.8s linear infinite' : undefined,
            transform: `rotate(${pullDistance * 3}deg)`,
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>↻</span>
        </div>
      </div>
      <div style={{ transform: `translateY(${pullDistance}px)`, transition: pullDistance === 0 ? 'transform 0.3s ease' : 'none' }}>
        {children}
      </div>
    </div>
  );
}
