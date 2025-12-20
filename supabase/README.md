# Supabase Setup for Careers Page

This guide will help you set up Supabase for the careers page functionality.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

### 2. Run the Database Schema

**Option A: Simple Setup (Recommended for Development)**
1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema-simple.sql` (this allows public access for development)
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL

**Option B: Full Setup with Auth (For Production)**
1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL
5. **IMPORTANT:** After running, you'll need to update the RLS policies to allow public inserts (see `supabase/setup-instructions.md`)

This will create:
- `job_postings` table
- `job_applications` table
- Storage bucket for resumes
- Row Level Security (RLS) policies

### 3. Get Your API Keys

1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Set Up Storage Bucket

The schema creates a `resumes` bucket, but you may need to verify it:

1. Go to Storage in your Supabase dashboard
2. Verify the `resumes` bucket exists
3. If not, create it manually:
   - Name: `resumes`
   - Public: `false` (private)

### 6. Configure Authentication (Optional - for Admin)

If you want to protect the admin route:

1. Go to Authentication → Policies
2. Create a custom policy or use Supabase Auth
3. Update the RLS policies in the schema to check for admin users

### 7. Test the Setup

1. Start your development server: `npm run dev`
2. Visit `/careers/admin` to access the admin panel
3. Create a test job posting
4. Visit `/careers` to see the job listing
5. Test submitting an application

## Admin Access

Currently, the admin route (`/careers/admin`) is not protected. To add authentication:

1. Set up Supabase Auth
2. Create an admin user
3. Add middleware to protect the admin route
4. Update RLS policies to check user roles

## Database Schema

### job_postings
- Stores all job postings
- Fields: title, department, location, type, description, requirements, responsibilities, salary_range, is_active

### job_applications
- Stores all job applications
- Fields: job_id, full_name, email, phone, cover_letter, resume_url, linkedin_url, portfolio_url, status

## Storage

Resumes are stored in the `resumes` bucket. Files are:
- Private by default
- Only accessible by authenticated admins
- Max file size: 5MB (enforced in the application form)

## Troubleshooting

### "Error fetching jobs"
- Check that your environment variables are set correctly
- Verify the tables exist in your Supabase database
- Check the browser console for detailed error messages

### "Error uploading resume"
- Verify the `resumes` storage bucket exists
- Check storage policies allow uploads
- Ensure file size is under 5MB

### RLS Policy Errors
- Check that RLS policies are correctly set up
- Verify the policies match your authentication setup
- Test with the Supabase dashboard SQL editor

## Next Steps

- Set up email notifications for new applications
- Add admin authentication
- Create an admin dashboard for viewing applications
- Add application status management

