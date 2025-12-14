import { SITE } from '@/lib/constants';

export const metadata = {
  title: 'About NOMA – No Mask World | Social Platform for Authentic Expression',
  description: 'Learn about NOMA - No Mask World. A social platform where people exist authentically without filters, pressure, or pretending.',
  openGraph: {
    title: 'About NOMA – No Mask World',
    description: 'NOMA is building a world where authenticity is celebrated and individuality is protected.',
  },
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>
      <h1 style={{ color: '#1e293b', fontSize: '2.5rem', marginBottom: '1rem' }}>
        About NOMA — No Mask World
      </h1>
      
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', marginBottom: '1.5rem' }}>
          NOMA (No Mask World) is a digital space built for people who want to live authentically—without 
          the pressure to fake perfection or hide behind filters. Unlike traditional social platforms that 
          reward unrealistic standards and curated lifestyles, NOMA encourages users to show their real thoughts, 
          feelings, talents, struggles, and daily life experiences.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', marginBottom: '1.5rem' }}>
          It is a platform designed around openness, growth, and human connection. Every feature—from daily 
          prompts to the authentic feed—is engineered to allow users to express their true selves without 
          fear of judgment. The platform creates a supportive environment where authenticity is normal and 
          individuality is celebrated.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569' }}>
          Whether you want to share your creativity, talk about real life, post raw daily realities, or 
          build meaningful conversations, NOMA is built to be the most liberating social space online.
        </p>
      </section>

      <section style={{ 
        background: '#0d9488', 
        borderRadius: '16px', 
        padding: '2rem', 
        color: '#fff',
        marginBottom: '2.5rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          To create a social platform where authenticity is celebrated, individuality is protected, and 
          real human connection happens naturally. No filters, no pressure, no pretending—just real people 
          sharing real life.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#1e293b', fontSize: '1.75rem', marginBottom: '1.5rem' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { title: 'Authenticity First', desc: 'No filters needed. Share your real thoughts, feelings, and experiences.' },
            { title: 'Real Connection', desc: 'A community built on genuine interactions, not manufactured popularity.' },
            { title: 'No Pressure', desc: 'Express yourself without the stress of likes, algorithms, or going viral.' },
            { title: 'Personal Growth', desc: 'Daily prompts and reflections to help you understand yourself better.' },
            { title: 'Safe Expression', desc: 'Moderated environment where authenticity is protected and celebrated.' }
          ].map((item, i) => (
            <div key={i} style={{ 
              background: '#f8fafc', 
              borderRadius: '12px', 
              padding: '1.25rem',
              borderLeft: '4px solid #0d9488'
            }}>
              <strong style={{ color: '#1e293b' }}>{item.title}</strong>
              <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#1e293b', fontSize: '1.75rem', marginBottom: '1rem' }}>Why NOMA Matters</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#475569', marginBottom: '1rem' }}>
          In today's world, traditional social platforms reward perfection, filters, and curated lifestyles. 
          NOMA breaks that cycle by creating a space where real is more valuable than perfect—where you can 
          be yourself without worrying about algorithms or artificial popularity.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#475569' }}>
          Here, you'll find a community of real people sharing real thoughts and real life. Whether you want 
          to share your creativity, talk about your day, explore meaningful conversations, or simply express 
          yourself—NOMA gives you the freedom to be your true self.
        </p>
      </section>

      <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: '#f8fafc', 
        borderRadius: '16px' 
      }}>
        <p style={{ fontSize: '1.25rem', color: '#1e293b', fontWeight: 600 }}>
          Welcome to NOMA — A World With No Masks.
        </p>
      </div>
    </main>
  );
}