import { NextResponse } from "next/server";
import { hasRecentDuplicate, saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

const allowedInterests = new Set(["Student", "Parent", "Volunteer", "Partner"]);
const duplicateWindowMs = 10 * 60 * 1000;
const maxBodyBytes = 10_000;
const maxLengths = {
  name: 80,
  email: 120,
  message: 1_500
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
  const interest = cleanText(body?.interest);
  const message = cleanText(body?.message);
  const website = cleanText(body?.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !interest || !message) {
    return NextResponse.json(
      { error: "Please complete every field before submitting." },
      { status: 400 }
    );
  }

  if (
    name.length > maxLengths.name ||
    email.length > maxLengths.email ||
    message.length > maxLengths.message
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

  if (!allowedInterests.has(interest)) {
    return NextResponse.json(
      { error: "Please choose a valid interest option." },
      { status: 400 }
    );
  }

  const isDuplicate = await hasRecentDuplicate(email, interest, message, duplicateWindowMs);

  if (isDuplicate) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await saveSubmission({ name, email, interest, message });

  return NextResponse.json({ ok: true });
}
