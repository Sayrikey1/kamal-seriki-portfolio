# Kamal Seriki — Portfolio

Personal site for Kamaldeen Seriki, Senior AI Engineer & Backend Architect.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React Three Fiber,
GSAP ScrollTrigger and Motion. Dark and light themes, an Apple-style liquid-glass
UI system, and a single persistent 3D glass object driven by scroll position.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Editing your content

**All content lives in `/data`. You never need to touch a component to update the
site.** Each file is plain typed TypeScript, so a typo becomes a build error rather
than a silently broken page.

| File | What it holds |
| --- | --- |
| `data/profile.ts` | Name, title, location, email, hero strapline, About paragraphs |
| `data/links.ts` | GitHub / LinkedIn / Scholar / email, and the nav section list |
| `data/work-experience.ts` | The six roles, newest first |
| `data/projects.ts` | Flagship + secondary projects, and the two case studies |
| `data/web3-fundamentals.ts` | The grouped Solidity/Foundry track |
| `data/skills.ts` | The five capability groups |
| `data/education.ts` | Degree |
| `data/certifications.ts` | Certifications, awards, community roles |
| `data/publications.ts` | The three papers and Scholar profile summary |

Shapes for all of these are defined in `types/content.ts`.

### Adding a project

Append an entry to `projects` in `data/projects.ts`. Set `highlight: true` for a
large flagship card, `false` for the compact "Also built" grid. Add a `caseStudy`
object and it automatically gets its own page at `/projects/<slug>`, appears in the
sitemap, and gets a "Read case study" link on its card — no routing to wire up.

### Adding real screenshots or company logos

The site currently draws project art from a category → gradient/icon system and
company marks from deterministic monograms, so nothing looks like a missing asset.
To swap in real images:

1. Drop the file at `public/images/projects/<slug>.png` (or
   `public/images/companies/<company>.png`).
2. Set the `image` field on that entry:

   ```ts
   image: { src: "/images/projects/code-and-clause.png", alt: "Code & Clause interface" }
   ```

The card component switches from the abstract visual to the real image on its own.
Leaving `image: null` keeps the generated art.

## Design system

Glass surfaces come in three tiers, defined in `app/globals.css`:

- `.glass-1` — chips, pills, small controls
- `.glass-2` — cards and panels (the workhorse)
- `.glass-3` — nav, hero, contact panel

Modifiers: `.glass-sheen` (cursor-tracked specular highlight), `.glass-edge`
(top-edge light catch), `.glass-hover`, and `.glass-refract` (true SVG edge
refraction). **Refraction is capped at three elements per page** — the nav, the
hero portrait frame, and the contact panel — because the displacement filter is
not reliably GPU-composited. Adding a fourth will cost real frames.

Theme tokens are defined for light on `:root` and overridden on `.dark`, including
a dedicated glass token set (`--glass-bg`, `--glass-border`, `--glass-edge-top`,
`--glass-blur`). Light mode uses a denser glass fill so panels don't wash out;
dark mode uses a thinner fill with a brighter specular edge.

## Performance and accessibility guardrails

These are deliberate. Please don't remove them without a replacement:

- The 3D canvas is mounted **once**, in the root layout — never per section, because
  mobile browsers cap concurrent WebGL contexts.
- It does not render at all below 768px, on devices reporting ≤ 4 GiB memory or
  ≤ 4 cores, when WebGL is unavailable, or when `prefers-reduced-motion` is set.
  Those visitors get the ambient gradient backdrop, which is always painted.
- Device pixel ratio is capped at 2 (`dpr={[1, 2]}`).
- The render loop stops when the tab is backgrounded.
- The three.js chunk is dynamically imported and deferred to idle so it never
  competes with the hero's LCP.
- Blur radius drops from 40px to 14px under 768px.
- `prefers-reduced-motion` is a hard gate on GSAP scrubbing, parallax, object
  rotation and entrance animation — not a softened version of them.

## Deployment

Set up for Vercel with zero config. Every route is statically prerendered.

```bash
npx vercel        # preview
npx vercel --prod # production
```

When a custom domain is attached, set `NEXT_PUBLIC_SITE_URL` to it (e.g.
`https://kamalseriki.com`). That single variable feeds `metadataBase`, the
canonical URL, the sitemap, `robots.txt` and the JSON-LD `Person` schema. Until
then it defaults to the Vercel subdomain.

The OG share image is generated at build time from `app/opengraph-image.tsx` —
there's no image asset to maintain.
