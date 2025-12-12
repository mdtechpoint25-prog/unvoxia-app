import PostCard from './PostCard';

const samplePosts = [
  {
    username: 'HopefulSoul',
    timestamp: '2 hours ago',
    category: 'Motivation',
    content: 'Today I decided to take one small step forward. It felt scary, but I did it.',
    reactions: 24,
    comments: 5
  },
  {
    username: 'SilentWarrior',
    timestamp: '5 hours ago',
    category: 'Mental Health',
    content: 'Some days are harder than others. Grateful for this safe space to share.',
    reactions: 42,
    comments: 12
  },
  {
    username: 'GentleBreeze',
    timestamp: '1 day ago',
    category: 'Reflection',
    content: 'Writing down my fears helped me realize they are not as big as I thought.',
    reactions: 31,
    comments: 8
  }
];

export default function FeedPreview() {
  return (
    <section style={{ padding: '3rem 2rem', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>
        See What Others Are Sharing
      </h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {samplePosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
    </section>
  );
}
