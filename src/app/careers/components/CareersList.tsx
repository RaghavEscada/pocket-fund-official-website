"use client";

import { useState, useEffect } from "react";
import { getActiveJobs } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, DollarSign, CheckCircle } from "lucide-react";

export function CareersList() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

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

  if (loading) {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Open Positions</h2>
          <div className="text-center text-gray-600">Loading job postings...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Open Positions</h2>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No open positions at the moment.</p>
            <p className="text-gray-500">Check back soon for new opportunities!</p>
          </div>
        ) : (
        <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApply(job)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full whitespace-nowrap"
                  >
                    Apply Now
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {job.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                      {job.responsibilities.length > 3 && (
                        <li className="text-blue-600">+ {job.responsibilities.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}

                {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-blue-600">+ {job.requirements.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
            </div>
          ))}
        </div>
        )}
      </div>

      {showApplicationForm && selectedJob && (
        <>
          {applicationSubmitted ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
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





