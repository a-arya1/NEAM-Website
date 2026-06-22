"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

const interestOptions = ["Student", "Parent", "Volunteer", "Partner"];

export function ContactForm() {
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
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      interest: String(formData.get("interest") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("Thank you. Your response was saved. The NYM team can review it from the submissions page.");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">Name</span>
          <input
            required
            type="text"
            name="name"
            maxLength={80}
            className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-950">Email</span>
          <input
            required
            type="email"
            name="email"
            maxLength={120}
            className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">Interest</span>
        <select
          required
          name="interest"
          className="focus-ring mt-2 w-full rounded border border-slate-300 bg-white px-4 py-3 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          {interestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-navy-950">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          maxLength={1500}
          className="focus-ring mt-2 w-full resize-none rounded border border-slate-300 px-4 py-3 text-sm"
          placeholder="Tell us how you would like to get involved."
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
      >
        {isSubmitting ? "Saving..." : "Submit"} <Send className="h-4 w-4" />
      </button>

      {status ? (
        <p className="mt-4 text-sm leading-6 text-navy-800" role="status">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 text-sm leading-6 text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
