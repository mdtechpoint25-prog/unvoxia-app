const testimonials = [
  {
    quote: 'NOMA simplified my entire workflow. I no longer switch between apps - everything lives in one place now.',
    name: 'Grace',
    role: 'Freelancer'
  },
  {
    quote: 'The project system is a lifesaver for academic work. Clean, simple, and reliable.',
    name: 'Daniel',
    role: 'Student'
  },
  {
    quote: 'Authentic interactions, meaningful tools, and real productivity. NOMA is different.',
    name: 'Lydia',
    role: 'Business Owner'
  }
];

export default function TestimonialCards() {
  return (
    <section style={{ padding: '4rem 2rem', background: '#f3f0f7' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#2C3E50', fontSize: '2rem' }}>
        What Our Users Say
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#888' }}>
        Real feedback from real users
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1ABC9C' }}>&ldquo;</div>
            <p style={{ color: '#2C3E50', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
              {t.quote}
            </p>
            <strong style={{ color: '#9B59B6', display: 'block' }}>{t.name}</strong>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

