import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  keywords: profile.seo.keywords,
  authors: [{ name: profile.fullName }],
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    url: "/",
    siteName: profile.fullName,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060809" },
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin Mwangi",
  jobTitle: "Graduate Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
  },
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "Backend Systems",
    "Databases",
    "Cloud Computing",
    "Computer Networks",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground selection:bg-green/25`}
      >
        <Providers>{children}</Providers>
        <div className="grain no-print" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
