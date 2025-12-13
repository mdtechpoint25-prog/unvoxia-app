// Structured Data (Schema.org JSON-LD) for SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NOMA',
  alternateName: 'No Mask World',
  url: 'https://nomaworld.co.ke',
  logo: 'https://nomaworld.co.ke/images/logo.svg',
  description: 'NOMA is a safe, anonymous space to share feelings, release pain, and find emotional support without judgment.',
  sameAs: [
    // Add social media profiles when available
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@mail.nomaworld.co.ke',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NOMA',
  url: 'https://nomaworld.co.ke',
  description: 'Anonymous emotional support platform for healing and connection',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nomaworld.co.ke/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is NOMA really anonymous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, NOMA is completely anonymous. No names, no profiles, no user history tracking. Every post gets a random anonymous label to protect your identity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I share without registering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You can share your feelings instantly without creating an account or providing any personal information.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NOMA a therapy or medical service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. NOMA provides emotional support and peer connection. It does not replace professional medical or mental health services. If you need clinical care, please consult a licensed professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Healing Circles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Healing Circles are themed anonymous communities where you can share experiences and find support around specific topics like love, mental health, trauma, job stress, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does NOMA keep me safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NOMA ensures safety through complete anonymity, content moderation, no social metrics or pressure, and clear community guidelines against harassment or harmful behavior.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I\'m in crisis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you are experiencing thoughts of self-harm or are in crisis, please contact a professional crisis helpline immediately. Kenya: Befrienders 0722 178 177. NOMA provides peer support, not crisis intervention.',
      },
    },
  ],
};

export const healingCircleSchema = (circleName: string, circleDescription: string, circleUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${circleName} – Anonymous Support Circle`,
  description: circleDescription,
  url: circleUrl,
  isPartOf: {
    '@type': 'WebSite',
    name: 'NOMA',
    url: 'https://nomaworld.co.ke',
  },
});

// Helper to render JSON-LD in pages
export function renderStructuredData(schema: object) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
