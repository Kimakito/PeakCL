import { useEffect, useState } from "react";
import type React from "react";
import {
  ArrowRight,
  CalendarCheck,
  LayoutGrid,
  MessageCircle,
  Package,
  Star,
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Fireworks } from "@/components/home/Fireworks";
import { Mascot } from "@/components/Mascot";
import type { MascotPose } from "@/lib/mascot";

const WHATSAPP_URL = "https://wa.me/33743517627";

type OrbitItem = {
  label: string;
  href: string;
  desc: string;
  icon: React.ElementType;
  pose: MascotPose;
  variant: "primary" | "ghost";
  flip?: boolean;
};

const ORBIT_ITEMS: OrbitItem[] = [
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
    label: "Offres",
    href: "/packs",
    desc: "Site, identité, réseaux, Google. Un seul interlocuteur.",
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

/** Radius of the orbit as a fraction of the container's --hero size. */
const ORBIT_R = 0.46;
/** Extra outward push for the expanded card, as a fraction of --hero. */
const CARD_R = 0.82;

function nodeVector(index: number, total: number, rotation: number, r: number) {
  const angle = ((index / total) * 360 + rotation) % 360;
  const rad = (angle * Math.PI) / 180;
  return {
    fx: (Math.cos(rad) * r).toFixed(4),
    fy: (Math.sin(rad) * r).toFixed(4),
    rad,
  };
}

function HeroAvatar() {
  const [rotation, setRotation] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const total = ORBIT_ITEMS.length;

  // Pose active = nœud survolé ; sinon pose de repos (montre).
  const focus = hoverId ?? activeId;
  const focusItem = focus !== null ? ORBIT_ITEMS[focus] : null;
  const current = focusItem
    ? { pose: focusItem.pose, flip: !!focusItem.flip }
    : { pose: "montre" as MascotPose, flip: false };

  // Auto-rotation, en pause quand un nœud est survolé ou ouvert.
  const paused = activeId !== null || hoverId !== null;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setRotation((p) => Number(((p + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative z-10 flex items-center justify-center"
      style={
        {
          width: "var(--hero)",
          height: "var(--hero)",
          "--hero": "clamp(280px, 42vh, 520px)",
        } as React.CSSProperties
      }
      onClick={() => setActiveId(null)}
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

      {/* mascotte (suit la souris + change de pose au survol/clic) */}
      <div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          height: "calc(var(--hero) * 0.58)",
          width: "calc(var(--hero) * 0.66)",
        }}
      >
        <Mascot
          pose={current.pose}
          flip={current.flip}
          lean
          heightClass="h-full"
          className="h-full w-full"
          alt="Charlotte · PeakCL"
        />
      </div>

      {/* nœuds en orbite */}
      {ORBIT_ITEMS.map((item, index) => {
        const { fx, fy, rad } = nodeVector(index, total, rotation, ORBIT_R);
        const isActive = activeId === index;
        const isHover = hoverId === index;
        const lit = isActive || isHover;
        const Icon = item.icon;
        // profondeur : nœuds du bas (sin>0) un peu plus opaques / au-dessus
        const depth = (1 + Math.sin(rad)) / 2;
        const zIndex = isActive ? 60 : 20 + Math.round(Math.cos(rad) * 10);
        const opacity = lit ? 1 : 0.55 + 0.45 * depth;

        const card = nodeVector(index, total, rotation, CARD_R);

        return (
          <div key={item.label}>
            {/* le nœud */}
            <button
              type="button"
              className="absolute flex flex-col items-center transition-[opacity] duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${fx} * var(--hero)), calc(-50% + ${fy} * var(--hero)))`,
                zIndex,
                opacity,
              }}
              onMouseEnter={() => setHoverId(index)}
              onMouseLeave={() => setHoverId(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId((prev) => (prev === index ? null : index));
              }}
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
            </button>

            {/* carte au clic, poussée vers l'extérieur pour ne pas masquer l'avatar */}
            {isActive && (
              <div
                className="absolute z-[70] w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#08101b]/90 p-4 text-left shadow-card backdrop-blur-xl"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${card.fx} * var(--hero)), calc(-50% + ${card.fy} * var(--hero)))`,
                }}
                onClick={(e) => e.stopPropagation()}
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
                  dataEvent={`cta_hero_${item.label
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`}
                  className="mt-3 !px-3 !py-1.5 !text-xs"
                >
                  Y aller <ArrowRight className="ml-1 inline h-3 w-3" />
                </CTAButton>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function HeroPanel() {
  return (
    <section
      id="accueil"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Fireworks sparkle effect */}
      <Fireworks className="opacity-40" />

      {/* badge */}
      <div className="hero-fade relative z-10 mb-3 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur">
        <span className="text-[var(--brand-yellow)]">★★★★★</span>
        5/5 Google · un seul interlocuteur
      </div>

      {/* avatar + orbit */}
      <HeroAvatar />

      {/* headline under avatar */}
      <div className="hero-fade hero-fade-d1 relative z-10 mt-3 text-center">
        <h1 className="mx-auto max-w-3xl text-balance text-2xl font-bold leading-tight md:text-4xl">
          Pas le temps pour votre site, vos réseaux et votre image ?
          <br />
          <span className="text-gradient">
            Déléguez-moi toute votre communication en ligne.
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Site · Identité · Réseaux · Google : un seul interlocuteur, de A à Z.
        </p>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/30 text-xs hidden md:block">
        scroll →
      </div>
    </section>
  );
}
