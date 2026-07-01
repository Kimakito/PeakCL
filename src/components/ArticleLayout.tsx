import { ArrowRight } from "lucide-react";
import { conseils, type Conseil } from "@/content/peakcl/conseils";

const DATE_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : DATE_FMT.format(d);
}

export function ArticleLayout({ conseil }: { conseil: Conseil }) {
  const related = conseils.filter((c) => c.slug !== conseil.slug).slice(0, 2);

  return (
    <main className="min-h-screen border-t border-white/5">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero py-16">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6">
          <a
            href="/conseils"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)] hover:text-foreground"
          >
            ← Conseils
          </a>
          <h1 className="mt-5 text-balance text-3xl font-bold leading-tight md:text-5xl">
            {conseil.h1}
          </h1>
          <p className="mt-4 text-muted-foreground">{conseil.intro}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Par Charlotte Lacroix · {formatDate(conseil.datePublished)}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="border-t border-white/5 py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-10">
            {conseil.sections.map((section) => (
              <section key={section.h2}>
                <h2 className="text-xl font-bold md:text-2xl">{section.h2}</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] bg-card/40 p-6 text-center shadow-card">
            <h2 className="text-lg font-bold">Un projet, ou juste une question ?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Audit gratuit de votre site web et de vos réseaux sociaux, sous 24h et sans engagement.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/reservation-appel"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Demander mon audit gratuit <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://calendly.com/peakcl73/45min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
              >
                Réserver un appel
              </a>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                À lire aussi
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card transition-colors hover:border-white/15"
                  >
                    <h3 className="text-base font-semibold">{r.h1}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-turquoise)]">
                      Lire <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
