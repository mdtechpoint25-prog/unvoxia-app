'use client';

import { useState } from 'react';

interface ProfileSettingsProps {
  username: string;
  avatarUrl: string | null;
  onSave: (settings: { avatar_url?: string; password?: string }) => Promise<void>;
}

const AVATAR_OPTIONS = [
  '??', '??', '??', '??', '??', '??', '??', '??',
  '??', '??', '??', '??', '??', '??', '?', '??'
];

export default function ProfileSettings({ username, avatarUrl, onSave }: ProfileSettingsProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    postReactions: true,
    postComments: true,
    dailyReminder: false
  });

  const handleAvatarSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await onSave({ avatar_url: selectedAvatar });
      setSuccess('Avatar updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await onSave({ password: newPassword });
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ color: '#2C3E50', marginBottom: '1.5rem' }}>Settings</h3>

      {/* Avatar Section */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '1rem'
      }}>
        <h4 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Choose Avatar</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {AVATAR_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedAvatar(emoji)}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                background: selectedAvatar === emoji ? '#e8f8f5' : '#f5f5f5',
                border: selectedAvatar === emoji ? '2px solid #1ABC9C' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
        <button
          onClick={handleAvatarSave}
          disabled={loading}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Saving...' : 'Save Avatar'}
        </button>
      </div>

      {/* Password Section */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '1rem'
      }}>
        <h4 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Change Password</h4>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
          />
          <input
            type="password"
            placeholder="New Password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '1rem'
      }}>
        <h4 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Notifications</h4>
        {Object.entries({
          emailNotifications: 'Email Notifications',
          postReactions: 'Reactions on your posts',
          postComments: 'Comments on your posts',
          dailyReminder: 'Daily reflection reminder'
        }).map(([key, label]) => (
          <label
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={notificationSettings[key as keyof typeof notificationSettings]}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                [key]: e.target.checked
              })}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ color: '#2C3E50' }}>{label}</span>
          </label>
        ))}
      </div>

      {/* Privacy */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h4 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Privacy</h4>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          Your identity is protected. Only your anonymous username is visible to others.
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          Email and phone are used only for account recovery and will never be shared.
        </p>
      </div>

      {error && <p style={{ color: '#FF6F91', marginTop: '1rem' }}>{error}</p>}
      {success && <p style={{ color: '#1ABC9C', marginTop: '1rem' }}>{success}</p>}
    </div>
  );
}
