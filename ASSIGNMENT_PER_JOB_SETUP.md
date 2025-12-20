# Assignment Per Job Setup Guide

## Overview
Each job posting can now have a unique assignment associated with it. When applicants apply, they'll see the assignment requirement and can submit their assignment file along with their application.

## What Was Changed

### 1. Database Schema Updates
- Added `assignment_required` (boolean) to `job_postings`
- Added `assignment_description` (text) to `job_postings`
- Added `assignment_file_url` (text) to `job_postings` (for admin to upload assignment template)
- Added `assignment_file_url` (text) to `job_applications` (for applicant's submitted assignment)

### 2. Admin Panel Updates
- Added "Assignment Required" checkbox when creating/editing jobs
- Added "Assignment Description" textarea (shown when assignment is required)
- Added file upload for assignment template file (optional)

### 3. Application Form Updates
- Shows assignment requirement section when job has `assignment_required = true`
- Displays assignment description
- Shows link to download assignment template file (if provided)
- Allows applicant to upload their completed assignment file
- Validates that assignment is uploaded if required

## SQL to Run

Run this SQL in Supabase SQL Editor:

```sql
-- Add Assignment Fields to Job Postings and Applications
-- Step 1: Add assignment fields to job_postings table
ALTER TABLE job_postings 
ADD COLUMN IF NOT EXISTS assignment_required BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS assignment_description TEXT,
ADD COLUMN IF NOT EXISTS assignment_file_url TEXT;

-- Step 2: Add assignment file URL to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS assignment_file_url TEXT;

-- Step 3: Create index for assignment_required (optional, for faster filtering)
CREATE INDEX IF NOT EXISTS idx_job_postings_assignment_required ON job_postings(assignment_required);
```

## How to Use

### For Admins:

1. **Create/Edit a Job with Assignment:**
   - Go to `/careers/admin`
   - Create or edit a job posting
   - Check "Assignment Required"
   - Fill in "Assignment Description" (e.g., "Complete the coding challenge...")
   - Optionally upload an assignment template file (PDF, DOC, ZIP)
   - Save the job

2. **View Applications with Assignments:**
   - Go to `/careers/admin` → "Applications" tab
   - Applications for jobs with assignments will have an assignment file attached
   - Click "View" to see full application details including assignment file

### For Applicants:

1. **Apply for a Job with Assignment:**
   - Go to `/careers` page
   - Click "Apply" on a job that requires an assignment
   - You'll see an "Assignment Required" section with:
     - Assignment description
     - Link to download assignment template (if provided)
     - File upload field for your completed assignment
   - Fill in all fields including uploading your assignment
   - Submit application

## File Storage

- **Assignment templates** (uploaded by admin) → stored in `assignments` bucket
- **Submitted assignments** (uploaded by applicants) → stored in `assignments` bucket
- Both use the same storage bucket but different file paths

## Testing

1. **Create a test job with assignment:**
   - Admin panel → Create job
   - Check "Assignment Required"
   - Add description: "Complete this coding challenge..."
   - Save

2. **Apply for the job:**
   - Careers page → Click "Apply"
   - You should see the assignment section
   - Upload a test file
   - Submit application

3. **Verify in admin:**
   - Admin panel → Applications tab
   - Find your test application
   - Click "View" → Should see assignment file link

## Notes

- Assignment file upload is **required** if `assignment_required = true`
- Assignment template file (from admin) is **optional**
- Assignment files are stored in Supabase Storage (`assignments` bucket)
- Max file size: 10MB for assignments
- Supported formats: PDF, DOC, DOCX, ZIP

