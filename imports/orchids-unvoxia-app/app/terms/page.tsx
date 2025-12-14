import { SITE, CONTACT } from '@/lib/constants';

export default function TermsPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Terms of Service
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Last updated: December 2024
      </p>

      <div style={{ lineHeight: 1.8, color: '#444' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using {SITE.name} ({SITE.shortName}), you agree to comply with these Terms of Service. 
            If you do not agree, you may not use the platform.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>2. User Eligibility</h2>
          <p>
            You must be at least 16 years old to use the platform. Users under 18 should have parental or guardian consent. 
            By using NOMA, you represent that you meet these requirements.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>3. User Accounts</h2>
          <p style={{ marginBottom: '1rem' }}>When you create an account, you agree to:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Acceptable Use</h2>
          <p style={{ marginBottom: '1rem' }}>You agree NOT to:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Post illegal, harmful, or offensive content</li>
            <li>Harass, bully, or threaten other users</li>
            <li>Impersonate others or misrepresent your identity</li>
            <li>Attempt to access accounts or data belonging to others</li>
            <li>Use the platform for spam or commercial solicitation without permission</li>
            <li>Upload malicious software or content</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Content Ownership</h2>
          <p>
            You retain ownership of content you create. By posting content, you grant {SITE.name} a non-exclusive, 
            worldwide license to use, display, and distribute your content on the platform.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these terms. You may also delete your account at any time. 
            Upon termination, your right to use the platform ceases immediately.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>7. Disclaimer</h2>
          <p>
            {SITE.name} is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. 
            We are not liable for any damages arising from your use of the platform.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance 
            of the new terms.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '1rem' }}>9. Contact</h2>
          <p>
            For questions about these Terms, contact us at:{' '}
            <a href={`mailto:${CONTACT.emails[1]}`} style={{ color: '#1ABC9C' }}>{CONTACT.emails[1]}</a>
          </p>
        </section>
      </div>
    </main>
  );
}