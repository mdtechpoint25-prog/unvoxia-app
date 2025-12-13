import Link from 'next/link';

export const metadata = {
  title: 'Safety & Support Resources | NOMA',
  description: 'NOMA\'s commitment to user safety, content moderation, crisis resources, and community guidelines for anonymous emotional support.',
  openGraph: {
    title: 'Safety & Support Resources – NOMA',
    description: 'How we keep NOMA safe, anonymous, and supportive for everyone.',
  },
};

export default function SafetyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '6rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
      }}>
        {/* Header */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: 700,
          color: '#2C3E50',
          marginBottom: '1.5rem'
        }}>
          Safety & Support
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#7a8a9a',
          marginBottom: '3rem',
          lineHeight: 1.8
        }}>
          Your safety, privacy, and wellbeing are our highest priorities. 
          Here's how we keep NOMA a safe and supportive space for everyone.
        </p>

        {/* Important Notice */}
        <div style={{
          background: '#fff3cd',
          border: '2px solid #ffc107',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#856404',
            marginBottom: '1rem'
          }}>
            ⚠️ Important: NOMA Is Not a Crisis Service
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#856404',
            lineHeight: 1.8,
            marginBottom: '1rem'
          }}>
            <strong>NOMA provides emotional support and peer connection. 
            It does not replace professional medical or mental health services.</strong>
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#856404',
            lineHeight: 1.8
          }}>
            If you are in crisis or experiencing thoughts of self-harm, 
            please contact a crisis helpline immediately.
          </p>
        </div>

        {/* Crisis Resources */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem'
          }}>
            🆘 Crisis Resources
          </h2>

          <div style={{
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              Kenya Crisis Helplines
            </h3>
            <ul style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 2,
              paddingLeft: '1.5rem'
            }}>
              <li><strong>Befrienders Kenya:</strong> 0722 178 177 / 0734 554 554 / 0782 888 221</li>
              <li><strong>MHFA Kenya:</strong> +254 739 935 333 / +254 756 454 585</li>
              <li><strong>Kenya Red Cross Hotline:</strong> 1199</li>
            </ul>
          </div>

          <div style={{
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              International Resources
            </h3>
            <ul style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 2,
              paddingLeft: '1.5rem'
            }}>
              <li><strong>International Association for Suicide Prevention:</strong> <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener" style={{ color: '#1ABC9C' }}>Crisis Centers Directory</a></li>
              <li><strong>Samaritans (UK):</strong> 116 123</li>
              <li><strong>National Suicide Prevention Lifeline (US):</strong> 988</li>
            </ul>
          </div>
        </section>

        {/* How We Keep You Safe */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem'
          }}>
            🛡️ How We Keep You Safe
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              1. Complete Anonymity
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 1.8
            }}>
              No names, no profiles, no user history. Every post gets a random anonymous label. 
              We don't track who you are or what you share.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              2. Content Moderation
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 1.8
            }}>
              We review flagged content to protect against harassment, spam, or harmful behavior. 
              Our goal: keep NOMA safe without censoring honest emotion.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              3. No Metrics, No Pressure
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 1.8
            }}>
              We hide like counts, follower numbers, and engagement metrics. 
              This reduces social pressure and allows genuine emotional expression.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#2C3E50',
              marginBottom: '0.75rem'
            }}>
              4. Support, Not Advice
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#5a6c7d',
              lineHeight: 1.8
            }}>
              NOMA is about emotional support and shared experiences, not medical advice. 
              We encourage users to seek professional help for clinical needs.
            </p>
          </div>
        </section>

        {/* Community Guidelines */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem'
          }}>
            💚 Community Guidelines
          </h2>

          <ul style={{
            fontSize: '1rem',
            color: '#5a6c7d',
            lineHeight: 2,
            paddingLeft: '1.5rem'
          }}>
            <li><strong>Be kind.</strong> Everyone here is struggling with something.</li>
            <li><strong>Respect anonymity.</strong> Don't try to identify others.</li>
            <li><strong>No harassment.</strong> Zero tolerance for bullying or hate speech.</li>
            <li><strong>Share honestly,</strong> but avoid graphic content that may trigger others.</li>
            <li><strong>Support, don't diagnose.</strong> Share experiences, not medical advice.</li>
            <li><strong>Report harmful content.</strong> Use the flag button if you see something concerning.</li>
          </ul>
        </section>

        {/* Report & Flag */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem'
          }}>
            🚩 Report Harmful Content
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#5a6c7d',
            lineHeight: 1.8,
            marginBottom: '1rem'
          }}>
            If you see content that violates our guidelines or puts someone at risk, 
            please flag it immediately. Our team reviews all reports.
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#5a6c7d',
            lineHeight: 1.8
          }}>
            Look for the flag icon (🚩) on any post or comment to report it.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem'
          }}>
            📧 Contact Us
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#5a6c7d',
            lineHeight: 1.8,
            marginBottom: '1rem'
          }}>
            For safety concerns, technical issues, or general inquiries:
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#1ABC9C',
            fontWeight: 600
          }}>
            Email: support@nomaworld.co.ke
          </p>
        </section>

        {/* Back to Home */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e8ecf1'
        }}>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            borderRadius: '50px',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
