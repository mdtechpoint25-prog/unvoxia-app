'use client';

import { useState } from 'react';
import { REPORT_REASONS } from '@/lib/constants';

interface ReportButtonProps {
  postId: string;
}

export default function ReportButton({ postId }: ReportButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReport = async () => {
    if (!selectedReason) return;
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/posts/${postId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: selectedReason })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit report');
      }

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setSelectedReason('');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          background: 'none',
          border: 'none',
          color: '#9ca3af',
          cursor: 'pointer',
          fontSize: '0.85rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
        title="Report this post"
      >
        <span>Flag</span>
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>Check</div>
                <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>Report Submitted</h3>
                <p style={{ color: '#6b7280' }}>Thank you for helping keep our community safe.</p>
              </div>
            ) : (
              <>
                <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Report Post
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Why are you reporting this post? Please select a reason below.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      style={{
                        padding: '0.875rem 1rem',
                        border: selectedReason === reason ? '2px solid #1ABC9C' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                        background: selectedReason === reason ? 'rgba(26, 188, 156, 0.05)' : '#fff',
                        color: '#1a1a2e',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                {error && (
                  <div style={{
                    padding: '0.75rem',
                    background: '#fee2e2',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedReason('');
                      setError('');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.875rem',
                      background: '#f5f5f5',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReport}
                    disabled={!selectedReason || loading}
                    style={{
                      flex: 1,
                      padding: '0.875rem',
                      background: (selectedReason && !loading)
                        ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                        : '#e5e7eb',
                      color: (selectedReason && !loading) ? '#fff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: (selectedReason && !loading) ? 'pointer' : 'not-allowed',
                      fontWeight: 600
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
