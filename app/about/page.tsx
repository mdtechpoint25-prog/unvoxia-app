import { SITE } from '@/lib/constants';

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '1rem' }}>
        About {SITE.name} ({SITE.shortName})
      </h1>
      
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          {SITE.name} ({SITE.shortName}) is a modern digital platform built to simplify the way people work, learn, collaborate, 
          and manage their daily tasks. We believe that productivity should not be complicated - it should be natural, 
          transparent, and accessible to everyone.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          Our name, &quot;No Mask,&quot; symbolizes authenticity and openness. In a world full of noise and complexity, NOMA offers clarity: 
          a space where your work speaks for itself, your communication flows easily, and your ideas can grow without barriers.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
          From freelancers and content creators to academic writers, students, small businesses, and large teams, NOMA provides 
          tools that streamline communication, enhance project management, and ensure smooth delivery of results.
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
          To empower you with a clean, efficient, and trustworthy digital environment where real work gets done, 
          and real connections thrive.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#2C3E50', fontSize: '1.75rem', marginBottom: '1.5rem' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { title: 'Authenticity', desc: 'No pretence. No unnecessary complexity. Just real work.' },
            { title: 'Speed and Efficiency', desc: 'Delivering tools that save time and increase productivity.' },
            { title: 'Quality', desc: 'Ensuring excellence through clean workflows and professional support.' },
            { title: 'User Empowerment', desc: 'Helping individuals and teams express talent, manage tasks, and grow.' },
            { title: 'Innovation', desc: 'Creating solutions that adapt to your needs in a fast-changing digital world.' }
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
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>
          In todays world, people juggle school, work, deadlines, creativity, and communication across countless tools. 
          NOMA brings these needs into one unified ecosystem - clean, powerful, and easy to use.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
          With us, you experience seamless communication, reliable project management, professional delivery systems, 
          strong user support, and a platform built on clarity, trust, and truth.
        </p>
      </section>

      <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: '#f5f5f5', 
        borderRadius: '16px' 
      }}>
        <p style={{ fontSize: '1.25rem', color: '#2C3E50', fontWeight: 600 }}>
          Welcome to No Mask World - where real work thrives.
        </p>
      </div>
    </main>
  );
}