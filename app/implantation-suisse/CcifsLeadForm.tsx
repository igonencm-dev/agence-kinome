"use client";

/**
 * Formulaire de capture, Landing CCIFS « Implantation en Suisse ».
 *
 * - Champs minimaux (mobile-first) : prénom*, nom*, email*, entreprise, message.
 * - Consentement RGPD/LPD obligatoire (case à cocher) avant envoi.
 * - Capture les UTM présents dans l'URL (utm_source/medium/campaign/term/content)
 *   et les joint au lead (corps de l'email, pas de base de données sur ce site).
 * - POST vers le MÊME endpoint que le reste du site : /api/contact.php (PHPMailer).
 *   On remplit `besoin` + `message` pour identifier la campagne et passer la
 *   validation serveur (qui exige societe + message ≥ 10 caractères).
 * - Déclenche un event de conversion GA4 (`generate_lead`) à la soumission.
 */

import { useEffect, useRef, useState } from "react";

type Etat = "idle" | "envoi" | "succes" | "erreur";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export default function CcifsLeadForm() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreurMsg, setErreurMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const utmRef = useRef<Record<string, string>>({});

  // Capture des UTM au montage (client only, compatible export statique).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) utm[k] = v.slice(0, 120);
      }
      utmRef.current = utm;
    } catch {
      /* no-op */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot : rempli = bot → on simule un succès sans rien envoyer.
    if ((data.get("website") as string)?.length) {
      setEtat("succes");
      return;
    }

    if (!consent) {
      setEtat("erreur");
      setErreurMsg("Merci de cocher la case de consentement pour continuer.");
      return;
    }

    const prenom = ((data.get("prenom") as string) ?? "").trim();
    const nom = ((data.get("nom") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const entreprise = ((data.get("entreprise") as string) ?? "").trim();
    const messageUser = ((data.get("message") as string) ?? "").trim();

    // Provenance (UTM) → lisible dans l'email reçu.
    const utm = utmRef.current;
    const utmLine =
      Object.keys(utm).length > 0
        ? Object.entries(utm)
            .map(([k, v]) => `${k}=${v}`)
            .join(" · ")
        : "accès direct (pas d'UTM)";

    // On compose un message qui passe la validation serveur (≥ 10 car.) et
    // donne tout le contexte campagne à l'équipe.
    const message =
      (messageUser ? messageUser + "\n\n" : "") +
      "Demande de diagnostic stratégique offert (30 min)\n" +
      "Campagne : flyer CCIFS, implantation en Suisse\n" +
      "Provenance : " +
      utmLine +
      "\nConsentement RGPD/LPD : accepté";

    const payload = {
      prenom,
      nom,
      email,
      societe: entreprise || "Non précisé",
      besoin: "Diagnostic stratégique 30 min, CCIFS",
      message,
    };

    setEtat("envoi");
    setErreurMsg("");

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (res.ok && json?.ok) {
        setEtat("succes");
        form.reset();
        setConsent(false);

        // Event de conversion GA4 (no-op si GA non chargé / pas de consentement).
        try {
          window.gtag?.("event", "generate_lead", {
            method: "ccifs_landing",
            campaign: utm.utm_campaign || "ccifs2026",
            currency: "CHF",
            value: 0,
          });
          window.dataLayer?.push({
            event: "generate_lead",
            lead_source: "ccifs_landing",
            campaign: utm.utm_campaign || "ccifs2026",
          });
        } catch {
          /* no-op */
        }
      } else {
        setEtat("erreur");
        setErreurMsg(
          json?.error ??
            "L'envoi a échoué. Réessayez ou écrivez-nous à mathias@agence-kinome.ch."
        );
      }
    } catch {
      setEtat("erreur");
      setErreurMsg(
        "Problème de connexion. Vérifiez votre réseau et réessayez."
      );
    }
  }

  if (etat === "succes") {
    return (
      <div className="rounded-[24px] bg-kinome-dark p-[clamp(28px,6vw,52px)] text-center text-white">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-kinome-accent">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mb-3 font-heading text-[clamp(22px,5vw,30px)] font-semibold">
          Merci, c&rsquo;est noté&nbsp;!
        </h2>
        <p className="mx-auto max-w-[380px] font-body text-[clamp(15px,3.6vw,17px)] font-light leading-[1.6] text-white/90">
          On vous recontacte <strong className="font-semibold">sous 24&nbsp;h</strong> pour
          caler votre diagnostic stratégique offert de 30&nbsp;minutes.
        </p>
        <p className="mx-auto mt-4 max-w-[380px] font-body text-[0.9rem] font-light leading-[1.6] text-white/60">
          Une urgence&nbsp;? Écrivez-nous directement à
          <br />
          <a
            href="mailto:mathias@agence-kinome.ch"
            className="text-kinome-accent underline-offset-2 hover:underline"
          >
            mathias@agence-kinome.ch
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[16px] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent";

  return (
    <div className="rounded-[24px] bg-kinome-dark p-[clamp(22px,6vw,48px)] text-white">
      <h2 className="mb-2 text-center font-heading text-[clamp(22px,5vw,32px)] font-semibold leading-[1.15]">
        Recevez votre diagnostic offert
      </h2>
      <p className="mb-7 text-center font-body text-[clamp(14px,3.6vw,16px)] font-light leading-[1.5] text-white/70">
        30 minutes, sans engagement. On vous recontacte sous 24&nbsp;h.
      </p>

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
        {/* Honeypot anti-bot */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-5000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label>
            Ne pas remplir
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-col gap-3.5 sm:flex-row">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom *"
            aria-label="Prénom"
            required
            maxLength={80}
            autoComplete="given-name"
            className={inputClass}
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom *"
            aria-label="Nom"
            required
            maxLength={80}
            autoComplete="family-name"
            className={inputClass}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email professionnel *"
          aria-label="Email professionnel"
          required
          autoComplete="email"
          inputMode="email"
          className={inputClass}
        />

        <input
          type="text"
          name="entreprise"
          placeholder="Entreprise"
          aria-label="Entreprise"
          maxLength={120}
          autoComplete="organization"
          className={inputClass}
        />

        <textarea
          name="message"
          placeholder="Votre projet en quelques mots (optionnel)"
          aria-label="Votre message (optionnel)"
          rows={3}
          maxLength={2000}
          className={`${inputClass} resize-none`}
        />

        {/* Consentement RGPD/LPD, obligatoire */}
        <label className="mt-1 flex cursor-pointer items-start gap-3 text-left font-body text-[0.85rem] font-light leading-[1.5] text-white/75">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-kinome-accent"
            aria-label="Consentement à être recontacté"
          />
          <span>
            J&rsquo;accepte d&rsquo;être recontacté par Kinome au sujet de ma
            demande. Mes données ne sont jamais revendues.{" "}
            <a
              href="/politique-de-confidentialite/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kinome-accent underline-offset-2 hover:underline"
            >
              Politique de confidentialité
            </a>
          </span>
        </label>

        {etat === "erreur" && (
          <p
            role="alert"
            className="rounded-[12px] bg-[#3a1f1f] px-4 py-3 font-body text-[0.95rem] text-[#ffb3b3]"
          >
            {erreurMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={etat === "envoi" || !consent}
          className="mt-2 w-full cursor-pointer rounded-full bg-kinome-accent px-8 py-4 font-heading text-[clamp(16px,4vw,18px)] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {etat === "envoi"
            ? "Envoi en cours…"
            : "Réserver mon diagnostic offert →"}
        </button>
      </form>
    </div>
  );
}
