import { blogPosts } from "../../lib/blog";
import { SITE } from "../../lib/seo";

// Index des articles pour les agents IA (25/11/2026) : lu par le serveur MCP public
// (/mcp, public/api/mcp-agents.php) et par les outils WebMCP du site. Généré au build.
export const dynamic = "force-static";

export function GET() {
  const articles = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      titre: p.title,
      url: `${SITE.url}/blog/${p.slug}/`,
      markdown: `${SITE.url}/blog/${p.slug}/index.md`,
      description: p.description,
      date: p.date,
      mis_a_jour: p.lastModified ?? p.date,
    }));
  return Response.json(
    { site: SITE.url, total: articles.length, articles },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
