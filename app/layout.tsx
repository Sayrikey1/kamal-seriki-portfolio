import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollDriver } from "@/components/scroll-driver";
import { SectionRail } from "@/components/section-rail";
import { CommandPalette } from "@/components/command-palette";
import { SceneBackdrop } from "@/components/three/scene-backdrop";
import { GlassFilterDefs } from "@/components/ui/glass-panel";
import { profile } from "@/data/profile";
import { links } from "@/data/links";
import { siteUrl } from "@/lib/site-url";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Senior AI Engineer & Backend Architect with 5+ years building fraud detection, recommender systems and distributed backends across fintech, healthcare and creator platforms. Python, Django, FastAPI, .NET and Solidity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — ${profile.title}`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  keywords: [
    "AI Engineer",
    "Backend Architect",
    "Machine Learning Engineer",
    "Python",
    "Django",
    "FastAPI",
    "RAG",
    "Recommender Systems",
    "Lagos",
    "Nigeria",
    "Kamal Seriki",
    "Kamaldeen Seriki",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.shortName} — Portfolio`,
    title: `${profile.shortName} — ${profile.title}`,
    description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — ${profile.title}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0f6" },
    { media: "(prefers-color-scheme: dark)", color: "#05070f" },
  ],
  // Declares first-class support for both themes. Correct HTML for a site that
  // ships its own light and dark palettes, and it is the signal auto-darkening
  // extensions (Dark Reader and similar) check before rewriting a page — those
  // rewrites both mangle the glass palette and trip React hydration warnings.
  colorScheme: "dark light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}${profile.headshot.src}`,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Lagos",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Backend Architecture",
    "Recommender Systems",
    "Retrieval-Augmented Generation",
    "Fraud Detection",
    "Solidity",
  ],
  sameAs: [links.github, links.linkedin, links.scholar],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <ThemeProvider>
          {/* First focusable element in the document, so a keyboard or screen
              reader user can skip the fixed nav entirely. */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <GlassFilterDefs />
          <SceneBackdrop />
          <ScrollDriver />
          <SiteNav />
          <SectionRail />
          <CommandPalette />
          <main id="main" tabIndex={-1} className="relative flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>

        <script
          type="application/ld+json"
          // Static, author-controlled JSON-LD — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
