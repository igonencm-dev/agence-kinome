#!/usr/bin/env node
/**
 * Post-build : corrige `<html lang="fr">` → `<html lang="en">` sur tous les
 * fichiers HTML générés sous out/en/**.
 *
 * Pourquoi : Next.js App Router force un layout racine unique (`<html>` ne
 * peut exister qu'à un seul endroit), donc on ne peut pas servir un lang
 * différent par sous-arbre via le framework. En static export on a la chance
 * de pouvoir post-processer les fichiers HTML générés et patcher le lang
 * attribute pour le sous-arbre /en/.
 *
 * Sans ce fix, Google indexe tout le contenu /en/ comme du français → bug
 * SEO/AEO international critique remonté dans l'audit.
 *
 * On en profite aussi pour fixer `og:locale="fr_CH"` → `og:locale="en_US"`
 * sur ces mêmes pages.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "..", "out", "en");

function walk(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith(".html")) {
      patch(full);
    }
  }
}

let patched = 0;
let skipped = 0;

function patch(file) {
  let html = readFileSync(file, "utf8");
  const before = html;

  // 1. <html lang="fr"> → <html lang="en">
  html = html.replace(/<html\s+lang="fr"/g, '<html lang="en"');

  // 2. og:locale fr_CH → en_US (présent dans les meta)
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="fr_CH"/g,
    '<meta property="og:locale" content="en_US"'
  );

  if (html === before) {
    skipped++;
    return;
  }
  writeFileSync(file, html);
  patched++;
}

try {
  walk(OUT);
  console.log(`✓ fix-en-lang : ${patched} fichier(s) patché(s), ${skipped} inchangé(s).`);
} catch (e) {
  if (e.code === "ENOENT") {
    console.warn(`⚠ fix-en-lang : ${OUT} introuvable — build incomplet ?`);
    process.exit(0); // ne pas casser le build
  }
  throw e;
}
