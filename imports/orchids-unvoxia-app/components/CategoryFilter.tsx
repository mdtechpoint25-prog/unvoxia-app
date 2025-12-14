'use client';

import { CATEGORIES } from '@/lib/constants';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

// Category icons/emojis for NOMA categories
const CATEGORY_ICONS: Record<string, string> = {
  all: '🌟',
  'Emotional Pain': '💔',
  'Mental Health': '🧠',
  'Life Struggles': '🌊',
  'Dreams & Goals': '✨',
  'Anonymous Confessions': '🎭',
  'Seeking Support': '🤝'
};

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const allCategories = ['all', ...CATEGORIES];

  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }}>
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: '0.5rem 1rem',
            background: selected === cat 
              ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' 
              : '#f8f9fa',
            color: selected === cat ? '#fff' : '#4a5568',
            border: selected === cat ? 'none' : '1px solid #e2e8f0',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: selected === cat ? 600 : 500,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: selected === cat ? '0 4px 12px rgba(26, 188, 156, 0.3)' : 'none'
          }}
        >
          <span>{CATEGORY_ICONS[cat] || '📌'}</span>
          <span>{cat === 'all' ? 'All' : cat}</span>
        </button>
      ))}
    </div>
  );
}
