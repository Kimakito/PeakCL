import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { hreflangLinks } from "@/seo/hreflang";
import { personJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionGallery } from "@/components/ExpressionPhoto";
import { MosaicBio } from "@/components/MosaicBio";

const PHOTO = "/peakcl/photo/charlotte-portrait";

const SECTIONS = [
  { id: "intro", label: "Charlotte" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "On en parle ?" },
] as const;

export const Route = createFileRoute("/qui-suis-je")({
  head: () => ({
    meta: [
      {
        title:
          "Charlotte Lacroix · Développeuse web & graphiste en Savoie | PeakCL",
      },
      {
        name: "description",
        content:
          "Charlotte Lacroix (PeakCL), développeuse web & graphiste près d'Albertville (Savoie). Sites internet, logos et community management pour indépendants.",
      },
      {
        property: "og:title",
        content:
          "Charlotte Lacroix · Développeuse web & graphiste en Savoie | PeakCL",
      },
      {
        property: "og:description",
        content:
          "Le parcours, la méthode et la philosophie PeakCL · code + design réunis, pour une présence en ligne qui génère des demandes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/qui-suis-je") },
      { "script:ld+json": personJsonLd() },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Qui suis-je", path: "/qui-suis-je" },
        ]),
      },
    ],
    links: [
      { rel: "canonical", href: absUrl("/qui-suis-je") },
      ...hreflangLinks("/qui-suis-je"),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-border">
      <SectionDots
        sections={SECTIONS.map((s) => ({ id: s.id, label: s.label }))}
      />
      <SnapPage>
        <SnapSection
          id="intro"
          className="relative flex items-center overflow-hidden bg-hero py-20"
        >
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-yellow-ink)]">
              Qui suis‑je ?
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
              Charlotte Lacroix, <span className="text-gradient">PeakCL</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Développeuse web et graphiste à Gilly-sur-Isère, près
              d'Albertville (Savoie). Mon objectif : transformer votre présence
              en ligne en un outil qui génère des demandes, pas juste des
              visites.
            </p>
          </div>
        </SnapSection>

        <SnapSection
          id="parcours"
          className="flex items-center border-t border-border py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <MosaicBio className="mb-12" />

            <div className="relative mx-auto mb-8 max-w-md overflow-hidden rounded-2xl border border-border shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${PHOTO}-640.avif 640w, ${PHOTO}-960.avif 960w, ${PHOTO}-1280.avif 1280w`}
                  sizes="(min-width: 768px) 448px, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet={`${PHOTO}-640.webp 640w, ${PHOTO}-960.webp 960w, ${PHOTO}-1280.webp 1280w`}
                  sizes="(min-width: 768px) 448px, 100vw"
                />
                <img
                  src={`${PHOTO}-960.webp`}
                  alt="Charlotte Lacroix, fondatrice de PeakCL"
                  width={960}
                  height={1117}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </picture>
            </div>


            <div className="relative mt-10 rounded-2xl border border-border bg-card/50 p-6 shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <h2 className="text-2xl font-bold">Ma façon de travailler</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Stratégie &amp; structure
                  </strong>{" "}
                  : le message doit être clair en 5 secondes.
                </li>
                <li>
                  <strong className="text-foreground">Design premium</strong> :
                  cohérence, crédibilité, confiance avant même le premier appel.
                </li>
                <li>
                  <strong className="text-foreground">Conversion</strong> :
                  preuves, appels à l'action, parcours simple et friction
                  minimisée.
                </li>
                <li>
                  <strong className="text-foreground">Sites rapides</strong> :
                  codés sur mesure ou WordPress, optimisés pour la performance
                  (Core Web Vitals).
                </li>
                <li>
                  <strong className="text-foreground">SEO local</strong> : des
                  bases propres pour être trouvée par les bons clients, près de
                  chez vous.
                </li>
              </ul>
            </div>

            <div className="mt-14 text-center">
              <h2 className="text-2xl font-bold">
                Et sinon, en vrai&nbsp;: toutes mes têtes
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Sérieuse sur le travail, pas sur moi-même. Vous bossez avec une
                vraie personne, pas avec un logo.
              </p>
              <ExpressionGallery className="mt-8" />
            </div>
          </div>
        </SnapSection>

        <SnapSection
          id="contact"
          className="flex items-center border-t border-border py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="relative rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] bg-card/40 p-6 text-center shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <h2 className="text-xl font-bold">On en parle ?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut
                pour une présence en ligne cohérente, et comment je peux m'en
                charger pour vous.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/reservation-appel"
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
              <a
                href="/"
                className="text-sm font-semibold text-[var(--link)] hover:text-foreground"
              >
                ← Retour à l’accueil
              </a>
            </div>
          </div>
        </SnapSection>
      </SnapPage>
    </main>
  );
}
