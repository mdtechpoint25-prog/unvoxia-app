-- ============================================
-- NOMA DATABASE SCHEMA FOR SUPABASE (PostgreSQL)
-- TikTok-style anonymous text platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS (Anonymous Profiles)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    bio TEXT DEFAULT '',
    avatar_icon TEXT DEFAULT 'default',
    is_active BOOLEAN DEFAULT TRUE,
    allow_messages BOOLEAN DEFAULT TRUE,
    allow_comments BOOLEAN DEFAULT TRUE,
    content_sensitivity TEXT DEFAULT 'standard' CHECK (content_sensitivity IN ('standard', 'sensitive', 'strict')),
    notification_settings JSONB DEFAULT '{"reactions":true,"comments":true,"follows":true,"messages":true}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. POSTS (Text Reels)
-- ============================================
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(content) <= 1500),
    post_type TEXT DEFAULT 'experience' CHECK (post_type IN ('experience', 'question', 'advice', 'release')),
    allow_comments BOOLEAN DEFAULT TRUE,
    is_anonymous BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    reaction_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON public.posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_feed ON public.posts(created_at DESC, reaction_count DESC) WHERE is_flagged = FALSE;

-- RLS Policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view non-flagged posts" ON public.posts
    FOR SELECT USING (is_flagged = FALSE);

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 3. TAGS
-- ============================================
CREATE TABLE IF NOT EXISTS public.tags (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    usage_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.post_tags (
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_post_tags_post ON public.post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON public.post_tags(tag_id);

-- RLS
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Anyone can view post_tags" ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "Users can add post_tags" ON public.post_tags FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.posts WHERE id = post_id AND user_id = auth.uid())
);

-- ============================================
-- 4. FOLLOWS
-- ============================================
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id != following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON public.follows(following_id);

-- RLS
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- ============================================
-- 5. REACTIONS ("I Feel This")
-- ============================================
CREATE TABLE IF NOT EXISTS public.reactions (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    reaction_type TEXT DEFAULT 'feel_this' CHECK (reaction_type IN ('feel_this', 'not_alone', 'strength')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_reactions_post ON public.reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user ON public.reactions(user_id);

-- RLS
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reactions" ON public.reactions FOR SELECT USING (true);
CREATE POLICY "Users can react" ON public.reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unreact" ON public.reactions FOR DELETE USING (auth.uid() = user_id);

-- Trigger to update post reaction count
CREATE OR REPLACE FUNCTION update_post_reaction_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts SET reaction_count = reaction_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts SET reaction_count = reaction_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_reaction_count
AFTER INSERT OR DELETE ON public.reactions
FOR EACH ROW EXECUTE FUNCTION update_post_reaction_count();

-- ============================================
-- 6. COMMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(content) <= 500),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON public.comments(user_id);

-- RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view non-flagged comments" ON public.comments
    FOR SELECT USING (is_flagged = FALSE);

CREATE POLICY "Users can comment" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON public.comments
    FOR DELETE USING (auth.uid() = user_id);

-- Trigger to update post comment count
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_comment_count
AFTER INSERT OR DELETE ON public.comments
FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();

-- ============================================
-- 7. SAVED POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.saved_posts (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_user ON public.saved_posts(user_id);

-- RLS
ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved posts" ON public.saved_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save posts" ON public.saved_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave posts" ON public.saved_posts
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 8. MESSAGE REQUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.message_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sender_id, receiver_id)
);

CREATE INDEX IF NOT EXISTS idx_msg_req_receiver ON public.message_requests(receiver_id, status);

-- RLS
ALTER TABLE public.message_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own requests" ON public.message_requests
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send requests" ON public.message_requests
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Receivers can respond" ON public.message_requests
    FOR UPDATE USING (auth.uid() = receiver_id);

-- ============================================
-- 9. MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(content) <= 1000),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(
    LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id), created_at DESC
);

-- RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON public.messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages if approved" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.message_requests
            WHERE sender_id = auth.uid() AND receiver_id = NEW.receiver_id AND status = 'accepted'
            OR receiver_id = auth.uid() AND sender_id = NEW.receiver_id AND status = 'accepted'
        )
    );

