-- Add assignment_google_drive_url column to job_postings table
-- Run this SQL in Supabase SQL Editor

ALTER TABLE job_postings 
ADD COLUMN IF NOT EXISTS assignment_google_drive_url TEXT;

