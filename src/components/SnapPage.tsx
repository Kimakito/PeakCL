import { useEffect, useState, type ReactNode } from "react";

/** Piste de progression latérale, façon home : suit la section visible, clique = scroll. */
function useSectionObserver(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: [0.15, 0.5, 0.85] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/**
 * Conteneur de page à sections.
 * Par défaut : scroll vertical normal et compact (les sections font la hauteur
 * de leur contenu + padding). Passer `full` pour l'ancien mode "deck" plein
 * écran avec snap (utilisé par le portfolio, 1 section par écran).
 */
export function SnapPage({ children, className = "", full = false }: { children: ReactNode; className?: string; full?: boolean }) {
  return (
    <div className={`${full ? "md:h-screen md:snap-y md:snap-mandatory md:overflow-y-auto md:scroll-smooth" : ""} ${className}`}>
      {children}
    </div>
  );
}

/** Section à utiliser à l'intérieur de <SnapPage> : id requis pour la nav latérale. `full` = plein écran + snap. */
export function SnapSection({
  id, children, className = "", full = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section id={id} className={`${full ? "md:min-h-screen md:snap-start" : ""} ${className}`}>
      {children}
    </section>
  );
}

/** Petite piste de points fixe à droite, façon TimelineBar de la home, pour naviguer entre sections. */
export function SectionDots({ sections }: { sections: { id: string; label: string }[] }) {
  const activeId = useSectionObserver(sections.map((s) => s.id));

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          title={s.label}
          className="group relative flex items-center justify-center"
        >
          <span
            className={`block h-2 w-2 rounded-full transition-all duration-300 ${
              activeId === s.id
                ? "scale-150 bg-[var(--brand-turquoise)] shadow-[0_0_8px_var(--brand-turquoise)]"
                : "bg-muted group-hover:bg-muted"
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
