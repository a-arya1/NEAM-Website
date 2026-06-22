import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/submissions", request.url), {
    status: 303
  });

  response.cookies.delete(adminCookieName);
  return response;
}
