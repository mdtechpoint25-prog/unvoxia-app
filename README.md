# Unvoxia Web App

Next.js scaffold based on specification.

Domain: www.unvoxia.co.ke
Emails: info@unvoxia.co.ke, support@unvoxia.co.ke, admin@unvoxia.co.ke
Phones: 0701066845 / 0702794172

Routes:
- `/` Landing
- `/signup`, `/login`
- `/feed`, `/reels`, `/daily-prompts`
- `/profile/[username]`
- `/messages`
- `/about`, `/contact`, `/privacy`, `/terms`
- `/billing` (placeholder)

API stubs:
- `POST /api/register`, `POST /api/login`
- `GET/POST /api/posts`
- `POST /api/media/upload`
- `GET/PATCH /api/users/:username`
- `GET /api/notifications`

Setup:
1. npm install
2. Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
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

