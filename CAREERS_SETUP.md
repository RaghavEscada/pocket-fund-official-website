# Careers Page with Supabase Integration - Setup Complete! 🎉

## What's Been Set Up

### ✅ Database & Backend
- **Supabase integration** with client and server utilities
- **Database schema** for job postings and applications
- **Storage bucket** for resume uploads
- **Row Level Security (RLS)** policies for data protection
- **TypeScript types** for type safety

### ✅ Admin Interface
- **Admin dashboard** at `/careers/admin`
- **Create, edit, and delete** job postings
- **Manage job status** (active/inactive)
- **Full CRUD operations** for job postings

### ✅ Public Interface
- **Dynamic job listings** fetched from Supabase
- **Job application form** with file upload
- **Resume upload** functionality
- **Application submission** system
- **Success/error handling**

### ✅ Components Updated
- `CareersList` - Now fetches from Supabase, shows dynamic jobs
- `CareersBenefits` - Updated with brand colors
- `JobApplicationForm` - New component for applications
- `CareersPage` - Integrated all components

## Quick Start Guide

### 1. Set Up Supabase

1. **Create a Supabase project** at https://supabase.com
2. **Run the SQL schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/schema.sql`
   - Run the SQL

3. **Get your API keys**:
   - Project Settings → API
   - Copy Project URL and anon key

4. **Create `.env.local`** in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Start Using

1. **Start dev server**: `npm run dev`
2. **Access admin panel**: `http://localhost:3000/careers/admin`
3. **Create a job posting** in the admin panel
4. **View jobs**: `http://localhost:3000/careers`
5. **Test application**: Click "Apply Now" on any job

## File Structure

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts          # Browser Supabase client
│       ├── server.ts          # Server Supabase client
│       ├── types.ts           # TypeScript types
│       └── jobs.ts            # Job-related functions
├── app/
│   └── careers/
│       ├── page.tsx           # Main careers page
│       ├── admin/
│       │   └── page.tsx       # Admin dashboard
│       └── components/
│           ├── CareersList.tsx        # Job listings (updated)
│           ├── CareersBenefits.tsx    # Benefits section (updated)
│           └── JobApplicationForm.tsx # Application form (new)
└── supabase/
    ├── schema.sql            # Database schema
    └── README.md             # Detailed setup guide
```

## Features

### Admin Features
- ✅ Create new job postings
- ✅ Edit existing jobs
- ✅ Delete jobs
- ✅ Toggle job active/inactive status
- ✅ View all jobs in a table

### Public Features
- ✅ View all active job postings
- ✅ See job details (description, requirements, responsibilities)
- ✅ Apply for jobs with application form
- ✅ Upload resume (PDF/DOC, max 5MB)
- ✅ Submit cover letter and contact info
- ✅ Add LinkedIn and portfolio links

## Database Schema

### `job_postings` Table
- `id` (UUID, primary key)
- `title` (string)
- `department` (string)
- `location` (string)
- `type` (Full-time, Part-time, Contract, Internship)
- `description` (text)
- `requirements` (JSON array)
- `responsibilities` (JSON array)
- `salary_range` (string, optional)
- `is_active` (boolean)
- `created_at`, `updated_at` (timestamps)

### `job_applications` Table
- `id` (UUID, primary key)
- `job_id` (UUID, foreign key)
- `full_name` (string)
- `email` (string)
- `phone` (string, optional)
- `cover_letter` (text)
- `resume_url` (string, optional)
- `linkedin_url` (string, optional)
- `portfolio_url` (string, optional)
- `status` (pending, reviewing, interviewed, rejected, accepted)
- `created_at`, `updated_at` (timestamps)

## Security

- **Row Level Security (RLS)** enabled on all tables
- **Public can view** active job postings
- **Public can submit** applications
- **Only admins** can manage jobs and view applications
- **Resumes stored** in private storage bucket

## Next Steps (Optional Enhancements)

1. **Add Admin Authentication**
   - Protect `/careers/admin` route
   - Use Supabase Auth
   - Create admin user roles

2. **Application Management**
   - View applications in admin panel
   - Update application status
   - Download resumes
   - Send email notifications

3. **Email Notifications**
   - Notify admin on new applications
   - Send confirmation to applicants
   - Status update emails

4. **Analytics Dashboard**
   - Track application metrics
   - Job view statistics
   - Application conversion rates

## Troubleshooting

### Jobs not showing?
- Check environment variables are set
- Verify tables exist in Supabase
- Check RLS policies are correct
- Look at browser console for errors

### Can't upload resume?
- Verify `resumes` storage bucket exists
- Check storage policies allow uploads
- Ensure file is under 5MB
- Check file type (PDF/DOC only)

### Admin panel not working?
- Currently no authentication required
- Check Supabase connection
- Verify RLS policies allow admin operations

## Support

For detailed setup instructions, see `supabase/README.md`

For issues, check:
- Supabase dashboard logs
- Browser console errors
- Network tab for API calls

