import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  ArrowRight,
  CalendarCheck,
  LayoutGrid,
  MessageCircle,
  Package,
  Star,
} from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { CTAButton } from "@/components/CTAButton";
import { localeFromPath, type Locale } from "@/i18n/config";
import type { MascotPose } from "@/lib/mascot";

const PHOTO_400 = "/peakcl/photo/charlotte-round-400.webp";
const PHOTO_800 = "/peakcl/photo/charlotte-round-800.webp";

const WHATSAPP_URL = "https://wa.me/33743517627";
const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

type OrbitItem = {
  label: string;
  href: string;
  desc: string;
  icon: React.ElementType;
  pose: MascotPose;
  variant: "primary" | "ghost";
  flip?: boolean;
};

/** Nœuds de l'orbite selon la langue (libellés + descriptions + cibles). */
function orbitItems(locale: Locale): OrbitItem[] {
  if (locale === "en") {
    return [
      {
        label: "Book a call",
        href: "/en/book-a-call",
        desc: "Free 45-min audit. Leave with a clear plan.",
        icon: CalendarCheck,
        pose: "victoire",
        variant: "primary",
      },
      {
        label: "Portfolio",
        href: "/en/portfolio",
        desc: "Delivered projects that convert.",
        icon: LayoutGrid,
        pose: "tablette",
        variant: "ghost",
      },
      {
        label: "Services",
        href: "/en/services",
        desc: "Websites, social, design, automation. One point of contact.",
        icon: Package,
        pose: "bas",
        variant: "ghost",
      },
      {
        label: "Reviews",
        href: "#avis",
        desc: "Rated 5/5 on Google by my clients.",
        icon: Star,
        pose: "graphique",
        variant: "ghost",
      },
      {
        label: "WhatsApp",
        href: WHATSAPP_URL,
        desc: "Quick question? Get a direct reply.",
        icon: MessageCircle,
        pose: "dab",
        variant: "ghost",
        flip: true,
      },
    ];
  }
  return [
    {
      label: "Réserver un appel",
      href: "/reservation-appel",
      desc: "Diagnostic offert, 45 min. Repartez sur un plan clair.",
      icon: CalendarCheck,
      pose: "victoire",
      variant: "primary",
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      desc: "Des projets livrés qui convertissent.",
      icon: LayoutGrid,
      pose: "tablette",
      variant: "ghost",
    },
    {
      label: "Services",
      href: "/services",
      desc: "Sites web, réseaux, design, automatisation. Un seul interlocuteur.",
      icon: Package,
      pose: "bas",
      variant: "ghost",
    },
    {
      label: "Avis clients",
      href: "#avis",
      desc: "Noté 5/5 sur Google par mes clients.",
      icon: Star,
      pose: "graphique",
      variant: "ghost",
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_URL,
      desc: "Une question rapide ? Réponse en direct.",
      icon: MessageCircle,
      pose: "dab",
      variant: "ghost",
      flip: true,
    },
  ];
}

/** Radius of the orbit as a fraction of the container's --hero size. */
const ORBIT_R = 0.46;
/** Position de la carte : entre le nœud et le centre, pour rester dans l'écran. */
const CARD_PULL = 0.5;

function nodeVector(index: number, total: number, rotation: number, r: number) {
  const angle = ((index / total) * 360 + rotation) % 360;
  const rad = (angle * Math.PI) / 180;
  return {
    fx: (Math.cos(rad) * r).toFixed(4),
    fy: (Math.sin(rad) * r).toFixed(4),
    rad,
  };
}

