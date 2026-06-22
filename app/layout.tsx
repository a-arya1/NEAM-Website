import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Nepali Youth of Michigan | College Readiness & Future Success",
  description:
    "Nepali Youth of Michigan helps students and families access mentorship, resources, and opportunities for college preparation and future success.",
  keywords: [
    "Nepali Youth of Michigan",
    "NYM",
    "Nepalese Association of Michigan",
    "NeAM",
    "college readiness",
    "student mentorship",
    "Michigan Nepali community"
  ],
  openGraph: {
    title: "Nepali Youth of Michigan",
    description:
      "A community education initiative supporting Nepali students and families through college readiness, mentorship, and future planning.",
    type: "website",
    images: ["/images/nym-flyer.jpeg"]
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
