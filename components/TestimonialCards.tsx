const testimonials = [
  {
    quote: 'I never thought anyone would understand my pain - until I shared here.',
    username: 'AnonymousHeart'
  },
  {
    quote: 'Reading others stories inspired me to take small steps every day.',
    username: 'QuietStrength'
  },
  {
    quote: 'Daily prompts help me reflect and feel supported.',
    username: 'GentleMind'
  }
];

export default function TestimonialCards() {
  return (
    <section style={{ padding: '3rem 2rem', background: '#f3f0f7' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>
        What Our Community Says
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&quot;</div>
            <p style={{ color: '#2C3E50', fontStyle: 'italic', marginBottom: '1rem' }}>{t.quote}</p>
            <strong style={{ color: '#9B59B6' }}>- {t.username}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
