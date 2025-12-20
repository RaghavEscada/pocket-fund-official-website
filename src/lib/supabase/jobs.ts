import { createClient } from './client'
import type { JobPosting, JobApplication, AssignmentSubmission } from './types'

// Get all active job postings
export async function getActiveJobs(): Promise<JobPosting[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      // Return empty array instead of throwing to prevent page crashes
      return []
    }

    return data || []
  } catch (error: any) {
    console.error('Error in getActiveJobs:', error)
    // If it's a configuration error, return empty array
    if (error?.message?.includes('Missing Supabase')) {
      console.warn('Supabase not configured. Please set up your environment variables.')
      return []
    }
    throw error
  }
}

// Get a single job posting by ID
export async function getJobById(id: string): Promise<JobPosting | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching job:', error)
    return null
  }

  return data
}

// Get all job postings (admin only)
export async function getAllJobs(): Promise<JobPosting[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all jobs:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      // Return empty array instead of throwing
      return []
    }

    return data || []
  } catch (error: any) {
    console.error('Error in getAllJobs:', error)
    // If it's a configuration error, return empty array
    if (error?.message?.includes('Missing Supabase')) {
      console.warn('Supabase not configured. Please set up your environment variables.')
      return []
    }
    throw error
  }
}

// Create a new job posting (admin only)
export async function createJobPosting(job: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>): Promise<JobPosting> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_postings')
    .insert(job)
    .select()
    .single()

  if (error) {
    console.error('Error creating job:', error)
    throw error
  }

  return data
}

// Update a job posting (admin only)
export async function updateJobPosting(id: string, updates: Partial<JobPosting>): Promise<JobPosting> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_postings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating job:', error)
    throw error
  }

  return data
}

// Delete a job posting (admin only)
export async function deleteJobPosting(id: string): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('job_postings')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting job:', error)
    throw error
  }
}

// Submit a job application
export async function submitApplication(application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<JobApplication> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_applications')
    .insert(application)
    .select()
    .single()

  if (error) {
    console.error('Error submitting application:', error)
    throw error
  }

  return data
}

// Get all applications for a job (admin only)
export async function getApplicationsByJobId(jobId: string): Promise<JobApplication[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    throw error
  }

  return data || []
}

// Get all applications (admin only)
export async function getAllApplications(): Promise<JobApplication[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all applications:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return []
    }

    return data || []
  } catch (error: any) {
    console.error('Error in getAllApplications:', error)
    if (error?.message?.includes('Missing Supabase')) {
      console.warn('Supabase not configured. Please set up your environment variables.')
      return []
    }
    throw error
  }
}

// Update application status (admin only)
export async function updateApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('job_applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating application status:', error)
    throw error
  }

  return data
}

// Upload resume file
export async function uploadResume(file: File, fileName: string): Promise<string> {
  const supabase = createClient()
  
  const fileExt = fileName.split('.').pop()
  const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Error uploading resume:', error)
    throw error
  }

  // Get public URL (or signed URL for private buckets)
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath)

  return publicUrl
}

// Get all assignment submissions (admin only)
export async function getAllAssignments(): Promise<AssignmentSubmission[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('assignment_submissions')
      .select(`
        *,
        job_postings (
          title,
          department
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching assignments:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return []
    }

    // Map the data to include job_title from the joined job_postings
    return (data || []).map((assignment: any) => ({
      ...assignment,
      job_title: assignment.job_postings?.title || 'Unknown Job'
    }))
  } catch (error: any) {
    console.error('Error in getAllAssignments:', error)
    if (error?.message?.includes('Missing Supabase')) {
      console.warn('Supabase not configured. Please set up your environment variables.')
      return []
    }
    throw error
  }
}

// Get assignments for a specific job
export async function getAssignmentsByJobId(jobId: string): Promise<AssignmentSubmission[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('assignment_submissions')
      .select(`
        *,
        job_postings (
          title,
          department
        )
      `)
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching assignments by job:', error)
      return []
    }

    return (data || []).map((assignment: any) => ({
      ...assignment,
      job_title: assignment.job_postings?.title || 'Unknown Job'
    }))
  } catch (error: any) {
    console.error('Error in getAssignmentsByJobId:', error)
    throw error
  }
}

