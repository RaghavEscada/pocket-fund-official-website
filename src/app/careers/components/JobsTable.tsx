"use client";

import { useState, useEffect } from "react";
import { getActiveJobs } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Briefcase, MapPin, Clock } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/check-config";

export function JobsTable() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getActiveJobs();
      setJobs(data);
    } catch (error: any) {
      console.error("Error loading jobs:", error);
      if (error?.message?.includes('Missing Supabase')) {
        console.warn('Supabase is not configured. Jobs will not be displayed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setApplicationSubmitted(false);
  };

  const handleApplicationSuccess = () => {
    setApplicationSubmitted(true);
    setTimeout(() => {
      setShowApplicationForm(false);
      setSelectedJob(null);
      setApplicationSubmitted(false);
    }, 2000);
  };

  if (configError) {
    return (
      <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">Open Positions</h2>
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Supabase Not Configured</h3>
                <p className="text-yellow-800">Please set up Supabase to display job postings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">Open Positions</h2>
          <div className="text-center text-gray-600">Loading job postings...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Open Positions
          </h2>
          <p className="text-xl text-gray-600">
            Join our team and help shape the future of micro private equity
          </p>
        </div>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-12 max-w-2xl mx-auto">
              <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-900 text-lg font-semibold mb-2">No open positions at the moment</p>
              <p className="text-gray-600">Check back soon for new opportunities!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border-2 border-blue-600 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-700"
              >
                {/* Job Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h3>

                {/* Job Meta Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={() => handleApply(job)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showApplicationForm && selectedJob && (
        <>
          {applicationSubmitted ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">Thank you for your interest. We'll review your application and get back to you soon.</p>
              </div>
            </div>
          ) : (
            <JobApplicationForm
              job={selectedJob}
              onClose={() => {
                setShowApplicationForm(false);
                setSelectedJob(null);
              }}
              onSuccess={handleApplicationSuccess}
            />
          )}
        </>
      )}
    </section>
  );
}
