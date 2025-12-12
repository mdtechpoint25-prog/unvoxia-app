import { SITE, CONTACT } from '@/lib/constants';

export default function ContactPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Contact Us
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
        Have questions? We'd love to hear from you. Reach out to our team.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{
          background: '#f9f9f9',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>??</div>
          <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Email Us</h3>
          {CONTACT.emails.map((email, i) => (
            <a key={i} href={`mailto:${email}`} style={{
              display: 'block',
              color: '#1ABC9C',
              textDecoration: 'none',
              marginBottom: '0.5rem'
            }}>
              {email}
            </a>
          ))}
        </div>

        <div style={{
          background: '#f9f9f9',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>??</div>
          <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Call Us</h3>
          {CONTACT.phones.map((phone, i) => (
            <a key={i} href={`tel:${phone}`} style={{
              display: 'block',
              color: '#1ABC9C',
              textDecoration: 'none',
              marginBottom: '0.5rem'
            }}>
              {phone}
            </a>
          ))}
        </div>

        <div style={{
          background: '#f9f9f9',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>??</div>
          <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Website</h3>
          <a href={`https://${SITE.domain}`} style={{
            color: '#1ABC9C',
            textDecoration: 'none'
          }}>
            {SITE.domain}
          </a>
        </div>
      </div>

      <section style={{
        background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
        borderRadius: '16px',
        padding: '2.5rem',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Get in Touch</h2>
        <p style={{ fontSize: '1.05rem', marginBottom: '2rem', opacity: 0.95 }}>
          Our team typically responds within 24 hours. We're here to help with any questions about {SITE.name}.
        </p>
        <a href={`mailto:${CONTACT.emails[1]}`} style={{
          display: 'inline-block',
          padding: '0.85rem 2rem',
          background: '#fff',
          color: '#9B59B6',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 700
        }}>
          Send Us a Message
        </a>
      </section>
    </main>
  );
}