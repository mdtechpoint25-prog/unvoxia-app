'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsState {
  privacy: {
    allowComments: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  };
  notifications: {
    reactions: boolean;
    comments: boolean;
    follows: boolean;
    messages: boolean;
  };
  content: {
    sensitivity: 'standard' | 'sensitive' | 'strict';
    mutedWords: string[];
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>({
    privacy: {
      allowComments: true,
      allowMessages: true,
      showOnlineStatus: false,
    },
    notifications: {
      reactions: true,
      comments: true,
      follows: true,
      messages: true,
    },
    content: {
      sensitivity: 'standard',
      mutedWords: [],
    },
  });
  const [newMutedWord, setNewMutedWord] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy[key] },
    }));
  };

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  const addMutedWord = () => {
    if (newMutedWord.trim() && !settings.content.mutedWords.includes(newMutedWord.trim())) {
      setSettings(prev => ({
        ...prev,
        content: {
          ...prev.content,
          mutedWords: [...prev.content.mutedWords, newMutedWord.trim().toLowerCase()],
        },
      }));
      setNewMutedWord('');
    }
  };

  const removeMutedWord = (word: string) => {
    setSettings(prev => ({
      ...prev,
      content: {
        ...prev.content,
        mutedWords: prev.content.mutedWords.filter(w => w !== word),
      },
    }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        width: '48px',
        height: '28px',
        borderRadius: '14px',
        background: checked ? '#0d9488' : 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  );

  const SettingRow = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div>
        <div style={{ color: '#fff', fontSize: '0.95rem' }}>{label}</div>
        {description && (
          <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', marginTop: '4px' }}>
            {description}
          </div>
        )}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        paddingBottom: '40px',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'sticky',
          top: 0,
          background: '#0f172a',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
        <h1 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
          Settings
        </h1>
      </header>

      <div style={{ padding: '0 20px' }}>
        {/* Privacy & Anonymity */}
        <section style={{ marginTop: '24px' }}>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            PRIVACY & ANONYMITY
          </h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '0 16px' }}>
            <SettingRow
              label="Allow comments"
              description="Let others respond to your posts"
              checked={settings.privacy.allowComments}
              onChange={() => togglePrivacy('allowComments')}
            />
            <SettingRow
              label="Allow messages"
              description="Receive message requests from others"
              checked={settings.privacy.allowMessages}
              onChange={() => togglePrivacy('allowMessages')}
            />
          </div>
        </section>

        {/* Notifications */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            NOTIFICATIONS
          </h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '0 16px' }}>
            <SettingRow
              label="Reactions"
              description="When someone feels your post"
              checked={settings.notifications.reactions}
              onChange={() => toggleNotification('reactions')}
            />
            <SettingRow
              label="Comments"
              description="When someone responds to your post"
              checked={settings.notifications.comments}
              onChange={() => toggleNotification('comments')}
            />
            <SettingRow
              label="New followers"
              description="When someone follows you"
              checked={settings.notifications.follows}
              onChange={() => toggleNotification('follows')}
            />
            <SettingRow
              label="Messages"
              description="When you receive a message"
              checked={settings.notifications.messages}
              onChange={() => toggleNotification('messages')}
            />
          </div>
        </section>

        {/* Content Sensitivity */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            CONTENT SENSITIVITY
          </h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px' }}>
            {(['standard', 'sensitive', 'strict'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSettings(prev => ({ ...prev, content: { ...prev.content, sensitivity: level } }))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: level !== 'strict' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ color: '#fff', fontSize: '0.95rem', textTransform: 'capitalize' }}>{level}</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', marginTop: '4px' }}>
                    {level === 'standard' && 'See most content with basic filtering'}
                    {level === 'sensitive' && 'Hide potentially triggering content'}
                    {level === 'strict' && 'Only show gentle, supportive content'}
                  </div>
                </div>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: settings.content.sensitivity === level ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                    background: settings.content.sensitivity === level ? '#0d9488' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {settings.content.sensitivity === level && (
                    <span style={{ color: '#fff', fontSize: '0.7rem' }}>✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Muted Words */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            MUTED WORDS & TOPICS
          </h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newMutedWord}
                onChange={(e) => setNewMutedWord(e.target.value)}
                placeholder="Add a word or topic"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
                onKeyDown={(e) => e.key === 'Enter' && addMutedWord()}
              />
              <button
                onClick={addMutedWord}
                style={{
                  padding: '10px 16px',
                  background: '#0d9488',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            </div>
            {settings.content.mutedWords.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {settings.content.mutedWords.map((word) => (
                  <span
                    key={word}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      borderRadius: '16px',
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {word}
                    <button
                      onClick={() => removeMutedWord(word)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: '1rem',
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem', margin: 0 }}>
                No muted words. Posts containing muted words will be hidden.
              </p>
            )}
          </div>
        </section>

        {/* Account Actions */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
            ACCOUNT
          </h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '0 16px' }}>
            <button
              onClick={() => router.push('/settings/blocked')}
              style={{
                width: '100%',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '0.95rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Blocked voices
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>→</span>
            </button>
            <button
              onClick={() => {}}
              style={{
                width: '100%',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '0.95rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Download my data
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>→</span>
            </button>
            <button
              onClick={() => {}}
              style={{
                width: '100%',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '0.95rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Delete all posts
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>→</span>
            </button>
            <button
              onClick={() => {}}
              style={{
                width: '100%',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: '0.95rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Deactivate account
            </button>
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={() => router.push('/login')}
          style={{
            width: '100%',
            marginTop: '32px',
            padding: '14px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#ef4444',
            fontSize: '0.95rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
