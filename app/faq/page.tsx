'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE, CONTACT } from '@/lib/constants';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is NOMA?',
        a: `${SITE.fullName} (NOMA) is a social platform designed for authentic expression. Share your thoughts, experiences, and stories—anonymously or with your identity revealed. We believe in creating a judgment-free space where you can be your true self.`
      },
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" on the homepage. Enter your email, create a username, and set a password. Verify your email address, and you\'re ready to go! You can also sign up with your phone number.'
      },
      {
        q: 'Is NOMA really anonymous?',
        a: 'Yes! When you post anonymously, your identity is hidden from other users. They cannot see your username, profile, or any identifying information. Only you can see your connection to anonymous posts.'
      },
      {
        q: 'Can I use NOMA on mobile?',
        a: 'Absolutely! NOMA is fully responsive and works great on mobile browsers. We\'re also developing native iOS and Android apps—stay tuned for updates!'
      }
    ]
  },
  {
    category: 'Account & Profile',
    questions: [
      {
        q: 'How do I reset my password?',
        a: 'Go to the login page and click "Forgot Password." Enter your email address, and we\'ll send you a reset link. The link expires after 1 hour for security.'
      },
      {
        q: 'Can I change my username?',
        a: 'Yes, you can change your username once every 30 days. Go to Settings → Profile → Username. Note that your old username will become available for others to claim.'
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to Settings → Account → Delete Account. This action is permanent and will remove all your data, posts, and connections. Anonymous posts you\'ve created will remain but will be completely disconnected from your identity.'
      },
      {
        q: 'Can I make my profile private?',
        a: 'Yes! Go to Settings → Privacy → Profile Visibility. You can choose to make your profile visible to everyone, followers only, or completely private.'
      }
    ]
  },
  {
    category: 'Posting & Content',
    questions: [
      {
        q: 'What\'s the difference between anonymous and regular posts?',
        a: 'Regular posts show your username and profile picture. Anonymous posts hide your identity—other users will see "Anonymous" instead of your name. You can toggle anonymity when creating any post.'
      },
      {
        q: 'Can I edit or delete my posts?',
        a: 'You can delete posts at any time. For editing, you have a 15-minute window after posting. This prevents changing the context of discussions after others have responded.'
      },
      {
        q: 'What are Circles?',
        a: 'Circles are community groups centered around shared interests or topics. You can join existing circles or create your own. Content posted in circles is only visible to circle members.'
      },
      {
        q: 'What are Daily Prompts?',
        a: 'Daily Prompts are reflection questions posted each day to spark meaningful conversations. Respond to prompts to share your perspective and connect with others thinking about the same topics.'
      }
    ]
  },
  {
    category: 'Safety & Privacy',
    questions: [
      {
        q: 'How do I report harmful content?',
        a: 'Click the three-dot menu on any post or profile and select "Report." Choose the reason for your report and add any details. Our moderation team reviews all reports within 24 hours.'
      },
      {
        q: 'How do I block or mute someone?',
        a: 'Visit their profile and click the menu icon. Select "Block" to prevent all interaction, or "Mute" to hide their posts from your feed without blocking. You can manage blocked/muted users in Settings.'
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. We use industry-standard encryption for data in transit and at rest. We don\'t sell your data to third parties. Read our full Privacy Policy for details on how we protect your information.'
      },
      {
        q: 'Can NOMA reveal my identity?',
        a: 'We only reveal user identity when legally required (valid court order) or to prevent imminent harm to someone. We fight to protect user privacy and will notify you if we receive such requests, when legally permitted.'
      },
      {
        q: 'What if I\'m in crisis?',
        a: 'If you are experiencing thoughts of self-harm or are in crisis, please contact a professional crisis helpline immediately. Kenya: Befrienders 0722 178 177. NOMA provides peer support, not crisis intervention.'
      }
    ]
  },
  {
    category: 'Features & Tips',
    questions: [
      {
        q: 'How does the For You feed work?',
        a: 'Our algorithm shows posts based on your interests, engagement patterns, and what\'s trending in your circles. It prioritizes recent, high-quality content. You can also switch to "Following" to see only posts from people you follow.'
      },
      {
        q: 'What are reactions?',
        a: 'Reactions let you respond to posts with emotions: ❤️ Love, 😂 Laugh, 😮 Wow, 😢 Sad, 🤔 Think. They\'re a quick way to engage without commenting. You can see reaction counts but not who reacted (for anonymous posts).'
      },
      {
        q: 'How do Support Reactions work?',
        a: 'Instead of generic likes, NOMA uses Support Reactions like "I hear you" and "You\'re not alone" to show empathy without creating social pressure.'
      },
      {
        q: 'Can I save posts to read later?',
        a: 'Yes! Click the bookmark icon on any post to save it. Access your saved posts from your profile or the bookmark section in the navigation. Saved posts are private—only you can see them.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap(cat => cat.questions.slice(0, 2)).map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="faq-page">
        <div className="container">
          <header className="page-header">
            <h1>Frequently Asked Questions</h1>
            <p>Everything you need to know about {SITE.name}</p>
            
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {filteredFaqs.length === 0 ? (
            <div className="no-results">
              <p>No matching questions found.</p>
              <button onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          ) : (
            filteredFaqs.map((category, catIndex) => (
              <section key={catIndex} className="faq-section">
                <h2>{category.category}</h2>
                <div className="questions">
                  {category.questions.map((item, qIndex) => {
                    const id = `${catIndex}-${qIndex}`;
                    const isOpen = openItems[id];
                    return (
                      <div 
                        key={qIndex} 
                        className={`faq-item ${isOpen ? 'open' : ''}`}
                      >
                        <button 
                          className="faq-question"
                          onClick={() => toggleItem(id)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.q}</span>
                          <svg 
                            className="chevron"
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}

          <section className="still-need-help">
            <h3>Still have questions?</h3>
            <p>Can&apos;t find what you&apos;re looking for? We&apos;re here to help!</p>
            <div className="help-links">
              <Link href="/contact" className="btn-primary">Contact Support</Link>
              <a href={`mailto:${CONTACT.emails[1]}`} className="btn-secondary">
                Email Us
              </a>
            </div>
          </section>

          <nav className="legal-nav">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/about">About NOMA</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>

        <style jsx>{`
          .faq-page {
            min-height: 100vh;
            background: var(--bg-primary);
            padding: 4rem 1.5rem;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
          }

          .page-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .page-header h1 {
            font-size: clamp(2rem, 5vw, 2.5rem);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
          }

          .page-header > p {
            color: var(--text-secondary);
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
          }

          .search-bar {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 400px;
            margin: 0 auto;
            padding: 0.75rem 1rem;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
          }

          .search-bar svg {
            color: var(--text-muted);
            flex-shrink: 0;
          }

          .search-bar input {
            flex: 1;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1rem;
            outline: none;
          }

          .search-bar input::placeholder {
            color: var(--text-muted);
          }

          .no-results {
            text-align: center;
            padding: 3rem;
            color: var(--text-secondary);
          }

          .no-results button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            color: var(--accent);
            cursor: pointer;
          }

          .faq-section {
            margin-bottom: 2.5rem;
          }

          .faq-section h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
            padding-left: 0.5rem;
          }

          .questions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .faq-item {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.2s;
          }

          .faq-item.open {
            border-color: var(--accent);
          }

          .faq-question {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 1rem 1.25rem;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1rem;
            font-weight: 500;
            text-align: left;
            cursor: pointer;
            transition: color 0.2s;
          }

          .faq-question:hover {
            color: var(--accent);
          }

          .chevron {
            flex-shrink: 0;
            color: var(--text-muted);
            transition: transform 0.2s;
          }

          .faq-item.open .chevron {
            transform: rotate(180deg);
          }

          .faq-answer {
            padding: 0 1.25rem 1.25rem;
            animation: fadeIn 0.2s ease;
          }

          .faq-answer p {
            color: var(--text-secondary);
            line-height: 1.7;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .still-need-help {
            text-align: center;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 20px;
            padding: 2.5rem;
            margin: 3rem 0;
          }

          .still-need-help h3 {
            font-size: 1.375rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
          }

          .still-need-help > p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
          }

          .help-links {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn-primary {
            padding: 0.75rem 1.5rem;
            background: var(--accent);
            color: var(--bg-primary);
            font-weight: 600;
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.2s;
          }

          .btn-primary:hover {
            background: var(--accent-hover);
          }

          .btn-secondary {
            padding: 0.75rem 1.5rem;
            background: var(--bg-surface-elevated);
            color: var(--text-primary);
            font-weight: 600;
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.2s;
          }

          .btn-secondary:hover {
            border-color: var(--accent);
          }

          .legal-nav {
            padding-top: 2rem;
            border-top: 1px solid var(--border-subtle);
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            justify-content: center;
          }

          .legal-nav a {
            color: var(--accent);
            text-decoration: none;
            font-size: 0.9375rem;
          }

          .legal-nav a:hover {
            text-decoration: underline;
          }

          @media (max-width: 600px) {
            .faq-page {
              padding: 3rem 1rem;
            }
            .faq-question {
              padding: 0.875rem 1rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}
