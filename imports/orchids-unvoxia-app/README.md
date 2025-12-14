# No Mask World (NOMA)

A safe, anonymous healing platform where you can freely express your true feelings, receive emotional support, and find healing without fear of judgement.

**Speak Without Fear. Heal Without Judgement.**

Domain: nomaworld.co.ke
Emails: info@nomaworld.co.ke, support@nomaworld.co.ke, admin@nomaworld.co.ke
Phones: 0701066845 / 0702794172

## Core Values
- **100% Anonymous** - No names, no emails, no IP tracking
- **Compassionate Support** - Community-driven emotional healing
- **Safe Space** - Strictly moderated, zero judgement
- **Always Available** - 24/7 support and sharing

## Key Features
- 🔒 **Anonymous Sharing** - Express your feelings instantly without signup
- 💚 **Healing Circles** - 9 supportive communities (Mental Health, Grief, Anxiety, Depression, etc.)
- 🌟 **Compassionate Responses** - Receive encouragement and emotional support
- 📖 **Private Journal** - Track your healing journey privately
- ✨ **Daily Healing Prompts** - Guided reflection questions
- 🎬 **Healing Stories** - Inspiration and hope from others' journeys
- 🛡️ **Safety First** - Active moderation and crisis resources
- 👤 **No User Tracking** - Complete privacy protection

## Routes
### Public Pages
- `/` - Landing page with hero, features, stats, testimonials
- `/share` - Anonymous sharing page (no login required)
- `/heal` - View posts with compassionate responses
- `/circles` - Browse all 9 healing circles
- `/circles/[circleId]` - Individual healing circle pages
- `/journal` - Private journal (localStorage)
- `/stories` - Healing stories and inspiration
- `/daily-prompts` - Daily reflection questions
- `/about` - Mission and values
- `/safety` - Crisis resources and safety guidelines
- `/faq` - Frequently asked questions
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Auth Pages (Optional)
- `/signup`, `/login` - Optional account creation
- `/forgot-password`, `/reset-password` - Password recovery

## API Endpoints
### Anonymous Sharing
- `POST /api/share` - Create anonymous post
- `GET /api/heal` - Get posts with compassionate responses
- `POST /api/heal` - Add compassionate response

### Healing Circles
- `GET /api/circles/[circleId]/posts` - Get circle posts
- `POST /api/circles/[circleId]/posts` - Create circle post

### Admin (Protected)
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/prompts` - Manage daily prompts
- `GET /api/admin/flagged` - Flagged content review
- `GET /api/admin/users` - User management

### Utility
- `GET /api/health` - Health check
- `POST /api/test-email` - Email configuration test

## Database Schema (Turso/LibSQL)
```sql
-- Anonymous posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  emotion TEXT,
  anonymous_label TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Healing circles posts
CREATE TABLE circle_posts (
  id TEXT PRIMARY KEY,
  circle_id TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT CHECK(post_type IN ('story', 'question', 'support')),
  anonymous_label TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Circle support reactions
CREATE TABLE circle_support_reactions (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  reaction_type TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES circle_posts(id)
);

-- Circle comments
CREATE TABLE circle_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  anonymous_label TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (post_id) REFERENCES circle_posts(id)
);

-- Flagged content
CREATE TABLE circle_flags (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (post_id) REFERENCES circle_posts(id)
);
```

## Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env.local` with:
   ```env
   # Turso Database
   TURSO_DATABASE_URL=libsql://your-database.turso.io
   TURSO_AUTH_TOKEN=your-auth-token

   # Email Configuration (Optional)
   SMTP_HOST=mail.nomaworld.co.ke
   SMTP_PORT=587
   SMTP_USER=noreply@nomaworld.co.ke
   SMTP_PASS=your-smtp-password
   SMTP_EMAIL_NOREPLY=noreply@nomaworld.co.ke
   SMTP_EMAIL_INFO=info@nomaworld.co.ke
   SMTP_EMAIL_SUPPORT=support@nomaworld.co.ke
   SMTP_DEFAULT_SENDER=noreply@nomaworld.co.ke
   SMTP_REPLY_TO=support@nomaworld.co.ke
   ```

3. **Database Setup**
   Run the SQL schema from `turso-schema.sql` in your Turso database.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Technology Stack
- **Framework**: Next.js 16.0.10 with App Router
- **Language**: TypeScript
- **Database**: Turso (LibSQL)
- **Styling**: Inline CSS-in-JS (no external frameworks)
- **Email**: Nodemailer with SMTP
- **Deployment**: Vercel

## Healing Circles
1. **Mental Health Support** - Depression, anxiety, stress management
2. **Grief & Loss** - Bereavement, healing from loss
3. **Relationship Challenges** - Heartbreak, family issues
4. **Life Transitions** - Major changes, uncertainty
5. **Identity & Self-Worth** - Self-discovery, confidence
6. **Trauma & Recovery** - Healing from past pain
7. **Loneliness & Connection** - Finding belonging
8. **Hope & Inspiration** - Positive stories, motivation
9. **General Support** - Any emotional challenge

## Safety & Moderation
- Active content moderation
- Community guidelines enforcement
- Crisis resource links on every page
- Flag/report system for inappropriate content
- Contact information for professional help

## SEO & Discovery
- Comprehensive meta tags and Open Graph
- Dynamic sitemap.xml
- Structured data (JSON-LD schemas)
- Trust pages (About, Safety, FAQ)
- Mobile-optimized and accessible

## License
Proprietary - © 2025 NOMA (No Mask World)

## Contact
- Email: info@nomaworld.co.ke, support@nomaworld.co.ke
- Phone: 0701066845, 0702794172
- Website: nomaworld.co.ke
     read boolean default false
   );

   create table daily_prompts (
## License
Proprietary - © 2025 NOMA (No Mask World)

## Contact
- Email: info@nomaworld.co.ke, support@nomaworld.co.ke
- Phone: 0701066845, 0702794172
- Website: nomaworld.co.ke
