# Step-by-Step Supabase Setup Guide

Follow these steps in order to set up Supabase for your careers page.

## Step 1: Create/Login to Supabase Account

1. Go to **https://app.supabase.com**
2. Sign in (or create a free account if you don't have one)
3. Click **"New Project"** (or select an existing project)

## Step 2: Create a New Project (if needed)

1. Enter a **Project Name** (e.g., "Pocket Fund")
2. Enter a **Database Password** (save this somewhere safe!)
3. Select a **Region** (choose closest to you)
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to be created

## Step 3: Get Your API Keys

1. In your project dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL** - Copy this
   - **anon public key** - Copy this (starts with `eyJ...`)

4. Create a file called `.env.local` in your project root (same folder as `package.json`)
5. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

6. **Restart your dev server** after adding these variables

## Step 4: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click the **"New query"** button (top right)

## Step 5: Run the Database Schema

1. Open the file `supabase/schema-simple.sql` from your project
2. **Copy ALL the contents** of that file
3. **Paste** into the SQL Editor in Supabase
4. Click the **"Run"** button (or press `Cmd+Enter` / `Ctrl+Enter`)

**What this does:**
- Creates `job_postings` table
- Creates `job_applications` table
- Creates `assignment_submissions` table
- Creates storage buckets for resumes and assignments
- Sets up all necessary policies

## Step 6: Verify Tables Were Created

1. In the left sidebar, click **"Table Editor"**
2. You should see three tables:
   - `job_postings`
   - `job_applications`
   - `assignment_submissions`
3. Click on `job_postings` to see its structure

## Step 7: Set Up Storage Buckets

1. In the left sidebar, click **"Storage"**
2. You should see two buckets (created by the SQL):
   - `resumes` - for resume uploads
   - `assignments` - for assignment submissions
3. If you don't see them, create them manually:
   - Click **"New bucket"**
   - Name: `resumes` (or `assignments`)
   - **Uncheck** "Public bucket" (make it private)
   - Click **"Create bucket"**
   - Repeat for the other bucket

## Step 8: Test in Your App

1. Go to your app: `http://localhost:3000/careers/admin`
2. Try creating a new job posting:
   - Fill in the form
   - Click "Create Job Posting"
3. If it works, you'll see the job in the table below
4. Go to `http://localhost:3000/careers` to see it listed

## Troubleshooting

### Error: "permission denied"
**Solution:** The RLS policies might be blocking. Run this in SQL Editor:

```sql
-- Allow public access for development
DROP POLICY IF EXISTS "Allow all operations on job_postings" ON job_postings;
CREATE POLICY "Allow all operations on job_postings"
  ON job_postings FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Error: "relation does not exist"
**Solution:** The tables weren't created. Go back to Step 5 and run the SQL again.

### Error: "bucket does not exist"
**Solution:** 
1. Go to Storage
2. Create the `resumes` bucket manually (Step 7)

### Can't see environment variables
**Solution:**
1. Make sure `.env.local` is in the project root
2. Restart your dev server: Stop it (`Ctrl+C`) and run `npm run dev` again
3. Check the file has no typos in variable names

## Quick Checklist

- [ ] Created Supabase project
- [ ] Copied API keys to `.env.local`
- [ ] Restarted dev server
- [ ] Ran `schema-simple.sql` in SQL Editor
- [ ] Verified tables exist in Table Editor
- [ ] Created/verified `resumes` storage bucket
- [ ] Tested creating a job in admin panel

## Next Steps After Setup

Once everything works:
1. Create some test job postings
2. Test the application form
3. View applications (they'll be in the `job_applications` table)

## Need Help?

- Check browser console for detailed errors
- Check Supabase logs: **Logs** → **Postgres Logs**
- See `supabase/setup-instructions.md` for more details

