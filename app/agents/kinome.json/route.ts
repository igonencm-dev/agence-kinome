import { AGENCE, CONTACT, tarifs } from "../../lib/agents";

// Données de l'agence pour les agents IA (25/11/2026), généré au build : lu par le
// serveur MCP public (/mcp) et les outils WebMCP. Source : app/lib/agents.ts.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ agence: AGENCE, tarifs: tarifs(), contact: CONTACT }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
