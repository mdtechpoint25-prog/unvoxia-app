-- Healing Circles Schema
-- Add this to your database

-- Circle posts table (anonymous community posts)
CREATE TABLE IF NOT EXISTS circle_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  circle_id TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'experience', -- experience, advice, release
  anonymous_label TEXT NOT NULL, -- Random anonymous identity
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_circle_posts_circle_id ON circle_posts(circle_id);
CREATE INDEX IF NOT EXISTS idx_circle_posts_created_at ON circle_posts(created_at DESC);

-- Support reactions (not likes)
CREATE TABLE IF NOT EXISTS circle_support_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  reaction_type TEXT NOT NULL, -- hear-you, not-alone, thank-you, sending-love, stay-strong
  created_at DATETIME NOT NULL,
  FOREIGN KEY (post_id) REFERENCES circle_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_support_reactions_post_id ON circle_support_reactions(post_id);

-- Circle comments (supportive responses only)
CREATE TABLE IF NOT EXISTS circle_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  anonymous_label TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (post_id) REFERENCES circle_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_circle_comments_post_id ON circle_comments(post_id);

-- Flags for harmful content
CREATE TABLE IF NOT EXISTS circle_flags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  comment_id INTEGER,
  reason TEXT NOT NULL,
  created_at DATETIME NOT NULL
);
