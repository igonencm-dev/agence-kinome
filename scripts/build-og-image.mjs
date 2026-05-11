/**
 * Génère l'image Open Graph par défaut + l'icône Apple Touch.
 * Utilise sharp (sous-dépendance de Next.js).
 *
 * Lancer : `node scripts/build-og-image.mjs`
 *
 * Le logo Kinome complet (6 paths : K-I-N-O-M-E) est lu depuis
 * public/assets/logo-kinome.svg et inline dans le SVG OG pour garantir
 * la fidélité (et éviter les bugs comme "Kino" tronqué).
 */
import sharp from "sharp";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const APP = join(ROOT, "app");

mkdirSync(join(PUBLIC, "og"), { recursive: true });

// --- Récupère le logo Kinome complet et extrait les paths ----------------
// Le SVG source utilise `fill="var(--fill-0, white)"`. On le remplace
// par #f9f7f2 (cream) pour qu'il s'affiche correctement sur fond sombre.
const logoRaw = readFileSync(join(PUBLIC, "assets", "logo-kinome.svg"), "utf8");
// Extrait le contenu intérieur du <svg> (les <g>...<path>...</g>)
const inner = logoRaw
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "")
  .replace(/fill="var\(--fill-0,\s*white\)"/g, 'fill="#f9f7f2"');

// Le logo a un viewBox 0 0 156 34 (ratio ~4.6). À scale 2.5 = 390x85px.
// Positionné en (80, 75) du canvas 1200×630.
const logoMarkup = `<g transform="translate(80 75) scale(2.5)">${inner}</g>`;

// ----- SVG OG : 1200×630, identité Kinome ----------------------------------
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#222222"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <!-- Halo lumineux subtil -->
  <circle cx="950" cy="200" r="260" fill="#e04034" opacity="0.06"/>
  <circle cx="200" cy="500" r="220" fill="#f9f7f2" opacity="0.04"/>

  <!-- Logo Kinome complet (lu depuis logo-kinome.svg) -->
  ${logoMarkup}

  <!-- Tagline principale -->
  <text x="80" y="350" font-family="Krub, Helvetica, Arial, sans-serif"
        font-size="68" font-weight="400" fill="#f9f7f2" letter-spacing="-1">
    Agence de communication
  </text>
  <text x="80" y="430" font-family="Krub, Helvetica, Arial, sans-serif"
        font-size="68" font-weight="400" fill="#f9f7f2" letter-spacing="-1">
    indépendante à <tspan fill="#e04034">Genève</tspan>.
  </text>

  <!-- Sub-tagline -->
  <text x="80" y="510" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="300" fill="#f9f7f2" opacity="0.75">
    Branding · Identité visuelle · Sites internet · Communication digitale
  </text>

  <!-- URL en bas -->
  <text x="80" y="585" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="22" font-weight="500" fill="#f9f7f2" opacity="0.5">
    agence-kinome.ch
  </text>

  <!-- Bandeau accent fin en bas -->
  <rect x="0" y="610" width="1200" height="20" fill="#e04034" opacity="0.85"/>
</svg>`;

// Écrit le SVG (utile pour debug)
writeFileSync(join(PUBLIC, "og", "og-default.svg"), ogSvg);

// Convertit en PNG 1200×630
await sharp(Buffer.from(ogSvg))
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(PUBLIC, "og", "og-default.png"));

console.log("✓ og-default.png régénéré (1200×630) — logo Kinome complet");

// ----- Favicons cohérents : tous générés depuis le MÊME SVG du "K" Kinome
// (sinon on a parfois icon.png en désync avec favicon.ico ; certains navigateurs
// préfèrent icon.png et affichent une autre icône que la favicon.ico).

const kIconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#111111"/>
  <g transform="translate(${size * 0.32} ${size * 0.22}) scale(${size / 60})">
    <path d="M6.21 0.96V14.56L18.40 0.24L22.99 3.77L13.33 14.95L26.91 33.43H19.21L9.27 19.67L6.21 23.26V33.43H0V0.96H6.21Z" fill="#f9f7f2"/>
  </g>
</svg>`;

// Apple touch icon : 180×180 (iOS) — fond noir + K cream
await sharp(Buffer.from(kIconSvg(180)))
  .resize(180, 180)
  .png()
  .toFile(join(APP, "apple-icon.png"));
console.log("✓ apple-icon.png (180×180) — K Kinome");

// Icon PNG : 192×192 (Android, Web App Manifest) — MÊME design que favicon.ico
await sharp(Buffer.from(kIconSvg(192)))
  .resize(192, 192)
  .png()
  .toFile(join(APP, "icon.png"));
console.log("✓ icon.png (192×192) — K Kinome (régénéré, fix favicon différent)");

// Favicon ICO : 32×32 — MÊME design
const png32 = await sharp(Buffer.from(kIconSvg(64)))
  .resize(32, 32)
  .png()
  .toBuffer();
writeFileSync(join(APP, "favicon.ico"), png32);
console.log("✓ favicon.ico (32×32) — K Kinome");

console.log("\nTerminé. Les 3 favicons sont désormais visuellement identiques.");
