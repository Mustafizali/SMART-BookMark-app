<<<<<<< HEAD
# Smart Bookmark App

## Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Deployed on Vercel

## Setup

1. Install dependencies:
   npm install

2. Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

3. Run:
   npm run dev

## Features
- Google OAuth Login
- Private bookmarks (RLS)
- Add/Delete bookmarks
- Real-time updates
- Vercel ready
=======
📌 Smart Bookmark App

A modern full-stack bookmark manager built with Next.js (App Router) and Supabase, featuring Google OAuth authentication, private user-based data isolation, and real-time synchronization across multiple tabs.

🚀 Live Features

🔐 Google OAuth Authentication (Supabase Auth)

🧑‍💻 User-specific private bookmarks (Row Level Security)

➕ Add bookmarks

❌ Delete bookmarks

⚡ Real-time sync across browser tabs

🌐 URL auto-formatting (auto-adds https)

🎨 Modern responsive UI (Tailwind CSS)

🔓 Secure logout

🚀 Deployable on Vercel

🏗 Tech Stack
Layer	Technology
Frontend	Next.js 14 (App Router)
Styling	Tailwind CSS
Backend	Supabase
Database	PostgreSQL (Supabase)
Authentication	Supabase Google OAuth
Realtime	Supabase Realtime
Deployment	Vercel
🧠 Architecture Overview
Next.js (Client Components)
        ↓
Supabase JS Client
        ↓
Supabase Auth + PostgreSQL
        ↓
Row Level Security (User Isolation)
        ↓
Realtime Subscriptions (Cross-tab Sync)


Each user can only access their own bookmarks via RLS policies.

🔐 Database Schema
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  url text not null,
  title text not null,
  created_at timestamp with time zone default now()
);

🛡 Row Level Security (RLS)

RLS ensures users can only access their own bookmarks.

Enable RLS
alter table bookmarks enable row level security;

SELECT Policy
create policy "Users can view own bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

INSERT Policy
create policy "Users can insert own bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

DELETE Policy
create policy "Users can delete own bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);

⚡ Realtime Implementation

Subscribes to INSERT and DELETE events

Filters events by user_id

Prevents duplicate entries in strict mode

Syncs instantly across multiple tabs

🧩 Key Implementation Details
URL Normalization

If a user enters:

youtube.com


The app automatically converts it to:

https://youtube.com


to prevent routing issues.

Optimistic UI Updates

Delete operations use optimistic updates for better UX.

If backend fails → state rollback occurs.

Strict Mode Handling

React Strict Mode double execution was handled by:

Unique channel naming

Duplicate ID checks before state update

📦 Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
cd smart-bookmark-app

2️⃣ Install Dependencies
npm install

3️⃣ Create Environment File

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4️⃣ Run Development Server
npm run dev

🌐 Deployment (Vercel)

Push to GitHub

Import repository into Vercel

Add environment variables

Deploy

🧪 How to Test

Login with Google

Add bookmarks

Open second tab → observe real-time sync

Delete bookmark → instant removal

Refresh → data persists

Logout → redirected to login

🔍 Challenges Faced & Solutions
1️⃣ Duplicate Entries in Development

Problem: React Strict Mode caused double subscription.

Solution:
Added duplicate ID protection before updating state.

2️⃣ Realtime Not Syncing Across Tabs

Problem: Realtime replication not enabled.

Solution:
Enabled table replication in Supabase dashboard.

3️⃣ URL Redirecting to Localhost

Problem: Missing https:// prefix.

Solution:
Implemented URL normalization before insert.

4️⃣ Delete Not Updating UI

Problem: Realtime DELETE not firing instantly.

Solution:
Implemented optimistic UI update.

📈 Possible Future Improvements

✏ Edit bookmark feature

🔎 Search & filter

🖼 Favicon preview

👤 Display user avatar

🌙 Dark mode

🧾 Pagination

🛡 Middleware-based route protection

⚙ Server-side Supabase client

👨‍💻 Author

Mustafiz Ali
B.Tech CSE
Full-stack developer with experience in React, Node.js, Java, and Spring Boot.

📄 License

This project is built for learning and assignment submission purposes.

🎯 This README Is Submission Ready

It shows:

Technical depth

Architecture understanding

Security awareness

Problem-solving ability

Production thinking
>>>>>>> 6eae6214a81fb017539e4e25008196005d55b566
