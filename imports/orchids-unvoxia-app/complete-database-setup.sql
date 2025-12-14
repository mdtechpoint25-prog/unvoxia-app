-- ============================================
-- NOMA COMPLETE DATABASE SCHEMA FOR TURSO
-- Run ALL these queries in your Turso database
-- ============================================

-- =====================================================
-- USERS TABLE
-- Core user accounts
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  streak_count INTEGER DEFAULT 0,
  last_prompt_date TEXT,
  notification_settings TEXT DEFAULT '{"email":true,"push":true,"messages":true}',
  email_verified INTEGER DEFAULT 0,
  verification_token TEXT,
  reset_token TEXT,
  reset_token_expires TEXT,
  otp_code TEXT,
  otp_expires TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- =====================================================
-- POSTS TABLE
-- User posts in the feed
-- =====================================================
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  category TEXT DEFAULT 'Thoughts',
  is_anonymous INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  reactions TEXT DEFAULT '{}',
  comments_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);

-- =====================================================
-- COMMENTS TABLE
-- Comments on posts
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  parent_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  reactions TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

-- =====================================================
-- REACTIONS TABLE
-- Reactions/likes on posts
-- =====================================================
CREATE TABLE IF NOT EXISTS reactions (
  id TEXT PRIMARY KEY,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(post_id, user_id, emoji)
);

CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user ON reactions(user_id);

