-- ============================================
-- No Mask World (NOMA) - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING TABLES (if re-running)
-- ============================================
DROP TABLE IF EXISTS flagged_posts CASCADE;
DROP TABLE IF EXISTS chat_requests CASCADE;
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
  bio TEXT,
  badges JSONB DEFAULT '[]',
  streak_count INT DEFAULT 0,
  last_prompt_date DATE,
  notification_settings JSONB DEFAULT '{"email": true, "push": true}',
  email_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active', -- active, muted, banned
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
  category TEXT DEFAULT 'Thoughts',
  is_anonymous BOOLEAN DEFAULT FALSE,
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
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- ============================================
-- CHAT REQUESTS TABLE (Consent System)
-- ============================================
CREATE TABLE chat_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, accepted, declined
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  UNIQUE(requester_id, recipient_id)
);

-- ============================================
-- DAILY PROMPTS TABLE
-- ============================================
CREATE TABLE daily_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  response TEXT,
  feelings_score INT CHECK (feelings_score >= 1 AND feelings_score <= 5),
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
  emoji TEXT NOT NULL, -- like, support, relate, inspire
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(target_type, target_id, user_id, emoji)
);

-- ============================================
-- FLAGGED POSTS TABLE (Admin Moderation)
-- ============================================
CREATE TABLE flagged_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, reviewed, dismissed, actioned
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id)
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- reaction, comment, chat_request, badge, system
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_is_anonymous ON posts(is_anonymous);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_reactions_target ON reactions(target_type, target_id);
CREATE INDEX idx_daily_prompts_user_id ON daily_prompts(user_id);
CREATE INDEX idx_chat_requests_requester ON chat_requests(requester_id);
CREATE INDEX idx_chat_requests_recipient ON chat_requests(recipient_id);
CREATE INDEX idx_chat_requests_status ON chat_requests(status);
CREATE INDEX idx_flagged_posts_status ON flagged_posts(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

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
ALTER TABLE chat_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE flagged_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

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
-- FUNCTION: Update user streak
-- ============================================
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  current_streak INT;
BEGIN
  SELECT last_prompt_date, streak_count INTO last_date, current_streak
  FROM users WHERE id = NEW.user_id;
  
  IF last_date IS NULL OR last_date < CURRENT_DATE - 1 THEN
    -- Reset streak if missed a day
    UPDATE users SET streak_count = 1, last_prompt_date = CURRENT_DATE WHERE id = NEW.user_id;
  ELSIF last_date = CURRENT_DATE - 1 THEN
    -- Continue streak
    UPDATE users SET streak_count = streak_count + 1, last_prompt_date = CURRENT_DATE WHERE id = NEW.user_id;
  ELSIF last_date < CURRENT_DATE THEN
    -- Same day, no change needed but update date
    UPDATE users SET last_prompt_date = CURRENT_DATE WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================
DROP TRIGGER IF EXISTS trigger_update_comments_count ON comments;
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comments_count();

DROP TRIGGER IF EXISTS trigger_update_user_streak ON daily_prompts;
CREATE TRIGGER trigger_update_user_streak
  AFTER INSERT ON daily_prompts
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL AND NEW.response IS NOT NULL)
  EXECUTE FUNCTION update_user_streak();

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================
-- Sample prompts
INSERT INTO daily_prompts (prompt, user_id, response) VALUES
  ('What is one fear you would like to release today?', NULL, NULL),
  ('List three things that brought you joy this week.', NULL, NULL),
  ('What small goal can you set for yourself today?', NULL, NULL),
  ('Write a message of hope to someone who might be struggling.', NULL, NULL),
  ('What are you grateful for right now?', NULL, NULL),
  ('Describe a moment when you felt proud of yourself.', NULL, NULL),
  ('What would you tell your younger self?', NULL, NULL),
  ('What is one thing you learned about yourself recently?', NULL, NULL),
  ('What does self-care mean to you?', NULL, NULL),
  ('Write about a time you overcame a challenge.', NULL, NULL),
  ('What gives you hope for the future?', NULL, NULL),
  ('What is something you need to forgive yourself for?', NULL, NULL),
  ('Who has had a positive impact on your life?', NULL, NULL),
  ('What would make today a good day?', NULL, NULL)
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
  AND table_name IN ('users', 'posts', 'comments', 'messages', 'daily_prompts', 'reactions', 'chat_requests', 'flagged_posts', 'notifications')
ORDER BY table_name;
