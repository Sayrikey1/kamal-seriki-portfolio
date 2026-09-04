import { ArrowUpRight, Mail } from "lucide-react";
import { links } from "@/data/links";
import { profile } from "@/data/profile";
import {
  GitHubIcon,
  LinkedInIcon,
  ScholarIcon,
} from "@/components/ui/brand-icons";
import { CurrentYear } from "@/components/ui/current-year";

/** Evaluated once at build time; the client corrects it after mount. */
const BUILD_YEAR = new Date().getFullYear();

const social = [
  { href: links.github, label: "GitHub", Icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: links.scholar, label: "Google Scholar", Icon: ScholarIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-edge relative border-t py-12">
      <div className="section-shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-sm font-semibold">
            {profile.name}
          </span>
          <span className="text-fg-subtle text-sm">
            {profile.title} · Lagos, Nigeria
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${links.email}`}
            className="glass-1 text-fg-muted hover:text-fg inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors"
          >
            <Mail className="h-4 w-4" strokeWidth={1.7} />
            {links.email}
          </a>
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass-1 text-fg-muted hover:text-fg grid h-9 w-9 place-items-center transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="section-shell text-fg-subtle mt-8 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>
          © <CurrentYear buildYear={BUILD_YEAR} /> {profile.name}. All rights
          reserved.
        </span>
        <a
          href="#hero"
          className="hover:text-fg inline-flex items-center gap-1 transition-colors"
        >
          Back to top
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}
