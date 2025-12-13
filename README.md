# No Mask World (NOMA)

A modern digital productivity platform that helps you work smarter, collaborate faster, and manage tasks effortlessly.

**Real Work. Real Results. No Mask.**

Domain: nomaworld.co.ke
Emails: info@nomaworld.co.ke, support@nomaworld.co.ke, admin@nomaworld.co.ke
Phones: 0701066845 / 0702794172

## Features
- 📰 Smart Feed for Work & Creativity
- ✅ Task & Project Management
- 💬 Private Messaging with Confidentiality
- 🎬 Media Reels & Creative Content
- ✨ Daily Prompts for Growth
- 🔔 Notifications System
- 👤 User Profiles & Stats
- 🛡️ Admin Moderation Dashboard

## Routes
- `/` Landing
- `/signup`, `/login`
- `/feed`, `/reels`, `/daily-prompts`
- `/profile/[username]`
- `/messages`, `/notifications`
- `/about`, `/contact`, `/privacy`, `/terms`
- `/billing` (coming soon)
- `/admin` (moderation dashboard)

## API Endpoints
- `POST /api/register`, `POST /api/login`
- `GET/POST /api/posts`
- `GET/POST /api/posts/:id/comments`
- `POST /api/posts/:id/reactions`
- `POST /api/media/upload`
- `GET/PATCH /api/users/:username`
- `GET/POST /api/messages`
- `GET/POST /api/messages/:partnerId`
- `GET /api/notifications`
- `GET /api/admin/stats`

## Setup
1. npm install
2. Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-user
   SMTP_PASS=your-smtp-password
   ```
3. Run the following SQL in Supabase SQL Editor:
   ```sql
   create table users (
     id uuid primary key default uuid_generate_v4(),
     username text unique not null,
     email text unique not null,
     phone text unique not null,
     password_hash text not null,
     avatar_url text,
     badges json,
     notification_settings json,
     email_verified boolean default false,
     verification_token text,
     reset_token text,
     reset_expiry timestamp,
     created_at timestamp default now(),
     last_login timestamp
   );

   create table posts (
     id uuid primary key default uuid_generate_v4(),
     user_id uuid references users(id),
     content text not null,
     media_url text,
     category text,
     created_at timestamp default now(),
     reactions json,
     comments_count int default 0
   );

   create table comments (
     id uuid primary key default uuid_generate_v4(),
     post_id uuid references posts(id),
     user_id uuid references users(id),
     content text not null,
     created_at timestamp default now(),
     reactions json
   );

   create table messages (
     id uuid primary key default uuid_generate_v4(),
     sender_id uuid references users(id),
     receiver_id uuid references users(id),
     content text not null,
     media_url text,
     created_at timestamp default now(),
     read boolean default false
   );

   create table daily_prompts (
     id uuid primary key default uuid_generate_v4(),
     prompt text,
     user_id uuid references users(id),
     response text,
     created_at timestamp default now()
   );

   create table reactions (
     id uuid primary key default uuid_generate_v4(),
     target_type text,
     target_id uuid,
     user_id uuid references users(id),
     emoji text,
     created_at timestamp default now()
   );
   ```
4. npm run dev
5. Open http://localhost:3000

## License
� 2024 No Mask World (NOMA). All rights reserved.

