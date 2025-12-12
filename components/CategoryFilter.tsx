'use client';

import { CATEGORIES } from '@/lib/constants';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const allCategories = ['all', ...CATEGORIES];

  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '1.5rem'
    }}>
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: '0.5rem 1rem',
            background: selected === cat ? '#1ABC9C' : '#f5f5f5',
            color: selected === cat ? '#fff' : '#2C3E50',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: selected === cat ? 600 : 400,
            transition: 'all 0.2s'
          }}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  );
}