-- =====================================================
-- MESSAGES TABLE
-- Private messages between users
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  receiver_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  is_anonymous INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  read INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- =====================================================
-- CHAT REQUESTS TABLE
-- Consent-based messaging requests
-- =====================================================
CREATE TABLE IF NOT EXISTS chat_requests (
  id TEXT PRIMARY KEY,
  requester_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  receiver_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_requests_requester ON chat_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_chat_requests_receiver ON chat_requests(receiver_id);
CREATE INDEX IF NOT EXISTS idx_chat_requests_status ON chat_requests(status);

-- =====================================================
-- NOTIFICATIONS TABLE
-- User notifications
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data TEXT,
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- =====================================================
-- DAILY PROMPTS TABLE
-- Daily reflection prompts
-- =====================================================
CREATE TABLE IF NOT EXISTS daily_prompts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT,
  feelings_score INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_daily_prompts_user ON daily_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_prompts_created ON daily_prompts(created_at);

-- =====================================================
-- FLAGGED POSTS TABLE
-- Reports on inappropriate posts
-- =====================================================
CREATE TABLE IF NOT EXISTS flagged_posts (
  id TEXT PRIMARY KEY,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  reporter_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_flagged_posts_status ON flagged_posts(status);
CREATE INDEX IF NOT EXISTS idx_flagged_posts_post ON flagged_posts(post_id);

-- =====================================================
-- STORIES TABLE
-- User-submitted anonymous stories
-- =====================================================
CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  emoji TEXT DEFAULT '💭',
  anonymous_name TEXT DEFAULT 'Anonymous',
  user_id TEXT,
  is_anonymous INTEGER DEFAULT 1,
  status TEXT DEFAULT 'published',
  views INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  is_trending INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_stories_trending ON stories(is_trending);

-- =====================================================
-- STORY TAGS TABLE
-- Tags for stories
-- =====================================================
CREATE TABLE IF NOT EXISTS story_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  tag TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_story_tags_story ON story_tags(story_id);
CREATE INDEX IF NOT EXISTS idx_story_tags_tag ON story_tags(tag);

-- =====================================================
-- STORY REACTIONS TABLE
-- Reactions on stories
-- =====================================================
CREATE TABLE IF NOT EXISTS story_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  reaction_type TEXT DEFAULT 'heart',
  user_id TEXT,
  session_id TEXT,
  ip_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_story_reactions_story ON story_reactions(story_id);
CREATE INDEX IF NOT EXISTS idx_story_reactions_session ON story_reactions(session_id);

-- =====================================================
-- STORY COMMENTS TABLE
-- Comments on stories
-- =====================================================
CREATE TABLE IF NOT EXISTS story_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  parent_id INTEGER,
  content TEXT NOT NULL,
  anonymous_name TEXT DEFAULT 'Compassionate Soul',
  user_id TEXT,
  session_id TEXT,
  status TEXT DEFAULT 'published',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES story_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_story_comments_story ON story_comments(story_id);
CREATE INDEX IF NOT EXISTS idx_story_comments_parent ON story_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_story_comments_status ON story_comments(status);

-- =====================================================
-- COMMENT REACTIONS TABLE
-- Reactions on story comments
-- =====================================================
CREATE TABLE IF NOT EXISTS comment_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  reaction_type TEXT DEFAULT 'heart',
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES story_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comment_reactions_comment ON comment_reactions(comment_id);

-- =====================================================
-- STORY SHARES TABLE
-- Track story shares
-- =====================================================
CREATE TABLE IF NOT EXISTS story_shares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  platform TEXT,
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_story_shares_story ON story_shares(story_id);

-- =====================================================
-- CATEGORIES TABLE
-- Story categories
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  description TEXT,
  story_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT OR IGNORE INTO categories (id, name, emoji, description) VALUES
  ('love-relationships', 'Love & Relationships', '💔', 'Stories about love, heartbreak, and relationships'),
  ('mental-health', 'Mental Health', '🧠', 'Stories about mental health struggles and recovery'),
  ('marriage-family', 'Marriage & Family', '💍', 'Stories about marriage, parenting, and family dynamics'),
  ('job-stress', 'Jobs & Career', '💼', 'Stories about work stress, job loss, and career challenges'),
  ('home-trauma', 'Family Trauma', '🏠', 'Stories about childhood trauma and family issues'),
  ('loneliness', 'Loneliness', '😔', 'Stories about feeling alone and isolated'),
  ('secrets', 'Confessions', '🔒', 'Anonymous confessions and secrets'),
  ('healing-growth', 'Healing & Growth', '🌱', 'Stories about personal growth and healing journeys'),
  ('health', 'Health Struggles', '🩺', 'Stories about physical health challenges'),
  ('other', 'Other', '💭', 'Other stories that don''t fit categories');

-- =====================================================
-- ANONYMOUS NAMES TABLE
-- Pool of anonymous display names
-- =====================================================
CREATE TABLE IF NOT EXISTS anonymous_names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO anonymous_names (name) VALUES
  ('Healing Soul'),
  ('Rising Phoenix'),
  ('Silent Strength'),
  ('Brave Heart'),
  ('Gentle Spirit'),
  ('Quiet Warrior'),
  ('Hopeful Heart'),
  ('Seeking Light'),
  ('Finding Peace'),
  ('Growing Stronger'),
  ('Inner Light'),
  ('Peaceful Mind'),
  ('Courageous One'),
  ('Tender Heart'),
  ('Wise Soul'),
  ('Patient Spirit'),
  ('Resilient Heart'),
  ('Kind Soul'),
  ('Humble Heart'),
  ('Grateful Spirit'),
  ('Compassionate Soul'),
  ('Understanding Heart'),
  ('Loving Spirit'),
  ('Caring Soul'),
  ('Supportive Heart'),
  ('Empathetic Spirit'),
  ('Thoughtful Soul'),
  ('Mindful Heart'),
  ('Present Moment'),
  ('New Beginning');

-- =====================================================
-- CONTENT REPORTS TABLE
-- Reports on inappropriate content
-- =====================================================
CREATE TABLE IF NOT EXISTS content_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT NOT NULL,
  content_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  reporter_session TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_reports_type ON content_reports(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON content_reports(status);

-- =====================================================
-- CIRCLE POSTS TABLE
-- Posts in healing circles
-- =====================================================
CREATE TABLE IF NOT EXISTS circle_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  circle_id TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'experience',
  anonymous_label TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_circle_posts_circle ON circle_posts(circle_id);
CREATE INDEX IF NOT EXISTS idx_circle_posts_created ON circle_posts(created_at DESC);

-- =====================================================
-- CIRCLE SUPPORT REACTIONS TABLE
-- Supportive reactions in circles
-- =====================================================
CREATE TABLE IF NOT EXISTS circle_support_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  reaction_type TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES circle_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_circle_reactions_post ON circle_support_reactions(post_id);

-- =====================================================
-- CIRCLE COMMENTS TABLE
-- Comments in healing circles
-- =====================================================
CREATE TABLE IF NOT EXISTS circle_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  anonymous_label TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES circle_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_circle_comments_post ON circle_comments(post_id);

-- =====================================================
-- CIRCLE FLAGS TABLE
-- Flags for harmful content in circles
-- =====================================================
CREATE TABLE IF NOT EXISTS circle_flags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  comment_id INTEGER,
  reason TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_circle_flags_post ON circle_flags(post_id);

-- =====================================================
-- HEAL CONVERSATIONS TABLE
-- AI healing conversations
-- =====================================================
CREATE TABLE IF NOT EXISTS heal_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  mood TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_heal_conversations_session ON heal_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_heal_conversations_created ON heal_conversations(created_at);

-- =====================================================
-- JOURNAL ENTRIES TABLE
-- Personal journal entries
-- =====================================================
CREATE TABLE IF NOT EXISTS journal_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  session_id TEXT,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_journal_user ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_session ON journal_entries(session_id);
CREATE INDEX IF NOT EXISTS idx_journal_created ON journal_entries(created_at);

-- =====================================================
-- ADMIN PROMPTS TABLE
-- Admin-managed daily prompts
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt_text TEXT NOT NULL,
  category TEXT DEFAULT 'reflection',
  is_active INTEGER DEFAULT 1,
  display_date TEXT,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_prompts_active ON admin_prompts(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_prompts_date ON admin_prompts(display_date);

-- =====================================================
-- USER WARNINGS TABLE
-- Admin warnings to users
-- =====================================================
CREATE TABLE IF NOT EXISTS user_warnings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  issued_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_warnings_user ON user_warnings(user_id);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Run this to verify all tables were created:
-- SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
