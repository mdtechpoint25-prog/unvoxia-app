const features = [
  {
    icon: '???',
    title: 'Anonymous Posting',
    description: 'Share your thoughts and feelings without revealing your identity.'
  },
  {
    icon: '??',
    title: 'Media Sharing',
    description: 'Enhance your expression with images or short videos (?50MB, ?10 minutes).'
  },
  {
    icon: '??',
    title: 'Daily Prompts & Reflection',
    description: 'Engage with daily exercises to build resilience and motivation.'
  },
  {
    icon: '??',
    title: 'Community Support',
    description: 'React, comment, and find encouragement from a safe community.'
  }
];

export default function FeaturesBlocks() {
  return (
    <section style={{ padding: '3rem 2rem', background: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>Why Unvoxia?</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{f.icon}</div>
            <h3 style={{ color: '#1ABC9C', marginBottom: '0.5rem' }}>{f.title}</h3>
            <p style={{ color: '#2C3E50', fontSize: '0.95rem' }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
