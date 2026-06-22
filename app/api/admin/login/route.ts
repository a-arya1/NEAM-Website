import { NextResponse } from "next/server";
import { adminCookieName, getAdminSessionValue } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const submittedKey = String(formData.get("adminKey") || "");
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || submittedKey !== adminKey) {
    return NextResponse.redirect(new URL("/admin/submissions", request.url), {
      status: 303
    });
  }

  const response = NextResponse.redirect(new URL("/admin/submissions", request.url), {
    status: 303
  });

  response.cookies.set(adminCookieName, getAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });

  return response;
}
