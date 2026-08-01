# Aura Resorts - Workshop Backend Documentation

Welcome to the backend module of the Aura Resorts Workshop! 🌴

This folder contains the database configuration scripts and SQL schema queries for setting up Supabase PostgreSQL tables.

---

## 🗄️ Database Setup Instructions (Supabase)

1. **Create a Supabase Project:**
   - Sign up/Log in at [https://supabase.com](https://supabase.com).
   - Create a new project named `Backend Workshop`.

2. **Run SQL Queries:**
   - Go to the **SQL Editor** tab in your Supabase dashboard.
   - Open [SQL queries.txt](file:///d:/project/Backend%20workshop%20frontend/backend/SQL%20queries.txt).
   - Copy all SQL contents and execute them in the SQL Editor.

3. **Tables Created:**
   - `users`: User profiles and membership tiers.
   - `resorts`: Luxury resorts data, pricing, and descriptions.
   - `bookings`: Reservations linked to users & resorts.
   - `activities`: Resort events & experiences.

4. **Connect Frontend to Backend:**
   - Copy your Supabase `Project URL` and `Anon API Key` from **Project Settings → API**.
   - Create a `.env` file inside the `frontend/` folder with:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
