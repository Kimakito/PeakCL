"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Extra classes for the GlowingEffect layer. */
  glowClassName?: string;
  /** GlowingEffect tuning (sensible defaults match the site cards). */
  spread?: number;
  proximity?: number;
  borderWidth?: number;
}

/**
 * Drop-in card wrapper that adds the animated brand glow border on hover.
 * Keeps whatever card styling you pass via `className` (rounded, border,
 * bg, padding…) and simply overlays the glow. The element is forced to
 * `relative` so the glow can position itself against the card edges.
 */
export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  (
    {
      className,
      children,
      glowClassName,
      spread = 40,
      proximity = 64,
      borderWidth = 3,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <GlowingEffect
        spread={spread}
        glow
        disabled={false}
        proximity={proximity}
        inactiveZone={0.01}
        borderWidth={borderWidth}
        className={glowClassName}
      />
      {children}
    </div>
  ),
);
GlowCard.displayName = "GlowCard";
