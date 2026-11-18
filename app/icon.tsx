import { renderLogoIcon } from "@/lib/seo/logo-icon";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generated from the official logo at build time. */
export default function Icon() {
  return renderLogoIcon(size.width);
}
