'use client';

import Link from 'next/link';
import { SITE, CONTACT } from '@/lib/constants';

const PLANS = [
  {
    name: 'Free',
    price: 'KES 0',
    period: 'forever',
    features: [
      'Basic profile',
      'Access to the feed',
      'Create posts',
      'Daily prompts',
      'Private messaging',
      'Project creation (limited)',
      'Basic storage',
      'Standard support'
    ],
    current: true
  },
  {
    name: 'Pro',
    price: 'KES 499',
    period: '/month',
    features: [
      'Everything in Free',
      'Unlimited task & project management',
      'Increased storage',
      'Professional delivery tools',
      'Priority support',
      'Advanced profile customization',
      'Analytics & insights',
      'Higher upload limits'
    ],
    current: false
  },
  {
    name: 'Business',
    price: 'KES 1,999',
    period: '/month',
    features: [
      'Everything in Pro',
      'Team workspaces',
      'Admin controls',
      'Shared billing',
      'Group project boards',
      'Hiring & HR tools',
      'Extended storage',
      'Dedicated success manager'
    ],
    current: false
  }
];

export default function BillingPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ color: '#2C3E50', marginBottom: '0.5rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Pricing Plans
      </h1>
      <p style={{ color: '#888', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
        {SITE.name} offers accessible tools that scale with your needs. Choose a plan that supports your growth.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{
            background: plan.name === 'Pro' ? 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)' : '#fff',
            color: plan.name === 'Pro' ? '#fff' : '#2C3E50',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            {plan.name === 'Pro' && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: '#FF6B35',
                color: '#fff',
                padding: '0.35rem 1rem',
                borderRadius: '16px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                Popular
              </div>
            )}
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{plan.name}</h3>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {plan.price}
              <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.8 }}>{plan.period}</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '1.5rem 0'
            }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  marginBottom: '0.6rem',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: plan.name === 'Pro' ? '#fff' : '#1ABC9C' }}>?</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={!plan.current}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: plan.current ? '#1ABC9C' : (plan.name === 'Pro' ? '#fff' : '#f5f5f5'),
                color: plan.current ? '#fff' : (plan.name === 'Pro' ? '#9B59B6' : '#888'),
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: plan.current ? 'pointer' : 'default',
                fontSize: '1rem'
              }}
            >
              {plan.current ? 'Current Plan' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>

      <div style={{
        background: '#f9f9f9',
        borderRadius: '16px',
        padding: '2.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Payment Integration Coming Soon</h3>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          We're finalizing integrations with M-Pesa, Pesapal, and Stripe. All users will be notified when subscriptions launch.
        </p>
        <p style={{ color: '#2C3E50', fontSize: '0.95rem' }}>
          Questions? Contact us at{' '}
          <a href={`mailto:${CONTACT.emails[1]}`} style={{ color: '#1ABC9C' }}>
            {CONTACT.emails[1]}
          </a>
        </p>
      </div>
    </main>
  );
}