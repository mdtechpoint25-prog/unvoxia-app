import { SITE, CONTACT } from '@/lib/constants';

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Privacy Policy
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Last updated: December 2024
      </p>

      <div style={{ lineHeight: 1.8, color: '#444' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
          <p>
            Welcome to {SITE.name} ({SITE.shortName}). We are committed to protecting your personal information 
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our platform.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
          <p style={{ marginBottom: '1rem' }}>We collect information you provide directly, including:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Account information (username, email, phone number)</li>
            <li>Profile information (avatar, bio)</li>
            <li>Content you create (posts, comments, messages)</li>
            <li>Communication data when you contact us</li>
          </ul>
          <p>We also automatically collect certain information when you use our platform, including device information, 
          usage data, and cookies.</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: '1rem' }}>We use your information to:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Provide and maintain our services</li>
            <li>Process your account registration and authentication</li>
            <li>Enable communication features</li>
            <li>Send important notifications and updates</li>
            <li>Improve our platform and user experience</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. 
            However, no electronic transmission over the internet can be guaranteed to be 100% secure.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Your Rights</h2>
          <p style={{ marginBottom: '1rem' }}>You have the right to:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href={`mailto:${CONTACT.emails[1]}`} style={{ color: '#1ABC9C' }}>{CONTACT.emails[1]}</a>
          </p>
        </section>
      </div>
    </main>
  );
}