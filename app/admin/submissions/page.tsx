import { cookies } from "next/headers";
import Link from "next/link";
import { adminCookieName, isAdminSession } from "@/lib/adminAuth";
import { getSupporterInterests } from "@/lib/supporters";
import { getSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const adminKey = process.env.ADMIN_KEY;
  const cookieStore = await cookies();
  const isProtected = Boolean(adminKey);
  const isAuthorized = isProtected
    ? isAdminSession(cookieStore.get(adminCookieName)?.value)
    : false;
  const supporters = isAuthorized ? await getSupporterInterests() : [];
  const submissions = isAuthorized ? await getSubmissions() : [];
  const projectApplications = submissions.filter(
    (submission) => submission.respondentType === "Personal Project Applicant"
  );

  return (
    <main className="min-h-screen bg-mist py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">NYA Admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-navy-950">
              Support & Join Requests
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              These are requests from people who want to support or join NYA.
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
          <div className="space-y-8">
            <section className="rounded border border-slate-200 bg-white shadow-soft">
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-xl font-semibold text-navy-950">Personal Project Applications</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Students applying for one of the five guided project spots.</p>
              </div>
              {projectApplications.length === 0 ? (
                <div className="p-6 text-sm text-slate-600">No project applications yet.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {projectApplications.map((application) => (
                    <article key={application.id} className="p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-navy-950">{application.name}</h3>
                          <a href={`mailto:${application.email}`} className="mt-1 inline-flex text-sm font-medium text-navy-700 hover:text-navy-900">{application.email}</a>
                        </div>
                        <span className="rounded bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{new Date(application.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="mt-4 text-sm text-slate-600">{application.highSchool} · Class of {application.graduationYear} · {application.studentLocation}</p>
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{application.meetingGoals}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <section className="rounded border border-slate-200 bg-white shadow-soft">
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-xl font-semibold text-navy-950">
                  Support & Join Interest
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  People who want NYA to follow up about joining, volunteering, endorsing, or offering support.
                </p>
              </div>
              {supporters.length === 0 ? (
                <div className="p-6 text-sm text-slate-600">No support interest yet.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {supporters.map((supporter) => (
                    <article key={supporter.id} className="p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-navy-950">
                            {supporter.name}
                          </h3>
                          <a
                            href={`mailto:${supporter.email}`}
                            className="mt-1 inline-flex text-sm font-medium text-navy-700 hover:text-navy-900"
                          >
                            {supporter.email}
                          </a>
                        </div>
                        <span className="rounded bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {new Date(supporter.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-navy-900">
                        {supporter.interest || "Support programs"}
                      </p>
                      {supporter.message ? (
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                          {supporter.message}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </section>

          </div>
        ) : null}
      </div>
    </main>
  );
}
