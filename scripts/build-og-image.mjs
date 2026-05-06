/**
 * Génère l'image Open Graph par défaut + l'icône Apple Touch.
 * Utilise sharp (sous-dépendance de Next.js).
 *
 * Lancer : `node scripts/build-og-image.mjs`
 */
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const APP = join(ROOT, "app");

mkdirSync(join(PUBLIC, "og"), { recursive: true });

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
  <!-- Logo Kinome (cream sur fond sombre) -->
  <g transform="translate(80 90) scale(2.2)">
    <path d="M6.21 0.96V14.56L18.40 0.24L22.99 3.77L13.33 14.95L26.91 33.43H19.21L9.27 19.67L6.21 23.26V33.43H0V0.96H6.21Z" fill="#f9f7f2"/>
    <path d="M33.10 0C34.08 0 34.92 0.33 35.61 1.00C36.29 1.67 36.63 2.50 36.63 3.49C36.63 4.47 36.29 5.30 35.61 5.97C34.92 6.64 34.08 6.97 33.10 6.97C32.11 6.97 31.33 6.64 30.66 5.97C29.99 5.30 29.66 4.47 29.66 3.49C29.66 2.50 29.99 1.67 30.66 1.00C31.33 0.33 32.14 0 33.10 0ZM36.20 10.27V33.43H29.99V10.27H36.20Z" fill="#f9f7f2"/>
    <path d="M46.26 12.75C47.32 11.70 48.63 10.87 50.21 10.27C51.78 9.66 53.19 9.36 54.44 9.36C57.59 9.36 59.83 10.28 61.15 12.13C62.47 13.97 63.14 16.24 63.14 18.91V33.43H56.92V19.20C56.92 17.73 56.57 16.61 55.87 15.83C55.17 15.05 54.15 14.66 52.81 14.66C51.92 14.66 50.99 14.89 50.02 15.35C49.04 15.81 48.16 16.35 47.36 16.95V33.43H41.15V10.27H44.40L46.26 12.75Z" fill="#f9f7f2"/>
    <path d="M86.94 13.06C84.82 10.79 81.83 9.65 77.98 9.65C74.12 9.65 71.31 10.74 69.16 12.94C67.01 15.14 65.93 18.09 65.93 21.78C65.93 25.46 66.96 28.47 69.01 30.68C71.07 32.90 73.93 34 77.59 34C81.26 34 84.38 32.93 86.67 30.78C88.97 28.63 90.12 25.71 90.12 22.01C90.12 18.32 89.06 15.34 86.94 13.06ZM83.69 22.72V23.98C83.69 26.59 81.56 28.71 78.93 28.71H77.09C74.46 28.71 72.32 26.59 72.32 23.98V19.67C72.32 17.07 74.46 14.95 77.09 14.95H78.93C81.56 14.95 83.69 17.07 83.69 19.67V21.42Z" fill="#f9f7f2"/>
  </g>

  <!-- Tagline principale -->
  <text x="80" y="350" font-family="Krub, Helvetica, Arial, sans-serif"
        font-size="72" font-weight="400" fill="#f9f7f2" letter-spacing="-1">
    Agence de communication
  </text>
  <text x="80" y="430" font-family="Krub, Helvetica, Arial, sans-serif"
        font-size="72" font-weight="400" fill="#f9f7f2" letter-spacing="-1">
    indépendante à <tspan fill="#e04034">Genève</tspan>.
  </text>

  <!-- Sub-tagline -->
  <text x="80" y="510" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="300" fill="#f9f7f2" opacity="0.75">
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

// Écrit le SVG (utile en debug)
writeFileSync(join(PUBLIC, "og", "og-default.svg"), ogSvg);

// Convertit en PNG 1200×630
await sharp(Buffer.from(ogSvg))
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(PUBLIC, "og", "og-default.png"));

console.log("✓ og-default.png généré (1200×630)");

// ----- Apple touch icon : 180×180, fond noir + K -------------------------
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#111111"/>
  <g transform="translate(60 40) scale(2.2)">
    <path d="M6.21 0.96V14.56L18.40 0.24L22.99 3.77L13.33 14.95L26.91 33.43H19.21L9.27 19.67L6.21 23.26V33.43H0V0.96H6.21Z" fill="#f9f7f2"/>
  </g>
</svg>`;

await sharp(Buffer.from(appleSvg))
  .png()
  .toFile(join(APP, "apple-icon.png"));

console.log("✓ apple-icon.png généré (180×180)");

// ----- Favicon ICO 32×32 (PNG, navigateurs modernes l'acceptent) ---------
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#111111"/>
  <g transform="translate(20.5 14) scale(0.78)">
    <path d="M6.21 0.96V14.56L18.40 0.24L22.99 3.77L13.33 14.95L26.91 33.43H19.21L9.27 19.67L6.21 23.26V33.43H0V0.96H6.21Z" fill="#f9f7f2"/>
  </g>
</svg>`;

// Génère un PNG 32×32 puis un ICO simple
const png32 = await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toBuffer();

writeFileSync(join(APP, "favicon.ico"), png32);

console.log("✓ favicon.ico généré (32×32)");
console.log("\nTerminé.");
