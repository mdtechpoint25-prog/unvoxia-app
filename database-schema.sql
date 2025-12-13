-- NOMA Database Schema for Stories, Comments, and Reactions
-- Run these queries in your Turso database

-- =====================================================
-- STORIES TABLE
-- Stores all user-submitted stories
-- =====================================================
CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE, -- URL-friendly slug for SEO
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  emoji TEXT DEFAULT '💭',
  anonymous_name TEXT DEFAULT 'Anonymous',
  user_id TEXT, -- Optional: if user is logged in
  is_anonymous INTEGER DEFAULT 1,
  status TEXT DEFAULT 'published', -- 'draft', 'published', 'pending', 'flagged', 'removed'
  views INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  is_trending INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(is_featured);

-- =====================================================
-- STORY TAGS TABLE
-- Tags associated with stories for better discovery
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
-- REACTIONS TABLE
-- Stores likes/reactions on stories
-- =====================================================
CREATE TABLE IF NOT EXISTS story_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  reaction_type TEXT DEFAULT 'heart', -- 'heart', 'hug', 'support', 'relate', 'pray'
  user_id TEXT, -- Optional: for logged in users
  session_id TEXT, -- For anonymous users (browser fingerprint/session)
  ip_hash TEXT, -- Hashed IP for rate limiting
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reactions_story ON story_reactions(story_id);
CREATE INDEX IF NOT EXISTS idx_reactions_session ON story_reactions(session_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_reactions_unique ON story_reactions(story_id, session_id, reaction_type);

-- =====================================================
-- COMMENTS TABLE
-- Comments on stories
-- =====================================================
CREATE TABLE IF NOT EXISTS story_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  parent_id INTEGER, -- For nested replies
  content TEXT NOT NULL,
  anonymous_name TEXT DEFAULT 'Compassionate Soul',
  user_id TEXT, -- Optional: for logged in users
  session_id TEXT,
  status TEXT DEFAULT 'published', -- 'published', 'pending', 'flagged', 'removed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES story_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_story ON story_comments(story_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON story_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON story_comments(status);

-- =====================================================
-- COMMENT REACTIONS TABLE
-- Likes on comments
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
CREATE UNIQUE INDEX IF NOT EXISTS idx_comment_reactions_unique ON comment_reactions(comment_id, session_id);

-- =====================================================
-- STORY SHARES TABLE
-- Track story shares
-- =====================================================
CREATE TABLE IF NOT EXISTS story_shares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  platform TEXT, -- 'copy', 'twitter', 'facebook', 'whatsapp'
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_shares_story ON story_shares(story_id);

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
-- Pool of anonymous names for users
-- =====================================================
CREATE TABLE IF NOT EXISTS anonymous_names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Insert pool of anonymous names
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
-- REPORTS TABLE
-- For reporting inappropriate content
-- =====================================================
CREATE TABLE IF NOT EXISTS content_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT NOT NULL, -- 'story' or 'comment'
  content_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  reporter_session TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'actioned', 'dismissed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_content ON content_reports(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON content_reports(status);

-- =====================================================
-- VIEW: Story with stats
-- =====================================================
CREATE VIEW IF NOT EXISTS stories_with_stats AS
SELECT 
  s.*,
  COALESCE(r.reaction_count, 0) as reaction_count,
  COALESCE(c.comment_count, 0) as comment_count,
  COALESCE(sh.share_count, 0) as share_count
FROM stories s
LEFT JOIN (
  SELECT story_id, COUNT(*) as reaction_count 
  FROM story_reactions 
  GROUP BY story_id
) r ON s.id = r.story_id
LEFT JOIN (
  SELECT story_id, COUNT(*) as comment_count 
  FROM story_comments 
  WHERE status = 'published'
  GROUP BY story_id
) c ON s.id = c.story_id
LEFT JOIN (
  SELECT story_id, COUNT(*) as share_count 
  FROM story_shares 
  GROUP BY story_id
) sh ON s.id = sh.story_id;

-- =====================================================
-- TRIGGER: Update story updated_at on modification
-- =====================================================
CREATE TRIGGER IF NOT EXISTS update_story_timestamp 
AFTER UPDATE ON stories
BEGIN
  UPDATE stories SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- =====================================================
-- TRIGGER: Update category story count
-- =====================================================
CREATE TRIGGER IF NOT EXISTS update_category_count_insert
AFTER INSERT ON stories
WHEN NEW.status = 'published'
BEGIN
  UPDATE categories SET story_count = story_count + 1 WHERE id = NEW.category_id;
END;

CREATE TRIGGER IF NOT EXISTS update_category_count_delete
AFTER DELETE ON stories
BEGIN
  UPDATE categories SET story_count = story_count - 1 WHERE id = OLD.category_id;
END;
