import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
} from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { localeFromPath } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { Reveal } from "@/components/ui/Reveal";
import {
  SectionAvatarCard,
  ExpressionPhoto,
} from "@/components/ExpressionPhoto";
import type { SectionCardSlug } from "@/lib/expressions";
import type {
  CatalogItem,
  Forfait,
  ServiceHighlight,
} from "@/content/peakcl/services";
import type { MascotShot } from "@/content/peakcl/mascots";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

type ServicePageStrings = ReturnType<typeof ui>["servicePage"];

function CatalogCard({
  p,
  showPrices,
  t,
  bookHref,
}: {
  p: CatalogItem;
  showPrices?: boolean;
  t: ServicePageStrings;
  bookHref: string;
}) {
  const isOnQuote = !(showPrices && p.price);
  const priceText = isOnQuote ? t.onQuote : (p.price as string);
  return (
    <section
      className={`card-hover relative rounded-2xl border bg-card/50 p-7 shadow-card ${
        p.highlight
          ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]"
          : "border-border"
      }`}
    >
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <div className="text-right">
          <div
            className={`text-sm font-semibold ${isOnQuote ? "text-muted-foreground" : "text-[var(--brand-turquoise)]"}`}
          >
            {priceText}
          </div>
          {isOnQuote ? (
            <div className="text-xs text-muted-foreground/70">
              {t.priceHint}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
      {p.delay ? (
        <p className="mt-2 text-sm text-muted-foreground">{p.delay}</p>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-background/40 p-5">
          <div className="text-sm font-semibold">{t.deliverables}</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {p.included.map((x) => (
              <li key={x} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-[var(--brand-turquoise)]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        {p.notIncluded?.length ? (
          <div className="rounded-xl border border-border bg-background/40 p-5">
            <div className="text-sm font-semibold">{t.outOfScope}</div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {p.notIncluded.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-background/40 p-5">
            <div className="text-sm font-semibold">{t.howWeWork}</div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t.howWeWorkBody}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <a
          href={bookHref}
          data-event="cta_brief_service"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
        >
          {t.requestQuote} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ForfaitCard({ f, t }: { f: Forfait; t: ServicePageStrings }) {
  return (
    <div
      className={`card-hover relative flex flex-col rounded-2xl border p-6 shadow-card ${
        f.highlight
          ? "border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_25%,transparent)] bg-card/70"
          : "border-border bg-card/50"
      }`}
    >
      {f.highlight ? (
        <span className="absolute -top-2.5 left-6 rounded-full bg-primary-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          {t.popular}
        </span>
      ) : null}
      <div className="flex items-center gap-2">
        <span className="text-xl">{f.emoji}</span>
        <span className="text-sm font-bold uppercase tracking-[0.14em]">
          {f.name}
        </span>
      </div>
      <div className="mt-3 text-2xl font-bold text-[var(--brand-turquoise)]">
        {f.price}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{f.freq}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {f.inclus.map((x) => (
          <li key={x} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  tagline: string;
  /** Bloc optionnel affiché sous le tagline dans le hero. */
  intro?: ReactNode;
  /** Section optionnelle « expertises » (grille de cartes) entre le hero et le catalogue. */
  highlights?: ServiceHighlight[];
  highlightsTitle?: string;
  highlightsSubtitle?: string;
  /** Grille de forfaits mensuels (Community management). Toujours chiffrée. */
  forfaits?: Forfait[];
  forfaitsTitle?: string;
  forfaitsNote?: string;
  sectionTitle: string;
  sectionSubtitle: string;
  items: CatalogItem[];
  /** Affiche les prix réels des items du catalogue (sinon « Sur devis »). */
  showPrices?: boolean;
  /** Vignette avatar labellisée affichée dans le hero (ex. "logos"). */
  avatarCard?: SectionCardSlug;
  /** Scène Spline (robot 3D) affichée dans un hero split. URL .splinecode. */
  heroSpline?: string;
  /** Image affichée dans le hero split (à la place du robot 3D). */
  heroImage?: { src: string; alt: string };
  /** Galerie d'illustrations (portfolio), ex. les expressions de la mascotte. */
  gallery?: MascotShot[];
  galleryTitle?: string;
  gallerySubtitle?: string;
  /** Lien vers le portfolio filtré par métier, affiché sous les prestations. */
  portfolioLink?: { to: string; label: string };
  /** Comptes réseaux animés (démonstration), affichés en cartes cliquables. */
  socials?: {
    handle: string;
    url: string;
    name: string;
    desc: string;
    platform?: "instagram" | "facebook";
  }[];
  socialsTitle?: string;
  socialsSubtitle?: string;
};

export function ServicePage({
  eyebrow,
  title,
  tagline,
  intro,
  highlights,
  highlightsTitle,
  highlightsSubtitle,
  forfaits,
  forfaitsTitle,
  forfaitsNote,
  sectionTitle,
  sectionSubtitle,
  items,
  showPrices,
  avatarCard,
  heroSpline,
  heroImage,
  gallery,
  galleryTitle,
  gallerySubtitle,
  portfolioLink,
  socials,
  socialsTitle,
  socialsSubtitle,
}: ServicePageProps) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = ui(locale).servicePage;
  const bookHref = locale === "en" ? "/en/book-a-call" : "/reservation-appel";
  const SECTIONS = [
    { id: "intro", label: t.sections[0] },
    ...(highlights?.length ? [{ id: "expertises", label: t.sections[1] }] : []),
    ...(forfaits?.length ? [{ id: "forfaits", label: t.sections[2] }] : []),
    { id: "prestations", label: t.sections[3] },
    ...(gallery?.length ? [{ id: "galerie", label: t.sections[4] }] : []),
    ...(socials?.length ? [{ id: "reseaux", label: t.sections[5] }] : []),
    { id: "contact", label: t.sections[6] },
  ];
  return (
    <div className="min-h-screen">
      <main className="border-t border-border">
        <SectionDots sections={SECTIONS} />
        <SnapPage>
          <SnapSection
            id="intro"
            className="relative flex items-center overflow-hidden bg-hero py-20"
          >
            <div className="grid-bg absolute inset-0 -z-10" />
            <div className="hero-aurora" aria-hidden />
            {heroSpline || heroImage ? (
              <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
                <Card className="relative overflow-hidden rounded-3xl border-border bg-[color-mix(in_oklab,var(--brand-violet)_10%,#07060d)] shadow-card">
                  <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60"
                    fill="oklch(0.83 0.14 185)"
                  />
                  <div className="grid gap-2 md:grid-cols-2">
                    {/* Colonne texte */}
                    <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
                        {eyebrow}
                      </span>
                      <h1 className="mt-4 text-balance bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
                        {title}
                      </h1>
                      <p className="mt-5 max-w-md text-muted-foreground">
                        {tagline}
                      </p>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={bookHref}
                          data-event="cta_brief_service_hero"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                        >
                          {t.requestQuoteHero}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-event="cta_calendly_service_hero"
                          className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
                        >
                          {t.bookCall}
                        </a>
                      </div>
                    </div>
                    {/* Colonne visuel : robot 3D ou image */}
                    <div className="relative min-h-[280px] md:min-h-[440px]">
                      {heroSpline ? (
                        <SplineScene
                          scene={heroSpline}
                          className="h-full w-full"
                        />
                      ) : heroImage ? (
                        <img
                          src={heroImage.src}
                          alt={heroImage.alt}
                          loading="eager"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-contain object-center p-6 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                        />
                      ) : null}
                    </div>
                  </div>
                </Card>
                {intro ? (
                  <div className="mx-auto mt-8 max-w-2xl text-left">
                    {intro}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
                  {eyebrow}
                </span>
                <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
                  {title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
                  {tagline}
                </p>
                {intro ? (
                  <div className="mx-auto mt-8 max-w-2xl text-left">
                    {intro}
                  </div>
                ) : null}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={bookHref}
                    data-event="cta_brief_service_hero"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {t.requestQuoteHero} <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="cta_calendly_service_hero"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
                  >
                    {t.bookCall}
                  </a>
                </div>
                {avatarCard ? (
                  <div className="mt-10 flex justify-center">
                    <SectionAvatarCard
                      slug={avatarCard}
                      imgClassName="w-full max-w-[230px]"
                      loading="eager"
                    />
                  </div>
                ) : null}
              </div>
            )}
          </SnapSection>

          {highlights?.length ? (
            <SnapSection
              id="expertises"
              className="flex items-center border-t border-border py-16"
            >
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    {highlightsTitle ?? t.highlightsTitleDefault}
                  </h2>
                  {highlightsSubtitle ? (
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                      {highlightsSubtitle}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {highlights.map((h) => (
                    <div
                      key={h.title}
                      className="card-hover relative rounded-2xl border border-border bg-card/50 p-6 shadow-card"
                    >
                      <GlowingEffect
                        spread={40}
                        glow
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={3}
                      />
                      <div className="text-2xl">{h.emoji}</div>
                      <h3 className="mt-3 text-lg font-semibold">{h.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          {forfaits?.length ? (
            <SnapSection
              id="forfaits"
              className="flex items-center border-t border-border py-16"
            >
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    {forfaitsTitle ?? t.forfaitsTitleDefault}
                  </h2>
                  {forfaitsNote ? (
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                      {forfaitsNote}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {forfaits.map((f) => (
                    <ForfaitCard key={f.name} f={f} t={t} />
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          <SnapSection
            id="prestations"
            className="flex items-center border-t border-border py-16"
          >
            <div className="mx-auto w-full max-w-5xl px-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {sectionTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {sectionSubtitle}
                </p>
              </div>
              <div className="space-y-6">
                {items.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.05}>
                    <CatalogCard
                      p={p}
                      showPrices={showPrices}
                      t={t}
                      bookHref={bookHref}
                    />
                  </Reveal>
                ))}
              </div>
              {portfolioLink ? (
                <div className="mt-8 flex justify-center">
                  <a
                    href={portfolioLink.to}
                    data-event="cta_portfolio_service"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-border"
                  >
                    {portfolioLink.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              ) : null}
            </div>
          </SnapSection>

          {gallery?.length ? (
            <SnapSection
              id="galerie"
              className="flex items-center border-t border-border py-16"
            >
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    {galleryTitle ?? t.galleryTitleDefault}
                  </h2>
                  {gallerySubtitle ? (
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                      {gallerySubtitle}
                    </p>
                  ) : null}
                </div>
                <div className="gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
                  {gallery.map((m, i) => (
                    <Reveal key={m.slug} delay={i * 0.05}>
                      <figure className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card/40 shadow-card">
                        <GlowingEffect
                          spread={40}
                          glow
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                          borderWidth={3}
                        />
                        <img
                          src={m.src}
                          alt={m.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-turquoise)]" />
                          {m.mood}
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          {socials?.length ? (
            <SnapSection
              id="reseaux"
              className="flex items-center border-t border-border py-16"
            >
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    {socialsTitle ?? t.socialsTitleDefault}
                  </h2>
                  {socialsSubtitle ? (
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                      {socialsSubtitle}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {socials.map((s) => (
                    <a
                      key={s.handle}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event="social_account_open"
                      className="card-hover relative flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 shadow-card"
                    >
                      <GlowingEffect
                        spread={40}
                        glow
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={3}
                      />
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-gradient text-primary-foreground">
                        {s.platform === "facebook" ? (
                          <Facebook className="h-5 w-5" />
                        ) : (
                          <Instagram className="h-5 w-5" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="truncate text-base font-semibold">
                            {s.name}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </div>
                        <div className="text-xs text-[var(--brand-turquoise)]">
                          {s.platform === "facebook"
                            ? "Facebook"
                            : `@${s.handle}`}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          <SnapSection
            id="contact"
            className="flex items-center border-t border-border py-16"
          >
            <div className="mx-auto w-full max-w-5xl px-6">
              <div className="rounded-2xl border border-border bg-card/40 p-7 text-center shadow-card backdrop-blur">
                <div className="mb-6 flex justify-center">
                  <ExpressionPhoto
                    slug="grand-sourire"
                    caption={t.photoCaption}
                    tilt={-3}
                    imgClassName="aspect-[3/4] w-28"
                  />
                </div>
                <h2 className="text-3xl font-bold md:text-4xl">
                  {t.contactTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  {t.contactBody}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={bookHref}
                    data-event="cta_brief_service_final"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {t.requestQuoteHero} <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="cta_calendly_service_final"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
                  >
                    {t.bookCall}
                  </a>
                </div>
              </div>
            </div>
          </SnapSection>
        </SnapPage>
      </main>
    </div>
  );
}