CREATE POLICY "Receivers can mark read" ON public.messages
    FOR UPDATE USING (auth.uid() = receiver_id);

-- ============================================
-- 10. NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('reaction', 'comment', 'follow', 'message', 'mention')),
    reference_id UUID,
    actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);

-- RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 11. REPORTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON public.reports
    FOR SELECT USING (auth.uid() = reporter_id);

-- ============================================
-- 12. BLOCKED USERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.blocked_users (
    blocker_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (blocker_id, blocked_id)
);

-- RLS
ALTER TABLE public.blocked_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own blocks" ON public.blocked_users
    FOR SELECT USING (auth.uid() = blocker_id);

CREATE POLICY "Users can block" ON public.blocked_users
    FOR INSERT WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can unblock" ON public.blocked_users
    FOR DELETE USING (auth.uid() = blocker_id);

-- ============================================
-- 13. MUTED WORDS
-- ============================================
CREATE TABLE IF NOT EXISTS public.muted_words (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    word TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_muted_user ON public.muted_words(user_id);

-- RLS
ALTER TABLE public.muted_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own muted words" ON public.muted_words
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add muted words" ON public.muted_words
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove muted words" ON public.muted_words
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 14. CIRCLES
-- ============================================
CREATE TABLE IF NOT EXISTS public.circles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'heart',
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.circle_members (
    circle_id UUID NOT NULL REFERENCES public.circles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (circle_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.circle_posts (
    circle_id UUID NOT NULL REFERENCES public.circles(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    PRIMARY KEY (circle_id, post_id)
);

-- RLS
ALTER TABLE public.circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view circles" ON public.circles FOR SELECT USING (true);
CREATE POLICY "Anyone can view circle members" ON public.circle_members FOR SELECT USING (true);
CREATE POLICY "Members can join circles" ON public.circle_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Members can leave circles" ON public.circle_members FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view circle posts" ON public.circle_posts FOR SELECT USING (true);
CREATE POLICY "Users can post to circles" ON public.circle_posts FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.posts WHERE id = post_id AND user_id = auth.uid())
);

-- ============================================
-- 15. USER INTERESTS (Algorithm)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_interests (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    weight REAL DEFAULT 1.0,
    PRIMARY KEY (user_id, tag_id)
);

-- RLS
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interests" ON public.user_interests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage interests" ON public.user_interests
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 16. POST INTERACTIONS (Algorithm)
-- ============================================
CREATE TABLE IF NOT EXISTS public.post_interactions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    interaction_type TEXT CHECK (interaction_type IN ('view', 'scroll_pause', 'read_full', 'share')),
    duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interactions_user_post ON public.post_interactions(user_id, post_id);

-- RLS
ALTER TABLE public.post_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can log own interactions" ON public.post_interactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own interactions" ON public.post_interactions
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 17. DAILY PROMPTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.daily_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_text TEXT NOT NULL,
    prompt_date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.prompt_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    prompt_id UUID NOT NULL REFERENCES public.daily_prompts(id) ON DELETE CASCADE,
    response TEXT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, prompt_id)
);

-- RLS
ALTER TABLE public.daily_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prompts" ON public.daily_prompts FOR SELECT USING (true);
CREATE POLICY "Users can view own responses" ON public.prompt_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can respond to prompts" ON public.prompt_responses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own responses" ON public.prompt_responses FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Default Tags
-- ============================================
INSERT INTO public.tags (name) VALUES
    ('love'), ('relationships'), ('depression'), ('anxiety'), ('work'),
    ('family'), ('loneliness'), ('healing'), ('selfcare'), ('burnout'),
    ('marriage'), ('friendship'), ('grief'), ('trauma'), ('hope'),
    ('growth'), ('secrets'), ('discrimination'), ('identity'), ('parenting')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SEED DATA: Default Circles
-- ============================================
INSERT INTO public.circles (id, name, description, icon) VALUES
    (uuid_generate_v4(), 'Love & Relationships', 'Matters of the heart', 'heart'),
    (uuid_generate_v4(), 'Mental Health', 'Depression, anxiety, and healing', 'brain'),
    (uuid_generate_v4(), 'Work & Career', 'Job stress, burnout, and growth', 'briefcase'),
    (uuid_generate_v4(), 'Family & Home', 'Parents, siblings, and family', 'home'),
    (uuid_generate_v4(), 'Life Direction', 'Finding purpose and meaning', 'compass'),
    (uuid_generate_v4(), 'Secrets & Confessions', 'Things you have never told anyone', 'lock')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get user's top tags (for algorithm)
