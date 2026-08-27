import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { PeakclTestimonial } from "@/content/peakcl/testimonials";
import { cn } from "@/lib/utils";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";

/** Initiales de repli quand le client n'a pas de logo rattaché avec certitude. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Découpe la liste en colonnes équilibrées, dans l'ordre d'origine. */
function toColumns<T>(items: T[], columns: number): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => result[i % columns].push(item));
  return result;
}

type TestimonialWallProps = {
  testimonials: PeakclTestimonial[];
  className?: string;
};

/**
 * Mur d'avis : une grille de cartes, lisible d'un coup d'oeil.
 *
 * Remplace un bandeau défilant en continu. Le défilement automatique posait
 * trois problèmes concrets : un avis n'est lisible que pendant les secondes où
 * il passe, on ne peut pas revenir en arrière pour finir une phrase, et le
 * mouvement permanent tire l'oeil hors du reste de la page. Une grille rend
 * les six avis lisibles simultanément, sans animation.
 *
 * La vignette porte le LOGO du client plutôt qu'un portrait : PeakCL n'a pas
 * de photo de ses clients, et un logo réel prouve davantage qu'un avatar
 * générique. Quand le rattachement n'est pas certain, on affiche les initiales
 * — un avis attribué au mauvais client coûterait plus cher que l'absence de
 * logo.
 *
 * Les logos sont en `object-contain` sur fond clair : ils sont dessinés pour
 * du papier à en-tête, pas pour être rognés en rond. Un `object-cover` couperait
 * la moitié des marques.
 */
export function TestimonialWall({ testimonials, className }: TestimonialWallProps) {
  const columns = toColumns(testimonials, 3);

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {column.map((t) => (
            <Card
              key={t.name + t.quote.slice(0, 24)}
              className="card-hover border-border bg-card/50 shadow-card backdrop-blur"
            >
              <CardContent className="flex flex-col gap-4 pt-6">
                <div
                  className="flex items-center gap-0.5 text-[var(--brand-yellow)]"
                  aria-label={`${t.rating} étoiles sur 5`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>

                <blockquote className="text-sm leading-relaxed text-foreground">
                  « {t.quote} »
                </blockquote>

                <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  {/* `optimizedLogoUrl` sert la miniature 96px et non le logo
                      pleine taille : ces vignettes font 40px de cote, et les six
                      fichiers d'origine pesaient 570 Ko a eux seuls — dont
                      357 Ko pour un seul PNG. Les versions `-sm.webp` generees
                      par `scripts/optimize-client-logos.mjs` tombent a 18 Ko au
                      total, sans difference visible a cette taille. */}
                  <Avatar className="size-10 shrink-0 border border-border bg-white">
                    {t.logoUrl ? (
                      <AvatarImage
                        src={optimizedLogoUrl(t.logoUrl)}
                        alt=""
                        loading="lazy"
                        className="object-contain p-1"
                      />
                    ) : null}
                    <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
                      {initials(t.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <cite className="block truncate text-sm font-semibold not-italic text-foreground">
                      {t.name}
                    </cite>
                    <span className="block truncate text-xs text-muted-foreground">
                      {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
