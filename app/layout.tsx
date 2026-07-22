import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neamyouth.vercel.app"),
  title: "NYA | Nepali Youth of America",
  description:
    "Nepali Youth of America helps students and families access mentorship, resources, and opportunities for college preparation and future success.",
  keywords: [
    "Nepali Youth of America",
    "NYA",
    "Nepalese Association of Michigan",
    "NeAM",
    "college readiness",
    "student mentorship",
    "Nepali American community"
  ],
  openGraph: {
    title: "Nepali Youth of America",
    description:
      "A community education initiative supporting Nepali students and families through college readiness, mentorship, and future planning.",
    type: "website",
    images: ["/images/nym-zoom-poster.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white font-sans text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
