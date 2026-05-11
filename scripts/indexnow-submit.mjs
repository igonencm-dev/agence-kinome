#!/usr/bin/env node
/**
 * Soumet toutes les URLs du sitemap à IndexNow (Bing / Yandex / Seznam).
 *
 * IndexNow est un protocole ouvert poussé par Microsoft : on POST une liste
 * d'URLs, les moteurs viennent crawler en priorité. Indexation typique en
 * quelques minutes à quelques heures (vs plusieurs jours pour la découverte
 * naturelle).
 *
 * Usage :
 *   node scripts/indexnow-submit.mjs
 *
 * Remarque : Google n'utilise PAS IndexNow. Pour Google il faut soit le
 * sitemap (déjà soumis), soit l'inspection d'URL manuelle dans Search
 * Console (https://search.google.com/search-console).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOST = "agence-kinome.ch";
const KEY = "15b759e2e663458d6d72320b62ec8b4ee6b9863e288a0ea9d201051435acc54e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function getSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Host: "api.indexnow.org",
    },
    body: JSON.stringify(body),
  });

  return { status: res.status, statusText: res.statusText };
}

async function main() {
  console.log(`→ Récupération du sitemap ${SITEMAP_URL}`);
  const urls = await getSitemapUrls();
  console.log(`→ ${urls.length} URLs trouvées`);

  // IndexNow accepte jusqu'à 10 000 URLs par requête. On envoie en un coup.
  console.log(`→ POST à api.indexnow.org…`);
  const result = await submitBatch(urls);

  if (result.status === 200 || result.status === 202) {
    console.log(`✓ Soumission OK (HTTP ${result.status})`);
    console.log(`  Bing / Yandex vont crawler ces URLs dans les minutes qui suivent.`);
  } else {
    console.error(`✗ Erreur HTTP ${result.status}: ${result.statusText}`);
    process.exit(1);
  }

  console.log(`\nURLs soumises :`);
  urls.forEach((u) => console.log(`  • ${u}`));
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
