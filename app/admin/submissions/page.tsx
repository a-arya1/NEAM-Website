import { cookies } from "next/headers";
import Link from "next/link";
import { adminCookieName, isAdminSession } from "@/lib/adminAuth";
import { getSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const adminKey = process.env.ADMIN_KEY;
  const cookieStore = await cookies();
  const isProtected = Boolean(adminKey);
  const isAuthorized = isProtected
    ? isAdminSession(cookieStore.get(adminCookieName)?.value)
    : false;
  const submissions = isAuthorized ? await getSubmissions() : [];

  return (
    <main className="min-h-screen bg-mist py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">NYM Admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-navy-950">
              Contact Form Submissions
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              These are responses saved from the NYM student and parent
              information form.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="focus-ring inline-flex rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
            >
              Back to website
            </Link>
            {isAuthorized ? (
              <form action="/api/admin/logout" method="POST">
                <button className="focus-ring inline-flex rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-50">
                  Log out
                </button>
              </form>
            ) : null}
          </div>
        </div>

        {!isProtected ? (
          <section className="rounded border border-red-200 bg-red-50 p-6 text-sm leading-7 text-red-900">
            This admin page is locked because no ADMIN_KEY environment variable
            is set. Add ADMIN_KEY before viewing submissions.
          </section>
        ) : null}

        {isProtected && !isAuthorized ? (
          <section className="max-w-lg rounded border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-navy-950">Admin login</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Enter the admin key from your environment variables to view saved responses.
            </p>
            <form action="/api/admin/login" method="POST" className="mt-5">
              <label className="block">
                <span className="text-sm font-semibold text-navy-950">Admin key</span>
                <input
                  required
                  type="password"
                  name="adminKey"
                  className="focus-ring mt-2 w-full rounded border border-slate-300 px-4 py-3 text-sm"
                  placeholder="Enter admin key"
                />
              </label>
              <button className="focus-ring mt-5 rounded bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800">
                View submissions
              </button>
            </form>
          </section>
        ) : null}

        {isAuthorized ? (
          <section className="rounded border border-slate-200 bg-white shadow-soft">
            {submissions.length === 0 ? (
              <div className="p-6 text-sm text-slate-600">No submissions yet.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {submissions.map((submission) => (
                  <article key={submission.id} className="p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-navy-950">
                          {submission.name}
                        </h2>
                        <a
                          href={`mailto:${submission.email}`}
                          className="mt-1 inline-flex text-sm font-medium text-navy-700 hover:text-navy-900"
                        >
                          {submission.email}
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="rounded bg-navy-50 px-3 py-1 text-navy-800">
                          {submission.respondentType}
                        </span>
                        <span className="rounded bg-slate-100 px-3 py-1 text-slate-600">
                          {new Date(submission.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                      <div className="rounded bg-mist p-3">
                        <dt className="font-semibold text-navy-950">Michigan area</dt>
                        <dd className="mt-1 text-slate-600">
                          {submission.studentLocation || "Not provided"}
                        </dd>
                      </div>
                      <div className="rounded bg-mist p-3">
                        <dt className="font-semibold text-navy-950">High school</dt>
                        <dd className="mt-1 text-slate-600">
                          {submission.highSchool || "Not provided"}
                        </dd>
                      </div>
                      <div className="rounded bg-mist p-3">
                        <dt className="font-semibold text-navy-950">Graduation year</dt>
                        <dd className="mt-1 text-slate-600">
                          {submission.graduationYear || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                    <h3 className="mt-5 text-sm font-semibold text-navy-950">
                      What they want from a meeting
                    </h3>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {submission.meetingGoals}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </div>
    </main>
  );
}
