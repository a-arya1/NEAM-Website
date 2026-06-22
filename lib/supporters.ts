import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";

export type SupporterInterest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
};

type NewSupporterInterest = Omit<SupporterInterest, "id" | "createdAt">;

const dataDirectory = path.join(process.cwd(), "data");
const supportersFile = path.join(dataDirectory, "supporters.json");

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
    CREATE TABLE IF NOT EXISTS support_interests (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `;
}

async function readLocalSupporters(): Promise<SupporterInterest[]> {
  try {
    const file = await readFile(supportersFile, "utf8");
    return JSON.parse(file) as SupporterInterest[];
  } catch {
    return [];
  }
}

async function writeLocalSupporter(supporter: SupporterInterest) {
  await mkdir(dataDirectory, { recursive: true });
  const supporters = await readLocalSupporters();
  supporters.unshift(supporter);
  await writeFile(supportersFile, JSON.stringify(supporters, null, 2));
}

export async function getSupporterInterests(): Promise<SupporterInterest[]> {
  if (!hasDatabase()) {
    return readLocalSupporters();
  }

  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      created_at AS "createdAt",
      name,
      email
    FROM support_interests
    ORDER BY created_at DESC
  `;

  return rows as SupporterInterest[];
}

export async function hasRecentSupporterDuplicate(email: string, duplicateWindowMs: number) {
  const cutoff = new Date(Date.now() - duplicateWindowMs).toISOString();

  if (!hasDatabase()) {
    const supporters = await readLocalSupporters();
    return supporters.some((supporter) => {
      const isSamePerson = supporter.email === email;
      const submittedRecently = supporter.createdAt > cutoff;

      return isSamePerson && submittedRecently;
    });
  }

  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    SELECT id
    FROM support_interests
    WHERE email = ${email}
      AND created_at > ${cutoff}
    LIMIT 1
  `;

  return rows.length > 0;
}

export async function saveSupporterInterest(supporter: NewSupporterInterest) {
  const savedSupporter: SupporterInterest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...supporter
  };

  if (!hasDatabase()) {
    await writeLocalSupporter(savedSupporter);
    return savedSupporter;
  }

  await ensureTable();
  const sql = getSql();
  await sql`
    INSERT INTO support_interests (id, created_at, name, email)
    VALUES (
      ${savedSupporter.id},
      ${savedSupporter.createdAt},
      ${savedSupporter.name},
      ${savedSupporter.email}
    )
  `;

  return savedSupporter;
}
