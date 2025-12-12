import PostCard from './PostCard';

const samplePosts = [
  {
    id: 'sample-1',
    username: 'HopefulSoul',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'Motivation',
    content: 'Today I decided to take one small step forward. It felt scary, but I did it.',
    commentsCount: 5,
    initialReactions: [
      { emoji: 'heart', user_id: '1' },
      { emoji: 'heart', user_id: '2' },
      { emoji: 'strength', user_id: '3' }
    ]
  },
  {
    id: 'sample-2',
    username: 'SilentWarrior',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'Mental Health',
    content: 'Some days are harder than others. Grateful for this safe space to share.',
    commentsCount: 12,
    initialReactions: [
      { emoji: 'hug', user_id: '1' },
      { emoji: 'heart', user_id: '2' },
      { emoji: 'hope', user_id: '3' },
      { emoji: 'heart', user_id: '4' }
    ]
  },
  {
    id: 'sample-3',
    username: 'GentleBreeze',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'Reflection',
    content: 'Writing down my fears helped me realize they are not as big as I thought.',
    commentsCount: 8,
    initialReactions: [
      { emoji: 'peace', user_id: '1' },
      { emoji: 'heart', user_id: '2' }
    ]
  }
];

export default function FeedPreview() {
  return (
    <section style={{ padding: '3rem 2rem', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>
        See What Others Are Sharing
      </h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {samplePosts.map((post) => (
          <PostCard key={post.id} {...post} interactive={false} />
        ))}
      </div>
    </section>
  );
}