function HeroAvatar({ items }: { items: OrbitItem[] }) {
  const [rotation, setRotation] = useState(0);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = items.length;

  // Auto-rotation, en pause quand un nœud est survolé (le nœud reste immobile,
  // le temps d'aller cliquer sur sa carte).
  const paused = hoverId !== null;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setRotation((p) => Number(((p + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [paused]);

  // Pont hover : petit délai avant fermeture pour laisser le curseur passer
  // du nœud à la carte sans qu'elle disparaisse.
  const open = (i: number) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setHoverId(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoverId(null), 220);
  };
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const dataEventFor = (label: string) =>
    `cta_hero_${label.toLowerCase().replace(/\s+/g, "_")}`;

  return (
    <div
      className="relative z-10 flex items-center justify-center"
      style={
        {
          width: "var(--hero)",
          height: "var(--hero)",
          "--hero": "clamp(220px, 36vh, 520px)",
        } as React.CSSProperties
      }
    >
      {/* glow rings */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--brand-violet)_30%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-[6%] animate-[spin_20s_linear_infinite] rounded-full border border-[var(--brand-violet)]/15" />
      <div className="absolute inset-[12%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-[var(--brand-turquoise)]/10" />
      {/* orbit path */}
      <div
        className="pointer-events-none absolute rounded-full border border-white/10"
        style={{
          width: `calc(var(--hero) * ${ORBIT_R * 2})`,
          height: `calc(var(--hero) * ${ORBIT_R * 2})`,
        }}
      />

      {/* photo pro de Charlotte au centre de l'orbite (élément LCP du hero) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          height: "calc(var(--hero) * 0.62)",
          width: "calc(var(--hero) * 0.62)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-turquoise)_45%,transparent)_0%,transparent_70%)] blur-xl"
        />
        <img
          src={PHOTO_400}
          srcSet={`${PHOTO_400} 400w, ${PHOTO_800} 800w`}
          sizes="(min-width: 768px) 340px, 220px"
          width={800}
          height={800}
          fetchPriority="high"
          decoding="async"
          alt="Charlotte Lacroix, fondatrice de PeakCL"
          className="relative h-full w-full rounded-full object-cover shadow-[0_0_44px_rgba(12,198,193,0.35)] ring-2 ring-white/15"
        />
      </div>

      {/* nœuds en orbite — chaque nœud est un lien direct (tap mobile = navigation) */}
      {items.map((item, index) => {
        const { fx, fy, rad } = nodeVector(index, total, rotation, ORBIT_R);
        const lit = hoverId === index;
        const Icon = item.icon;
        const depth = (1 + Math.sin(rad)) / 2;
        const zIndex = lit ? 60 : 20 + Math.round(Math.cos(rad) * 10);
        const opacity = lit ? 1 : 0.55 + 0.45 * depth;
        const external = item.href.startsWith("http");

        return (
          <a
            key={item.label}
            href={item.href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            data-event={dataEventFor(item.label)}
            className="absolute flex flex-col items-center transition-[opacity] duration-300"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${fx} * var(--hero)), calc(-50% + ${fy} * var(--hero)))`,
              zIndex,
              opacity,
            }}
            onMouseEnter={() => open(index)}
            onMouseLeave={scheduleClose}
            aria-label={item.label}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur transition-all duration-300 ${
                lit
                  ? "scale-125 border-[var(--brand-turquoise)] bg-[var(--brand-turquoise)]/15 text-white shadow-[0_0_22px_rgba(12,198,193,0.45)]"
                  : item.variant === "primary"
                    ? "border-[var(--brand-yellow)]/70 bg-[#08101b]/70 text-[var(--brand-yellow)]"
                    : "border-white/20 bg-[#08101b]/70 text-white/70"
              }`}
            >
              <Icon size={18} />
            </span>
            <span
              className={`mt-2 whitespace-nowrap text-[10px] font-semibold tracking-wide transition-colors ${
                lit ? "text-white" : "text-white/55"
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}

      {/* Carte du nœud survolé : ancrée entre le nœud et le centre (CARD_PULL),
          donc toujours dans l'écran, jamais sous le titre. */}
      {hoverId !== null &&
        (() => {
          const item = items[hoverId];
          const { fx, fy } = nodeVector(hoverId, total, rotation, ORBIT_R);
          const Icon = item.icon;
          return (
            <div
              className="absolute z-[70] w-52 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#08101b]/95 p-4 text-left shadow-card backdrop-blur-xl"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${(Number(fx) * CARD_PULL).toFixed(4)} * var(--hero)), calc(-50% + ${(Number(fy) * CARD_PULL).toFixed(4)} * var(--hero)))`,
              }}
              onMouseEnter={() => open(hoverId)}
              onMouseLeave={scheduleClose}
            >
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-[var(--brand-turquoise)]" />
                <span className="text-sm font-semibold text-white">
                  {item.label}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
              <CTAButton
                href={item.href}
                variant={item.variant}
                dataEvent={dataEventFor(item.label)}
                className="mt-3 !px-3 !py-1.5 !text-xs"
              >
                Y aller <ArrowRight className="ml-1 inline h-3 w-3" />
              </CTAButton>
            </div>
          );
        })()}
    </div>
  );
}

