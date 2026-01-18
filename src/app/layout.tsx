import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ems.bharuch.gov.in"),
  title: {
    default: "DDO Bharuch | Employee Management System",
    template: "%s | DDO Bharuch",
  },
  description:
    "A modern, high-performance Employee Management System for District Development Office, Bharuch. Features attendance tracking, payroll management, and announcements.",
  keywords: [
    "Employee Management",
    "DDO Bharuch",
    "HRMS",
    "Attendance Tracking",
    "Payroll System",
    "Next.js",
    "Prisma",
  ],
  authors: [{ name: "District Panchayat Bharuch" }],
  creator: "IT Department - DDO Bharuch",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ems.bharuch.gov.in",
    siteName: "DDO Bharuch EMS",
    title: "DDO Bharuch | Employee Management System",
    description:
      "Streamlined administration and employee management for DDO Bharuch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DDO Bharuch EMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DDO Bharuch | Employee Management System",
    description:
      "Streamlined administration and employee management for DDO Bharuch.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background text-foreground antialiased font-sans",
        )}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
