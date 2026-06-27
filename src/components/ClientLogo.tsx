import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";
import { pickLogoBackground, type LogoBgVariant } from "@/lib/pickLogoBackground";

type ClientLogoProps = {
  src: string;
  alt: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "h-11 w-11 p-1.5",
  md: "h-14 w-14 p-2",
} as const;

export function ClientLogo({ src, alt, size = "md", className }: ClientLogoProps) {
  const [variant, setVariant] = useState<LogoBgVariant>("light");
  const bg = useMemo(
    () => (variant === "dark" ? "bg-black/40 border-white/10" : "bg-white/90 border-black/10"),
    [variant],
  );

  return (
    <div
      className={cn("shrink-0 rounded-xl border shadow-sm", sizeClasses[size], bg, className)}
      aria-hidden={alt ? undefined : true}
    >
      <img
        src={optimizedLogoUrl(src)}
        alt={alt}
        width={44}
        height={44}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
        onLoad={(e) => setVariant(pickLogoBackground(e.currentTarget))}
      />
    </div>
  );
}
