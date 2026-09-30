import { ArrowRight } from "lucide-react";
import { conseilBySlug } from "@/content/peakcl/conseils";

/**
 * Liens vers les articles « Conseils » depuis les pages qui vendent.
 *
 * L'audit SEO du 30/09/2026 relevait 1 à 5 liens internes seulement vers
 * chaque article, presque tous depuis le hub /conseils : Google les voyait
 * comme des pages isolées. Relier chaque article aux pages de service qui en
 * parlent leur transmet du poids et donne au visiteur la réponse à la question
 * qu'il se pose avant d'acheter (combien, WordPress ou pas, etc.).
 *
 * Le titre et le résumé viennent du module de contenu : un article renommé se
 * met à jour partout sans toucher aux pages.
 */
export function RelatedArticles({
  slugs,
  title = "À lire avant de vous lancer",
  className = "",
}: {
  slugs: string[];
  title?: string;
  className?: string;
}) {
  const articles = slugs.map(conseilBySlug).filter((c) => c !== undefined);
  if (articles.length === 0) return null;
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {articles.map((c) => (
          <li key={c.slug}>
            <a
              href={`/${c.slug}`}
              className="group block h-full rounded-2xl border border-border bg-card/40 p-5 text-left transition-colors hover:border-[var(--brand-turquoise)]"
            >
              <span className="font-semibold text-foreground">{c.h1}</span>
              <span className="mt-2 line-clamp-2 block text-sm text-muted-foreground">
                {c.excerpt}
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-turquoise-ink)]">
                Lire l’article
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
