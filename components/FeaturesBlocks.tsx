const features = [
  {
    icon: '??',
    title: 'Smart Feed',
    description: 'A structured workspace for sharing ideas, content, projects, updates, and creative work.'
  },
  {
    icon: '??',
    title: 'Task & Project Management',
    description: 'Organize assignments, track deadlines, collaborate with others, and manage tasks effortlessly.'
  },
  {
    icon: '??',
    title: 'Private Messaging',
    description: 'Secure communication with consent-based chat initiation and file sharing.'
  },
  {
    icon: '??',
    title: 'Media Reels',
    description: 'Share short videos and creative moments with reactions and captioning support.'
  },
  {
    icon: '??',
    title: 'Daily Prompts',
    description: 'Boost creativity, sharpen thinking, and track your personal growth journey.'
  },
  {
    icon: '??',
    title: 'Rich Profiles',
    description: 'Showcase your identity with avatars, badges, statistics, and achievements.'
  }
];

export default function FeaturesBlocks() {
  return (
    <section style={{ padding: '4rem 2rem', background: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#2C3E50', fontSize: '2rem' }}>
        What You Can Do with NOMA
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#888', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
        Everything you need to work smarter, collaborate faster, and achieve real results.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{f.title}</h3>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
