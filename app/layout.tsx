import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Noro Studio";
const defaultTitle = "Noro Studio | Interneto svetainių kūrimas";
const defaultDescription =
  "Noro Studio kuria modernias interneto svetaines, portfolio ir verslo puslapius: dizainas, programavimas, SEO ir palaikymas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  keywords: [
    "Noro Studio",
    "interneto svetainių kūrimas",
    "svetainių dizainas",
    "web programuotojas",
    "portfolio kūrimas",
    "SEO optimizacija"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "lt_LT",
    images: [
      {
        url: "/logo/Logo.svg",
        width: 1200,
        height: 630,
        alt: "Noro Studio logotipas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo/Logo.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
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

