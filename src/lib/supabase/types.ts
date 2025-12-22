export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  description: string
  requirements: string[]
  responsibilities: string[]
  salary_range?: string
  is_active: boolean
  // Assignment-related fields (optional)
  assignment_required?: boolean
  assignment_description?: string
  assignment_google_drive_url?: string
  assignment_file_url?: string
  // Legacy field for Google Form-based assignments (optional)
  google_form_url?: string
  created_at: string
  updated_at: string
  created_by?: string
}

export interface JobApplication {
  id: string
  job_id: string
  full_name: string
  email: string
  phone?: string
  cover_letter: string
  resume_url?: string
  linkedin_url?: string
  portfolio_url?: string
  status: 'pending' | 'reviewing' | 'interviewed' | 'rejected' | 'accepted'
  created_at: string
  updated_at: string
}

export interface AssignmentSubmission {
  id: string
  job_id: string
  application_id?: string
  full_name: string
  email: string
  assignment_type?: string
  file_url: string
  file_name: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      job_postings: {
        Row: JobPosting
        Insert: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>>
      }
      job_applications: {
        Row: JobApplication
        Insert: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

