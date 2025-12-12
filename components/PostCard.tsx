export interface PostCardProps {
  username: string;
  avatar?: string;
  timestamp: string;
  category: string;
  content: string;
  mediaUrl?: string;
  reactions: number;
  comments: number;
}

export default function PostCard({
  username,
  avatar,
  timestamp,
  category,
  content,
  mediaUrl,
  reactions,
  comments
}: PostCardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#9B59B6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600
        }}>
          {avatar || username.charAt(0).toUpperCase()}
        </span>
        <div>
          <strong style={{ color: '#2C3E50' }}>{username}</strong>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>{timestamp} - {category}</div>
        </div>
      </div>
      <p style={{ color: '#2C3E50', marginBottom: '0.75rem' }}>{content}</p>
      {mediaUrl && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img src={mediaUrl} alt="post media" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#1ABC9C' }}>
        <span>{reactions} likes</span>
        <span>{comments} comments</span>
      </div>
    </div>
  );
}
