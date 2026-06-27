import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { MASCOT_POSES, MASCOT_DEFAULT_POSE, type MascotPose } from "@/lib/mascot";

type MascotProps = {
  /** Clé de pose dans la bibliothèque (src/lib/mascot.ts). */
  pose: MascotPose;
  /** Retourne l'avatar horizontalement (ex. « montre avec l'autre main »). */
  flip?: boolean;
  /** Active l'inclinaison douce de l'avatar vers le curseur (hero). */
  lean?: boolean;
  /** Classe de hauteur Tailwind appliquée à l'image (ex. "h-72"). */
  heightClass?: string;
  /** Classe(s) sur le conteneur racine (doit être dimensionné par le parent). */
  className?: string;
  alt?: string;
  /** Intensité du lean (1 = défaut). */
  leanStrength?: number;
};

/**
 * Mascotte PeakCL : affiche une pose de la bibliothèque, avec transition
 * fondu entre poses, miroir optionnel et suivi doux de la souris.
 * Le conteneur racine prend 100% de la taille de son parent — pense à
 * dimensionner le parent (largeur/hauteur).
 */
export function Mascot({
  pose,
  flip = false,
  lean = false,
  heightClass = "h-64",
  className = "",
  alt = "Mascotte PeakCL",
  leanStrength = 1,
}: MascotProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const cfg = { stiffness: 120, damping: 18, mass: 0.4 };
  const sRx = useSpring(rx, cfg);
  const sRy = useSpring(ry, cfg);
  const sTx = useSpring(tx, cfg);
  const sTy = useSpring(ty, cfg);

  useEffect(() => {
    if (!lean || reduce) return;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    function onMove(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      ry.set(clamp(dx) * 12 * leanStrength);
      rx.set(clamp(dy) * -7 * leanStrength);
      tx.set(clamp(dx) * 12 * leanStrength);
      ty.set(clamp(dy) * 6 * leanStrength);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [lean, reduce, leanStrength, rx, ry, tx, ty]);

  const src = MASCOT_POSES[pose] ?? MASCOT_POSES[MASCOT_DEFAULT_POSE];

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        className="relative h-full w-full"
        style={
          lean
            ? { rotateX: sRx, rotateY: sRy, x: sTx, y: sTy, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {/* Couche miroir (transform CSS simple, séparée du lean framer) */}
        <div className="absolute inset-0" style={flip ? { transform: "scaleX(-1)" } : undefined}>
          <AnimatePresence initial={false}>
            <motion.img
              key={pose}
              src={src}
              alt={alt}
              draggable={false}
              className={`absolute inset-0 m-auto w-auto ${heightClass} select-none drop-shadow-[0_0_40px_color-mix(in_oklab,var(--brand-turquoise)_45%,transparent)]`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
