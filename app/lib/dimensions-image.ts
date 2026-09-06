import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Dimensions réelles d'une image de public/ (lecture d'en-tête, au build).
 * Sert à renseigner width/height de l'ImageObject des articles sans valeur
 * codée en dur. Formats : WebP (VP8, VP8L, VP8X), PNG, JPEG.
 */

export type Dimensions = { width: number; height: number };

const cache = new Map<string, Dimensions | null>();

function lireWebp(b: Buffer): Dimensions | null {
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null;
  const bloc = b.toString("ascii", 12, 16);
  if (bloc === "VP8 ") {
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  if (bloc === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (bloc === "VP8X") {
    return {
      width: (b.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (b.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }
  return null;
}

function lirePng(b: Buffer): Dimensions | null {
  if (b.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function lireJpeg(b: Buffer): Dimensions | null {
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i++;
      continue;
    }
    const marqueur = b[i + 1];
    if (marqueur === 0xd8 || (marqueur >= 0xd0 && marqueur <= 0xd7) || marqueur === 0x01) {
      i += 2;
      continue;
    }
    const longueur = b.readUInt16BE(i + 2);
    const sof = (marqueur >= 0xc0 && marqueur <= 0xc3) || (marqueur >= 0xc5 && marqueur <= 0xc7) ||
      (marqueur >= 0xc9 && marqueur <= 0xcb) || (marqueur >= 0xcd && marqueur <= 0xcf);
    if (sof) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    i += 2 + longueur;
  }
  return null;
}

/** `chemin` est l'URL publique de l'image (ex. /assets/blog/x.webp). */
export function dimensionsImage(chemin: string): Dimensions | null {
  if (cache.has(chemin)) return cache.get(chemin)!;
  let resultat: Dimensions | null = null;
  try {
    const b = readFileSync(join(process.cwd(), "public", chemin));
    resultat = lireWebp(b) ?? lirePng(b) ?? lireJpeg(b);
  } catch {
    resultat = null;
  }
  cache.set(chemin, resultat);
  return resultat;
}
