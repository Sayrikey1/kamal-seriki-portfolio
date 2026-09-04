import { ImageResponse } from "next/og";

import { caseStudyProjects, getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import type { ProjectCategory } from "@/types/content";

export const alt = `Case study — ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Category labels are duplicated here on purpose. `CATEGORY_STYLES` pulls in
 * lucide React components, and ImageResponse renders through a constrained
 * subset of CSS/JSX that is better off never touching an icon component.
 */
const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "ai-ml": "AI / ML",
  nlp: "NLP / RAG",
  "computer-vision": "Computer Vision",
  fullstack: "Full Stack",
  backend: "Backend",
};

/** Mirrors app/projects/[slug]/page.tsx — only written case studies get a route. */
export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

/**
 * Per-project OG card. Shares the ground, the two accent glows and the type
 * scale of app/opengraph-image.tsx so a shared case-study link reads as part
 * of the same set. System fonts only — a webfont fetch here would make the
 * build depend on the network for no visual gain at 1200×630.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  // A metadata route that throws breaks the build, so an unknown slug falls
  // back to the site-level card rather than erroring.
  const eyebrow = project ? "Case study" : "Portfolio";
  const category = project ? CATEGORY_LABELS[project.category] : null;
  const title = project ? project.title : profile.name;
  const supporting = project ? project.oneLiner : profile.title;
  const stack = project ? project.stack.slice(0, 5) : [];

  const titleSize = title.length > 28 ? 62 : title.length > 20 ? 72 : 82;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#05070f",
        padding: 72,
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -120,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(91,140,255,0.55), rgba(91,140,255,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(165,117,255,0.45), rgba(165,117,255,0) 70%)",
        }}
      />

      {/* ── Eyebrow: shared mark, kind of page, category ─────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #5b8cff, #a575ff)",
          }}
        />
        <span
          style={{
            color: "#99a3bb",
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        {category ? (
          <span
            style={{
              color: "#a9c2ff",
              fontSize: 22,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: 9999,
              background: "rgba(91,140,255,0.14)",
              border: "1px solid rgba(91,140,255,0.34)",
            }}
          >
            {category}
          </span>
        ) : null}
      </div>

      {/* ── Title + supporting line ───────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span
          style={{
            color: "#ffffff",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "#99a3bb",
            fontSize: 30,
            lineHeight: 1.35,
            maxWidth: 880,
          }}
        >
          {supporting}
        </span>
      </div>

      {/* ── Stack chips + byline ──────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {stack.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {stack.map((item) => (
              <span
                key={item}
                style={{
                  color: "#c9d4ec",
                  fontSize: 22,
                  fontFamily: "monospace",
                  letterSpacing: 0.5,
                  padding: "10px 20px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 2,
              background: "linear-gradient(90deg, #5b8cff, rgba(91,140,255,0))",
            }}
          />
          <span style={{ color: "#c9d4ec", fontSize: 24, fontWeight: 600 }}>
            {profile.name}
          </span>
          <span style={{ color: "#6f7a92", fontSize: 24 }}>
            {profile.title}
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
