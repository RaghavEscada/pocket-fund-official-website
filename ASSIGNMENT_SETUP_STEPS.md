# Step-by-Step Guide: Setting Up Assignment Submissions (Unique Per Role)

This guide will help you set up the assignment submission feature where each job role has unique assignments.

## Prerequisites
- You have already set up Supabase (followed `SUPABASE_STEPS.md`)
- You have created the `job_postings` and `job_applications` tables
- You have your Supabase project URL and API keys

---

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. In the left sidebar, click **"SQL Editor"**
4. Click **"New query"** (top right)

---

## Step 2: Check Your Current Schema

First, let's see if you already have the `assignment_submissions` table:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'assignment_submissions';
```

**If the table doesn't exist**, proceed to Step 3.
**If the table exists**, skip to Step 4 (Migration).

---

## Step 3: Create Assignment Submissions Table (New Setup)

If you don't have the table yet, run this complete SQL:

```sql
-- Assignment Submissions Table
-- Each assignment is linked to a specific job posting
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  assignment_type VARCHAR(100) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger for assignment_submissions updated_at
DROP TRIGGER IF EXISTS update_assignment_submissions_updated_at ON assignment_submissions;
CREATE TRIGGER update_assignment_submissions_updated_at BEFORE UPDATE ON assignment_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for assignment submissions
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_job_id ON assignment_submissions(job_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_email ON assignment_submissions(email);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_created_at ON assignment_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_status ON assignment_submissions(status);

-- Enable RLS for assignment_submissions
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;

-- Create permissive policy (allow all operations for development)
DROP POLICY IF EXISTS "Allow all operations on assignment_submissions" ON assignment_submissions;
CREATE POLICY "Allow all operations on assignment_submissions"
  ON assignment_submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

**Click "Run"** (or press Cmd/Ctrl + Enter)

---

## Step 4: Migrate Existing Table (If You Have Old Data)

**Only run this if you already have `assignment_submissions` table with `job_title` column:**

```sql
-- Step 4a: Add job_id column
ALTER TABLE assignment_submissions 
ADD COLUMN IF NOT EXISTS job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE;

-- Step 4b: Map existing job_title to job_id (you'll need to do this manually for each row)
-- Example: Update assignments for "Software Engineer" role
UPDATE assignment_submissions 
SET job_id = (SELECT id FROM job_postings WHERE title = 'Software Engineer' LIMIT 1)
WHERE job_title = 'Software Engineer';

-- Repeat the UPDATE for each unique job_title you have

-- Step 4c: Make job_id required (after all rows have job_id)
ALTER TABLE assignment_submissions 
ALTER COLUMN job_id SET NOT NULL;

-- Step 4d: Remove old job_title column
ALTER TABLE assignment_submissions 
DROP COLUMN IF EXISTS job_title;

-- Step 4e: Add index
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_job_id ON assignment_submissions(job_id);
```

---

## Step 5: Create Storage Bucket for Assignments

1. In Supabase dashboard, click **"Storage"** in the left sidebar
2. Click **"New bucket"** (top right)
3. Fill in:
   - **Name:** `assignments`
   - **Public bucket:** ❌ **Uncheck** (keep it private)
   - Click **"Create bucket"**

**OR** run this SQL instead:

```sql
-- Storage bucket for assignments
INSERT INTO storage.buckets (id, name, public)
VALUES ('assignments', 'assignments', false)
ON CONFLICT (id) DO NOTHING;
```

---

## Step 6: Set Up Storage Policies

Run this SQL to allow file uploads and downloads:

```sql
-- Storage policies for assignments
DROP POLICY IF EXISTS "Anyone can upload assignments" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read assignments" ON storage.objects;

CREATE POLICY "Anyone can upload assignments"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'assignments');

CREATE POLICY "Anyone can read assignments"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'assignments');
```

**Click "Run"**

---

## Step 7: Verify Everything Was Created

Run these queries to verify:

```sql
-- Check table exists
SELECT * FROM assignment_submissions LIMIT 1;

-- Check storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'assignments';

-- Check indexes
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'assignment_submissions';
```

You should see:
- ✅ Table `assignment_submissions` exists
- ✅ Bucket `assignments` exists
- ✅ Indexes are created

---

## Step 8: Test the Feature

### Test 1: Create a Job Posting (if you don't have one)

1. Go to `/careers/admin` in your app
2. Click **"New Job Posting"**
3. Fill in the form and create a job (e.g., "Software Engineer")
4. Make sure it's **Active** (checkbox checked)

### Test 2: Submit an Assignment

1. Go to `/careers` page
2. Scroll to **"Submit Your Assignment"** section
3. Fill in the form:
   - Select a job from the dropdown (should show your job)
   - Enter your name and email
   - Select assignment type
   - Upload a file (PDF, DOC, or ZIP)
   - Add notes (optional)
4. Click **"Submit Assignment"**
5. You should see a success message

### Test 3: View in Admin Panel

1. Go to `/careers/admin`
2. Click the **"Assignments"** tab
3. You should see your submitted assignment
4. Try filtering by job using the dropdown
5. Click **"View"** to see full details
6. Try changing the status

---

## Step 9: Verify Data in Supabase

1. Go back to Supabase dashboard
2. Click **"Table Editor"** in left sidebar
3. Click on `assignment_submissions` table
4. You should see your test submission with:
   - ✅ `job_id` linked to a job posting
   - ✅ `full_name`, `email`, `assignment_type`
   - ✅ `file_url` pointing to the uploaded file
   - ✅ `status` = "submitted"

---

## Troubleshooting

### Error: "relation job_postings does not exist"
- **Solution:** Make sure you've created the `job_postings` table first (run `schema-simple.sql`)

### Error: "function update_updated_at_column() does not exist"
- **Solution:** This function should be created in your main schema. Run this:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';
```

### Error: "bucket assignments does not exist"
- **Solution:** Make sure you created the storage bucket in Step 5

### Assignments not showing in admin panel
- **Check:** Make sure your `.env.local` has the correct Supabase keys
- **Check:** Open browser console for errors
- **Check:** Verify the table has data in Supabase dashboard

### File upload fails
- **Check:** Storage bucket exists and is named `assignments`
- **Check:** Storage policies are set correctly (Step 6)
- **Check:** File size is under 10MB

---

## Summary

✅ **What you've set up:**
- `assignment_submissions` table linked to `job_postings`
- Storage bucket for assignment files
- Policies for file uploads/downloads
- Admin panel to view and manage assignments
- Filter assignments by job role

✅ **How it works:**
- Candidates select a job from dropdown when submitting
- Each assignment is linked to a specific job via `job_id`
- Admins can filter assignments by job
- Each role can have multiple unique assignments

---

## Next Steps

- Add authentication to admin panel (currently open)
- Set up email notifications for new submissions
- Add assignment templates per job role
- Set up automated status updates

---

**Need help?** Check the error messages in your browser console or Supabase logs!

