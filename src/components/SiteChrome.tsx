import { useEffect, useRef } from "react";

/**
 * Chrome global du site : barre de progression de scroll + curseur halo.
 * Tout est piloté par transform/opacity via variables CSS. Désactivé en
 * reduced-motion (curseur) et sur pointeur tactile.
 */
export function SiteChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Barre de progression du scroll
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? doc.scrollTop / max : 0;
        barRef.current?.style.setProperty("--scroll", String(p));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Curseur halo (desktop pointeur fin uniquement)
    let move: ((e: PointerEvent) => void) | null = null;
    let over: ((e: PointerEvent) => void) | null = null;
    if (!reduce && !coarse) {
      move = (e) => {
        const el = haloRef.current;
        if (!el) return;
        el.style.setProperty("--cx", `${e.clientX}px`);
        el.style.setProperty("--cy", `${e.clientY}px`);
      };
      over = (e) => {
        const t = e.target as HTMLElement | null;
        const hot = !!t?.closest("a,button,summary,[role='button'],input,textarea,select");
        haloRef.current?.setAttribute("data-hot", hot ? "true" : "false");
      };
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (move) window.removeEventListener("pointermove", move);
      if (over) window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden />
      <div ref={haloRef} className="cursor-halo" aria-hidden />
    </>
  );
}
