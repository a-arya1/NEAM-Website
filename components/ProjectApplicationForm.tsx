"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function ProjectApplicationForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("");
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(form);
    const projectIdea = String(formData.get("projectIdea") || "").trim();
    const whyYou = String(formData.get("whyYou") || "").trim();
    const supportNeeded = String(formData.get("supportNeeded") || "").trim();

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      respondentType: "Personal Project Applicant",
      studentLocation: String(formData.get("studentLocation") || "").trim(),
      highSchool: String(formData.get("highSchool") || "").trim(),
      graduationYear: String(formData.get("graduationYear") || "").trim(),
      meetingGoals: `PROJECT IDEA\n${projectIdea}\n\nWHY THIS MATTERS TO ME\n${whyYou}\n\nGUIDANCE I NEED\n${supportNeeded}`,
      website: String(formData.get("website") || "").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "We couldn't submit your application right now. Please try again shortly.");
      }

      form.reset();
      setStatus("Application received! The NYA team will review it and follow up by email.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">Student name</span>
          <input required name="name" autoComplete="name" maxLength={80} className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm" placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">Email</span>
          <input required type="email" name="email" autoComplete="email" maxLength={120} className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">City or area</span>
          <input required name="studentLocation" maxLength={100} className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm" placeholder="Where do you live?" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">High school</span>
          <input required name="highSchool" maxLength={120} className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm" placeholder="Your school" />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">Graduation year</span>
        <input required name="graduationYear" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm sm:max-w-48" placeholder="2027" />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">What personal project would you like to create?</span>
        <textarea required name="projectIdea" rows={4} maxLength={600} className="focus-ring mt-2 w-full resize-none rounded border border-slate-300 px-4 py-3 text-sm" placeholder="Describe your idea. It can be new or something you have already started." />
      </label>
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">Why does this project matter to you?</span>
        <textarea required name="whyYou" rows={3} maxLength={400} className="focus-ring mt-2 w-full resize-none rounded border border-slate-300 px-4 py-3 text-sm" placeholder="Tell us about your interest, motivation, or the problem you hope to address." />
      </label>
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">What guidance would help you most?</span>
        <textarea required name="supportNeeded" rows={3} maxLength={350} className="focus-ring mt-2 w-full resize-none rounded border border-slate-300 px-4 py-3 text-sm" placeholder="For example: choosing a direction, making a plan, research, building, or presenting your work." />
      </label>

      <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

      <button type="submit" disabled={isSubmitting} className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto">
        {isSubmitting ? "Submitting..." : "Apply for a project spot"}<Send className="h-4 w-4" />
      </button>
      {status ? <p className="mt-4 text-sm leading-6 text-navy-800" role="status">{status}</p> : null}
      {error ? <p className="mt-4 text-sm leading-6 text-red-700" role="alert">{error}</p> : null}
    </form>
  );
}
