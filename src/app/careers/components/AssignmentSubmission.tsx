"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getActiveJobs } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";

export function AssignmentSubmission() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    job_id: "",
    assignment_type: "",
    assignment_file: null as File | null,
    notes: "",
  });
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getActiveJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFormData({ ...formData, assignment_file: file });
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.assignment_file) {
      setError("Please upload your assignment file");
      return;
    }

    setUploading(true);

    try {
      const supabase = createClient();
      
      // Upload file to storage
      const fileExt = formData.assignment_file.name.split('.').pop();
      const filePath = `assignments/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assignments')
        .upload(filePath, formData.assignment_file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get file URL
      const { data: { publicUrl } } = supabase.storage
        .from('assignments')
        .getPublicUrl(filePath);

      // Save assignment submission to database
      const { error: dbError } = await supabase
        .from('assignment_submissions')
        .insert({
          job_id: formData.job_id,
          full_name: formData.full_name,
          email: formData.email,
          assignment_type: formData.assignment_type,
          file_url: publicUrl,
          file_name: formData.assignment_file.name,
          notes: formData.notes || null,
        });

      if (dbError) {
        throw dbError;
      }

      setSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        job_id: "",
        assignment_type: "",
        assignment_file: null,
        notes: "",
      });
    } catch (err: any) {
      console.error("Error submitting assignment:", err);
      setError(err.message || "Failed to submit assignment. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Assignment Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for submitting your assignment. We'll review it and get back to you soon.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Another Assignment
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Submit Your Assignment
          </h2>
          <p className="text-lg text-gray-600">
            Have you been asked to complete an assignment? Upload it here.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border-2 border-blue-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Job / Position *
                </label>
                {loadingJobs ? (
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500">
                    Loading jobs...
                  </div>
                ) : (
                  <select
                    required
                    value={formData.job_id}
                    onChange={(e) => setFormData({ ...formData, job_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a job position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} - {job.department} ({job.location})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Type *
                </label>
                <select
                  required
                  value={formData.assignment_type}
                  onChange={(e) => setFormData({ ...formData, assignment_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Technical Assessment">Technical Assessment</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Portfolio Review">Portfolio Review</option>
                  <option value="Take-Home Project">Take-Home Project</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment File * (PDF, DOC, ZIP - Max 10MB)
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {formData.assignment_file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{formData.assignment_file.name}</span>
                  <span className="text-gray-400">
                    ({(formData.assignment_file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information about your assignment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

