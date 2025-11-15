import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useReportIssue } from "../../hooks/auth/AuthMutation";
import { Footer } from "../../layouts/footer";
import { useUserStore } from "../../store/AuthStrore";

export default function SupportPage() {
  const {user}=useUserStore()
  const [formData, setFormData] = useState({
    email:user?.email || "",
    issueType: "",
    description: "",
  });

  const {
    mutate: reportIssue,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useReportIssue();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    reportIssue(formData, {
      onSuccess: () => {
        setFormData({
          email: "",
          issueType: "",
          description: "",
        });
      },
    });
  };

  return (
    <>
      <div className="w-full space-y-6 relative">
        {/* GLOBAL LOADING OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
          </div>
        )}

        {/* HEADER */}
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Support
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Facing an issue? Submit your report and our team will assist you.
        </p>

        {/* RESPONSE MESSAGES */}
        {isSuccess && (
          <p className="text-green-600 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
            Your issue has been submitted successfully!
          </p>
        )}

        {isError && (
          <p className="text-red-600 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
            {error?.response?.data?.message || "Failed to submit issue"}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-stone-700 font-medium mb-2 text-sm">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              disabled={isLoading}
              required
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
            />
          </div>

          {/* ISSUE TYPE */}
          <div>
            <label className="block text-stone-700 font-medium mb-2 text-sm">
              Issue Type
            </label>
            <select
              name="issueType"
              required
              disabled={isLoading}
              value={formData.issueType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
            >
              <option value="">Select an issue</option>
              <option value="refund">Refund Issue</option>
              <option value="technical">Technical Issue</option>
              <option value="bug">Bug / Error</option>
              <option value="payment">Payment Issue</option>
              <option value="account">Account Related Issue</option>
              <option value="content">Content Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-stone-700 font-medium mb-2 text-sm">
              Summary / Description
            </label>
            <textarea
              name="description"
              required
              disabled={isLoading}
              rows="5"
              placeholder="Explain the issue you are facing..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="
            w-full h-12 rounded-lg text-stone-900 font-semibold text-base
            bg-linear-to-r from-amber-400 to-amber-500
            hover:from-amber-500 hover:to-amber-600
            shadow-md transition-all
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
