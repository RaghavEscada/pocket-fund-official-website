"use client";

import { useState, useEffect } from "react";
import { getActiveJobs } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, X, MapPin, Briefcase, Clock } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/check-config";
import { Montserrat } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export function JobsTable() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
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

  const handleJobClick = (job: JobPosting) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setShowJobModal(false);
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
      <section id="open-positions" className={`py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Open Positions</h2>
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
      <section id="open-positions" className={`py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Open Positions</h2>
          <div className="text-center text-gray-600">Loading job postings...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="open-positions" className={`py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Open Positions</h2>
          
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No open positions at the moment.</p>
              <p className="text-gray-500">Check back soon for new opportunities!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer h-full flex flex-col bg-white group overflow-hidden"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-8 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight flex-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                          {job.title}
                        </h3>
                      </div>
                      
                      {/* Department Badge */}
                      <div className="mb-4">
                        <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(54, 110, 243, 0.1)', color: '#366EF3' }}>
                          {job.department}
                        </span>
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" style={{ color: '#366EF3' }} />
                          <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" style={{ color: '#366EF3' }} />
                          <span className="font-medium">{job.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description with 3-line fade-out */}
                    <div className="flex-grow relative mb-6 min-h-[72px]">
                      <div 
                        className="text-sm text-gray-600 leading-relaxed font-normal relative"
                        style={{
                          fontFamily: 'var(--font-montserrat), sans-serif',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: '1.5',
                          maxHeight: '4.5rem',
                        }}
                      >
                        {job.description}
                      </div>
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))',
                        }}
                      />
                    </div>

                    {/* Apply Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job);
                      }}
                      className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{ backgroundColor: '#366EF3' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2d5dd9';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#366EF3';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-transparent pointer-events-none transition-all duration-300 rounded-2xl" />
                </Card>
              ))}
            </div>
          )}

          {/* Talent Network Banner */}
          <div className="mt-16 w-full rounded-2xl p-8 md:p-12 border-2" style={{ backgroundColor: 'rgba(54, 110, 243, 0.05)', borderColor: '#366EF3' }}>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Didn't find the perfect job?
              </h3>
              <p className="text-lg text-gray-600 mb-6 font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Create a profile so we can help you find the right opportunity when it becomes available.
              </p>
              <Button
                className="text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#366EF3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d5dd9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#366EF3';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Join Talent Network
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowJobModal(false)}>
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                {selectedJob.title}
              </h2>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" style={{ color: '#366EF3' }} />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-5 h-5" style={{ color: '#366EF3' }} />
                  <span>{selectedJob.type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" style={{ color: '#366EF3' }} />
                  <span>{selectedJob.department}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
              </div>

              {selectedJob.responsibilities && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
                  {Array.isArray(selectedJob.responsibilities) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedJob.responsibilities}</p>
                  )}
                </div>
              )}

              {selectedJob.requirements && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                  {Array.isArray(selectedJob.requirements) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedJob.requirements}</p>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => handleApply(selectedJob)}
                  className="flex-1 text-white rounded-lg transition-colors"
                  style={{ backgroundColor: '#366EF3' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d5dd9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#366EF3'}
                >
                  Apply Now
                </Button>
                <Button
                  onClick={() => setShowJobModal(false)}
                  variant="outline"
                  className="flex-1 rounded-lg"
                  style={{ borderColor: '#366EF3', color: '#366EF3' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(54, 110, 243, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <>
          {applicationSubmitted ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Application Submitted!</h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Thank you for your interest. We'll review your application and get back to you soon.</p>
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
    </>
  );
}
