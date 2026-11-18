import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Source logo (public/images/logo1.jpeg). Its wide padding is cropped for small icons. */
const LOGO_PATH = path.join(process.cwd(), "public", "images", "logo1.jpeg");
const ZOOM = 1.65;

// Read once at module load (build time) so the icon routes prerender statically.
const logoSrc = `data:image/jpeg;base64,${(await readFile(LOGO_PATH)).toString("base64")}`;

/** Renders a square icon from the logo at build time (favicon / Apple touch icon). */
export function renderLogoIcon(size: number) {
  const scaled = Math.round(size * ZOOM);
  const offset = Math.round((scaled - size) / 2);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={scaled} height={scaled} alt="" style={{ position: "absolute", left: -offset, top: -offset }} />
      </div>
    ),
    { width: size, height: size },
  );
}
