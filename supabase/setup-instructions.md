# Supabase Setup Instructions - Step by Step

## Quick Fix for "Error saving job"

The error occurs because Row Level Security (RLS) policies are blocking inserts. Follow these steps:

## Step 1: Open Supabase Dashboard

1. Go to https://app.supabase.com
2. Sign in to your account
3. Select your project (or create a new one if you haven't)

## Step 2: Open SQL Editor

1. In the left sidebar, click on **"SQL Editor"**
2. Click **"New query"** button

## Step 3: Run the Database Schema

1. Open the file `supabase/schema.sql` from your project
2. Copy **ALL** the contents
3. Paste into the SQL Editor in Supabase
4. Click **"Run"** button (or press Cmd/Ctrl + Enter)

This will create:
- `job_postings` table
- `job_applications` table
- Storage bucket for resumes
- Indexes and triggers

## Step 4: Fix RLS Policies (IMPORTANT!)

The current policies require authentication. Since we're not using auth yet, we need to update them:

### Option A: Allow Public Inserts (Quick Fix - For Development)

Run this SQL in the SQL Editor:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert job postings" ON job_postings;
DROP POLICY IF EXISTS "Admins can update job postings" ON job_postings;
DROP POLICY IF EXISTS "Admins can delete job postings" ON job_postings;

-- Create new policies that allow public access (for development)
CREATE POLICY "Anyone can insert job postings"
  ON job_postings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update job postings"
  ON job_postings FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete job postings"
  ON job_postings FOR DELETE
  USING (true);

-- Also allow viewing all jobs (not just active ones) for admin panel
DROP POLICY IF EXISTS "Anyone can view active job postings" ON job_postings;

CREATE POLICY "Anyone can view all job postings"
  ON job_postings FOR SELECT
  USING (true);
```

### Option B: Disable RLS Temporarily (Easiest - For Testing)

If you just want to test quickly:

```sql
-- Disable RLS on job_postings (for development only)
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;
```

**⚠️ Warning:** Only do this for development. Re-enable RLS before going to production.

## Step 5: Create Storage Bucket

1. Go to **"Storage"** in the left sidebar
2. Click **"New bucket"**
3. Name it: `resumes`
4. Make it **Private** (uncheck "Public bucket")
5. Click **"Create bucket"**

## Step 6: Set Storage Policies

Run this SQL in the SQL Editor:

```sql
-- Allow anyone to upload resumes
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read resumes (for development)
CREATE POLICY "Anyone can read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');
```

## Step 7: Verify Setup

1. Go to **"Table Editor"** in the left sidebar
2. You should see `job_postings` and `job_applications` tables
3. Try clicking on `job_postings` - you should see the table structure

## Step 8: Test in Your App

1. Go back to your app: `http://localhost:3000/careers/admin`
2. Try creating a new job posting
3. It should work now!

## Troubleshooting

### Still getting errors?

1. **Check browser console** - Look for detailed error messages
2. **Check Supabase logs**:
   - Go to **"Logs"** → **"Postgres Logs"** in Supabase
   - Look for any error messages
3. **Verify environment variables**:
   - Make sure `.env.local` has correct values
   - Restart your dev server after adding env vars

### Common Errors:

**"permission denied for table job_postings"**
- RLS policies are blocking access
- Run the SQL from Step 4

**"relation 'job_postings' does not exist"**
- Tables weren't created
- Run the schema SQL from Step 3

**"bucket 'resumes' does not exist"**
- Storage bucket wasn't created
- Follow Step 5

## Next Steps (Optional - For Production)

When you're ready for production:

1. Set up Supabase Authentication
2. Create admin users
3. Update RLS policies to check for admin role
4. Re-enable proper security

For now, the public access policies will work for development and testing.

