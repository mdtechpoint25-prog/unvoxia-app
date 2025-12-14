// NOMA Animation System
// Emotion-driven microinteractions for anonymous text platform

// Animation timing curves
export const EASING = {
  // Smooth, natural feel
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Bouncy, playful
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  // Quick snap
  snap: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  // Gentle ease out
  gentle: 'cubic-bezier(0, 0, 0.2, 1)',
  // Spring-like
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Animation durations
export const DURATION = {
  instant: 100,
  fast: 150,
  normal: 250,
  slow: 400,
  xslow: 600,
} as const;

// Keyframe animation names (matching globals.css)
export const KEYFRAMES = {
  fadeIn: 'fadeIn',
  fadeOut: 'fadeOut',
  slideUp: 'slideUp',
  slideDown: 'slideDown',
  slideLeft: 'slideLeft',
  slideRight: 'slideRight',
  scaleIn: 'scaleIn',
  scaleOut: 'scaleOut',
  pulse: 'pulse',
  heartBeat: 'heartBeat',
  float: 'float',
  shimmer: 'shimmer',
  ripple: 'ripple',
  shake: 'shake',
  glow: 'glow',
  typewriter: 'typewriter',
} as const;

// Pre-built animation styles
export const animations = {
  fadeIn: {
    animation: `fadeIn ${DURATION.normal}ms ${EASING.gentle} forwards`,
  },
  fadeInSlow: {
    animation: `fadeIn ${DURATION.slow}ms ${EASING.gentle} forwards`,
  },
  fadeInUp: {
    animation: `fadeIn ${DURATION.normal}ms ${EASING.gentle} forwards, slideUp ${DURATION.normal}ms ${EASING.gentle} forwards`,
  },
  scaleIn: {
    animation: `scaleIn ${DURATION.fast}ms ${EASING.spring} forwards`,
  },
  heartBeat: {
    animation: `heartBeat ${DURATION.slow}ms ${EASING.bounce}`,
  },
  pulse: {
    animation: `pulse 2s ${EASING.smooth} infinite`,
  },
  float: {
    animation: `float 3s ${EASING.smooth} infinite`,
  },
  shimmer: {
    animation: `shimmer 1.5s ${EASING.smooth} infinite`,
  },
  shake: {
    animation: `shake ${DURATION.fast}ms ${EASING.snap}`,
  },
  glow: {
    animation: `glow 2s ${EASING.smooth} infinite alternate`,
  },
} as const;

// Stagger delay calculator for list items
export function staggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}

// Generate stagger animation style
export function staggerStyle(index: number, baseDelay: number = 50): React.CSSProperties {
  return {
    opacity: 0,
    animation: `fadeIn ${DURATION.normal}ms ${EASING.gentle} forwards, slideUp ${DURATION.normal}ms ${EASING.gentle} forwards`,
    animationDelay: `${staggerDelay(index, baseDelay)}ms`,
  };
}

// Button press animation style
export function pressStyle(isPressed: boolean): React.CSSProperties {
  return {
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    transition: `transform ${DURATION.fast}ms ${EASING.bounce}`,
  };
}

// Hover lift animation style
export function hoverLiftStyle(isHovered: boolean): React.CSSProperties {
  return {
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered
      ? '0 8px 25px rgba(13, 148, 136, 0.25)'
      : '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: `all ${DURATION.normal}ms ${EASING.smooth}`,
  };
}

// Reaction pop animation
export function reactionPopStyle(isActive: boolean): React.CSSProperties {
  return {
    transform: isActive ? 'scale(1.3)' : 'scale(1)',
    transition: `transform ${DURATION.fast}ms ${EASING.spring}`,
  };
}
