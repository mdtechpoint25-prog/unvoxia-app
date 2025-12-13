import { SITE } from '@/lib/constants';

export const metadata = {
  title: 'About NOMA – Our Mission & Values | Anonymous Emotional Support',
  description: 'Learn about NOMA\'s mission to provide safe, anonymous emotional support. We believe healing begins when you can speak without fear.',
  openGraph: {
    title: 'About NOMA – Speaking Without Fear',
    description: 'NOMA is building a world where emotional honesty is safe, supported, and anonymous.',
  },
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>
      <h1 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '1rem' }}>
        About {SITE.name} ({SITE.shortName})
      </h1>
      
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          {SITE.name} ({SITE.shortName}) is an anonymous healing platform where people can freely express their deepest feelings, 
          struggles, and truths without fear of judgement. We believe that healing begins when we can speak honestly 
          about what hurts—and that anonymity creates the safety needed for true vulnerability.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          Our name, &quot;No Mask,&quot; represents emotional authenticity and liberation. In a world where we hide our pain 
          behind smiles and filters, NOMA offers a sanctuary: a space where your voice is heard, your feelings are valid, 
          and your identity remains protected. Here, you can remove the mask and be your truest self.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
          Whether you're dealing with emotional pain, mental health struggles, life challenges, or simply need someone to listen, 
          NOMA provides a compassionate community where you can share anonymously, receive support from caring individuals, 
          and begin your journey toward healing and emotional freedom.
        </p>
      </section>

      <section style={{ 
        background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)', 
        borderRadius: '16px', 
        padding: '2rem', 
        color: '#fff',
        marginBottom: '2.5rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          To create a safe, anonymous space where anyone can express their truth, receive compassionate support, 
          and find healing without fear of judgement or exposure. Your voice matters. You are heard. You are not alone.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#2C3E50', fontSize: '1.75rem', marginBottom: '1.5rem' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { title: 'Anonymity & Safety', desc: 'Your identity is protected. Share freely without exposure or fear.' },
            { title: 'Compassionate Support', desc: 'A community built on empathy, kindness, and genuine care for one another.' },
            { title: 'No Judgement', desc: 'Express your truth without shame, criticism, or ridicule. You are safe here.' },
            { title: 'Mental Wellness', desc: 'Promoting emotional health, healing, and mental wellbeing through support and connection.' },
            { title: 'Empowerment', desc: 'Helping individuals find their voice, build confidence, and discover paths forward.' }
          ].map((item, i) => (
            <div key={i} style={{ 
              background: '#f9f9f9', 
              borderRadius: '12px', 
              padding: '1.25rem',
              borderLeft: '4px solid #1ABC9C'
            }}>
              <strong style={{ color: '#2C3E50' }}>{item.title}</strong>
              <p style={{ color: '#666', margin: '0.25rem 0 0', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#2C3E50', fontSize: '1.75rem', marginBottom: '1rem' }}>Why NOMA Matters</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>          In today's world, mental health struggles, emotional pain, and life challenges are everywhere—yet so many people 
          suffer in silence, afraid of judgement, shame, or exposure. NOMA breaks that cycle by providing complete anonymity, 
          allowing you to speak your truth without revealing who you are.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
          Here, you'll find a compassionate community ready to listen, support, and uplift. Whether you need to vent, 
          seek guidance, find motivation, or simply be heard, NOMA offers the safe space and emotional support you deserve. 
          Healing begins when we stop hiding.
        </p>
      </section>

      <section style={{
        background: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#856404',
          marginBottom: '0.75rem'
        }}>
          ⚠️ Important Disclaimer
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#856404',
          lineHeight: 1.8
        }}>
          <strong>NOMA provides emotional support and peer connection. 
          It does not replace professional medical or mental health services.</strong>
          {' '}If you are in crisis, please contact a professional helpline immediately.
        </p>
      </section>

      <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: '#f5f5f5', 
        borderRadius: '16px' 
      }}>
        <p style={{ fontSize: '1.25rem', color: '#2C3E50', fontWeight: 600 }}>
          Welcome to NOMA - where healing begins without masks.
        </p>
      </div>
    </main>
  );
}