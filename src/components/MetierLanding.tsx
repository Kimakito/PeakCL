import { ArrowRight, Check, Gift, Quote } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";
import { BOOKING_URL } from "@/lib/links";

export type MetierFaqItem = { question: string; answerHtml: string };

/** Une réalisation réelle citée en preuve. Jamais un exemple inventé. */
export type MetierProof = {
  /** Nom du client tel qu'il apparaît au portfolio. */
  name: string;
  /** Métier + lieu, repris du portfolio. */
  role: string;
  /** Ce qui a été fait et pourquoi — en une ou deux phrases, à la première personne. */
  text: string;
  /** URL publique du site livré, quand il est en ligne. */
  siteUrl?: string;
};

export type MetierLandingProps = {
  /** Étiquette courte affichée au-dessus du H1 (« Artisans & bâtiment »). */
  eyebrow: string;
  /** H1 complet : c'est la requête ciblée, écrite pour un humain. */
  headline: string;
  intro: string;
  /** Le problème concret de ce métier, dans ses mots. */
  problem: { title: string; text: string };
  /** Ce que la prestation apporte, formulé pour ce métier précis. */
  benefits: string[];
  /** Les pages/sections qui comptent vraiment pour ce métier. */
  pages: { title: string; desc: string }[];
  /** Clients réels du même métier. Le cœur de la page. */
  proofs: MetierProof[];
  /** Ce que la page n'affirme pas — une limite honnête. */
  limit?: string;
  /** Budget, repris tel quel du catalogue public. */
  pricing: string;
  faq: MetierFaqItem[];
  /** Maillage : pages villes et services liés. */
  related: { label: string; href: string }[];
};

/**
 * Gabarit des pages métier.
 *
 * Volontairement distinct de `GeoLanding` : une page ville répond à « qui
 * travaille près de chez moi », une page métier à « qui comprend mon métier ».
 * Les deux titres, les deux preuves et les deux FAQ n'ont rien à voir, et les
 * fusionner produirait un gabarit qui ne répond bien à aucune des deux.
 */
export function MetierLanding({
  eyebrow,
  headline,
  intro,
  problem,
  benefits,
  pages,
  proofs,
  limit,
  pricing,
  faq,
  related,
}: MetierLandingProps) {
  return (
    <main className="min-h-screen border-t border-border">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            {eyebrow}
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-5xl">
            {headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{intro}</p>
          <a
            href="/diagnostic"
            data-event="cta_mini_audit_metier_hero"
            className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Recevoir mon mini-audit <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            2 minutes · gratuit · sans engagement
          </p>
        </div>
      </section>

      {/* Le probleme du metier, puis ce que ca donne concretement. */}
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">{problem.title}</h2>
            <p className="mt-4 text-muted-foreground">{problem.text}</p>
            {limit ? (
              <p className="mt-4 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                {limit}
              </p>
            ) : null}
          </div>
          <div className="relative rounded-2xl border border-border bg-card/50 p-6 shadow-card">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <h3 className="text-base font-semibold">Ce que vous obtenez</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Les pages qui comptent pour CE metier. */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            Les pages qui font la différence, dans votre métier
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pages.map((p) => (
              <div
                key={p.title}
                className="relative rounded-2xl border border-border bg-card/50 p-5 shadow-card"
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preuve : de vrais clients du meme metier. */}
      <section className="border-t border-border bg-card/20 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">Des clients de votre métier</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pas des exemples génériques : des sites que j'ai livrés, en ligne, que vous pouvez
            ouvrir.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {proofs.map((p) => (
              <div
                key={p.name}
                className="relative flex flex-col rounded-2xl border border-border bg-card/60 p-5 shadow-card"
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <Quote className="h-5 w-5 text-[var(--brand-violet)]" aria-hidden />
                <h3 className="mt-3 text-base font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.role}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.text}</p>
                {p.siteUrl ? (
                  <a
                    href={p.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="metier_proof_open"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
                  >
                    Voir le site <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
          <a
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
          >
            Voir tout le portfolio <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Budget : affiche, parce qu'un prix cache fait partir un prospect. */}
      <section className="border-t border-border py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:text-left">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Combien ça coûte</h2>
            <p className="mt-1 text-sm text-muted-foreground">{pricing}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <div
                key={item.question}
                className="relative rounded-2xl border border-border bg-card/50 p-5 shadow-card"
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answerHtml}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold">À voir aussi</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {related.map((r) => (
              <a
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-20">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <ExpressionPhoto
              slug="sourire-exterieur"
              caption="Ravie de vous lire"
              tilt={-2}
              imgClassName="aspect-[3/4] w-28"
            />
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">On regarde votre cas précis ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Deux minutes, trois champs : je regarde votre visibilité Google, votre site et vos
            réseaux, et je vous renvoie les 3 actions prioritaires.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/diagnostic"
              data-event="cta_mini_audit_metier_final"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Recevoir mon mini-audit <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
