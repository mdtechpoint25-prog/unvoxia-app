
// SVG Icons
const MessageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

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
  onNewChat?: () => void;
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <PlusIcon />
          New Chat
        </button>
      </div>

      {conversations.length === 0 ? (
        <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', opacity: 0.6 }}>
            <MessageIcon />
          </div>
          <h4 style={{ color: '#4a5568', marginBottom: '0.5rem', fontWeight: 600 }}>
            No conversations yet
          </h4>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
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
              background: 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
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
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.25rem'
              }}>
                <span style={{ fontWeight: conv.unreadCount > 0 ? 700 : 600, color: '#2C3E50' }}>
                  @{conv.partnerUsername}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  {formatTime(conv.lastMessageAt)}
                </span>
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: conv.unreadCount > 0 ? '#4a5568' : '#9ca3af',
                fontWeight: conv.unreadCount > 0 ? 500 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {conv.lastMessage}
              </div>
            </div>
            {conv.unreadCount > 0 && (
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#1ABC9C',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
