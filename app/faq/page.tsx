export const metadata = {
  title: 'FAQ – Frequently Asked Questions | NOMA',
  description: 'Common questions about NOMA\'s anonymous emotional support platform, safety features, and healing circles.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'Is NOMA really anonymous?',
      answer: 'Yes, NOMA is completely anonymous. No names, no profiles, no user history tracking. Every post gets a random anonymous label to protect your identity.',
    },
    {
      question: 'Can I share without registering?',
      answer: 'Absolutely. You can share your feelings instantly without creating an account or providing any personal information.',
    },
    {
      question: 'Is NOMA a therapy or medical service?',
      answer: 'No. NOMA provides emotional support and peer connection. It does not replace professional medical or mental health services. If you need clinical care, please consult a licensed professional.',
    },
    {
      question: 'What are Healing Circles?',
      answer: 'Healing Circles are themed anonymous communities where you can share experiences and find support around specific topics like love, mental health, trauma, job stress, and more.',
    },
    {
      question: 'How does NOMA keep me safe?',
      answer: 'NOMA ensures safety through complete anonymity, content moderation, no social metrics or pressure, and clear community guidelines against harassment or harmful behavior.',
    },
    {
      question: 'What if I\'m in crisis?',
      answer: 'If you are experiencing thoughts of self-harm or are in crisis, please contact a professional crisis helpline immediately. Kenya: Befrienders 0722 178 177. NOMA provides peer support, not crisis intervention.',
    },
    {
      question: 'Can people see my previous posts?',
      answer: 'No. There are no user profiles or post history on NOMA. Each post is anonymous and independent.',
    },
    {
      question: 'How do Support Reactions work?',
      answer: 'Instead of likes, NOMA uses Support Reactions like "I hear you" and "You\'re not alone" to show empathy without creating social pressure.',
    },
    {
      question: 'Is my data stored?',
      answer: 'Posts are stored anonymously without any connection to your identity. Your journal is stored only on your device (not on our servers).',
    },
    {
      question: 'Can I delete my posts?',
      answer: 'Since posts are anonymous and not tied to accounts, they become part of the community\'s shared healing space. If you need a post removed, please contact support.',
    },
  ];

  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.slice(0, 6).map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          })
        }}
      />

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
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1rem'
          }}>
            Frequently Asked Questions
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: '#7a8a9a',
            marginBottom: '3rem',
            lineHeight: 1.8
          }}>
            Everything you need to know about NOMA's anonymous emotional support platform.
          </p>

          {faqs.map((faq, index) => (
            <div key={index} style={{
              marginBottom: '2rem',
              paddingBottom: '2rem',
              borderBottom: index < faqs.length - 1 ? '1px solid #e8ecf1' : 'none'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#2C3E50',
                marginBottom: '0.75rem'
              }}>
                {faq.question}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#5a6c7d',
                lineHeight: 1.8
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
