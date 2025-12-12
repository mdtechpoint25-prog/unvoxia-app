'use client';

import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    price: 'KES 0',
    period: 'forever',
    features: [
      'Unlimited anonymous posts',
      'React and comment on posts',
      'Daily reflection prompts',
      'Community support'
    ],
    current: true
  },
  {
    name: 'Premium',
    price: 'KES 299',
    period: '/month',
    features: [
      'Everything in Free',
      'Ad-free experience',
      'Exclusive motivational content',
      'Custom avatar options',
      'Priority support',
      'Special badges'
    ],
    current: false
  },
  {
    name: 'Supporter',
    price: 'KES 999',
    period: '/month',
    features: [
      'Everything in Premium',
      'Support platform development',
      'Early access to features',
      'Founder badge',
      'Direct feedback channel'
    ],
    current: false
  }
];

export default function BillingPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem', textAlign: 'center' }}>
        Subscription Plans
      </h2>
      <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center' }}>
        Choose a plan that works for you. Support Unvoxia and unlock premium features.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{
            background: plan.name === 'Premium' ? 'linear-gradient(135deg, #1ABC9C 0%, #4DA8DA 100%)' : '#fff',
            color: plan.name === 'Premium' ? '#fff' : '#2C3E50',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            {plan.name === 'Premium' && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '20px',
                background: '#FF6B35',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                Popular
              </div>
            )}
            <h3 style={{ marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {plan.price}
              <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>{plan.period}</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '1.5rem 0'
            }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: plan.name === 'Premium' ? '#fff' : '#1ABC9C' }}>&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: plan.current ? '#ccc' : (plan.name === 'Premium' ? '#fff' : '#1ABC9C'),
                color: plan.current ? '#888' : (plan.name === 'Premium' ? '#1ABC9C' : '#fff'),
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: plan.current ? 'default' : 'pointer'
              }}
            >
              {plan.current ? 'Current Plan' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>

      <div style={{
        background: '#f5f5f5',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          Payment integration with Pesapal/M-Pesa coming soon.
        </p>
        <p style={{ color: '#2C3E50', fontSize: '0.9rem' }}>
          Questions? Contact us at{' '}
          <a href="mailto:support@unvoxia.co.ke" style={{ color: '#1ABC9C' }}>
            support@unvoxia.co.ke
          </a>
        </p>
      </div>
    </main>
  );
}