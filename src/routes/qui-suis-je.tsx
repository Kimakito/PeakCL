import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/qui-suis-je")({
  head: () => ({
    meta: [
      { title: "Charlotte Lacroix · Développeuse web & graphiste en Savoie | PeakCL" },
      {
        name: "description",
        content:
          "Charlotte Lacroix (PeakCL), développeuse web et graphiste à Albertville. Création de sites internet, logos et community management pour indépendants et petites structures, en Savoie et partout en France.",
      },
      { property: "og:title", content: "Charlotte Lacroix · Développeuse web & graphiste en Savoie | PeakCL" },
      {
        property: "og:description",
        content:
          "Le parcours, la méthode et la philosophie PeakCL · code + design réunis, pour une présence en ligne qui génère des demandes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/qui-suis-je") },
    ],
    links: [{ rel: "canonical", href: absUrl("/qui-suis-je") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            Qui suis‑je ?
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Charlotte Lacroix, <span className="text-gradient">PeakCL</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Développeuse web et graphiste à Albertville (Savoie). Mon objectif : transformer votre
            présence en ligne en un outil qui génère des demandes, pas juste des visites.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Je m'appelle Charlotte Lacroix et je suis à l'origine de PeakCL. J'ai une particularité
              rare : je <strong className="text-foreground">code</strong>, je{" "}
              <strong className="text-foreground">dessine</strong>, et je suis{" "}
              <strong className="text-foreground">formée au community management</strong>. La plupart
              des entrepreneurs doivent jongler entre un développeur qui ne pense pas design, un
              graphiste qui ne sait pas coder et un CM qui ne connaît pas leur image. Avec moi, c'est
              une seule interlocutrice pour votre site, votre identité visuelle et vos réseaux :
              site, logo et publications alignés sur le même message, sans double brief ni
              sous-traitance cachée.
            </p>
            <p>
              Ma formation en community management complète mes compétences techniques et graphiques :
              je ne me contente pas de « faire de jolis posts », je construis une communication
              cohérente, pensée pour la conversion, du site web jusqu'aux réseaux sociaux.
            </p>
            <p>
              Concrètement, j'accompagne des indépendants, artisans, thérapeutes, commerçants et
              petites structures qui veulent une présence en ligne professionnelle sans y passer leurs
              soirées. J'ai livré plus de 20 projets, agence de voyage, cabinet d'avocate, artisan
              automobile, prothésiste dentaire, coachs, e-commerce équestre, notés 5/5 sur Google.
              Basée à Albertville, je travaille avec des clients dans toute la Savoie (Chambéry,
              Aix-les-Bains, Annecy) et partout en France, en visio.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
            <h2 className="text-2xl font-bold">Ma façon de travailler</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Stratégie &amp; structure</strong> : le message
                doit être clair en 5 secondes.
              </li>
              <li>
                <strong className="text-foreground">Design premium</strong> : cohérence, crédibilité,
                confiance avant même le premier appel.
              </li>
              <li>
                <strong className="text-foreground">Conversion</strong> : preuves, appels à l'action,
                parcours simple et friction minimisée.
              </li>
              <li>
                <strong className="text-foreground">Sites rapides</strong> : codés sur mesure ou
                WordPress, optimisés pour la performance (Core Web Vitals).
              </li>
              <li>
                <strong className="text-foreground">SEO local</strong> : des bases propres pour être
                trouvée par les bons clients, près de chez vous.
              </li>
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] bg-card/40 p-6 text-center shadow-card">
            <h2 className="text-xl font-bold">On en parle ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut pour une présence en
              ligne cohérente, et comment je peux m'en charger pour vous.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/brief"
                className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03]"
              >
                Faire le diagnostic
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
              >
                Voir le portfolio
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/" className="text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground">
              ← Retour à l’accueil
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

