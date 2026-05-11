"use client";

import { useState } from "react";

type Etat = "idle" | "envoi" | "succes" | "erreur";

export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreurMsg, setErreurMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-bot : si rempli, on simule un succès sans envoyer
    if ((data.get("website") as string)?.length) {
      setEtat("succes");
      return;
    }

    const payload = {
      prenom: (data.get("prenom") as string) ?? "",
      nom: (data.get("nom") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      societe: (data.get("societe") as string) ?? "",
      besoin: (data.get("besoin") as string) ?? "",
      message: (data.get("message") as string) ?? "",
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
      } else {
        setEtat("erreur");
        setErreurMsg(
          json?.error ??
            "Une erreur est survenue. Merci de réessayer dans quelques instants."
        );
      }
    } catch {
      setEtat("erreur");
      setErreurMsg(
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez."
      );
    }
  }

  if (etat === "succes") {
    return (
      <div className="rounded-[24px] bg-kinome-dark p-[clamp(24px,5vw,60px)] text-center text-white">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-kinome-cream">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-kinome-black"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mb-4 font-heading text-[2rem] font-semibold">
          Message bien reçu&nbsp;!
        </h2>
        <p className="mx-auto mb-2 max-w-[400px] font-body text-[1.05rem] font-light leading-[1.6]">
          Merci pour votre message. Mathias ou Tanguy reviendra vers vous sous
          24 à 48 heures ouvrées.
        </p>
        <p className="mx-auto max-w-[400px] font-body text-[0.95rem] font-light leading-[1.6] opacity-80">
          Un email de confirmation vient de vous être envoyé.
        </p>
        <button
          type="button"
          onClick={() => setEtat("idle")}
          className="mt-8 cursor-pointer rounded-full border-2 border-kinome-cream bg-transparent px-10 py-3 font-heading text-[0.95rem] font-semibold text-white transition-colors hover:bg-kinome-cream hover:text-kinome-black"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] bg-kinome-dark p-[clamp(24px,5vw,60px)] text-white">
      <h2 className="mb-10 text-center font-heading text-[2.2rem] font-semibold">
        Formulaire de contact
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* Honeypot caché — les bots le remplissent, pas les humains */}
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
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <input
          type="text"
          name="prenom"
          placeholder="Prénom*"
          aria-label="Prénom (requis)"
          required
          maxLength={80}
          autoComplete="given-name"
          className="w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom*"
          aria-label="Nom de famille (requis)"
          required
          maxLength={80}
          autoComplete="family-name"
          className="w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          aria-label="Adresse e-mail (requis)"
          required
          autoComplete="email"
          className="w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />
        <input
          type="text"
          name="societe"
          placeholder="Société*"
          aria-label="Société (requis)"
          required
          maxLength={120}
          autoComplete="organization"
          className="w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />
        <input
          type="text"
          name="besoin"
          placeholder="Votre besoin ? (logo, charte, site internet…)"
          aria-label="Votre besoin (optionnel)"
          maxLength={200}
          className="w-full rounded-[12px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />
        <textarea
          name="message"
          placeholder="Message*"
          aria-label="Votre message (requis, 10 caractères minimum)"
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          className="w-full resize-none rounded-[15px] bg-kinome-cream px-5 py-4 font-body text-[1rem] text-kinome-black outline-none placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-kinome-accent"
        />

        {etat === "erreur" && (
          <p
            role="alert"
            className="rounded-[12px] bg-[#3a1f1f] px-4 py-3 font-body text-[0.95rem] text-[#ffb3b3]"
          >
            {erreurMsg}
          </p>
        )}

        <p className="mt-2 text-center font-body text-[0.85rem] font-light leading-[1.5] opacity-70">
          En envoyant ce formulaire, vous acceptez que vos données soient
          utilisées pour vous recontacter dans le cadre de votre demande.
        </p>

        <div className="mt-2 flex justify-center">
          <button
            type="submit"
            disabled={etat === "envoi"}
            className="cursor-pointer rounded-full border-2 border-kinome-cream bg-transparent px-12 py-3 font-heading text-[1rem] font-semibold text-white transition-colors hover:bg-kinome-cream hover:text-kinome-black disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            {etat === "envoi" ? "Envoi en cours…" : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
