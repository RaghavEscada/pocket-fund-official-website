# How to View and Manage Job Applications

## Where to See Applicants

### Option 1: Using Supabase Table Editor (Easiest)

1. Go to your Supabase dashboard
2. Click **"Table Editor"** in the left sidebar
3. Click on **`job_applications`** table
4. You'll see all applications in a table format
5. Click on any row to see full details

### Option 2: Using SQL Editor (More Flexible)

1. Go to **"SQL Editor"** in Supabase
2. Click **"New query"**
3. Copy and paste one of the queries from `view-applications.sql`
4. Click **"Run"**

## Quick SQL Queries

### View All Applications
```sql
SELECT 
  ja.id,
  ja.full_name,
  ja.email,
  ja.phone,
  ja.status,
  ja.created_at,
  jp.title as job_title
FROM job_applications ja
LEFT JOIN job_postings jp ON ja.job_id = jp.id
ORDER BY ja.created_at DESC;
```

### View Applications for a Specific Job
1. First, get the job ID:
```sql
SELECT id, title FROM job_postings;
```

2. Then use that ID:
```sql
SELECT * FROM job_applications 
WHERE job_id = 'PASTE_JOB_ID_HERE'
ORDER BY created_at DESC;
```

### Update Application Status
```sql
UPDATE job_applications 
SET status = 'reviewing'  -- or 'interviewed', 'rejected', 'accepted'
WHERE id = 'APPLICATION_ID_HERE';
```

### Count Applications Per Job
```sql
SELECT 
  jp.title,
  COUNT(ja.id) as total_applications
FROM job_postings jp
LEFT JOIN job_applications ja ON jp.id = ja.job_id
GROUP BY jp.id, jp.title
ORDER BY total_applications DESC;
```

## Application Status Values

- `pending` - Just submitted
- `reviewing` - Under review
- `interviewed` - Interview scheduled/completed
- `rejected` - Not selected
- `accepted` - Selected for the role

## View Resume Files

Resumes are stored in the Storage bucket. To view them:

1. Go to **"Storage"** in Supabase
2. Click on **`resumes`** bucket
3. You'll see all uploaded resume files
4. Click on a file to download it

## Create an Admin Dashboard (Future)

For a better experience, you could create an admin page at `/careers/admin/applications` that shows all applications in a nice UI. But for now, using the Table Editor or SQL queries works great!

