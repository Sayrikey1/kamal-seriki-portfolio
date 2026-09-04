/**
 * Shared content contracts.
 *
 * Everything the site renders comes from `/data/*.ts` typed against these
 * interfaces, so content can be edited without touching presentation code.
 */

export type ProjectCategory =
  "ai-ml" | "nlp" | "computer-vision" | "fullstack" | "backend";

export interface ImageRef {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  category: ProjectCategory;
  /** Rendered as text badge chips — no third-party logos. */
  stack: string[];
  links: { github?: string; demo?: string };
  /** Flagship card (large, top of the grid) vs secondary grid entry. */
  highlight: boolean;
  /** Only verified, checkable numbers belong here. */
  metrics?: string[];
  /** Stays null until a real screenshot exists; drives the abstract fallback. */
  image?: ImageRef | null;
  /** Longer-form case study body, rendered on /projects/[slug]. */
  caseStudy?: {
    problem: string;
    approach: string[];
    outcome: string;
  };
  order: number;
}

export interface WorkExperience {
  company: string;
  role: string;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM" or "present" */
  endDate: string | "present";
  location: string;
  /** One-line description of what the company does. */
  summary: string;
  highlights: { label: string; detail: string }[];
  stack: string[];
  logo?: ImageRef | null;
  /** Optional note, e.g. an acquisition. */
  note?: string;
}

export interface SkillGroup {
  title: string;
  /** Lucide icon name, resolved in the Skills section. */
  icon: "brain" | "server" | "blocks" | "target" | "plug";
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  location: string;
  detail?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  kind: "certification" | "award";
  detail?: string;
}

export interface CommunityRole {
  organization: string;
  role: string;
}

export interface Quote {
  text: string;
  /** Verbatim attribution, honorifics included. Never trim "(PBUH)"/"(RA)". */
  author: string;
  /**
   * Which of the two traditions the pool draws on: the Islamic ethical
   * tradition, or classical military and leadership stoicism.
   */
  tradition: "islamic" | "classical";
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  citations: number;
  url?: string;
}

export interface Web3Fundamentals {
  title: string;
  description: string;
  skills: string[];
  repos: { name: string; description: string; url: string }[];
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  summary: string;
  /** Short punchy strapline for the hero. */
  strapline: string;
  /** Longer narrative for the About section. */
  about: string[];
  headshot: ImageRef;
  yearsExperience: number;
}

export interface Links {
  github: string;
  linkedin: string;
  scholar: string;
  email: string;
}
