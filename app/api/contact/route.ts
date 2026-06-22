import { NextResponse } from "next/server";
import { hasRecentDuplicate, saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

const allowedRespondentTypes = new Set(["Student", "Parent"]);
const duplicateWindowMs = 10 * 60 * 1000;
const maxBodyBytes = 10_000;
const maxLengths = {
  name: 80,
  email: 120,
  studentLocation: 100,
  highSchool: 120,
  graduationYear: 4,
  meetingGoals: 1_500
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > maxBodyBytes) {
    return NextResponse.json(
      { error: "Your message is too large. Please shorten it and try again." },
      { status: 413 }
    );
  }

  const body = await request.json().catch(() => null);

  const name = cleanText(body?.name);
  const email = cleanText(body?.email).toLowerCase();
  const respondentType = cleanText(body?.respondentType);
  const studentLocation = cleanText(body?.studentLocation);
  const highSchool = cleanText(body?.highSchool);
  const graduationYear = cleanText(body?.graduationYear);
  const meetingGoals = cleanText(body?.meetingGoals);
  const website = cleanText(body?.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !name ||
    !email ||
    !respondentType ||
    !studentLocation ||
    !highSchool ||
    !graduationYear ||
    !meetingGoals
  ) {
    return NextResponse.json(
      { error: "Please complete every field before submitting." },
      { status: 400 }
    );
  }

  if (
    name.length > maxLengths.name ||
    email.length > maxLengths.email ||
    studentLocation.length > maxLengths.studentLocation ||
    highSchool.length > maxLengths.highSchool ||
    graduationYear.length > maxLengths.graduationYear ||
    meetingGoals.length > maxLengths.meetingGoals
  ) {
    return NextResponse.json(
      { error: "One or more fields are too long. Please shorten your response." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!allowedRespondentTypes.has(respondentType)) {
    return NextResponse.json(
      { error: "Please choose Student or Parent." },
      { status: 400 }
    );
  }

  if (!/^\d{4}$/.test(graduationYear)) {
    return NextResponse.json(
      { error: "Please enter a valid four-digit graduation year." },
      { status: 400 }
    );
  }

  const isDuplicate = await hasRecentDuplicate(
    email,
    respondentType,
    meetingGoals,
    duplicateWindowMs
  );

  if (isDuplicate) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await saveSubmission({
    name,
    email,
    respondentType,
    studentLocation,
    highSchool,
    graduationYear,
    meetingGoals
  });

  return NextResponse.json({ ok: true });
}
