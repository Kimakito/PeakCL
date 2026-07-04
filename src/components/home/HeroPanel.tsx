import { useState } from "react";
import type React from "react";
import { CTAButton } from "@/components/CTAButton";
import { Fireworks } from "@/components/home/Fireworks";
import { AuroraCanvas } from "@/components/home/AuroraCanvas";
import { Mascot } from "@/components/Mascot";
import { MASCOT_POSES, type MascotPose } from "@/lib/mascot";

const WHATSAPP_URL = "https://wa.me/33743517627";

const ORBIT_ITEMS = [
  {
    label: "Réserver un appel",
    href: "/reservation-appel",
    angle: -90,
    r: 220,
    variant: "primary" as const,
    pose: "victoire" as MascotPose,
  },
  {
    label: "Voir le portfolio",
    href: "/portfolio",
    angle: -20,
    r: 240,
    variant: "ghost" as const,
    pose: "tablette" as MascotPose,
  },
  {
    label: "Voir les offres",
    href: "/packs",
    angle: 50,
    r: 230,
    variant: "ghost" as const,
    pose: "bas" as MascotPose,
  },
  {
    label: "Avis clients",
    href: "#avis",
    angle: 130,
    r: 220,
    variant: "ghost" as const,
    pose: "graphique" as MascotPose,
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    angle: 210,
    r: 230,
    variant: "ghost" as const,
    pose: "dab" as MascotPose,
    flip: true,
  },
] as const;

function HeroAvatar() {
  // Pose active = celle du bouton survolé ; sinon pose de repos (salut).
  const [active, setActive] = useState<{
    pose: MascotPose;
    flip: boolean;
  } | null>(null);
  const current = active ?? { pose: "montre" as MascotPose, flip: false };

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
    >
      {/* glow rings */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--brand-violet)_30%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-[6%] animate-[spin_20s_linear_infinite] rounded-full border border-[var(--brand-violet)]/15" />
      <div className="absolute inset-[12%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-[var(--brand-turquoise)]/10" />

      {/* mascotte (suit la souris + change de pose au survol) */}
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

      {/* orbiting CTAs (positions proportionnelles à --hero) */}
      {ORBIT_ITEMS.map((item) => {
        const rad = (item.angle * Math.PI) / 180;
        const fx = ((Math.cos(rad) * item.r) / 520).toFixed(4);
        const fy = ((Math.sin(rad) * item.r) / 520).toFixed(4);
        return (
          <div
            key={item.label}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${fx} * var(--hero)), calc(-50% + ${fy} * var(--hero)))`,
            }}
            onMouseEnter={() =>
              setActive({
                pose: item.pose,
                flip: "flip" in item ? !!item.flip : false,
              })
            }
            onMouseLeave={() => setActive(null)}
          >
            <CTAButton
              href={item.href}
              variant={item.variant}
              dataEvent={`cta_hero_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              className="!px-3 !py-1.5 !text-xs whitespace-nowrap shadow-lg"
            >
              {item.label}
            </CTAButton>
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
      {/* Aurora Peaks — Three.js scene as background */}
      <AuroraCanvas />
      {/* Keep Fireworks on top for the sparkle effect */}
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
