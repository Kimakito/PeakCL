import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Download,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import type { AssetBlock, ValueAsset as ValueAssetData } from "@/content/peakcl/value-assets";

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";

function Block({ block }: { block: AssetBlock }) {
  if ("p" in block) {
    return <p className="text-[15px] leading-relaxed text-muted-foreground">{block.p}</p>;
  }
  if ("quote" in block) {
    return (
      <div className="relative rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_28%,transparent)] bg-[color-mix(in_oklab,var(--brand-violet)_10%,transparent)] p-5">
        <Quote className="absolute right-4 top-4 h-5 w-5 text-[color-mix(in_oklab,var(--brand-turquoise)_55%,transparent)]" />
        <p className="pr-6 text-base font-semibold leading-snug text-foreground">{block.quote}</p>
      </div>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2.5 text-[15px] leading-relaxed text-muted-foreground">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-turquoise)]" />
            <span>
              {item.strong && <span className="font-semibold text-foreground">{item.strong} </span>}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if ("cards" in block) {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {block.cards.map((c, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold text-[var(--brand-turquoise)]">{c.k}</div>
            <div className="mt-1 text-base font-bold text-foreground">{c.t}</div>
            <div className="mt-2 text-sm text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </div>
    );
  }
  // callout
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      {block.callout.title && (
        <div className="text-sm font-semibold text-foreground">{block.callout.title}</div>
      )}
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {block.callout.bullets.map((b, i) => (
          <li key={i}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}

export function ValueAsset({ asset }: { asset: ValueAssetData }) {
  const testimonial = peakclTestimonials[0];

  return (
    <main className="min-h-screen border-t border-white/5">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { border: none !important; }
          .print-paper { background: white !important; color: black !important; border: none !important; box-shadow: none !important; }
          .print-paper * { color: black !important; }
        }
      `}</style>

      <section className="relative overflow-hidden bg-hero py-14">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6">
          {/* Toolbar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3">
            <a
              href="/bienvenue"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground hover:border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la page Bienvenue
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
            >
              Télécharger en PDF <Download className="h-4 w-4" />
            </button>
          </div>

          {/* Progress */}
          <div className="no-print mt-6 flex items-center gap-1.5">
            {Array.from({ length: asset.total }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background:
                    i < asset.index
                      ? "var(--brand-turquoise)"
                      : "color-mix(in oklab, var(--brand-turquoise) 18%, transparent)",
                }}
              />
            ))}
          </div>

          {/* Paper */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card print-paper sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
                {asset.eyebrow}
              </span>
              <span className="text-xs text-muted-foreground">{asset.readTime}</span>
            </div>

            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight md:text-4xl">
              {asset.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{asset.subtitle}</p>

            {/* Hook */}
            <div className="mt-6 rounded-2xl border border-[color-mix(in_oklab,var(--brand-yellow)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-yellow)_8%,transparent)] p-5">
              <p className="text-base font-semibold leading-snug text-foreground">{asset.hook}</p>
            </div>

            {/* Intro (accompanying tone) */}
            <div className="mt-6 space-y-3">
              {asset.intro.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            {/* Credibility / social proof */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-violet)]">
                <Sparkles className="h-3.5 w-3.5" />
                Qui te parle ?
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Charlotte Lacroix (PeakCL).</span>{" "}
                Développeuse web, graphiste et formée au community management. Plus de 20 projets
                livrés, notés 5/5 sur Google. Je code <em>et</em> je dessine : je vois donc à la fois
                la structure technique et l'image, exactement ce qui manque à la plupart des sites.
              </p>
              {testimonial && (
                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex gap-1 text-[var(--brand-yellow)]">
                    {Array.from({ length: testimonial.rating }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {[testimonial.name, testimonial.sourceLabel].filter(Boolean).join(" · ")}
                  </div>
                </div>
              )}
            </div>

            {/* Sections (value) */}
            <div className="mt-8 space-y-8">
              {asset.sections.map((section) => (
                <section key={section.h2}>
                  <h2 className="text-xl font-bold">{section.h2}</h2>
                  <div className="mt-3 space-y-4">
                    {section.blocks.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Action */}
            <div className="mt-8 rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_28%,transparent)] bg-[color-mix(in_oklab,var(--brand-turquoise)_7%,transparent)] p-5">
              <h2 className="text-base font-bold text-foreground">{asset.action.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {asset.action.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-turquoise)]" />
                    <span>
                      {item.strong && (
                        <span className="font-semibold text-foreground">{item.strong} </span>
                      )}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA — chained next + book call */}
          <div className="no-print mt-6 space-y-4">
            {asset.next && (
              <a
                href={asset.next.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-card/40 p-5 transition-colors hover:border-white/20"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-turquoise)]">
                    Ressource suivante
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{asset.next.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[var(--brand-turquoise)] transition-transform group-hover:translate-x-0.5" />
              </a>
            )}

            <div className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-violet)_35%,transparent)] bg-hero p-6 text-center">
              <h2 className="text-lg font-bold text-foreground">On en parle pendant l'appel ?</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                L'objectif n'est pas de te vendre quelque chose à tout prix. C'est de comprendre ta
                situation, voir ce qui bloque, et te donner une direction claire.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mx-auto mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                <CalendarCheck className="h-4 w-4" /> Confirmer / réserver mon appel
              </a>
              <p className="mt-3 text-xs text-muted-foreground">45 min · visio · sans engagement</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
