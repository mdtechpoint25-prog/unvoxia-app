'use client';

import { useState } from 'react';

interface ProfileSettingsProps {
  username: string;
  avatarUrl: string | null;
  bio?: string | null;
  onSave: (settings: { avatar_url?: string; bio?: string; password?: string }) => Promise<void>;
}

const AVATAR_OPTIONS = [
  '??', '??', '??', '??', '??', '??', '??', '??',
  '??', '??', '??', '??', '??', '??', '??', '??'
];

export default function ProfileSettings({ username, avatarUrl, bio, onSave }: ProfileSettingsProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl || '');
  const [userBio, setUserBio] = useState(bio || '');
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

  const handleProfileSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await onSave({ avatar_url: selectedAvatar, bio: userBio });
      setSuccess('Profile updated successfully!');
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
      <h3 style={{ color: '#1a1a2e', marginBottom: '1.5rem', fontWeight: 600 }}>Settings</h3>

      {/* Messages */}
      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{
          padding: '0.75rem 1rem',
          background: '#d1fae5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          color: '#059669',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          {success}
        </div>
      )}

      {/* Profile Section - Avatar & Bio */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        marginBottom: '1rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
          ?? Your Profile
        </h4>
        
        {/* Avatar Selection */}
        <label style={{ 
          display: 'block', 
          fontSize: '0.85rem', 
          color: '#6b7280',
          marginBottom: '0.5rem'
        }}>
          Choose Avatar
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {AVATAR_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedAvatar(emoji)}
              style={{
                width: '100%',
                aspectRatio: '1',
                fontSize: '1.5rem',
                background: selectedAvatar === emoji 
                  ? 'linear-gradient(135deg, rgba(26, 188, 156, 0.2) 0%, rgba(155, 89, 182, 0.2) 100%)' 
                  : '#f8f9fa',
                border: selectedAvatar === emoji ? '2px solid #1ABC9C' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Bio */}
        <label style={{ 
          display: 'block', 
          fontSize: '0.85rem', 
          color: '#6b7280',
          marginBottom: '0.5rem'
        }}>
          Bio - Tell your story
        </label>
        <textarea
          value={userBio}
          onChange={(e) => setUserBio(e.target.value.slice(0, 200))}
          placeholder="Share a bit about yourself... What makes you, you?"
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '0.875rem',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            resize: 'vertical',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            marginBottom: '0.5rem'
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            {userBio.length}/200 characters
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            This will be visible on your profile
          </span>
        </div>

        <button
          onClick={handleProfileSave}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Saving...' : '? Save Profile'}
        </button>
      </div>

      {/* Password Section */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        marginBottom: '1rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
          ?? Change Password
        </h4>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              marginBottom: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '0.95rem'
            }}
          />
          <input
            type="password"
            placeholder="New Password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              marginBottom: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '0.95rem'
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '0.95rem'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        marginBottom: '1rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
          ?? Notifications
        </h4>
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
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
          >
            <div style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              background: notificationSettings[key as keyof typeof notificationSettings]
                ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)'
                : '#e5e7eb',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
              onClick={() => setNotificationSettings({
                ...notificationSettings,
                [key]: !notificationSettings[key as keyof typeof notificationSettings]
              })}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: notificationSettings[key as keyof typeof notificationSettings] ? '22px' : '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </div>
            <span style={{ color: '#374151', fontSize: '0.95rem' }}>{label}</span>
          </label>
        ))}
      </div>

      {/* Privacy */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 600 }}>
          ??? Privacy
        </h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>?</span>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            Your identity is protected. Only your username is visible to others.
          </p>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>?</span>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            Email and phone are used only for account recovery and will never be shared.
          </p>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>?</span>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            You can post anonymously anytime using the anonymous toggle.
          </p>
        </div>
      </div>
    </div>
  );
}
