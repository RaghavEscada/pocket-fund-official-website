-- Add Google Form URL to Job Postings
-- Run this SQL in Supabase SQL Editor

-- Add google_form_url column to job_postings table
ALTER TABLE job_postings 
ADD COLUMN IF NOT EXISTS google_form_url TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN job_postings.google_form_url IS 'URL to Google Form for job application';
