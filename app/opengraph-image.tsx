import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so there is no designed OG asset to maintain.
 * Deliberately uses system fonts — fetching a webfont here would add a
 * build-time network dependency for no visual gain at this size.
 */
export default function OpengraphImage() {
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
          Portfolio
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{
            color: "#ffffff",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </span>
        <span style={{ color: "#5b8cff", fontSize: 38, fontWeight: 600 }}>
          {profile.title}
        </span>
        <span style={{ color: "#99a3bb", fontSize: 28, maxWidth: 900 }}>
          AI systems, distributed backends and decision tooling · Lagos, Nigeria
        </span>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {["Python", "Django", "FastAPI", ".NET", "RAG", "Solidity"].map(
          (item) => (
            <span
              key={item}
              style={{
                color: "#c9d4ec",
                fontSize: 22,
                padding: "10px 20px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>,
    size,
  );
}
