'use client';

interface Conversation {
  partnerId: string;
  partnerUsername: string;
  partnerAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
  onNewChat: () => void;
}

export default function ConversationList({
  conversations,
  onSelect,
  onNewChat
}: ConversationListProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #eee'
      }}>
        <h3 style={{ margin: 0, color: '#2C3E50' }}>Messages</h3>
        <button
          onClick={onNewChat}
          style={{
            padding: '0.5rem 1rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + New Chat
        </button>
      </div>

      {conversations.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
          <p style={{ color: '#888' }}>No conversations yet.</p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Start a chat with someone from their profile.
          </p>
        </div>
      ) : (
        conversations.map((conv) => (
          <div
            key={conv.partnerId}
            onClick={() => onSelect(conv)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              borderBottom: '1px solid #f5f5f5',
              cursor: 'pointer',
              background: conv.unreadCount > 0 ? '#f0fdf4' : 'transparent'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#9B59B6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              {conv.partnerAvatar && conv.partnerAvatar.length <= 4 ? (
                conv.partnerAvatar
              ) : (
                conv.partnerUsername.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#2C3E50' }}>@{conv.partnerUsername}</strong>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>
                  {formatTime(conv.lastMessageAt)}
                </span>
              </div>
              <p style={{
                margin: '0.25rem 0 0',
                color: '#888',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {conv.lastMessage}
              </p>
            </div>
            {conv.unreadCount > 0 && (
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#1ABC9C',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {conv.unreadCount}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
