-- ============================================
-- NOMA DATABASE SCHEMA FOR TURSO (SQLite)
-- TikTok-style anonymous text platform
-- ============================================

-- ============================================
-- 1. USERS (Anonymous Accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT,
    bio TEXT DEFAULT '',
    avatar_icon TEXT DEFAULT 'default',
    is_active INTEGER DEFAULT 1,
    allow_messages INTEGER DEFAULT 1,
    allow_comments INTEGER DEFAULT 1,
    content_sensitivity TEXT DEFAULT 'standard',
    notification_settings TEXT DEFAULT '{"reactions":true,"comments":true,"follows":true,"messages":true}',
    email_verified INTEGER DEFAULT 0,
    verification_token TEXT,
    reset_token TEXT,
    reset_token_expires TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- 2. POSTS (Text Reels)
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type TEXT CHECK (post_type IN ('experience', 'question', 'advice', 'release')) DEFAULT 'experience',
    allow_comments INTEGER DEFAULT 1,
    is_anonymous INTEGER DEFAULT 1,
    view_count INTEGER DEFAULT 0,
    reaction_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(post_type);

-- ============================================
-- 3. TAGS (Hashtags/Topics)
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    usage_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS post_tags (
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);

-- ============================================
-- 4. FOLLOWS (Anonymous Following)
-- ============================================
CREATE TABLE IF NOT EXISTS follows (
    follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- ============================================
-- 5. REACTIONS ("I Feel This")
-- ============================================
CREATE TABLE IF NOT EXISTS reactions (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    reaction_type TEXT CHECK (reaction_type IN ('feel_this', 'not_alone', 'strength')) DEFAULT 'feel_this',
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user ON reactions(user_id);

-- ============================================
-- 6. COMMENTS (Supportive Replies)
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_pinned INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);

-- ============================================
-- 7. SAVED POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS saved_posts (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_user ON saved_posts(user_id);

-- ============================================
-- 8. MESSAGE REQUESTS (Consent-Based)
-- ============================================
CREATE TABLE IF NOT EXISTS message_requests (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_msg_req_receiver ON message_requests(receiver_id, status);

-- ============================================
-- 9. MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);

-- ============================================
-- 10. NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    reference_id TEXT,
    actor_id TEXT REFERENCES users(id),
    message TEXT,
    is_read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- ============================================
-- 11. REPORTS (Safety)
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    reporter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
    comment_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')) DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================
-- 12. BLOCKED USERS
-- ============================================
CREATE TABLE IF NOT EXISTS blocked_users (
    blocker_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (blocker_id, blocked_id)
);

-- ============================================
-- 13. MUTED WORDS/TOPICS
-- ============================================
CREATE TABLE IF NOT EXISTS muted_words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    word TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_muted_user ON muted_words(user_id);

-- ============================================
-- 14. CIRCLES (Community Topics)
-- ============================================
CREATE TABLE IF NOT EXISTS circles (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'heart',
    member_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS circle_members (
    circle_id TEXT NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (circle_id, user_id)
);

CREATE TABLE IF NOT EXISTS circle_posts (
    circle_id TEXT NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    PRIMARY KEY (circle_id, post_id)
);

-- ============================================
-- 15. USER INTERESTS (For Algorithm)
-- ============================================
CREATE TABLE IF NOT EXISTS user_interests (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    weight REAL DEFAULT 1.0,
    PRIMARY KEY (user_id, tag_id)
);

-- ============================================
-- 16. POST INTERACTIONS (Algorithm Signals)
-- ============================================
CREATE TABLE IF NOT EXISTS post_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    interaction_type TEXT CHECK (interaction_type IN ('view', 'scroll_pause', 'read_full', 'share')),
    duration_seconds INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_interactions_post ON post_interactions(post_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user ON post_interactions(user_id);

-- ============================================
-- SEED DATA: Default Tags
-- ============================================
INSERT OR IGNORE INTO tags (name) VALUES
    ('love'),
    ('relationships'),
    ('depression'),
    ('anxiety'),
    ('work'),
    ('family'),
    ('loneliness'),
    ('healing'),
    ('selfcare'),
    ('burnout'),
    ('marriage'),
    ('friendship'),
    ('grief'),
    ('trauma'),
    ('hope'),
    ('growth'),
    ('secrets'),
    ('discrimination'),
    ('identity'),
    ('parenting');

-- ============================================
-- SEED DATA: Default Circles
-- ============================================
INSERT OR IGNORE INTO circles (id, name, description, icon) VALUES
    ('circle-love', 'Love & Relationships', 'Matters of the heart', 'heart'),
    ('circle-mental', 'Mental Health', 'Depression, anxiety, and healing', 'brain'),
    ('circle-work', 'Work & Career', 'Job stress, burnout, and growth', 'briefcase'),
    ('circle-family', 'Family & Home', 'Parents, siblings, and family dynamics', 'home'),
    ('circle-life', 'Life Direction', 'Finding purpose and meaning', 'compass'),
    ('circle-secrets', 'Secrets & Confessions', 'Things you have never told anyone', 'lock');
