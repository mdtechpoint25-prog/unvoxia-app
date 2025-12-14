'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  author: string;
  category: string;
  readingTime: number;
  date: string;
}

// Blog content (would come from API/database in production)
const blogContent: Record<string, BlogPost> = {
  'welcome-to-noma': {
    slug: 'welcome-to-noma',
    title: 'Welcome to NOMA: A World Without Masks',
    author: 'NOMA Team',
    category: 'general',
    readingTime: 5,
    date: 'January 1, 2025',
    content: `
# Welcome to NOMA

**NOMA** stands for **No Mask World** — a revolutionary platform designed for authentic human connection in a world where we often feel the need to hide our true selves.

## Why NOMA Exists

In our daily lives, we wear countless masks. We smile when we're hurting. We say "I'm fine" when we're falling apart. We present curated versions of ourselves online while our real struggles remain hidden in the shadows.

NOMA was born from a simple belief: **Everyone deserves a space where they can be truly seen, heard, and understood.**

## What Makes NOMA Different

### 🎭 Anonymous by Design
Share your deepest thoughts without fear. Your identity is protected, allowing you to express what you've never been able to say.

### 💚 Supportive Community
Every interaction on NOMA is designed around empathy. Instead of likes, we have reactions like "I Feel This," "You're Not Alone," and "Sending Strength."

### 📝 Text-First Experience
Words matter. NOMA is a text-based platform where your story takes center stage — no filters, no performative content, just raw human experience.

### 🔒 Safe Space Guarantee
Our community guidelines prioritize emotional safety. Harmful content is swiftly moderated, and support resources are always accessible.

## How to Get Started

1. **Create your anonymous profile** — Choose a username that represents you
2. **Explore the feed** — Read stories from others who understand
3. **Share when ready** — There's no pressure, share at your own pace
4. **Connect authentically** — Find your community in Circles
5. **Heal together** — Support others on their journey

## Our Promise

At NOMA, we believe that vulnerability is strength. Every story shared, every reaction given, every connection made brings us closer to a world where authenticity is celebrated.

**Welcome home. Welcome to NOMA.**

*Remove the mask. Find your voice. You're not alone.*
    `,
  },
  'understanding-anonymous-sharing': {
    slug: 'understanding-anonymous-sharing',
    title: 'The Power of Anonymous Sharing',
    author: 'NOMA Team',
    category: 'mental-health',
    readingTime: 4,
    date: 'January 5, 2025',
    content: `
# The Power of Anonymous Sharing

When we remove our names and faces from our stories, something remarkable happens: we become free to share our truth.

## The Science Behind Anonymous Expression

Research shows that anonymous sharing can:
- Reduce shame and stigma around mental health
- Encourage honest self-reflection
- Create deeper emotional connections
- Accelerate the healing process

## Why Anonymity Matters on NOMA

### Breaking Down Barriers
Without the fear of judgment from friends, family, or colleagues, people open up about experiences they've never shared before.

### Finding Universal Connection
When stripped of identity markers, we discover that our struggles are surprisingly universal. The executive and the student, the parent and the teenager — we all share similar fears, hopes, and pain.

### Empowering Vulnerable Voices
For many, NOMA is the first place they've ever felt safe enough to speak about abuse, mental health struggles, or relationship trauma.

## The Responsibility of Anonymity

With great freedom comes great responsibility. NOMA's community thrives because members use anonymity for healing, not harm. We encourage:

- **Authenticity** — Share your real experiences
- **Empathy** — Remember there's a real person behind every post
- **Support** — Offer encouragement, not criticism
- **Respect** — Honor others' stories as sacred

## Your Story Matters

Every experience you share anonymously on NOMA has the potential to help someone else feel less alone. Your words could be the lifeline someone needs today.

*Your mask protected you. Now let it go. Share freely.*
    `,
  },
  'circles-community-guide': {
    slug: 'circles-community-guide',
    title: 'Finding Your Circle: A Guide to NOMA Communities',
    author: 'NOMA Team',
    category: 'community',
    readingTime: 4,
    date: 'January 10, 2025',
    content: `
# Finding Your Circle

NOMA Circles are intimate communities where people with shared experiences connect, support, and heal together.

## Available Circles

### ❤️ Love & Relationships
Navigate the complexities of romantic relationships, heartbreak, and finding love.

### 🧠 Mental Health
A judgment-free zone for discussing depression, anxiety, and emotional wellness.

### 💼 Work & Career
Share the pressures of professional life, burnout, and career uncertainty.

### 🏠 Family & Home
Discuss family dynamics, parenting challenges, and complicated home situations.

### 🧭 Life Direction
For those seeking purpose, facing major decisions, or questioning their path.

### 🔐 Secrets & Confessions
The safest space for things you've never told anyone.

## Circle Etiquette

1. **Listen first** — Sometimes people just need to be heard
2. **Share thoughtfully** — Your words impact real people
3. **Respect privacy** — What's shared in the circle stays in the circle
4. **Support actively** — React, comment, and show you care
5. **Report concerns** — Help us maintain a safe environment

## Creating Connection

Circles aren't just about reading stories — they're about building relationships. Many NOMA members have formed deep friendships through shared experience.

*Find your people. Join your circle. Heal together.*
    `,
  },
  'mental-health-resources': {
    slug: 'mental-health-resources',
    title: 'Mental Health Support & Resources',
    author: 'NOMA Team',
    category: 'mental-health',
    readingTime: 6,
    date: 'January 12, 2025',
    content: `
# Mental Health Support & Resources

While NOMA provides a supportive community, sometimes you need professional help. Here are resources available to you.

## Crisis Resources

### 🆘 If You're in Crisis
- **988 Suicide & Crisis Lifeline**: Call or text 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

### 🚨 Emergency Services
If you're in immediate danger, please call your local emergency services.

## Finding Professional Help

### Therapy & Counseling
- BetterHelp: Online therapy matching
- Talkspace: Text and video therapy
- Open Path Collective: Affordable in-person therapy

### Support Groups
- NAMI: National Alliance on Mental Illness
- DBSA: Depression and Bipolar Support Alliance
- Anxiety and Depression Association of America

## Self-Care Resources

### Apps We Recommend
- Calm: Meditation and sleep
- Headspace: Mindfulness
- Daylio: Mood tracking
- Woebot: AI mental health companion

### Helpful Websites
- MindTools: Coping strategies
- Greater Good Science Center: Evidence-based happiness
- The Mighty: Chronic illness community

## NOMA's Role

We're here to complement — not replace — professional support. Our community offers:
- A space to process emotions
- Connection with those who understand
- Encouragement to seek help when needed

*You deserve support. Reach out today.*
    `,
  },
  'noma-story-features': {
    slug: 'noma-story-features',
    title: 'How to Share Your Story on NOMA',
    author: 'NOMA Team',
    category: 'features',
    readingTime: 4,
    date: 'January 15, 2025',
    content: `
# Sharing Your Story on NOMA

Your story has the power to heal — both yourself and others. Here's how to share effectively.

## Types of Posts

### 📖 Experiences
Share personal stories, moments, and memories. These are the heart of NOMA.

### ❓ Questions
Seek advice or perspective from the community. You're not alone in your confusion.

### 💡 Advice
Offer wisdom from your journey. Your experience can light someone's path.

### 🌊 Release
Pure emotional expression. Sometimes you just need to let it out.

## Writing Tips

### Be Authentic
Don't worry about perfection. Raw, honest expression resonates more than polished prose.

### Provide Context
Help readers understand your situation without over-explaining.

### Express Emotion
Let readers feel what you felt. Vulnerability creates connection.

### Consider Impact
Your words matter. Write something that helps, not harms.

## After Posting

### Reading Reactions
- ❤️ **I Feel This**: Deep emotional resonance
- 🤗 **Not Alone**: Recognition and solidarity  
- 💪 **Sending Strength**: Encouragement and support

### Engaging with Comments
Respond when you're ready. There's no pressure to engage immediately.

### Handling Criticism
Our community is supportive, but if you receive unwanted feedback, report it. You control your experience.

*Your story matters. Share it.*
    `,
  },
  'privacy-and-safety': {
    slug: 'privacy-and-safety',
    title: 'Your Privacy and Safety on NOMA',
    author: 'NOMA Team',
    category: 'features',
    readingTime: 5,
    date: 'January 18, 2025',
    content: `
# Privacy and Safety on NOMA

Your safety is our top priority. Here's how we protect you.

## Identity Protection

### What We Don't Show
- Your real name (unless you choose to share)
- Your email address
- Your location
- Your IP address to other users

### What You Control
- Your username
- What you share
- Who can message you
- Your notification preferences

## Content Moderation

### What We Don't Allow
- Harassment or bullying
- Hate speech
- Self-harm encouragement
- Explicit content
- Spam or commercial content
- Doxxing or privacy violations

### How We Moderate
- AI-powered content screening
- Community reporting
- Human review team
- Swift action on violations

## Your Tools

### Blocking
Block any user to prevent them from seeing your content or contacting you.

### Muting
Mute specific words or topics you don't want to see.

### Reporting
Flag concerning content for our moderation team.

### Privacy Settings
Control who can comment on your posts and send you messages.

## Data Security

- End-to-end encryption for messages
- Secure data storage
- Regular security audits
- No data selling to third parties

*Your safety enables your authenticity. We protect both.*
    `,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogContent[slug];

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="not-found">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="back-link">← Back to Blog</Link>
        </div>
        <style jsx>{`
          .blog-post-page {
            min-height: 100vh;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .not-found {
            text-align: center;
            padding: 2rem;
          }
          .not-found h1 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
          }
          .not-found p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
          }
          .back-link {
            color: var(--accent);
          }
        `}</style>
      </main>
    );
  }

  // Simple markdown-like parsing
  const parseContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={i}>{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i}>{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i}>{line.slice(4)}</h3>;
        }
        // Bold
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <p key={i}>
              {parts.map((part, j) => 
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </p>
          );
        }
        // Italic
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={i} className="italic">{line.slice(1, -1)}</p>;
        }
        // List items
        if (line.startsWith('- ')) {
          return <li key={i}>{line.slice(2)}</li>;
        }
        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          return <li key={i}>{line.replace(/^\d+\.\s/, '')}</li>;
        }
        // Empty lines
        if (line.trim() === '') {
          return <br key={i} />;
        }
        // Regular paragraphs
        return <p key={i}>{line}</p>;
      });
  };

  return (
    <main className="blog-post-page">
      <article className="article">
        <header className="article-header">
          <Link href="/blog" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </Link>
          
          <div className="article-meta">
            <span className="category">{post.category.replace('-', ' ')}</span>
            <span className="dot">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          
          <h1>{post.title}</h1>
          
          <div className="author-info">
            <div className="author-avatar">
              {post.author.charAt(0)}
            </div>
            <div>
              <span className="author-name">{post.author}</span>
              <span className="date">{post.date}</span>
            </div>
          </div>
        </header>

        <div className="article-content">
          {parseContent(post.content)}
        </div>

        <footer className="article-footer">
          <div className="share-section">
            <span>Found this helpful?</span>
            <Link href="/signup" className="share-btn">Join NOMA</Link>
          </div>
          
          <div className="related-links">
            <h4>Continue Reading</h4>
            <div className="links-list">
              {Object.values(blogContent)
                .filter(p => p.slug !== slug)
                .slice(0, 3)
                .map(p => (
                  <Link href={`/blog/${p.slug}`} key={p.slug} className="related-link">
                    {p.title}
                  </Link>
                ))}
            </div>
          </div>
        </footer>
      </article>

      <style jsx>{`
        .blog-post-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 2rem 1rem 4rem;
        }

        .article {
          max-width: 720px;
          margin: 0 auto;
        }

        .article-header {
          margin-bottom: 2.5rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9375rem;
          margin-bottom: 2rem;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--accent);
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .category {
          text-transform: capitalize;
          color: var(--accent);
        }

        .dot {
          opacity: 0.5;
        }

        .article-header h1 {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent), #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
        }

        .author-name {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }

        .date {
          display: block;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .article-content {
          color: var(--text-secondary);
          font-size: 1.0625rem;
          line-height: 1.8;
        }

        .article-content :global(h1) {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 2rem 0 1rem;
        }

        .article-content :global(h2) {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 2rem 0 1rem;
        }

        .article-content :global(h3) {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 1.5rem 0 0.75rem;
        }

        .article-content :global(p) {
          margin-bottom: 1rem;
        }

        .article-content :global(.italic) {
          font-style: italic;
          color: var(--text-muted);
        }

        .article-content :global(li) {
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .article-content :global(strong) {
          font-weight: 600;
          color: var(--text-primary);
        }

        .article-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }

        .share-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 2rem;
        }

        .share-section span {
          color: var(--text-secondary);
        }

        .share-btn {
          padding: 0.5rem 1rem;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .related-links h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .related-link {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          transition: color 0.2s;
        }

        .related-link:hover {
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .blog-post-page {
            padding: 1rem 1rem 3rem;
          }
          
          .article-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
