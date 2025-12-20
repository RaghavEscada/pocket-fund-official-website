"use client";

import { useState, useEffect } from "react";
import { getActiveJobs } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
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
      // Show user-friendly error message
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Open Positions</h2>
            <p className="text-lg text-gray-600">Join our team and help transform the micro private equity landscape</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Supabase Not Configured</h3>
                <p className="text-yellow-800 mb-3">
                  To display job postings, you need to set up Supabase:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-yellow-800 text-sm">
                  <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                  <li>Run the SQL schema from <code className="bg-yellow-100 px-1 rounded">supabase/schema.sql</code></li>
                  <li>Get your API keys from Project Settings → API</li>
                  <li>Create <code className="bg-yellow-100 px-1 rounded">.env.local</code> with:
                    <pre className="bg-yellow-100 p-2 rounded mt-2 text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}
                    </pre>
                  </li>
                </ol>
                <p className="text-yellow-800 text-sm mt-3">
                  See <code className="bg-yellow-100 px-1 rounded">supabase/README.md</code> for detailed instructions.
                </p>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Open Positions</h2>
            <p className="text-lg text-gray-600">Join our team and help transform the micro private equity landscape</p>
          </div>
          <div className="text-center text-gray-600">Loading job postings...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Open Positions</h2>
          <p className="text-lg text-gray-600">Join our team and help transform the micro private equity landscape</p>
        </div>
        
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-2">No open positions at the moment.</p>
            <p className="text-gray-500">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      ROLE
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      TEAM
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      WORK TIME
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      LOCATION
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-6 px-6">
                        <div className="font-semibold text-gray-900">{job.title}</div>
                      </td>
                      <td className="py-6 px-6 text-gray-600">{job.department}</td>
                      <td className="py-6 px-6 text-gray-600">{job.type}</td>
                      <td className="py-6 px-6 text-gray-600">{job.location}</td>
                    <td className="py-6 px-6 text-right">
                      <Button
                        onClick={() => handleApply(job)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Apply
                      </Button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

