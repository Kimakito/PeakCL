import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function CTAButton({
  children, href = "#contact", variant = "primary", className = "", dataEvent,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  dataEvent?: string;
}) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.03]"
      : "border border-border bg-card/40 text-foreground backdrop-blur hover:bg-card/70";
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-event={dataEvent}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
