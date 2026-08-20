import type { Metadata } from "next";
import { Instrument_Serif, Public_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

const sans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Noro Studio";
const defaultTitle = "Noro Studio | Interneto svetainių kūrimas";
const defaultDescription =
  "Noro Studio kuria modernias interneto svetaines, portfolio ir verslo puslapius: dizainas, programavimas, SEO ir palaikymas.";

function getMetadataBase() {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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
    icon: [{ url: "/logo/LogoSmall.svg", type: "image/svg+xml" }],
    shortcut: ["/logo/LogoSmall.svg"],
    apple: [{ url: "/logo/LogoSmall.svg", type: "image/svg+xml" }]
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
        width: 1500,
        height: 1500,
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
    <html lang="lt" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
