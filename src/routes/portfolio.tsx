import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import logo from "@/assets/peakcl-logo.png";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — PeakCL" },
      {
        name: "description",
        content:
          "Exemples de présence en ligne livrée par PeakCL : sites, identité et cohérence. Pour indépendants et petites structures.",
      },
      { property: "og:title", content: "Portfolio — PeakCL" },
      {
        property: "og:description",
        content:
          "Exemples concrets : sites, identité et cohérence. Un seul interlocuteur.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/portfolio") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/portfolio") }],
  }),
  component: PortfolioPage,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";
const WHATSAPP_URL = "https://wa.me/33743517627";
const EMAIL = "peakcl73@gmail.com";

type LogoBgVariant = "light" | "dark";

function pickLogoBackground(img: HTMLImageElement): LogoBgVariant {
  try {
    const w = 32;
    const h = 32;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return "light";
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3] ?? 0;
      if (a < 16) continue; // ignore transparent pixels
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      // perceived luminance
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sum += lum;
      count += 1;
    }

    if (!count) return "light";
    const avg = sum / count;
    // If the logo is mostly light, put it on a dark background
    return avg > 180 ? "dark" : "light";
  } catch {
    return "light";
  }
}

function AdaptiveLogo({ src, alt }: { src: string; alt: string }) {
  const [variant, setVariant] = useState<LogoBgVariant>("light");
  const classes = useMemo(() => {
    return variant === "dark"
      ? "bg-black/40 border-white/10"
      : "bg-white/90 border-black/10";
  }, [variant]);

  return (
    <div className={`h-14 w-14 rounded-xl border ${classes} p-2 shadow-sm`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
        loading="lazy"
        onLoad={(e) => {
          const img = e.currentTarget;
          const v = pickLogoBackground(img);
          setVariant(v);
        }}
      />
    </div>
  );
}

function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="PeakCL logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold tracking-tight">
              Peak<span className="text-gradient">CL</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="/#method" className="hover:text-foreground">Méthode</a>
            <a href="/packs" className="hover:text-foreground">
              Offres
            </a>
            <a href="/portfolio" className="hover:text-foreground">
              Portfolio
            </a>
            <a href="/#resultats" className="hover:text-foreground">Avis</a>
            <a href="/#faq" className="hover:text-foreground">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/brief"
              data-event="cta_brief_portfolio"
              className="hidden rounded-full border border-white/10 bg-card/40 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur hover:border-white/20 md:inline-flex"
            >
              Remplir le brief
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_whatsapp"
              className="hidden text-xs font-semibold text-muted-foreground hover:text-foreground lg:inline-flex"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              data-event="cta_email"
              className="hidden text-xs font-semibold text-muted-foreground hover:text-foreground xl:inline-flex"
            >
              Email
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_calendly_portfolio"
              className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </header>

      <main className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Portfolio
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
              Des projets <span className="text-gradient">concrets</span>, pas des maquettes.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Une sélection de sites livrés : vitrine, e-commerce, SEO local, branding.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {peakclPortfolio.map((p) => (
              <article
                key={p.siteUrl}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    {p.logoUrl ? (
                      <AdaptiveLogo src={p.logoUrl} alt={p.title} />
                    ) : (
                      <div className="h-14 w-14 rounded-xl bg-white/5" />
                    )}
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold">{p.title}</h2>
                      {p.subtitle ? (
                        <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                      ) : null}
                    </div>
                  </div>

                  {p.description ? (
                    <p className="mt-4 text-sm leading-relaxed text-foreground/90">{p.description}</p>
                  ) : null}

                  {p.tags.length ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={`${p.siteUrl}-${t}`}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <a
                    href={p.siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
                  >
                    Voir le site <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

