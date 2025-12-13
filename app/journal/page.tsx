'use client';

import { useState, useEffect } from 'react';

type JournalEntry = {
  id: string;
  content: string;
  mood: string;
  date: string;
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [newMood, setNewMood] = useState('general');
  const [showForm, setShowForm] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('noma-journal');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load journal');
      }
    }
  }, []);

  const saveEntry = () => {
    if (!newEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      content: newEntry.trim(),
      mood: newMood,
      date: new Date().toISOString()
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('noma-journal', JSON.stringify(updated));
    setNewEntry('');
    setNewMood('general');
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    if (!confirm('Delete this entry?')) return;
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('noma-journal', JSON.stringify(updated));
  };

  const moods = [
    { value: 'general', emoji: '💭' },
    { value: 'happy', emoji: '😊' },
    { value: 'sad', emoji: '😢' },
    { value: 'anxious', emoji: '😰' },
    { value: 'calm', emoji: '😌' },
    { value: 'grateful', emoji: '🙏' }
  ];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '6rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '0.75rem'
          }}>
            Your Private Journal
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#7a8a9a',
            maxWidth: '500px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            A safe space for your thoughts. Stored privately on your device.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(26, 188, 156, 0.25)',
              transition: 'transform 0.2s ease'
            }}
          >
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        </div>

        {/* Entry Form */}
        {showForm && (
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            marginBottom: '2rem'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#5a6c7d',
                marginBottom: '0.75rem'
              }}>
                How are you feeling?
              </label>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                {moods.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setNewMood(m.value)}
                    style={{
                      padding: '0.625rem 1rem',
                      borderRadius: '50px',
                      border: newMood === m.value ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
                      background: newMood === m.value ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                      cursor: 'pointer',
                      fontSize: '1.125rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write your thoughts here... This stays on your device."
              rows={8}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#2C3E50',
                resize: 'vertical',
                fontFamily: 'inherit',
                marginBottom: '1rem'
              }}
            />

            <button
              onClick={saveEntry}
              disabled={!newEntry.trim()}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#fff',
                background: newEntry.trim() 
                  ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' 
                  : '#d1d5db',
                borderRadius: '12px',
                border: 'none',
                cursor: newEntry.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              Save Entry
            </button>
          </div>
        )}

        {/* Entries List */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {entries.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📔</div>
              <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                Your journal is empty. Start writing!
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <article
                key={entry.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>
                      {moods.find(m => m.value === entry.mood)?.emoji || '💭'}
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#e74c3c',
                      background: 'transparent',
                      border: '1px solid #e74c3c',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Delete
                  </button>
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#2C3E50',
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}>
                  {entry.content}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
