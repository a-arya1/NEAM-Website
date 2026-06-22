import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";

export type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  interest: string;
  message: string;
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
      interest TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `;
}

async function readLocalSubmissions(): Promise<ContactSubmission[]> {
  try {
    const file = await readFile(submissionsFile, "utf8");
    return JSON.parse(file) as ContactSubmission[];
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
      interest,
      message
    FROM contact_submissions
    ORDER BY created_at DESC
  `;

  return rows as ContactSubmission[];
}

export async function hasRecentDuplicate(
  email: string,
  interest: string,
  message: string,
  duplicateWindowMs: number
) {
  const cutoff = new Date(Date.now() - duplicateWindowMs).toISOString();

  if (!hasDatabase()) {
    const submissions = await readLocalSubmissions();
    return submissions.some((submission) => {
      const isSamePerson = submission.email === email;
      const isSameContent =
        submission.interest === interest &&
        submission.message.toLowerCase() === message.toLowerCase();
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
      AND interest = ${interest}
      AND lower(message) = ${message.toLowerCase()}
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
    INSERT INTO contact_submissions (id, created_at, name, email, interest, message)
    VALUES (
      ${savedSubmission.id},
      ${savedSubmission.createdAt},
      ${savedSubmission.name},
      ${savedSubmission.email},
      ${savedSubmission.interest},
      ${savedSubmission.message}
    )
  `;

  return savedSubmission;
}
