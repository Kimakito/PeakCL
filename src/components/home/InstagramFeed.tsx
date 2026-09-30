import { useEffect, useRef } from "react";
import { Instagram, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SOCIAL } from "@/lib/links";

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

/** Textes de la section. */
const TEXT = {
  title: (
    <>
      Le studio <span className="text-gradient">au quotidien</span>.
    </>
  ),
  subtitle: "Coulisses et projets livrés : suivez PeakCL sur Instagram.",
  follow: "Suivre @peakcl73",
};

/**
 * Feed Instagram via widget Elfsight.
 * platform.js scanne le DOM et hydrate le div `.elfsight-app-<id>`.
 * Le script n'est injecté qu'une fois (idempotent), côté client.
 *
 * Et seulement quand la section approche de l'écran : injecté au montage, il
 * pesait sur le chargement de l'accueil (≈ 180 ms de JS, 94 Ko inutilisés,
 * cookies tiers relevés par Lighthouse) pour une section tout en bas de page
 * que beaucoup de visiteurs n'atteignent jamais.
 */
export function InstagramFeed() {
  const t = TEXT;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const inject = () => {
      if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
      const s = document.createElement("script");
      s.src = ELFSIGHT_SRC;
      s.async = true;
      document.body.appendChild(s);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          inject();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="relative w-full overflow-hidden border-t border-border py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-3xl px-8 md:px-16">
        <SectionHeading
          className="mb-6"
          accent="violet"
          eyebrow="Instagram"
          title={t.title}
          subtitle={t.subtitle}
        />
        {/* Widget Elfsight — Instagram Feed PeakCL (layout réglé côté Elfsight : viser 3-4 vignettes) */}
        <div
          className="elfsight-app-562a0aa7-3065-445f-bb96-cba40fe65b41 max-h-[420px] overflow-hidden"
          data-elfsight-app-lazy
        />
        <div className="mt-6 text-center">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_instagram_follow"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[color-mix(in_oklab,var(--brand-violet)_40%,transparent)]"
          >
            <Instagram className="h-4 w-4 text-[var(--brand-violet)]" />
            {t.follow}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
