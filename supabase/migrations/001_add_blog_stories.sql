-- ============================================
-- BLOG STORIES TABLE
-- For detailed articles about NOMA
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'NOMA Team',
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'mental-health', 'relationships', 'community', 'features', 'announcements')),
    cover_image TEXT,
    reading_time INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_stories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON public.blog_stories(category);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON public.blog_stories(is_featured) WHERE is_published = TRUE;

-- RLS
ALTER TABLE public.blog_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog stories" ON public.blog_stories
    FOR SELECT USING (is_published = TRUE);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- ============================================
-- USER SETTINGS EXTENDED
-- ============================================

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'dark' CHECK (theme_preference IN ('dark', 'light', 'system')),
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT NOW();

-- ============================================
-- STORIES TABLE (User Stories / Experiences)
-- ============================================

CREATE TABLE IF NOT EXISTS public.stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL CHECK (char_length(content) <= 10000),
    category TEXT DEFAULT 'personal' CHECK (category IN ('personal', 'healing', 'relationships', 'family', 'work', 'mental-health', 'growth')),
    is_anonymous BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    reaction_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stories_slug ON public.stories(slug);
CREATE INDEX IF NOT EXISTS idx_stories_user ON public.stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_category ON public.stories(category);

-- RLS
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published stories" ON public.stories
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Users can create stories" ON public.stories
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stories" ON public.stories
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stories" ON public.stories
    FOR DELETE USING (auth.uid() = user_id);

-- Story comments
CREATE TABLE IF NOT EXISTS public.story_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(content) <= 1000),
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_story_comments_story ON public.story_comments(story_id);

-- Story reactions
CREATE TABLE IF NOT EXISTS public.story_reactions (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    reaction_type TEXT DEFAULT 'heart' CHECK (reaction_type IN ('heart', 'hug', 'strength', 'relate')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, story_id)
);

-- RLS for story comments/reactions
ALTER TABLE public.story_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view story comments" ON public.story_comments FOR SELECT USING (is_flagged = FALSE);
CREATE POLICY "Users can comment on stories" ON public.story_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view story reactions" ON public.story_reactions FOR SELECT USING (true);
CREATE POLICY "Users can react to stories" ON public.story_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove reactions" ON public.story_reactions FOR DELETE USING (auth.uid() = user_id);
