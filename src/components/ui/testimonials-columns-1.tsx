"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export type ColumnTestimonial = {
  quote: string;
  name: string;
  /** Source / date line under the name, e.g. "Avis Google ✓ · mai 2026" */
  role?: string;
  rating?: number;
};

/**
 * Infinite vertical marquee column of testimonial cards.
 * The list is rendered twice and animated to translateY -50% so the loop is seamless.
 */
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ColumnTestimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ quote, name, role, rating }, i) => (
              <div
                key={i}
                className="relative w-full max-w-xs rounded-3xl border border-white/5 bg-card/50 p-8 text-left shadow-card backdrop-blur"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                {rating ? (
                  <div className="flex items-center gap-1 text-[var(--brand-yellow)]">
                    {Array.from({ length: rating }).map((_, k) => (
                      <Star
                        key={k}
                        className="star-pop h-3.5 w-3.5 fill-current"
                        style={{ animationDelay: `${k * 0.08}s` }}
                      />
                    ))}
                  </div>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-turquoise)]/15 text-sm font-semibold uppercase text-[var(--brand-turquoise)]">
                    {name.trim().charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium leading-5 tracking-tight text-foreground">
                      {name}
                    </div>
                    {role ? (
                      <div className="text-xs leading-5 tracking-tight text-muted-foreground">
                        {role}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
