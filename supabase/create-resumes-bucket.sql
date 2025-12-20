-- Create Resumes Storage Bucket (PUBLIC)
-- Run this SQL in Supabase SQL Editor

-- Step 1: Create the resumes storage bucket as PUBLIC (or update if exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Step 3: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;

-- Step 4: Create storage policies for resumes
-- Allow anyone to upload resumes
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');


CREATE POLICY "Anyone can read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');

