import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Freelance Web Developer Portfolio",
  description:
    "Modernus freelancerių web programuotojo portfolio: darbai, paslaugos, kainos ir kontaktai.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Freelance Web Developer Portfolio",
    description:
      "Modernus freelancerių web programuotojo portfolio: darbai, paslaugos, kainos ir kontaktai.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <body className="min-h-screen bg-background-light text-foreground-light antialiased transition-colors duration-300 dark:bg-background-dark dark:text-foreground-dark">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