/** Textes du hero selon la langue. En anglais : angle international, on retire
 *  l'ancrage Savoie et « un seul interlocuteur » devient « one person ». */
function heroText(locale: Locale) {
  if (locale === "en") {
    return {
      badge: "5/5 Google · free audit · one point of contact",
      titleLead:
        "Want an online presence that's clear, credible and simple to run?",
      titleAccent: "One person for your site, design and social, end to end.",
      sub: "From strategy to launch, with a clear plan, concrete deliverables and a human on the other end.",
      ctaPrimary: "Book a free call",
      ctaSecondary: "See services",
      servicesHref: "/en/services",
      chips: [
        { value: "5/5", label: "Google reviews" },
        { value: "1", label: "point of contact" },
        { value: "45 min", label: "free audit" },
      ],
      scrollHint: "scroll ↓",
    };
  }
  return {
    badge: "5/5 Google · diagnostic gratuit · un seul interlocuteur",
    titleLead:
      "Vous voulez une présence en ligne claire, crédible et sans complication ?",
    titleAccent: "Je vous accompagne de A à Z.",
    sub: "De la stratégie au lancement, avec un plan clair, des livrables concrets et un accompagnement humain.",
    ctaPrimary: "Réserver un appel gratuit",
    ctaSecondary: "Voir les services",
    servicesHref: "/services",
    chips: [
      { value: "5/5", label: "avis Google" },
      { value: "1", label: "interlocuteur" },
      { value: "45 min", label: "diagnostic gratuit" },
    ],
    scrollHint: "scroll ↓",
  };
}

export function HeroPanel() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = heroText(locale);
  const items = orbitItems(locale);

  return (
    <section
      id="accueil"
      data-hero
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Atmosphère hero : aurora premium + halo lumineux central + étoiles + grain */}
      <div className="hero-aurora" aria-hidden />
      <div className="hero-stars" aria-hidden />
      <div className="hero-grain" aria-hidden />

      {/* badge */}
      <div className="hero-fade relative z-10 mb-3 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur">
        <span className="text-[var(--brand-yellow)]">★★★★★</span>
        {t.badge}
      </div>

      {/* avatar + orbit */}
      <HeroAvatar items={items} />

      {/* headline under avatar */}
      <div className="hero-fade hero-fade-d1 relative z-10 mt-3 text-center">
        <h1 className="mx-auto max-w-4xl text-balance text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
          {t.titleLead}
          <br />
          <span className="text-gradient-anim">{t.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-lg">
          {t.sub}
        </p>

        {/* CTA principaux visibles sans scroll */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_hero">
            {t.ctaPrimary}
          </CTAButton>
          <CTAButton
            href={t.servicesHref}
            variant="ghost"
            dataEvent="cta_services_hero"
          >
            {t.ctaSecondary}
          </CTAButton>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
          {t.chips.map((item) => (
            <div
              key={item.label}
              className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-foreground/80 backdrop-blur"
            >
              <span className="font-semibold text-[var(--brand-turquoise)]">
                {item.value}
              </span>{" "}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/30 text-xs hidden md:block">
        {t.scrollHint}
      </div>
    </section>
  );
}
