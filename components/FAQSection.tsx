'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Is NOMA really anonymous?',
    answer: 'Yes, completely. We do not collect names, email addresses, IP addresses, or any identifying information. You can share instantly without creating an account. Each post you make gets a random anonymous label (like "Anonymous Voice #1234") that changes with every post.'
  },
  {
    question: 'Do I need to create an account to share?',
    answer: 'No! You can share your feelings immediately without any signup. Just visit the "Share" page and express what\'s on your heart. For additional features like healing circles and tracking your journey, you can optionally create an account.'
  },
  {
    question: 'What kind of support can I get here?',
    answer: 'You\'ll receive compassionate responses from community members, access to healing circles for specific challenges, daily prompts for reflection, and a safe space to express yourself without judgement. We also have mentors who provide guidance and emotional support.'
  },
  {
    question: 'Is my information safe?',
    answer: 'Absolutely. We use industry-standard encryption, do not track your activity, and have strict moderation to ensure a safe environment. Your words are protected, and your identity remains anonymous. We will never share or sell any information.'
  },
  {
    question: 'What are Healing Circles?',
    answer: 'Healing Circles are supportive communities focused on specific topics like mental health, grief, anxiety, depression, and more. Each circle provides a space where people with similar experiences can share, support each other, and heal together.'
  },
  {
    question: 'How do I know my posts won\'t be judged?',
    answer: 'NOMA has strict community guidelines and active moderation. Any bullying, harassment, or judgement results in immediate removal. Our community is built on compassion, empathy, and understanding. We\'re here to support, not to judge.'
  },
  {
    question: 'Is NOMA free to use?',
    answer: 'Yes! NOMA is completely free. We believe everyone deserves access to emotional support and a safe space to heal, regardless of their financial situation. All core features are available at no cost.'
  },
  {
    question: 'What if I\'m in crisis?',
    answer: 'While NOMA provides emotional support, we are not a crisis intervention service. If you\'re in immediate danger, please contact emergency services (999/112 in Kenya) or reach out to Kenya\'s crisis hotlines. We have a list of professional resources on our Safety page.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, #f8fafb 0%, #ffffff 100%)',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
            padding: '0.5rem 1.25rem',
            borderRadius: '50px',
            marginBottom: '1rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              FREQUENTLY ASKED
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Questions & Answers
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Everything you need to know about NOMA and how we keep your voice safe
          </p>
        </div>

        {/* FAQ Accordion */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: openIndex === index ? '0 8px 30px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (openIndex !== index) {
                    e.currentTarget.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  flex: 1
                }}>
                  {faq.question}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: openIndex === index 
                    ? 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)' 
                    : '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={openIndex === index ? '#fff' : '#6b7280'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease'
                }}
              >
                <div style={{
                  padding: '0 2rem 1.5rem 2rem',
                  color: '#6b7280',
                  fontSize: '1rem',
                  lineHeight: 1.7
                }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            marginBottom: '1rem'
          }}>
            Still have questions?
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(26, 188, 156, 0.3)'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
