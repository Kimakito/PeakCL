import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Gift, Instagram, MapPin, Sparkles } from "lucide-react";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Community management",
  name: "Community management · PeakCL",
  description:
    "Gestion de réseaux sociaux (community management) pour indépendants et petites structures en Savoie : visuels brandés, rédaction, stratégie et publications régulières.",
  provider: {
    "@type": "ProfessionalService",
    name: "PeakCL · Charlotte Lacroix",
    url: absUrl("/"),
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Savoie" },
    { "@type": "AdministrativeArea", name: "Haute-Savoie" },
    { "@type": "City", name: "Albertville" },
    { "@type": "City", name: "Chambéry" },
    { "@type": "City", name: "Annecy" },
    { "@type": "Country", name: "France" },
  ],
  url: absUrl("/community-manager-savoie"),
};

export const Route = createFileRoute("/community-manager-savoie")({
  head: () => ({
    meta: [
      { title: "Community manager en Savoie (Albertville) · PeakCL" },
      {
        name: "description",
        content:
          "Community manager en Savoie : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager en Savoie · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, à Albertville et en Savoie. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-savoie") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager en Savoie", path: "/community-manager-savoie" },
        ]),
      },
      { "script:ld+json": serviceJsonLd },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-savoie") }],
  }),
  component: Page,
});

const PAINS = [
  "Vous publiez par à-coups, puis plus rien pendant trois semaines.",
  "Canva le dimanche soir, ce n'est plus possible.",
  "Vos réseaux ne ressemblent pas à votre site ni à votre logo.",
  "Vous savez qu'il faut être présent·e, mais vous n'avez pas le temps.",
];

const INCLUDED = [
  "Visuels brandés (à vos couleurs, votre logo, votre identité)",
  "Textes rédigés + hashtags pertinents",
  "Calendrier de publication régulier (1 à 5 posts/semaine selon la formule)",
  "Stories et reels selon la formule",
  "Rapport mensuel simple et lisible",
];

const FORMULES = [
  { name: "Essentiel", detail: "4 publications/mois · 1 par semaine" },
  { name: "Standard", detail: "8 publications/mois · 2 par semaine" },
  { name: "Dynamique", detail: "12 publications/mois · 3 par semaine + 1 story/sem." },
  { name: "Intensif", detail: "20 publications/mois · 5 par semaine + stories & reels" },
];

const ZONES = [
  { name: "Albertville", href: "/agence-web-albertville" },
  { name: "Chambéry", href: "/agence-web-chambery" },
  { name: "Annecy", href: "/agence-web-annecy" },
  { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
  { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
];

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Savoie · Albertville · partout en France
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Community manager en <span className="text-gradient">Savoie</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Déléguez vos réseaux sociaux à une community manager formée, qui maîtrise aussi votre
            site et votre identité visuelle. Une présence régulière et cohérente, sans y passer vos
            soirées.
          </p>
          <a
            href="/#contact"
            className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Demander un devis <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 24h · Sans engagement</p>
        </div>
      </section>

      {/* Free audit strip */}
      <section className="border-t border-white/5 bg-card/30 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:text-left">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Audit gratuit de vos réseaux sociaux (et de votre site)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Je regarde votre présence actuelle et je vous renvoie des pistes concrètes pour gagner
              en cohérence et en visibilité, sous 24h, sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi déléguer */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            Pourquoi déléguer vos réseaux sociaux ?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Le community management, ce n&apos;est pas « poster pour poster ». C&apos;est une présence
            régulière, cohérente avec votre image, pensée pour donner envie de vous contacter. Si vous
            vous reconnaissez ici, c&apos;est le moment de déléguer :
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {PAINS.map((p) => (
              <li
                key={p}
                className="rounded-2xl border border-white/5 bg-card/50 p-5 text-sm text-muted-foreground shadow-card"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ce qui est inclus + formules */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Ce qui est inclus</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
            <h3 className="text-base font-semibold">Formules mensuelles</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Un rythme adapté à votre énergie et vos objectifs. Sans engagement longue durée imposé.
            </p>
            <ul className="mt-4 space-y-3">
              {FORMULES.map((f) => (
                <li key={f.name} className="rounded-xl border border-white/5 bg-background/40 p-3">
                  <div className="text-sm font-semibold text-[var(--brand-turquoise)]">{f.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{f.detail}</div>
                </li>
              ))}
            </ul>
            <a
              href="/packs"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
            >
              Voir toutes les formules <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pourquoi moi (E-E-A-T) */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[var(--brand-turquoise)]">
            <Sparkles className="h-3.5 w-3.5" />
            Une CM qui maîtrise aussi le site et le design
          </div>
          <h2 className="mt-5 text-2xl font-bold md:text-3xl">Pourquoi me confier vos réseaux ?</h2>
          <div className="mt-4 max-w-3xl space-y-4 text-muted-foreground">
            <p>
              Je suis Charlotte Lacroix (PeakCL), développeuse web et graphiste à Albertville, et je
              suis <strong className="text-foreground">formée au community management</strong>. Concrètement,
              vous ne jonglez pas entre un CM, un graphiste et un développeur : la même personne pense
              votre site, votre identité visuelle et vos publications, pour un message parfaitement
              cohérent partout.
            </p>
            <p>
              Vos visuels réseaux reprennent les codes de votre site et de votre logo. Vos
              publications renvoient vers les bonnes pages. Tout travaille ensemble, dans la même
              direction, au lieu de trois prestataires qui ne se parlent pas.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/qui-suis-je"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/80"
            >
              En savoir plus sur moi
            </a>
            <a
              href="https://www.instagram.com/peakcl73/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/80"
            >
              <Instagram className="h-4 w-4" /> Voir @peakcl73
            </a>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold">Community management en Savoie et alentours</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Basée à Gilly-sur-Isère, près d&apos;Albertville, j&apos;accompagne des indépendants et petites structures dans toute la
            Savoie, la Haute-Savoie et partout en France (visio).
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <a
                key={z.href}
                href={z.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                <MapPin className="h-3 w-3" />
                {z.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-white/5 py-20">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">On s&apos;occupe de vos réseaux ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Décrivez votre activité en 8 minutes : je vous propose le rythme de publication adapté et
            un devis clair.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/reservation-appel"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Faire le diagnostic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://calendly.com/peakcl73/faisons-connaissance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
