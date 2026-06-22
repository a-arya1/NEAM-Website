import { createHash } from "crypto";

export const adminCookieName = "nym_admin";

export function getAdminSessionValue() {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return "";
  }

  return createHash("sha256").update(adminKey).digest("hex");
}

export function isAdminSession(value?: string) {
  const sessionValue = getAdminSessionValue();
  return Boolean(sessionValue && value === sessionValue);
}
