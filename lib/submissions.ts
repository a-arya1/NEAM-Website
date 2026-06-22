import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";

export type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  respondentType: string;
  studentLocation: string;
  highSchool: string;
  graduationYear: string;
  meetingGoals: string;
};

type NewSubmission = Omit<ContactSubmission, "id" | "createdAt">;

const dataDirectory = path.join(process.cwd(), "data");
const submissionsFile = path.join(dataDirectory, "submissions.json");

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(process.env.DATABASE_URL);
}

async function ensureTable() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      interest TEXT,
      message TEXT,
      respondent_type TEXT,
      student_location TEXT,
      high_school TEXT,
      graduation_year TEXT,
      meeting_goals TEXT
    )
  `;

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS respondent_type TEXT,
    ADD COLUMN IF NOT EXISTS student_location TEXT,
    ADD COLUMN IF NOT EXISTS high_school TEXT,
    ADD COLUMN IF NOT EXISTS graduation_year TEXT,
    ADD COLUMN IF NOT EXISTS meeting_goals TEXT
  `;
}

async function readLocalSubmissions(): Promise<ContactSubmission[]> {
  try {
    const file = await readFile(submissionsFile, "utf8");
    const submissions = JSON.parse(file) as Array<Partial<ContactSubmission> & {
      interest?: string;
      message?: string;
    }>;

    return submissions.map((submission) => ({
      id: submission.id || randomUUID(),
      createdAt: submission.createdAt || new Date().toISOString(),
      name: submission.name || "",
      email: submission.email || "",
      respondentType: submission.respondentType || submission.interest || "",
      studentLocation: submission.studentLocation || "",
      highSchool: submission.highSchool || "",
      graduationYear: submission.graduationYear || "",
      meetingGoals: submission.meetingGoals || submission.message || ""
    }));
  } catch {
    return [];
  }
}

async function writeLocalSubmission(submission: ContactSubmission) {
  await mkdir(dataDirectory, { recursive: true });
  const submissions = await readLocalSubmissions();
  submissions.unshift(submission);
  await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  if (!hasDatabase()) {
    return readLocalSubmissions();
  }

  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      created_at AS "createdAt",
      name,
      email,
      COALESCE(respondent_type, interest, '') AS "respondentType",
      COALESCE(student_location, '') AS "studentLocation",
      COALESCE(high_school, '') AS "highSchool",
      COALESCE(graduation_year, '') AS "graduationYear",
      COALESCE(meeting_goals, message, '') AS "meetingGoals"
    FROM contact_submissions
    ORDER BY created_at DESC
  `;

  return rows as ContactSubmission[];
}

export async function hasRecentDuplicate(
  email: string,
  respondentType: string,
  meetingGoals: string,
  duplicateWindowMs: number
) {
  const cutoff = new Date(Date.now() - duplicateWindowMs).toISOString();

  if (!hasDatabase()) {
    const submissions = await readLocalSubmissions();
    return submissions.some((submission) => {
      const isSamePerson = submission.email === email;
      const isSameContent =
        submission.respondentType === respondentType &&
        submission.meetingGoals.toLowerCase() === meetingGoals.toLowerCase();
      const submittedRecently = submission.createdAt > cutoff;

      return isSamePerson && isSameContent && submittedRecently;
    });
  }

  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    SELECT id
    FROM contact_submissions
    WHERE email = ${email}
      AND COALESCE(respondent_type, interest, '') = ${respondentType}
      AND lower(COALESCE(meeting_goals, message, '')) = ${meetingGoals.toLowerCase()}
      AND created_at > ${cutoff}
    LIMIT 1
  `;

  return rows.length > 0;
}

export async function saveSubmission(submission: NewSubmission) {
  const savedSubmission: ContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...submission
  };

  if (!hasDatabase()) {
    await writeLocalSubmission(savedSubmission);
    return savedSubmission;
  }

  await ensureTable();
  const sql = getSql();
  await sql`
    INSERT INTO contact_submissions (
      id,
      created_at,
      name,
      email,
      respondent_type,
      student_location,
      high_school,
      graduation_year,
      meeting_goals
    )
    VALUES (
      ${savedSubmission.id},
      ${savedSubmission.createdAt},
      ${savedSubmission.name},
      ${savedSubmission.email},
      ${savedSubmission.respondentType},
      ${savedSubmission.studentLocation},
      ${savedSubmission.highSchool},
      ${savedSubmission.graduationYear},
      ${savedSubmission.meetingGoals}
    )
  `;

  return savedSubmission;
}
