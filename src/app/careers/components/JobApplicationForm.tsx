"use client";

import { useState } from "react";
import { submitApplication, uploadResume } from "@/lib/supabase/jobs";
import type { JobPosting } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { X, Upload, Loader2, FileText, CheckCircle2, AlertCircle, User, Mail, Phone, Linkedin, Globe, FileCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

interface JobApplicationFormProps {
  job: JobPosting;
  onClose: () => void;
  onSuccess: () => void;
}

export function JobApplicationForm({ job, onClose, onSuccess }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    linkedin_url: "",
    portfolio_url: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentUrl, setAssignmentUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadingAssignment, setUploadingAssignment] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Resume file size must be less than 5MB");
        return;
      }
      if (!file.type.includes("pdf") && !file.type.includes("doc")) {
        setError("Resume must be a PDF or DOC file");
        return;
      }
      setResume(file);
      setError("");
    }
  };

  const handleUploadResume = async () => {
    if (!resume) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadResume(resume, resume.name);
      setResumeUrl(url);
    } catch (err) {
      setError("Failed to upload resume. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleAssignmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Assignment file size must be less than 10MB");
        return;
      }
      if (!file.type.includes("pdf") && !file.type.includes("doc") && !file.type.includes("zip")) {
        setError("Assignment must be a PDF, DOC, DOCX, or ZIP file");
        return;
      }
      setAssignmentFile(file);
      setError("");
    }
  };

  const handleUploadAssignment = async () => {
    if (!assignmentFile) return;

    setUploadingAssignment(true);
    setError("");

    try {
      const supabase = createClient();
      const fileExt = assignmentFile.name.split('.').pop();
      const filePath = `assignments/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('assignments')
        .upload(filePath, assignmentFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assignments')
        .getPublicUrl(filePath);

      setAssignmentUrl(publicUrl);
    } catch (err: any) {
      setError("Failed to upload assignment. Please try again.");
      console.error(err);
    } finally {
      setUploadingAssignment(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Upload resume if needed
    let finalResumeUrl = resumeUrl;
    if (resume && !resumeUrl) {
      try {
        finalResumeUrl = await uploadResume(resume, resume.name);
        setResumeUrl(finalResumeUrl);
      } catch (err) {
        setError("Failed to upload resume. Please try again.");
        return;
      }
    }

    if (!finalResumeUrl) {
      setError("Please upload your resume");
      return;
    }

    // Upload assignment if required
    let finalAssignmentUrl = assignmentUrl;
    if (assignmentRequired && assignmentFile && !assignmentUrl) {
      try {
        const supabase = createClient();
        const fileExt = assignmentFile.name.split('.').pop();
        const filePath = `assignments/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('assignments')
          .upload(filePath, assignmentFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('assignments')
          .getPublicUrl(filePath);

        finalAssignmentUrl = publicUrl;
        setAssignmentUrl(publicUrl);
      } catch (err: any) {
        setError("Failed to upload assignment. Please try again.");
        return;
      }
    }

    if (assignmentRequired && !finalAssignmentUrl) {
      setError("Please upload your assignment file");
      return;
    }

    setSubmitting(true);

    try {
      const application = await submitApplication({
        job_id: job.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || undefined,
        cover_letter: formData.cover_letter,
        resume_url: finalResumeUrl,
        linkedin_url: formData.linkedin_url || undefined,
        portfolio_url: formData.portfolio_url || undefined,
      });

      // If assignment is required and uploaded, save it to assignment_submissions table
      if (assignmentRequired && finalAssignmentUrl && assignmentFile) {
        try {
          const supabase = createClient();
          const assignmentData: any = {
            job_id: job.id,
            full_name: formData.full_name,
            email: formData.email,
            file_url: finalAssignmentUrl,
            file_name: assignmentFile.name,
            notes: `Submitted with application for ${job.title}. Application ID: ${application.id}`,
          };
          
          // Only add application_id if the column exists (check your schema)
          // Uncomment if your table has this column:
          // assignmentData.application_id = application.id;
          
          const { error: assignmentError, data: assignmentDataResult } = await supabase
            .from('assignment_submissions')
            .insert(assignmentData)
            .select();
          
          if (assignmentError) {
            console.error("Error saving assignment:", {
              message: assignmentError.message,
              details: assignmentError.details,
              hint: assignmentError.hint,
              code: assignmentError.code,
            });
            // Don't fail the application if assignment save fails, but log it
          } else {
            console.log("Assignment saved successfully:", assignmentDataResult);
          }
        } catch (assignmentErr: any) {
          console.error("Error saving assignment (catch):", {
            message: assignmentErr?.message,
            error: assignmentErr,
          });
          // Don't fail the application if assignment save fails
        }
      }

      onSuccess();
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const assignmentRequired = (job as any).assignment_required;
  const assignmentDescription = (job as any).assignment_description as string | undefined;
  const assignmentSourceUrl = (job as any).assignment_google_drive_url as string | undefined;
  const assignmentFileUrl = (job as any).assignment_file_url as string | undefined;
  const legacyGoogleFormUrl = (job as any).google_form_url as string | undefined;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#366EF3] to-[#2d5dd9] text-white px-6 py-5 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Apply for {job.title}
            </h2>
            <p className="text-sm text-blue-100 font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {job.department} • {job.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{error}</p>
            </div>
          )}

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <div className="w-8 h-8 rounded-lg bg-[#366EF3]/10 flex items-center justify-center">
                <User className="w-4 h-4" style={{ color: '#366EF3' }} />
              </div>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  <Linkedin className="w-4 h-4 text-gray-400" />
                  LinkedIn URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  <Globe className="w-4 h-4 text-gray-400" />
                  Portfolio/Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Resume Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <div className="w-8 h-8 rounded-lg bg-[#366EF3]/10 flex items-center justify-center">
                <FileCheck className="w-4 h-4" style={{ color: '#366EF3' }} />
              </div>
              Resume *
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 hover:border-[#366EF3] transition-colors">
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#366EF3] transition-colors">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600 flex-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      {resume ? resume.name : "Choose file (PDF or DOC, max 5MB)"}
                    </span>
                    <Upload className="w-4 h-4 text-gray-400" />
                  </div>
                </label>
                {resume && !resumeUrl && (
                  <Button
                    type="button"
                    onClick={handleUploadResume}
                    disabled={uploading}
                    className="bg-[#366EF3] hover:bg-[#2d5dd9] text-white px-6"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                )}
              </div>
              {resume && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${resumeUrl ? 'text-green-600' : 'text-gray-600'}`}>
                  {resumeUrl ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Resume uploaded successfully</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        {resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Assignment Section */}
          {assignmentRequired && (
            <>
              <div className="border-t border-gray-200"></div>
              <div className="bg-gradient-to-br from-[#366EF3]/5 to-[#366EF3]/10 border-2 border-[#366EF3]/20 rounded-xl p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#366EF3] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      Assignment Required *
                    </h3>
                    <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      Complete and upload your assignment below
                    </p>
                  </div>
                </div>

                {assignmentDescription && (
                  <div className="bg-white rounded-lg p-4 border border-[#366EF3]/20 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      {assignmentDescription}
                    </p>
                  </div>
                )}

                {(assignmentSourceUrl || assignmentFileUrl) && (
                  <div className="flex flex-wrap gap-3">
                    {assignmentSourceUrl && (
                      <a
                        href={assignmentSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#366EF3]/30 rounded-lg text-[#366EF3] hover:bg-[#366EF3] hover:text-white transition-colors text-sm font-medium"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        <FileText className="w-4 h-4" />
                        View Problem Statement
                      </a>
                    )}
                    {assignmentFileUrl && (
                      <a
                        href={assignmentFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#366EF3]/30 rounded-lg text-[#366EF3] hover:bg-[#366EF3] hover:text-white transition-colors text-sm font-medium"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        <FileText className="w-4 h-4" />
                        Download Assignment File
                      </a>
                    )}
                  </div>
                )}

                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-[#366EF3]/30">
                  <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Upload Your Completed Assignment * (PDF, DOC, DOCX, or ZIP - Max 10MB)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip"
                        onChange={handleAssignmentFileChange}
                        required={assignmentRequired}
                        className="hidden"
                      />
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#366EF3] transition-colors">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600 flex-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                          {assignmentFile ? assignmentFile.name : "Choose assignment file"}
                        </span>
                        <Upload className="w-4 h-4 text-gray-400" />
                      </div>
                    </label>
                    {assignmentFile && !assignmentUrl && (
                      <Button
                        type="button"
                        onClick={handleUploadAssignment}
                        disabled={uploadingAssignment}
                        className="bg-[#366EF3] hover:bg-[#2d5dd9] text-white px-6"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        {uploadingAssignment ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  {assignmentFile && (
                    <div className={`mt-3 flex items-center gap-2 text-sm ${assignmentUrl ? 'text-green-600' : 'text-gray-600'}`}>
                      {assignmentUrl ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Assignment uploaded successfully</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {assignmentFile.name} ({(assignmentFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {legacyGoogleFormUrl && !assignmentRequired && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                Assignment Required
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Please submit your completed assignment using the Google Form below.
              </p>
              <a
                href={legacyGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span>📎</span>
                <span>Submit Assignment via Google Form</span>
                <span className="text-xs opacity-90">(opens in new tab)</span>
              </a>
              <p className="text-xs text-gray-600 mt-2">
                Note: Complete your assignment submission before or after submitting this application form.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Cover Letter Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <div className="w-8 h-8 rounded-lg bg-[#366EF3]/10 flex items-center justify-center">
                <Mail className="w-4 h-4" style={{ color: '#366EF3' }} />
              </div>
              Cover Letter *
            </h3>
            <textarea
              required
              rows={6}
              value={formData.cover_letter}
              onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#366EF3] focus:border-transparent transition-all resize-none"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            />
          </div>
          </form>
        </div>

          {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || uploading || uploadingAssignment}
            className="flex-1 bg-[#366EF3] hover:bg-[#2d5dd9] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

