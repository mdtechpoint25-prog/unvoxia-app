'use client';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

const ALL_BADGES: Badge[] = [
  {
    id: 'first-post',
    name: 'First Post',
    icon: '🎯',
    description: 'Created your first post',
    earned: false
  },
  {
    id: 'daily-reflection',
    name: 'Daily Reflection',
    icon: '📝',
    description: 'Completed 7 daily reflections',
    earned: false
  },
  {
    id: 'supportive-comment',
    name: 'Supportive Comment',
    icon: '💙',
    description: 'Left 10 supportive comments',
    earned: false
  },
  {
    id: 'community-helper',
    name: 'Community Helper',
    icon: '🤝',
    description: 'Helped 5 community members',
    earned: false
  },
  {
    id: 'inspiration',
    name: 'Inspiration',
    icon: '?',
    description: 'Received 50 reactions on your posts',
    earned: false
  },
  {
    id: 'week-streak',
    name: 'Week Streak',
    icon: '🔥',
    description: 'Posted for 7 days in a row',
    earned: false
  },
  {
    id: 'month-streak',
    name: 'Month Streak',
    icon: '⭐',
    description: 'Active for 30 consecutive days',
    earned: false
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    icon: '📖',
    description: 'Shared 10 stories',
    earned: false
  }
];

interface BadgeDisplayProps {
  earnedBadges: string[];
  showAll?: boolean;
}

export default function BadgeDisplay({ earnedBadges, showAll = false }: BadgeDisplayProps) {
  const badges = ALL_BADGES.map(badge => ({
    ...badge,
    earned: earnedBadges.includes(badge.name)
  }));

  const displayBadges = showAll ? badges : badges.filter(b => b.earned);

  if (!showAll && displayBadges.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <h4 style={{ color: '#2C3E50', marginBottom: '1rem' }}>
        {showAll ? 'All Badges' : 'Earned Badges'}
      </h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '1rem'
      }}>
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            style={{
              padding: '1rem',
              background: badge.earned ? '#e8f8f5' : '#f5f5f5',
              borderRadius: '12px',
              textAlign: 'center',
              opacity: badge.earned ? 1 : 0.5,
              border: badge.earned ? '2px solid #1ABC9C' : '2px solid transparent'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {badge.icon}
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: badge.earned ? '#2C3E50' : '#888'
            }}>
              {badge.name}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#888',
              marginTop: '0.25rem'
            }}>
              {badge.description}
            </div>
            {badge.earned && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.7rem',
                color: '#1ABC9C',
                fontWeight: 600
              }}>
                &#10003; Earned
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to check and award badges
export function checkBadgeEligibility(stats: {
  posts: number;
  comments: number;
  reactions: number;
  dailyReflections: number;
  consecutiveDays: number;
  storiesShared: number;
}): string[] {
  const earnedBadges: string[] = [];

  if (stats.posts >= 1) earnedBadges.push('First Post');
  if (stats.dailyReflections >= 7) earnedBadges.push('Daily Reflection');
  if (stats.comments >= 10) earnedBadges.push('Supportive Comment');
  if (stats.reactions >= 50) earnedBadges.push('Inspiration');
  if (stats.consecutiveDays >= 7) earnedBadges.push('Week Streak');
  if (stats.consecutiveDays >= 30) earnedBadges.push('Month Streak');
  if (stats.storiesShared >= 10) earnedBadges.push('Storyteller');

  return earnedBadges;
}
