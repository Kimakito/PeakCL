import { useEffect } from "react";
import { Instagram, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SOCIAL } from "@/lib/links";

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

/**
 * Feed Instagram via widget Elfsight.
 * platform.js scanne le DOM et hydrate le div `.elfsight-app-<id>`.
 * Le script n'est injecté qu'une fois (idempotent), côté client.
 */
export function InstagramFeed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = ELFSIGHT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="instagram" className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-8 md:px-16">
        <SectionHeading
          className="mb-8"
          accent="violet"
          eyebrow="Instagram"
          title={<>Le studio <span className="text-gradient">au quotidien</span>.</>}
          subtitle="Coulisses, projets livrés et conseils : suivez PeakCL sur Instagram."
        />
        {/* Widget Elfsight — Instagram Feed PeakCL */}
        <div
          className="elfsight-app-562a0aa7-3065-445f-bb96-cba40fe65b41"
          data-elfsight-app-lazy
        />
        <div className="mt-8 text-center">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_instagram_follow"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[color-mix(in_oklab,var(--brand-violet)_40%,transparent)]"
          >
            <Instagram className="h-4 w-4 text-[var(--brand-violet)]" />
            Suivre @peakcl73
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
