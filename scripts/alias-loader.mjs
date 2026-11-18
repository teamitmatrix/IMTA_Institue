// Resolves the "@/..." path alias (tsconfig paths) for Node scripts that
// import the app's TypeScript modules directly (Node 24 strips types natively).
import { existsSync } from "node:fs";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const candidates = (base) => [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")];

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(root, specifier.slice(2));
    const file = candidates(base).find((p) => existsSync(p) && !p.endsWith(path.sep));
    if (file) return next(pathToFileURL(file).href, context);
  }
  return next(specifier, context);
}
