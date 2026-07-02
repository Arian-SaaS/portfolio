import fs from "node:fs";
import path from "node:path";

const CANDIDATES = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"];

/** Returns the public URL of public/images/profile.* if present, otherwise null. */
export function getProfilePhotoUrl(): string | null {
  for (const file of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", file))) {
      return `/images/${file}`;
    }
  }
  return null;
}
