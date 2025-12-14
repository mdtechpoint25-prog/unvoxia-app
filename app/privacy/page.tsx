'use client';

import { SITE, CONTACT } from '@/lib/constants';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <header className="page-header">
          <h1>Privacy Policy</h1>
          <p className="meta">Last updated: December 2024</p>
        </header>

        <div className="content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to {SITE.name} ({SITE.shortName}). We are committed to protecting your personal information 
              and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our platform.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We collect information you provide directly, including:</p>
            <ul>
              <li>Account information (username, email, phone number)</li>
              <li>Profile information (avatar, bio)</li>
              <li>Content you create (posts, comments, messages)</li>
              <li>Communication data when you contact us</li>
            </ul>
            <p>
              We also automatically collect certain information when you use our platform, including device information, 
              usage data, and cookies.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process your account registration and authentication</li>
              <li>Enable communication features</li>
              <li>Send important notifications and updates</li>
              <li>Improve our platform and user experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2>4. Anonymity & Your Identity</h2>
            <p>
              At {SITE.name}, we believe in the power of anonymous expression. When you post anonymously:
            </p>
            <ul>
              <li>Your username and profile are hidden from other users</li>
              <li>Only you can see your connection to the post</li>
              <li>Your identity is protected even from our moderation team in most cases</li>
              <li>We only reveal identity when required by law or to prevent harm</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. 
              This includes encryption of data in transit and at rest, secure authentication, and regular security audits. 
              However, no electronic transmission over the internet can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide services. 
              You can request deletion of your account and data at any time through Settings &gt; Account &gt; Delete Account.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> — Request a copy of your personal data</li>
              <li><strong>Correction</strong> — Request correction of inaccurate data</li>
              <li><strong>Deletion</strong> — Request deletion of your data</li>
              <li><strong>Objection</strong> — Object to processing of your data</li>
              <li><strong>Portability</strong> — Request transfer of your data</li>
              <li><strong>Withdrawal</strong> — Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2>8. Cookies & Tracking</h2>
            <p>
              We use essential cookies to maintain your session and preferences. We do not use third-party 
              tracking cookies or sell your data to advertisers. You can manage cookie preferences in your 
              browser settings.
            </p>
          </section>

          <section>
            <h2>9. Third-Party Services</h2>
            <p>
              We may use third-party services for hosting, analytics, and communication. These services have 
              their own privacy policies and we ensure they meet our data protection standards.
            </p>
          </section>

          <section>
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our platform is not intended for users under 16 years of age. We do not knowingly collect 
              personal information from children under 16.
            </p>
          </section>

          <section>
            <h2>11. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href={`mailto:${CONTACT.emails[1]}`}>{CONTACT.emails[1]}</a>
            </p>
            <p>
              For general inquiries:{' '}
              <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a>
            </p>
          </section>
        </div>

        <nav className="legal-nav">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 4rem 1.5rem;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .page-header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .meta {
          color: var(--text-muted);
          font-size: 0.9375rem;
        }

        .content {
          line-height: 1.8;
          color: var(--text-secondary);
        }

        section {
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        p {
          margin-bottom: 0.75rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }

        li {
          margin-bottom: 0.375rem;
        }

        li strong {
          color: var(--text-primary);
        }

        a {
          color: var(--accent);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .legal-nav {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .legal-page {
            padding: 3rem 1rem;
          }
        }
      `}</style>
    </main>
  );
}
