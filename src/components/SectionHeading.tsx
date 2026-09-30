import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Accent = "turquoise" | "yellow" | "violet";

const ACCENT: Record<Accent, { text: string; dot: string }> = {
  turquoise: { text: "var(--accent-turquoise-ink)", dot: "var(--brand-turquoise)" },
  yellow: { text: "var(--accent-yellow-ink)", dot: "var(--brand-yellow)" },
  violet: { text: "var(--accent-violet-ink)", dot: "var(--brand-violet)" },
};

/**
 * Titre de section homogène : eyebrow avec puce carrée lumineuse + titre.
 * La puce reprend la couleur d'accent (cohérence visuelle inter-sections).
 * Le tout se révèle au scroll.
 */
export function SectionHeading({
  eyebrow,
  accent = "turquoise",
  align = "center",
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  accent?: Accent;
  align?: "center" | "left";
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  const a = ACCENT[accent];
  return (
    <Reveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <span
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: a.text }}
      >
        {/* Puce en carré arrondi : la forme des tuiles du logo, que la charte
            impose comme puce maison. */}
        <span
          className="h-2 w-2 rounded-[3px]"
          style={{ background: a.dot, boxShadow: `0 0 8px ${a.dot}` }}
        />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {subtitle ? (
        <p
          className={`mt-3 text-sm text-muted-foreground ${align === "center" ? "mx-auto max-w-xl" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
