/**
 * Optimisation en place de toutes les images de public/assets/.
 *
 * Stratégie sûre (ne change pas les noms de fichiers / extensions, donc le code
 * ne doit pas être touché) :
 *   - Si pixelWidth > MAX_WIDTH    → resize à MAX_WIDTH (préserve ratio)
 *   - Si fichier > MIN_KB           → recompresse à QUALITY
 *   - PNG : quality 80, compressionLevel 9, palette si pertinent
 *   - JPG : quality 82, mozjpeg, progressive
 *   - SVG / GIF / WebP : laissé tel quel
 *
 * Skip :
 *   - public/assets/icones/        (déjà petits, dégradation visible)
 *   - public/assets/wp-orig/       (sources, gardés intacts)
 *   - Tout fichier < MIN_KB
 *
 * Lancer : `node scripts/optimize-images.mjs`
 */
import sharp from "sharp";
import { readdirSync, statSync, copyFileSync, renameSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCAN_DIR = join(ROOT, "public", "assets");

// Configuration
const MAX_WIDTH = 1920;       // largeur max après resize (gère retina 2x sur 960px)
const MIN_KB = 80;            // ne touche pas les images < 80 Ko
const QUALITY_PNG = 80;
const QUALITY_JPG = 82;
const SKIP_DIRS = ["icones", "wp-orig"];

// Stats
let totalBefore = 0;
let totalAfter = 0;
let nProcessed = 0;
let nSkipped = 0;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      out.push(...walk(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function optimize(filePath) {
  const ext = extname(filePath).toLowerCase();
  const stat = statSync(filePath);
  const sizeKbBefore = stat.size / 1024;

  // Skip formats non supportés
  if (![".png", ".jpg", ".jpeg"].includes(ext)) {
    nSkipped++;
    return;
  }
  // Skip petites images
  if (sizeKbBefore < MIN_KB) {
    nSkipped++;
    return;
  }

  totalBefore += stat.size;

  try {
    const tempPath = filePath + ".opt";
    const meta = await sharp(filePath).metadata();
    const needResize = meta.width && meta.width > MAX_WIDTH;

    let pipeline = sharp(filePath);
    if (needResize) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    if (ext === ".png") {
      pipeline = pipeline.png({
        quality: QUALITY_PNG,
        compressionLevel: 9,
        palette: true,
      });
    } else {
      pipeline = pipeline.jpeg({
        quality: QUALITY_JPG,
        progressive: true,
        mozjpeg: true,
      });
    }

    await pipeline.toFile(tempPath);
    const tempStat = statSync(tempPath);

    // Si l'optimisé n'est pas plus petit, on ne remplace pas
    if (tempStat.size >= stat.size) {
      // delete temp
      const { unlinkSync } = await import("node:fs");
      unlinkSync(tempPath);
      totalAfter += stat.size;
      nProcessed++;
      const dim = needResize ? ` (resize ${meta.width}→${MAX_WIDTH})` : "";
      console.log(`  =  ${basename(filePath)} : ${sizeKbBefore.toFixed(0)} Ko (déjà optimal${dim})`);
      return;
    }

    renameSync(tempPath, filePath);
    totalAfter += tempStat.size;
    nProcessed++;

    const sizeKbAfter = tempStat.size / 1024;
    const gainPct = ((1 - tempStat.size / stat.size) * 100).toFixed(0);
    const dim = needResize ? ` (${meta.width}→${MAX_WIDTH}px)` : "";
    console.log(
      `  ✓ ${basename(filePath)} : ${sizeKbBefore.toFixed(0)} Ko → ${sizeKbAfter.toFixed(0)} Ko (-${gainPct}%)${dim}`
    );
  } catch (err) {
    console.error(`  ✗ ${filePath} : ${err.message}`);
    nSkipped++;
  }
}

(async () => {
  console.log(`📁 Scan de ${SCAN_DIR}`);
  console.log(`   Skip dirs : ${SKIP_DIRS.join(", ")}`);
  console.log(`   Max width : ${MAX_WIDTH}px · Min size : ${MIN_KB} Ko`);
  console.log("");

  const files = walk(SCAN_DIR);
  console.log(`Trouvé ${files.length} fichiers à analyser.\n`);

  for (const f of files) {
    await optimize(f);
  }

  console.log("");
  console.log("─".repeat(60));
  console.log(`✓ ${nProcessed} images traitées`);
  console.log(`⏭  ${nSkipped} images skippées (petites ou non-images)`);
  console.log(
    `📦 Total : ${(totalBefore / 1024 / 1024).toFixed(1)} Mo → ${(totalAfter / 1024 / 1024).toFixed(1)} Mo (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`
  );
})();
