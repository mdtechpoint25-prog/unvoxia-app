-- No Mask World (NOMA) - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  badges JSONB DEFAULT '[]',
  notification_settings JSONB DEFAULT '{"email": true, "push": true}',
  email_verified BOOLEAN DEFAULT FALSE,
  otp_code TEXT,
  otp_expiry TIMESTAMP,
  reset_token TEXT,
  reset_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  category TEXT DEFAULT 'Productivity',
  created_at TIMESTAMP DEFAULT NOW(),
  reactions JSONB DEFAULT '{}',
  comments_count INT DEFAULT 0
);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  reactions JSONB DEFAULT '{}'
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Daily Prompts Table
CREATE TABLE IF NOT EXISTS daily_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  response TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reactions Table
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_type TEXT NOT NULL, -- 'post' or 'comment'
  target_id UUID NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(target_type, target_id, user_id, emoji)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reactions_target ON reactions(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_daily_prompts_user_id ON daily_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_prompts_created_at ON daily_prompts(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can read public profile data
CREATE POLICY "Public profiles are viewable by everyone" ON users
  FOR SELECT USING (true);

-- Users: Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Posts: Anyone can read posts
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

-- Posts: Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (true);

-- Posts: Users can update their own posts
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Posts: Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Comments: Anyone can read comments
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

-- Comments: Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Messages: Users can read their own messages
CREATE POLICY "Users can read own messages" ON messages
  FOR SELECT USING (
    auth.uid()::text = sender_id::text OR 
    auth.uid()::text = receiver_id::text
  );

-- Messages: Authenticated users can send messages
CREATE POLICY "Authenticated users can send messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Daily Prompts: Users can read their own prompts
CREATE POLICY "Users can read own prompts" ON daily_prompts
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Daily Prompts: Authenticated users can create prompts
CREATE POLICY "Authenticated users can create prompts" ON daily_prompts
  FOR INSERT WITH CHECK (true);

-- Reactions: Anyone can read reactions
CREATE POLICY "Reactions are viewable by everyone" ON reactions
  FOR SELECT USING (true);

-- Reactions: Authenticated users can manage reactions
CREATE POLICY "Authenticated users can manage reactions" ON reactions
  FOR ALL USING (true);

-- Function to update comments_count on posts
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for comments count
DROP TRIGGER IF EXISTS trigger_update_comments_count ON comments;
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comments_count();

-- Sample daily prompts (optional)
INSERT INTO daily_prompts (prompt, user_id, response) VALUES
  ('What is one thing you want to accomplish today?', NULL, NULL),
  ('Describe a challenge you overcame recently.', NULL, NULL),
  ('What are you grateful for right now?', NULL, NULL),
  ('What skill would you like to develop this month?', NULL, NULL),
  ('How do you stay focused during difficult tasks?', NULL, NULL)
ON CONFLICT DO NOTHING;
