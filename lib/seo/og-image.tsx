import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  chips?: string[];
};

const NAVY = "#081230";
const BRAND = "#2e5bff";
const GLOW = "#6f8dff";
const MUTED = "#a7b2cf";

/** Branded 1200×630 social card, prerendered at build time. Facts only. */
export function renderOgCard({ eyebrow, title, subtitle, chips = [] }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 88% 12%, rgba(46,91,255,0.55), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: BRAND,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {site.logoBadge}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: GLOW }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 34 ? 64 : 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? <div style={{ fontSize: 30, color: MUTED, maxWidth: 980, lineHeight: 1.3 }}>{subtitle}</div> : null}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.22)",
                backgroundColor: "rgba(255,255,255,0.06)",
                fontSize: 24,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
