// Healing Circles - Anonymous Community Topics

export const HEALING_CIRCLES = [
  {
    id: 'love-relationships',
    name: 'Love & Relationships',
    emoji: '💔',
    description: 'Heartbreak, toxic relationships, dating struggles, and finding love',
    color: '#e74c3c'
  },
  {
    id: 'marriage-family',
    name: 'Marriage & Family',
    emoji: '💍',
    description: 'Marriage issues, divorce, family conflict, and parenting challenges',
    color: '#9b59b6'
  },
  {
    id: 'mental-health',
    name: 'Mental Health & Depression',
    emoji: '🧠',
    description: 'Depression, anxiety, trauma, and mental wellness struggles',
    color: '#3498db'
  },
  {
    id: 'home-trauma',
    name: 'Home & Family Trauma',
    emoji: '🏠',
    description: 'Childhood trauma, abuse, family dysfunction, and healing from the past',
    color: '#e67e22'
  },
  {
    id: 'discrimination',
    name: 'Discrimination & Injustice',
    emoji: '⚖️',
    description: 'Racism, sexism, inequality, and systemic injustice experiences',
    color: '#c0392b'
  },
  {
    id: 'job-stress',
    name: 'Job Stress & Unemployment',
    emoji: '💼',
    description: 'Work pressure, job loss, career struggles, and financial stress',
    color: '#34495e'
  },
  {
    id: 'loneliness',
    name: 'Loneliness & Isolation',
    emoji: '😔',
    description: 'Feeling alone, social isolation, and longing for connection',
    color: '#95a5a6'
  },
  {
    id: 'secrets',
    name: 'Secrets I Can\'t Tell Anyone',
    emoji: '🔒',
    description: 'Confessions, hidden truths, and things you can\'t say out loud',
    color: '#2c3e50'
  },
  {
    id: 'healing-growth',
    name: 'Healing & Self-Growth',
    emoji: '🌱',
    description: 'Recovery stories, personal growth, and positive transformation',
    color: '#27ae60'
  }
];

// Support reaction types (not likes)
export const SUPPORT_REACTIONS = [
  { value: 'hear-you', label: 'I hear you', emoji: '🤍' },
  { value: 'not-alone', label: 'You\'re not alone', emoji: '🌱' },
  { value: 'thank-you', label: 'Thank you for sharing', emoji: '💬' },
  { value: 'sending-love', label: 'Sending love', emoji: '💚' },
  { value: 'stay-strong', label: 'Stay strong', emoji: '💪' }
];

// Anonymous identity labels
export const ANONYMOUS_LABELS = [
  'Anonymous Voice',
  'Healing Soul',
  'Silent Fighter',
  'Brave Heart',
  'Quiet Strength',
  'Hidden Warrior',
  'Gentle Spirit',
  'Rising Phoenix',
  'Seeking Light',
  'Finding Peace'
];

export function getRandomAnonymousLabel(): string {
  return ANONYMOUS_LABELS[Math.floor(Math.random() * ANONYMOUS_LABELS.length)];
}

export function getCircleById(id: string) {
  return HEALING_CIRCLES.find(c => c.id === id);
}

export function getCircleColor(id: string): string {
  const circle = getCircleById(id);
  return circle?.color || '#1ABC9C';
}
