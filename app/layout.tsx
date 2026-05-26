import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoFoundersHub — Find the Co-Founder Who Makes Your Startup Inevitable",
  description:
    "AI-powered co-founder matching for serious builders. 47-dimension compatibility scoring, verified commitment levels, and equity alignment tools. 12,400+ founders matched across 89 countries.",
  keywords: [
    "co-founder matching",
    "find co-founder",
    "startup co-founder",
    "founder network",
    "AI matchmaking",
    "equity split",
    "startup team",
  ],
  openGraph: {
    title: "CoFoundersHub — Find the Co-Founder Who Makes Your Startup Inevitable",
    description:
      "AI-powered co-founder matching for serious builders. 12,400+ founders matched. $240M raised by CoFoundersHub companies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoFoundersHub",
    description: "AI-powered co-founder matching for serious builders.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#06080f] text-slate-200 antialiased">{children}</body>
    </html>
  );
}
