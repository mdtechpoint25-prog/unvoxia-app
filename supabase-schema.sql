-- ============================================
-- No Mask World (NOMA) - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING TABLES (if re-running)
-- ============================================
DROP TABLE IF EXISTS reactions CASCADE;
DROP TABLE IF EXISTS daily_prompts CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  badges JSONB DEFAULT '[]',
  notification_settings JSONB DEFAULT '{"email": true, "push": true}',
  email_verified BOOLEAN DEFAULT FALSE,
  otp_code TEXT,
  otp_expiry TIMESTAMPTZ,
  reset_token TEXT,
  reset_expiry TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  category TEXT DEFAULT 'Productivity',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reactions JSONB DEFAULT '{}',
  comments_count INT DEFAULT 0
);

-- ============================================
-- COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reactions JSONB DEFAULT '{}'
);

-- ============================================
-- MESSAGES TABLE
-- ============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- ============================================
-- DAILY PROMPTS TABLE
-- ============================================
CREATE TABLE daily_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REACTIONS TABLE
-- ============================================
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(target_type, target_id, user_id, emoji)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_reactions_target ON reactions(target_type, target_id);
CREATE INDEX idx_daily_prompts_user_id ON daily_prompts(user_id);

-- ============================================
-- DISABLE RLS FOR CUSTOM AUTH
-- (Using service_role key bypasses RLS anyway)
-- ============================================
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_prompts DISABLE ROW LEVEL SECURITY;
ALTER TABLE reactions DISABLE ROW LEVEL SECURITY;

-- ============================================
-- FUNCTION: Update comments count
-- ============================================
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: Auto-update comments count
-- ============================================
DROP TRIGGER IF EXISTS trigger_update_comments_count ON comments;
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comments_count();

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================
-- Sample prompts
INSERT INTO daily_prompts (prompt, user_id, response) VALUES
  ('What is one thing you want to accomplish today?', NULL, NULL),
  ('Describe a challenge you overcame recently.', NULL, NULL),
  ('What are you grateful for right now?', NULL, NULL),
  ('What skill would you like to develop this month?', NULL, NULL),
  ('How do you stay focused during difficult tasks?', NULL, NULL)
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION: Check tables exist
-- ============================================
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('users', 'posts', 'comments', 'messages', 'daily_prompts', 'reactions')
ORDER BY table_name;
