import { NextResponse } from "next/server";
import { hasRecentSupporterDuplicate, saveSupporterInterest } from "@/lib/supporters";

export const runtime = "nodejs";

const duplicateWindowMs = 10 * 60 * 1000;
const maxBodyBytes = 5_000;
const maxLengths = {
  name: 80,
  email: 120
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
      { error: "Your submission is too large. Please try again." },
      { status: 413 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = cleanText(body?.name);
  const email = cleanText(body?.email).toLowerCase();
  const website = cleanText(body?.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please enter your name and email." },
      { status: 400 }
    );
  }

  if (name.length > maxLengths.name || email.length > maxLengths.email) {
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

  const isDuplicate = await hasRecentSupporterDuplicate(email, duplicateWindowMs);

  if (isDuplicate) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await saveSupporterInterest({ name, email });

  return NextResponse.json({ ok: true });
}
