import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  /** Cle stable. Le slug du projet fait tres bien l'affaire. */
  id: string;
  title: string;
  subtitle?: string;
  /** Visuel de la carte. Doit exister : une carte sans image casse l'anneau. */
  image: string;
  /** Rend la carte cliquable. Sans lui, la carte reste decorative. */
  href?: string;
  /** Pastille en haut de carte (« En cours », categorie...). */
  badge?: string;
  /** `object-position` du visuel, quand le cadrage par defaut coupe mal. */
  imagePosition?: string;
};

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Eloignement des cartes par rapport au centre, en pixels. */
  radius?: number;
  /** Degres par frame de la rotation automatique. */
  autoRotateSpeed?: number;
}

/**
 * Anneau 3D de cartes, en rotation lente, manipulable a la souris.
 *
 * Ecrit a partir d'un composant de galerie circulaire, avec cinq corrections
 * qui ne sont pas cosmetiques :
 *
 * 1. **Aucun rendu React par frame.** L'original appelait `setRotation` dans
 *    `requestAnimationFrame` : soixante rendus par seconde, chacun recalculant
 *    la transformation de toutes les cartes. La rotation est ici tenue dans un
 *    `ref` et ecrite directement dans le DOM. React ne rend qu'une fois.
 * 2. **Pas de detournement du defilement.** L'original lisait
 *    `window.scrollY / document.documentElement.scrollHeight` et supposait
 *    donc posseder toute la page — il fallait lui donner 500vh de hauteur. Ici
 *    l'anneau vit dans sa propre boite, a hauteur fixe, et n'a aucun avis sur
 *    le reste de la page.
 * 3. **`prefers-reduced-motion` respecte.** La rotation automatique s'arrete,
 *    l'anneau reste lisible et manipulable a la main.
 * 4. **Animation suspendue hors ecran**, via IntersectionObserver. Une boucle
 *    `requestAnimationFrame` qui tourne pour un element invisible consomme de
 *    la batterie et pese sur les Core Web Vitals sans rien afficher.
 * 5. **`NodeJS.Timeout` remplace par `ReturnType<typeof setTimeout>`** : le
 *    type Node n'existe pas dans du code navigateur.
 *
 * Accessibilite : les cartes restent des liens dans l'ordre du DOM, donc
 * atteignables au clavier et lisibles par un lecteur d'ecran meme quand
 * l'anneau les place derriere. Le focus met la rotation en pause.
 */
export function CircularGallery({
  items,
  className,
  radius,
  autoRotateSpeed = 0.03,
  ...props
}: CircularGalleryProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rotationRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startRotation: number }>({
    active: false,
    startX: 0,
    startRotation: 0,
  });

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || items.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anglePerItem = 360 / items.length;

    // Le rayon depend du NOMBRE de cartes, pas seulement de la largeur.
    // Un rayon proportionnel a l'ecran seul donnait, a vingt cartes, 101px
    // d'arc pour des cartes de 280px : un empilement illisible. On part donc de
    // l'arc voulu par carte — environ 62% de sa largeur, assez pour un
    // chevauchement franc sans bouillie — et on en deduit le rayon.
    const computeRadius = () => {
      if (radius) return radius;
      const parentWidth = ring.parentElement?.clientWidth ?? window.innerWidth;
      const cardWidth = parentWidth < 640 ? 220 : 280;
      const fromCount = (items.length * cardWidth * 0.62) / (2 * Math.PI);
      return Math.max(240, Math.min(fromCount, parentWidth * 0.75));
    };
    let currentRadius = computeRadius();

    const paint = () => {
      ring.style.transform = `rotateY(${rotationRef.current}deg)`;
      for (let i = 0; i < items.length; i += 1) {
        const card = cardsRef.current[i];
        if (!card) continue;
        card.style.transform = `rotateY(${i * anglePerItem}deg) translateZ(${currentRadius}px)`;
        // Une carte a l'oppose de l'anneau est presque de dos : on l'estompe
        // pour que l'oeil sache ou regarder, sans jamais la faire disparaitre.
        const relative = (i * anglePerItem + rotationRef.current) % 360;
        const normalized = Math.abs(relative > 180 ? 360 - relative : relative);
        card.style.opacity = String(Math.max(0.25, 1 - normalized / 180));
        card.style.pointerEvents = normalized > 100 ? "none" : "auto";
      }
    };

    let frame = 0;
    let visible = false;

    const tick = () => {
      if (!reduced && !pausedRef.current && !dragRef.current.active) {
        rotationRef.current += autoRotateSpeed;
      }
      paint();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Hors ecran, la boucle est arretee net plutot que laissee a tourner.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    observer.observe(ring);

    const onResize = () => {
      currentRadius = computeRadius();
      paint();
    };
    window.addEventListener("resize", onResize);

    paint();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, [items, radius, autoRotateSpeed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startRotation: rotationRef.current,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = e.clientX - dragRef.current.startX;
    rotationRef.current = dragRef.current.startRotation + delta * 0.25;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      role="region"
      aria-label="Galerie des réalisations"
      className={cn(
        "relative flex h-full w-full cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing",
        className,
      )}
      style={{ perspective: "1800px" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
      {...props}
    >
      <div
        ref={ringRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => {
          const Card = item.href ? "a" : "div";
          return (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 -ml-[110px] -mt-[150px] h-[300px] w-[220px] sm:-ml-[140px] sm:-mt-[190px] sm:h-[380px] sm:w-[280px]"
            >
              <Card
                {...(item.href
                  ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                data-event={item.href ? "gallery_project_open" : undefined}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card/70 shadow-card"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: item.imagePosition ?? "top center" }}
                />
                {item.badge ? (
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                    {item.badge}
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 text-white">
                  <h3 className="text-base font-bold leading-tight">{item.title}</h3>
                  {item.subtitle ? (
                    <p className="mt-1 text-xs opacity-85">{item.subtitle}</p>
                  ) : null}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

CircularGallery.displayName = "CircularGallery";
