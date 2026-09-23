import type { Links } from "@/types/content";

export const links: Links = {
  github: "https://github.com/Sayrikey1",
  linkedin: "https://www.linkedin.com/in/kamal-seriki/",
  scholar: "https://scholar.google.com/citations?user=GiWNXLUAAAAJ&hl=en",
  email: "kamalseriki49@gmail.com",
};

/**
 * The GitHub profile README repo, and the quote pool inside it that the daily
 * quote section mirrors. Note the branch is `master`, not `main`.
 */
export const profileRepo = "https://github.com/Sayrikey1/Sayrikey1";
export const quotesSource = `${profileRepo}/blob/master/quotes/quotes.json`;

/**
 * Downloadable CV, served from /public. The filename is what the visitor's
 * browser saves, so it carries the full name rather than a repo-style slug.
 *
 * To publish an updated CV, replace the file at
 * public/Kamaldeen-Seriki-Resume.pdf — no code change needed.
 */
export const resume = {
  href: "/Kamaldeen-Seriki-Resume.pdf",
  filename: "Kamaldeen-Seriki-Resume.pdf",
  /** Shown next to the download control so the weight is not a surprise. */
  sizeLabel: "349 KB",
} as const;

/** Section anchors, shared by the nav and the scroll choreography. */
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
