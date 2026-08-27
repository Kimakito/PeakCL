import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DeviceFrameProps = {
  /** `phone` : écran 9/16, adapté à une vidéo verticale.
   *  `laptop` : écran 16/10, adapté à une capture ou une vidéo paysage. */
  variant?: "phone" | "laptop";
  children: ReactNode;
  className?: string;
};

/**
 * Cadre d'appareil, en CSS pur.
 *
 * Aucun PNG de mockup : un cadre en image pèse quelques centaines de kilo-
 * octets, se pixellise en haute densité et impose son propre thème clair ou
 * sombre. Ici tout est en bordures et dégradés, donc net à toutes les tailles
 * et à n'importe quel facteur de zoom.
 *
 * Le châssis garde volontairement ses teintes d'aluminium en clair comme en
 * sombre : un ordinateur qui change de couleur avec le thème du site cesse de
 * ressembler à un ordinateur. Seul l'écran suit le contenu.
 *
 * `aria-hidden` sur toutes les pièces décoratives — encoche, pied, boutons
 * latéraux. Un lecteur d'écran n'a que faire du dessin du châssis, il doit
 * atteindre directement ce qui est à l'écran.
 */
export function DeviceFrame({ variant = "phone", children, className }: DeviceFrameProps) {
  if (variant === "laptop") {
    return (
      <div className={cn("mx-auto w-full", className)}>
        {/* Capot */}
        <div className="relative rounded-t-[14px] rounded-b-[6px] bg-gradient-to-b from-[#3a3a3d] to-[#232326] p-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:p-[14px]">
          <div className="relative overflow-hidden rounded-[6px] bg-black">
            {/* Encoche */}
            <div
              aria-hidden
              className="absolute left-1/2 top-0 z-10 h-[14px] w-[90px] -translate-x-1/2 rounded-b-[8px] bg-[#232326] sm:h-[18px] sm:w-[120px]"
            />
            <div className="flex aspect-[16/10] w-full items-center justify-center">{children}</div>
          </div>
        </div>
        {/* Socle */}
        <div aria-hidden className="relative mx-auto h-[10px] w-[108%] -translate-y-[1px]">
          <div className="h-full w-full rounded-b-[10px] bg-gradient-to-b from-[#c8c9cd] to-[#8e9095]" />
          <div className="absolute left-1/2 top-0 h-[5px] w-[14%] -translate-x-1/2 rounded-b-[6px] bg-[#75777c]" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative mx-auto w-full", className)}>
      {/* Boutons latéraux */}
      <span
        aria-hidden
        className="absolute -left-[2px] top-[18%] h-[7%] w-[3px] rounded-l-sm bg-[#4a4a4e]"
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[29%] h-[11%] w-[3px] rounded-l-sm bg-[#4a4a4e]"
      />
      <span
        aria-hidden
        className="absolute -right-[2px] top-[24%] h-[14%] w-[3px] rounded-r-sm bg-[#4a4a4e]"
      />
      {/* Châssis */}
      <div className="relative rounded-[2.4rem] bg-gradient-to-b from-[#3a3a3d] to-[#232326] p-[9px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
          {/* Îlot dynamique */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[10px] z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black/90"
          />
          <div className="flex aspect-[9/16] w-full items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
