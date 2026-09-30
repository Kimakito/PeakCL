import { CTAButton } from "@/components/CTAButton";
import { DELIVERED_COUNT } from "@/content/peakcl/portfolio";

import { HERO, HERO_SIZES, heroSrcSet } from "@/lib/hero";

/**
 * Premier écran de l'accueil.
 *
 * Il porte le H1 de la page, avec la requête visée en clair (« site internet,
 * logo et réseaux… Savoie ») : l'ancien premier écran ouvrait sur une question
 * sans mot-clé. La photo est l'élément LCP : servie en AVIF/WebP responsive et
 * préchargée depuis le head de la route, sans animation d'entrée, pour qu'elle
 * s'affiche avant tout le reste (jusqu'ici le LCP mobile était le texte du
 * bandeau cookies, affiché après 7 s d'hydratation).
 *
 * Le menu global se cale sous l'élément [data-hero] : il est donc hors écran au
 * chargement, d'où le logo posé dans le hero lui-même.
 *
 * Les tuiles colorées au coin de la photo reprennent les carrés du logo,
 * légèrement pivotés comme le veut la charte : c'est la seule décoration.
 */
export function BrandHero() {
  return (
    <section
      data-hero
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-6 md:px-10">
        <a href="/" aria-label="PeakCL, accueil" className="inline-block">
          <img
            src="/signature.svg"
            alt="PeakCL"
            width={409}
            height={74}
            className="h-7 w-auto md:h-8"
          />
        </a>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-12">
        <div>
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
            Site internet, logo et réseaux sociaux pour les TPE et PME de Savoie
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Je m'appelle Charlotte. Je crée votre site, votre image et j'anime vos réseaux, seule et
            de bout en bout : tout raconte enfin la même histoire. Depuis Gilly-sur-Isère, pour
            toute la Savoie et à distance partout en France.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/diagnostic" dataEvent="cta_mini_audit_brandhero">
              Recevoir mon mini-audit gratuit
            </CTAButton>
            <CTAButton href="/portfolio" variant="ghost" dataEvent="cta_portfolio_brandhero">
              Voir mes réalisations
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-[var(--brand-yellow)]" aria-hidden="true">
              ★★★★★
            </span>{" "}
            <span className="font-semibold text-foreground">5/5 sur Google</span>, {DELIVERED_COUNT}{" "}
            projets livrés
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Carrés du logo, pivotés de quelques degrés (motif de la charte). */}
          <span
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-16 w-16 -rotate-6 rounded-[18px] md:-left-6 md:-top-6 md:h-20 md:w-20"
            style={{ background: "var(--grad-jaune)" }}
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-5 -right-3 h-24 w-24 rotate-3 rounded-[22px] md:-bottom-6 md:-right-6 md:h-28 md:w-28"
            style={{ background: "var(--grad-turquoise)" }}
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-8 right-24 h-10 w-10 -rotate-3 rounded-[12px] md:right-32"
            style={{ background: "var(--grad-lavande)" }}
          />
          <picture>
            <source type="image/avif" srcSet={heroSrcSet("avif")} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={heroSrcSet("webp")} sizes={HERO_SIZES} />
            <img
              src={`${HERO}-960.webp`}
              width={1280}
              height={1346}
              alt="Bureau face aux montagnes de Savoie au crépuscule, un site en cours de développement à l'écran"
              fetchPriority="high"
              decoding="async"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover object-[30%_40%] shadow-glow lg:aspect-[1280/1346] lg:rounded-[2.5rem]"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
