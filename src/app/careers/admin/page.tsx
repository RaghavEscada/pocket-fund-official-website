"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAllJobs, createJobPosting, updateJobPosting, deleteJobPosting, getAllApplications, getApplicationsByJobId, updateApplicationStatus } from "@/lib/supabase/jobs";
import type { JobPosting, JobApplication } from "@/lib/supabase/types";
import { Plus, Edit, Trash2, X, FileText, Download, ExternalLink, Mail, Phone, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = 'jobs' | 'applications' | 'assignments';

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<(JobApplication & { job_title?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<(JobApplication & { job_title?: string }) | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [filterJobId, setFilterJobId] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as JobPosting["type"],
    description: "",
    requirements: "",
    responsibilities: "",
    salary_range: "",
    is_active: true,
    assignment_required: false,
    assignment_description: "",
    assignment_google_drive_url: "",
    assignment_file_url: "",
  });
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [uploadingAssignment, setUploadingAssignment] = useState(false);

  useEffect(() => {
    loadJobs();
    if (activeTab === 'applications') {
      loadApplications();
    }
  }, [activeTab, filterJobId]);

  const loadJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error: any) {
      console.error("Error loading jobs:", error);
      // Show user-friendly error message
      if (error?.message?.includes('Missing Supabase')) {
        alert('Supabase is not configured. Please set up your environment variables in .env.local');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const jobData: any = {
        ...formData,
        requirements: formData.requirements.split("\n").filter(r => r.trim()),
        responsibilities: formData.responsibilities.split("\n").filter(r => r.trim()),
      };

      // Include assignment fields
      jobData.assignment_required = formData.assignment_required;
      if (formData.assignment_required) {
        jobData.assignment_description = formData.assignment_description;
      }
      if (formData.assignment_google_drive_url) {
        jobData.assignment_google_drive_url = formData.assignment_google_drive_url;
      }
      if (formData.assignment_file_url) {
        jobData.assignment_file_url = formData.assignment_file_url;
      }

      if (editingJob) {
        await updateJobPosting(editingJob.id, jobData);
      } else {
        await createJobPosting(jobData);
      }

      resetForm();
      setShowForm(false);
      loadJobs();
    } catch (error: any) {
      console.error("Error saving job:", error);
      alert(`Error saving job: ${error.message || 'Please try again.'}`);
    }
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : "",
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join("\n") : "",
      salary_range: job.salary_range || "",
      is_active: job.is_active,
      assignment_required: (job as any).assignment_required || false,
      assignment_description: (job as any).assignment_description || "",
      assignment_google_drive_url: (job as any).assignment_google_drive_url || "",
      assignment_file_url: (job as any).assignment_file_url || "",
    });
    setAssignmentFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      await deleteJobPosting(id);
      loadJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
      responsibilities: "",
      salary_range: "",
      is_active: true,
      assignment_required: false,
      assignment_description: "",
      assignment_google_drive_url: "",
      assignment_file_url: "",
    });
    setAssignmentFile(null);
    setEditingJob(null);
    setShowForm(false);
  };

  const handleAssignmentFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploadingAssignment(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const filePath = `assignments/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('assignments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('assignments')
        .getPublicUrl(filePath);

      setFormData({ ...formData, assignment_file_url: data.publicUrl });
      setAssignmentFile(file);
    } catch (error: any) {
      console.error("Error uploading assignment file:", error);
      alert(`Error uploading file: ${error.message || 'Please try again.'}`);
    } finally {
      setUploadingAssignment(false);
    }
  };

  const loadApplications = async () => {
    setApplicationsLoading(true);
    try {
      let data;
      if (filterJobId === 'all') {
        data = await getAllApplications();
      } else {
        data = await getApplicationsByJobId(filterJobId);
      }
      
      // Get job titles for each application
      const applicationsWithJobs = await Promise.all(
        data.map(async (app) => {
          const job = jobs.find(j => j.id === app.job_id);
          return {
            ...app,
            job_title: job?.title || 'Unknown Job'
          };
        })
      );
      
      setApplications(applicationsWithJobs);
    } catch (error: any) {
      console.error("Error loading applications:", error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: JobApplication['status']) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      loadApplications();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating application status. Please try again.");
    }
  };

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Careers Admin</h1>
          {activeTab === 'jobs' && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Job Posting
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
          </nav>
        </div>

        {/* Applications View */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Job:
              </label>
              <select
                value={filterJobId}
                onChange={(e) => setFilterJobId(e.target.value)}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Applications Table */}
            {applicationsLoading ? (
              <div className="text-center py-12 text-gray-600">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications found.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{app.full_name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{app.job_title || 'Unknown'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              <div className="flex items-center gap-2 mb-1">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                                  {app.email}
                                </a>
                              </div>
                              {app.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">{app.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as JobApplication['status'])}
                              className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${getStatusColor(app.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="interviewed">Interviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(app.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              View
                            </button>
                            {app.resume_url && (
                              <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-900 mr-2"
                                title="Download Resume"
                              >
                                <Download className="w-4 h-4 inline" />
                              </a>
                            )}
                            {(app as any).assignment_file_url && (
                              <a
                                href={(app as any).assignment_file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-900"
                                title="Download Submitted Assignment"
                              >
                                <FileText className="w-4 h-4 inline" />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Jobs View */}
        {activeTab === 'jobs' && (
          <>
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {editingJob ? "Edit Job Posting" : "New Job Posting"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as JobPosting["type"] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    placeholder="e.g., $50k - $80k"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active (visible to public)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements (one per line) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Bachelor's degree in Finance&#10;3+ years of experience&#10;Strong analytical skills"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities (one per line) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Analyze investment opportunities&#10;Manage portfolio companies&#10;Conduct due diligence"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Assignment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If this position requires candidates to complete an assignment, enable this option and provide the assignment details below.
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="assignment_required"
                      checked={formData.assignment_required}
                      onChange={(e) => setFormData({ ...formData, assignment_required: e.target.checked })}
                      className="mr-2 w-4 h-4"
                    />
                    <label htmlFor="assignment_required" className="text-sm font-medium text-gray-700">
                      Assignment Required
                    </label>
                  </div>
                </div>

                {formData.assignment_required && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment Description *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.assignment_description}
                        onChange={(e) => setFormData({ ...formData, assignment_description: e.target.value })}
                        placeholder="Describe the assignment requirements, what candidates need to complete, and any specific instructions..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Provide a clear description of what candidates need to complete for this assignment</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment Problem Statement Source (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.assignment_google_drive_url}
                        onChange={(e) => setFormData({ ...formData, assignment_google_drive_url: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Google Drive link to assignment problem statement</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment Problem Statement File (Optional)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip"
                        onChange={handleAssignmentFileChange}
                        disabled={uploadingAssignment}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {uploadingAssignment && (
                        <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                      )}
                      {formData.assignment_file_url && !assignmentFile && (
                        <p className="text-sm text-green-600 mt-1">File already uploaded</p>
                      )}
                      {assignmentFile && (
                        <p className="text-sm text-green-600 mt-1">✓ {assignmentFile.name}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Upload assignment file (PDF, DOC, DOCX, or ZIP - Max 10MB)</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="text-white"
                  style={{ backgroundColor: '#366EF3' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d5dd9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#366EF3'}
                >
                  {editingJob ? "Update" : "Create"} Job Posting
                </Button>
                <Button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Applicant Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div><strong>Name:</strong> {selectedApplication.full_name}</div>
                    <div><strong>Email:</strong> <a href={`mailto:${selectedApplication.email}`} className="text-blue-600 hover:underline">{selectedApplication.email}</a></div>
                    {selectedApplication.phone && <div><strong>Phone:</strong> {selectedApplication.phone}</div>}
                    <div><strong>Applied for:</strong> {selectedApplication.job_title || 'Unknown Job'}</div>
                    <div><strong>Applied on:</strong> {new Date(selectedApplication.created_at).toLocaleString()}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedApplication.status)}`}>
                        {selectedApplication.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Letter</h3>
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-700">
                    {selectedApplication.cover_letter}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Links & Documents</h3>
                  <div className="space-y-2">
                    {selectedApplication.resume_url && (
                      <a
                        href={selectedApplication.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                      </a>
                    )}
                    {selectedApplication.linkedin_url && (
                      <a
                        href={selectedApplication.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn Profile
                      </a>
                    )}
                    {selectedApplication.portfolio_url && (
                      <a
                        href={selectedApplication.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Portfolio Website
                      </a>
                    )}
                    {(selectedApplication as any).assignment_file_url && (
                      <a
                        href={(selectedApplication as any).assignment_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                      >
                        <Download className="w-4 h-4" />
                        Download Submitted Assignment
                      </a>
                    )}
                    {!selectedApplication.resume_url && !selectedApplication.linkedin_url && !selectedApplication.portfolio_url && !(selectedApplication as any).assignment_file_url && (
                      <p className="text-gray-500 text-sm">No additional links provided</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    onClick={() => setSelectedApplication(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

