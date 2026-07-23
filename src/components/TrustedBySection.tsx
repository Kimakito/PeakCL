import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { ClientLogo } from "@/components/ClientLogo";
import { localeFromPath, type Locale } from "@/i18n/config";

/** Textes de la section selon la langue. En anglais : angle international,
 *  on retire l'ancrage Savoie / France. */
function trustedText(locale: Locale, count: number) {
  if (locale === "en") {
    return {
      eyebrow: "Trusted by",
      heading: (
        <>
          Professionals who chose <span className="text-gradient">PeakCL</span>.
        </>
      ),
      subtitle: `${count} projects delivered for craftspeople, coaches, health, travel and e-commerce.`,
      cta: "See all projects",
      portfolioHref: "/en/portfolio",
    };
  }
  return {
    eyebrow: "Ils nous ont fait confiance",
    heading: (
      <>
        Des pros qui ont choisi <span className="text-gradient">PeakCL</span>.
      </>
    ),
    subtitle: `${count} projets livrés, artisans, coachs, santé, voyage, e-commerce… en Savoie et en France.`,
    cta: "Voir tous les projets",
    portfolioHref: "/portfolio",
  };
}

function ClientLogoCard({
  title,
  subtitle,
  logoUrl,
  siteUrl,
  locale,
}: {
  title: string;
  subtitle?: string;
  logoUrl: string;
  siteUrl: string;
  locale: Locale;
}) {
  const titleAttr =
    locale === "en" ? `${title}: view the site` : `${title} : voir le site`;
  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-event="trusted_logo_click"
      title={titleAttr}
      className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card/40 px-4 py-3 shadow-card backdrop-blur transition-colors hover:border-border hover:bg-card/60 sm:px-5"
    >
      <ClientLogo src={logoUrl} alt={title} size="sm" />
      <span className="min-w-0 pr-2">
        <span className="block max-w-[10rem] truncate text-sm font-semibold text-foreground sm:max-w-[12rem]">
          {title}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block max-w-[10rem] truncate text-xs text-muted-foreground sm:max-w-[12rem]">
            {subtitle}
          </span>
        ) : null}
      </span>
    </a>
  );
}

export function TrustedBySection() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const clients = useMemo(() => peakclPortfolio.filter((p) => p.logoUrl), []);
  const marqueeTrack = useMemo(() => [...clients, ...clients], [clients]);
  const t = trustedText(locale, clients.length);

  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="border-t border-border bg-[color-mix(in_oklab,var(--background)_92%,var(--brand-violet)_8%)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            {t.eyebrow}
          </span>
          <h2
            id="trusted-by-heading"
            className="mt-4 text-balance text-3xl font-bold md:text-4xl"
          >
            {t.heading}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {t.subtitle}
          </p>
        </div>

        <div className="relative mt-12 motion-reduce:hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24"
            aria-hidden
          />

          <div className="overflow-hidden">
            <div className="trusted-marquee-track flex w-max gap-3 md:gap-4">
              {marqueeTrack.map((p, i) => (
                <ClientLogoCard
                  key={`${p.siteUrl}-${i}`}
                  title={p.title}
                  subtitle={p.subtitle}
                  logoUrl={p.logoUrl!}
                  siteUrl={p.siteUrl}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-12 hidden motion-reduce:flex motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3">
          {clients.map((p) => (
            <li key={p.siteUrl}>
              <ClientLogoCard
                title={p.title}
                subtitle={p.subtitle}
                logoUrl={p.logoUrl!}
                siteUrl={p.siteUrl}
                locale={locale}
              />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <a
            href={t.portfolioHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
            data-event="cta_portfolio_trusted"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}
