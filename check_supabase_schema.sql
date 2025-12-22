-- Check job_postings table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'job_postings'
ORDER BY ordinal_position;

-- Check assignment_submissions table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'assignment_submissions'
ORDER BY ordinal_position;

-- Check all tables in the public schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check if assignment fields exist in job_postings
SELECT 
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'job_postings' 
AND column_name LIKE '%assignment%'
ORDER BY column_name;

-- Sample data from job_postings (first row only, to see structure)
SELECT *
FROM job_postings
LIMIT 1;

