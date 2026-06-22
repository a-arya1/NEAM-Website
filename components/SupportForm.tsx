"use client";

import { FormEvent, useState } from "react";
import { HeartHandshake } from "lucide-react";

export function SupportForm() {
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
      website: String(formData.get("website") || "").trim()
    };

    try {
      const response = await fetch("/api/support", {
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
      setStatus("Thank you. NYM saved your contact information and will follow up about support opportunities.");
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
      className="rounded border border-white/15 bg-white p-6 text-slate-900 shadow-soft sm:p-7"
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

      <label className="hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
      >
        {isSubmitting ? "Saving..." : "I Want to Support NYM"}
        <HeartHandshake className="h-4 w-4" />
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