CREATE OR REPLACE FUNCTION get_user_top_tags(p_user_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE(tag_id INTEGER, tag_name TEXT, weight REAL) AS $$
BEGIN
    RETURN QUERY
    SELECT ui.tag_id, t.name, ui.weight
    FROM public.user_interests ui
    JOIN public.tags t ON t.id = ui.tag_id
    WHERE ui.user_id = p_user_id
    ORDER BY ui.weight DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user interests based on interaction
CREATE OR REPLACE FUNCTION update_user_interests_on_reaction()
RETURNS TRIGGER AS $$
BEGIN
    -- Increase weight for tags of reacted post
    INSERT INTO public.user_interests (user_id, tag_id, weight)
    SELECT NEW.user_id, pt.tag_id, 1.0
    FROM public.post_tags pt
    WHERE pt.post_id = NEW.post_id
    ON CONFLICT (user_id, tag_id) DO UPDATE
    SET weight = public.user_interests.weight + 0.5;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_interests_on_reaction
AFTER INSERT ON public.reactions
FOR EACH ROW EXECUTE FUNCTION update_user_interests_on_reaction();

-- ============================================
-- FOR YOU FEED FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION get_for_you_feed(
    p_user_id UUID,
    p_limit INTEGER DEFAULT 20,
    p_cursor TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE(
    id UUID,
    user_id UUID,
    username TEXT,
    avatar_icon TEXT,
    content TEXT,
    post_type TEXT,
    tags TEXT[],
    reaction_count INTEGER,
    comment_count INTEGER,
    share_count INTEGER,
    created_at TIMESTAMPTZ,
    has_reacted BOOLEAN,
    is_following BOOLEAN,
    score REAL
) AS $$
BEGIN
    RETURN QUERY
    WITH user_interests AS (
        SELECT tag_id, weight FROM public.user_interests WHERE public.user_interests.user_id = p_user_id
    ),
    user_following AS (
        SELECT following_id FROM public.follows WHERE follower_id = p_user_id
    ),
    user_blocked AS (
        SELECT blocked_id FROM public.blocked_users WHERE blocker_id = p_user_id
    ),
    post_scores AS (
        SELECT 
            p.id,
            p.user_id,
            u.username,
            u.avatar_icon,
            p.content,
            p.post_type,
            ARRAY(SELECT t.name FROM public.post_tags pt JOIN public.tags t ON t.id = pt.tag_id WHERE pt.post_id = p.id) as tags,
            p.reaction_count,
            p.comment_count,
            p.share_count,
            p.created_at,
            EXISTS(SELECT 1 FROM public.reactions r WHERE r.post_id = p.id AND r.user_id = p_user_id) as has_reacted,
            EXISTS(SELECT 1 FROM user_following uf WHERE uf.following_id = p.user_id) as is_following,
            -- Score calculation
            (
                CASE WHEN EXISTS(SELECT 1 FROM user_following uf WHERE uf.following_id = p.user_id) THEN 5.0 ELSE 0.0 END +
                COALESCE((SELECT SUM(ui.weight) FROM user_interests ui JOIN public.post_tags pt ON pt.tag_id = ui.tag_id WHERE pt.post_id = p.id), 0.0) +
                LN(GREATEST(p.reaction_count, 1)::REAL) +
                LN(GREATEST(p.comment_count, 1)::REAL) * 0.5 -
                EXTRACT(EPOCH FROM (NOW() - p.created_at)) / 3600.0 * 0.02
            )::REAL as score
        FROM public.posts p
        JOIN public.users u ON u.id = p.user_id
        WHERE p.is_flagged = FALSE
        AND p.user_id NOT IN (SELECT blocked_id FROM user_blocked)
        AND (p_cursor IS NULL OR p.created_at < p_cursor)
    )
    SELECT * FROM post_scores
    ORDER BY score DESC, created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
