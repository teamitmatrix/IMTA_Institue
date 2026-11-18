import { renderLogoIcon } from "@/lib/seo/logo-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon generated from the official logo at build time. */
export default function AppleIcon() {
  return renderLogoIcon(size.width);
}
