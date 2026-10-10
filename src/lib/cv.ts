import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/** Public URL of the CV PDF. */
export const cvHref = `/cv/${site.cvFileName}`;

/**
 * True when public/cv/<cvFileName> exists. Checked on the server at build time,
 * so the download buttons switch on automatically once the PDF is added.
 */
export function isCvAvailable(): boolean {
  try {
    return existsSync(path.join(process.cwd(), "public", "cv", site.cvFileName));
  } catch {
    return false;
  }
}
