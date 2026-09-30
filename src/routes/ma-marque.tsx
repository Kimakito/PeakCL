import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { absUrl } from "@/seo/site";
import {
  AUTRES_UNIVERS,
  COULEURS,
  DEGRADES,
  EMOTIONS,
  LOGOS,
  MASCOTTE,
  NEON_AVIS,
  NEON_COVERS,
  NEON_STORIES,
  CHECKLIST,
  FORMATS,
  GRILLE,
  GRILLE_TARIFS,
  INCOHERENCES_TARIFS,
  PACKS_EXEMPLES,
  REVENU_EXEMPLE,
  SOURCES_TARIFS,
  TJM,
  VERDICTS,
  INCOHERENCES,
  PLAN_DEMARRAGE,
  RESEAUX,
  SEMAINE,
  SITUATIONS,
  TEST_5_SECONDES,
  type Visual,
} from "@/content/peakcl/marque";

// Page interne : pas de lien dans la nav, hors sitemap, noindex.
export const Route = createFileRoute("/ma-marque")({
  head: () => ({
    meta: [
      { title: "Ma marque · PeakCL (interne)" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absUrl("/ma-marque") }],
  }),
  component: MaMarquePage,
});

const SECTIONS = [
  ["situations", "Quel visuel ?"],
  ["reseaux", "Réseaux sociaux"],
  ["mascotte", "Mascotte"],
  ["neon", "Série néon"],
  ["logos", "Logos"],
  ["couleurs", "Couleurs"],
  ["univers", "À ne pas mélanger"],
  ["rythme", "Rythme"],
  ["tarifs", "Tarifs"],
] as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#360099] dark:text-[#96F0F7]">
      {children}
    </p>
  );
}

function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

function Thumb({ v, size = "md" }: { v: Visual; size?: "sm" | "md" }) {
  const bg =
    v.bg === "fonce"
      ? "bg-[#13004D]"
      : v.bg === "creme"
        ? "bg-[#FFEAA9]"
        : "bg-[linear-gradient(135deg,#FAFAFF,#F3F2FC)]";
  return (
    <figure className="group">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-2xl border border-border ${bg} ${
          size === "sm" ? "aspect-square p-2" : "aspect-[4/5] p-3"
        }`}
      >
        <img
          src={v.src}
          alt={v.label}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-2 text-sm font-semibold leading-tight">{v.label}</figcaption>
      <p className="truncate text-[11px] text-muted-foreground" title={v.source}>
        {v.source}
      </p>
    </figure>
  );
}

function Swatch({ nom, hex, role, ink }: (typeof COULEURS)[number]) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(hex).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
      className="card-hover overflow-hidden rounded-3xl border border-border bg-card text-left"
    >
      <div
        className="flex h-24 items-end justify-between p-4 font-mono text-sm font-semibold"
        style={{ background: hex, color: ink }}
      >
        {hex}
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 opacity-60" />}
      </div>
      <div className="p-4">
        <p className="font-semibold">{nom}</p>
        <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      </div>
    </button>
  );
}

const CHECK_KEY = "peakcl-ma-marque-checklist";

/** Cases cochées gardées dans ce navigateur seulement (confort, pas une sauvegarde). */
function Checklist() {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECK_KEY);
      if (raw) setDone(JSON.parse(raw) as number[]);
    } catch {
      // stockage indisponible : la liste marche quand même, sans mémoire
    }
  }, []);
  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((d) => d !== i) : [...done, i];
    setDone(next);
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(next));
    } catch {
      // idem
    }
  };
  return (
    <div className="rounded-[2rem] border border-border bg-card p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold">Audite-toi comme une cliente</h3>
        <p className="text-sm font-semibold text-muted-foreground">
          {done.length} / {CHECKLIST.length}
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {CHECKLIST.map((item, i) => {
          const on = done.includes(i);
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className="flex w-full items-start gap-3 rounded-xl p-2 text-left hover:bg-muted"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    on ? "border-[#4DAFC9] bg-[#4DAFC9] text-white" : "border-border"
                  }`}
                >
                  {on ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                <span className={on ? "text-muted-foreground line-through" : ""}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Reseaux() {
  const [nom, setNom] = useState(RESEAUX[0].nom);
  const r = RESEAUX.find((x) => x.nom === nom) ?? RESEAUX[0];
  return (
    <section id="reseaux" className="scroll-mt-32">
      <SectionTitle
        kicker="Réseaux sociaux"
        title="Ton image en ligne, c'est ta première démo"
        intro="Avant de t'écrire, un prospect regarde ton Instagram ou ton LinkedIn. Il ne lit pas tes offres : il regarde si ton compte est aussi cohérent que ce que tu promets de faire pour lui. Bonne nouvelle, tu as déjà tous les visuels. Il manque juste des règles."
      />

      {/* Test des 5 secondes */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEST_5_SECONDES.map((t, i) => (
          <div key={t.q} className="rounded-3xl border border-border bg-card p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F2D04B] font-display font-bold text-[#13004D]">
              {i + 1}
            </span>
            <p className="mt-3 font-display text-xl font-bold">{t.q}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.r}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Le test des 5 secondes : sur chaque profil, un inconnu doit pouvoir répondre à ces quatre
        questions sans rien faire défiler.
      </p>

      {/* Incohérences */}
      <h3 className="mt-14 text-2xl font-bold">Ce qui brouille ton image aujourd'hui</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {INCOHERENCES.map((x) => (
          <article key={x.titre} className="rounded-[2rem] border border-border bg-card p-6">
            <h4 className="text-lg font-bold">{x.titre}</h4>
            <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-[#F51D31]" />
              {x.constat}
            </p>
            <p className="mt-2 flex gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAFC9]" />
              {x.decision}
            </p>
          </article>
        ))}
      </div>

      {/* Réseau par réseau */}
      <h3 className="mt-14 text-2xl font-bold">Réseau par réseau</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {RESEAUX.map((x) => (
          <button
            key={x.nom}
            type="button"
            onClick={() => setNom(x.nom)}
            aria-pressed={x.nom === nom}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              x.nom === nom
                ? "bg-[#F2D04B] text-[#13004D] shadow-[0_6px_18px_rgba(242,208,75,.45)]"
                : "border border-border bg-card hover:border-[var(--brand-violet)]"
            }`}
          >
            {x.nom}
            <span className="ml-2 text-xs opacity-70">{x.priorite}</span>
          </button>
        ))}
      </div>
      <article className="mt-5 rounded-[2rem] border border-border bg-card p-6 shadow-md md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-2xl font-bold">{r.nom}</h4>
          <p className="text-sm text-muted-foreground">{r.compte}</p>
        </div>
        <p className="mt-2 max-w-3xl text-muted-foreground">{r.role}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="grid grid-cols-[88px_1fr] items-center gap-4">
              <img
                src={r.profil.visuel.src}
                alt={r.profil.visuel.label}
                className="aspect-square w-full rounded-full border border-border object-cover"
              />
              <div>
                <Kicker>Photo de profil</Kicker>
                <p className="mt-1 text-sm">{r.profil.texte}</p>
              </div>
            </div>
            <div>
              <Kicker>Bannière, à la une</Kicker>
              <p className="mt-1 text-sm">{r.banniere}</p>
            </div>
            <div>
              <Kicker>Bio à reprendre</Kicker>
              <p className="mt-2 whitespace-pre-line rounded-2xl border-l-4 border-[#F2D04B] bg-muted p-4 text-sm">
                {r.bio}
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <Kicker>Ce que tu y publies</Kicker>
              <ul className="mt-2 space-y-1.5 text-sm">
                {r.contenu.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[3px] bg-[var(--brand-turquoise)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker>Rythme</Kicker>
              <p className="mt-1 text-sm font-semibold">{r.rythme}</p>
            </div>
            <div>
              <Kicker>Tes visuels pour ce réseau</Kicker>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {r.visuels.map((v) => (
                  <Thumb key={v.id} v={v} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Grille Instagram */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h3 className="text-2xl font-bold">À quoi doit ressembler ta grille</h3>
          <p className="mt-3 text-muted-foreground">
            Neuf posts, trois familles qui alternent : un conseil (mascotte sur un dégradé, titre en
            Baloo), une preuve (avis néon ou capture client), un moment humain (ta photo). Si deux
            posts voisins se ressemblent trop, la grille a l'air répétitive. Si aucun n'a ton
            visage, on croit parler à une agence.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAFC9]" />
              Un dégradé de famille par post conseil, toujours le même titre en Baloo, indigo.
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAFC9]" />
              Jamais deux visuels néon côte à côte : ils écrasent le reste.
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4DAFC9]" />
              Les projets clients en capture réelle, jamais en maquette générique.
            </li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-border bg-card p-3 shadow-md">
          <div className="grid grid-cols-3 gap-1">
            {GRILLE.map((t, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-md">
                {t.kind === "mascotte" ? (
                  <div className="flex h-full flex-col p-2" style={{ background: t.fond }}>
                    <p className="font-display text-[11px] font-bold leading-[1.05] text-[#13004D] sm:text-[13px]">
                      {t.titre}
                    </p>
                    <img
                      src={t.visual.src}
                      alt=""
                      loading="lazy"
                      className="mt-auto max-h-[62%] self-end object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={t.visual.src}
                    alt={t.visual.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute bottom-1 left-1 rounded-full bg-[#13004D]/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  {t.pilier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan + checklist */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#13004D] p-6 text-white dark:border dark:border-white/15 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#96F0F7]">
            Pour arrêter de te sentir perdue
          </p>
          <ol className="mt-5 space-y-5">
            {PLAN_DEMARRAGE.map((p, i) => (
              <li key={p.quand} className="grid grid-cols-[40px_1fr] gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F2D04B] font-display font-bold text-[#13004D]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-bold">{p.quand}</p>
                  <p className="mt-1 text-sm text-white/80">{p.quoi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Checklist />
      </div>

      {/* Formats */}
      <h3 className="mt-14 text-2xl font-bold">Les bonnes tailles</h3>
      <div className="mt-5 overflow-hidden rounded-[2rem] border border-border bg-card">
        {FORMATS.map((f, i) => (
          <div
            key={f.support}
            className={`grid gap-1 p-4 sm:grid-cols-[220px_130px_1fr] sm:items-center ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <p className="font-semibold">{f.support}</p>
            <p className="font-mono text-sm">{f.taille}</p>
            <p className="text-sm text-muted-foreground">{f.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const VERDICT_STYLE = {
  "Sous le marché": "bg-[#F2D04B] text-[#13004D]",
  "Dans le marché": "bg-[#96F0F7] text-[#13004D]",
  "Au-dessus": "bg-[#BABAFF] text-[#13004D]",
} as const;

const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/\u202f/g, " ")} €`;

function Tarifs() {
  return (
    <section id="tarifs" className="scroll-mt-32">
      <SectionTitle
        kicker="Grille tarifaire · appliquée au site le 30/09/2026"
        title="Tu n'es pas trop chère. Tu es mal rangée."
        intro="Ton ressenti est à l'envers : tes sites sont au prix du marché, ce sont ton identité visuelle et l'entrée de gamme réseaux sociaux qui sont sous-évaluées. Surtout, la grille se contredit par endroits, et c'est ça qui fait hésiter un prospect, plus que le montant."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {VERDICTS.map((v) => (
          <article key={v.famille} className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold">{v.famille}</h3>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${VERDICT_STYLE[v.verdict]}`}
              >
                {v.verdict}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Ton ressenti : {v.ressenti}</p>
            <p className="mt-3 text-sm leading-relaxed">{v.texte}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-14 text-2xl font-bold">Ce qui se contredit</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INCOHERENCES_TARIFS.map((x) => (
          <article key={x.titre} className="rounded-[2rem] border border-border bg-card p-6">
            <h4 className="flex gap-2 text-lg font-bold leading-tight">
              <X className="mt-1 h-4 w-4 shrink-0 text-[#F51D31]" />
              {x.titre}
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">{x.texte}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-[2rem] bg-[#13004D] p-6 text-white dark:border dark:border-white/15 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#96F0F7]">
          Une seule règle pour tous les prix
        </p>
        <p className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
          Jours estimés × {euros(TJM.jour)}, arrondi.
        </p>
        <p className="mt-3 max-w-3xl text-white/80">
          Soit {TJM.heure} €/h pour les révisions hors forfait (contre 60 € aujourd'hui). C'est le
          milieu du marché freelance, pas le haut. Avec une règle, tu n'as plus à « sentir » un prix
          : tu comptes les jours, et tu peux l'expliquer à un client qui négocie.
        </p>
      </div>

      <h3 className="mt-14 text-2xl font-bold">La grille proposée</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Prix HT. Les lignes en jaune sont des offres nouvelles. Tout est en ligne sur le site depuis
        le 30/09/2026.
      </p>
      <div className="mt-5 space-y-8">
        {GRILLE_TARIFS.map((g) => (
          <div
            key={g.famille}
            className="overflow-hidden rounded-[2rem] border border-border bg-card"
          >
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_2fr] gap-4 border-b border-border bg-muted px-5 py-3 text-xs font-bold uppercase tracking-wider md:grid">
              <span>{g.famille}</span>
              <span>Aujourd'hui</span>
              <span>Nouveau</span>
              <span>Pourquoi</span>
            </div>
            <p className="border-b border-border bg-muted px-5 py-3 text-xs font-bold uppercase tracking-wider md:hidden">
              {g.famille}
            </p>
            {g.lignes.map((l, i) => (
              <div
                key={l.prestation}
                className={`grid gap-1 px-5 py-4 md:grid-cols-[1.4fr_1fr_1fr_2fr] md:items-center md:gap-4 ${
                  i > 0 ? "border-t border-border" : ""
                } ${l.nouveau ? "bg-[#F2D04B]/15" : ""}`}
              >
                <p className="font-semibold">{l.prestation}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="md:hidden">Aujourd'hui : </span>
                  {l.actuel}
                </p>
                <p className="font-display text-lg font-bold">
                  <span className="font-sans text-sm font-normal text-muted-foreground md:hidden">
                    Nouveau :{" "}
                  </span>
                  {l.propose}
                </p>
                <p className="text-sm text-muted-foreground">{l.raison}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h3 className="mt-14 text-2xl font-bold">Les packs, recalculés</h3>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        La règle du site reste la bonne : somme des prestations moins 15 %, jamais sous le prix de
        la prestation la plus chère. Voici tes packs, recalculés avec la nouvelle grille :
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PACKS_EXEMPLES.map((p) => (
          <article
            key={p.nom}
            className="card-hover rounded-[2rem] border border-border bg-card p-6"
          >
            <Kicker>{p.pour}</Kicker>
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <h4 className="text-2xl font-bold">{p.nom}</h4>
              <p className="font-display text-3xl font-bold">{euros(p.prix)}</p>
            </div>
            <p className="mt-3 text-sm">{p.contenu}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Séparément {euros(p.somme)}, soit {euros(p.somme - p.prix)} d'économie. Avant :{" "}
              {p.avant}.
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        La Délégation existe aussi en e-commerce : 6 500 € (8 124 € séparément). Cinq packs, c'est
        beaucoup pour une seule personne : dans six mois, garde les trois qui se vendent.
      </p>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[2rem] border-l-4 border-[#F2D04B] bg-muted p-6">
          <h3 className="text-xl font-bold">{REVENU_EXEMPLE.titre}</h3>
          <p className="mt-2 leading-relaxed">{REVENU_EXEMPLE.texte}</p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card p-6">
          <Kicker>Sources marché (septembre 2026)</Kicker>
          <ul className="mt-3 space-y-2 text-sm">
            {SOURCES_TARIFS.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand-blue,#427CFF)] underline-offset-2 hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MaMarquePage() {
  const [situationId, setSituationId] = useState(SITUATIONS[0].id);
  const situation = SITUATIONS.find((s) => s.id === situationId) ?? SITUATIONS[0];

  return (
    <main className="min-h-screen border-t border-border">
      {/* ── Héros ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero py-20 md:py-28">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Kicker>Page interne · ne pas partager</Kicker>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] md:text-6xl">
              Ma marque, <span className="text-gradient">mode d'emploi</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Tous tes visuels au même endroit, et surtout : à quel moment sortir lequel. Tu pars
              d'une situation, la page te dit quoi prendre.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Rond, joyeux, coloré", "Coins arrondis, pastels, jamais d'angle vif."],
                ["Indigo, jamais noir", "Le sombre PeakCL, c'est #13004D."],
                ["Une vraie personne", "Ta photo rassure, la mascotte fait sourire."],
              ].map(([t, d]) => (
                <li
                  key={t}
                  className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur"
                >
                  <p className="font-display text-lg font-bold leading-tight">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={LOGOS[0].src}
            alt="Logo carré PeakCL avec la mascotte"
            className="mx-auto w-full max-w-sm rounded-[2rem] shadow-glow"
          />
        </div>
      </section>

      {/* ── Sommaire ────────────────────────────────────────────── */}
      <nav
        aria-label="Sommaire"
        className="sticky top-16 z-20 border-y border-border bg-background/85 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {SECTIONS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold hover:border-[var(--brand-violet)]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-24 px-6 py-20">
        {/* ── Situations ─────────────────────────────────────────── */}
        <section id="situations" className="scroll-mt-32">
          <SectionTitle
            kicker="Le point de départ"
            title="J'ai besoin d'un visuel pour…"
            intro="Choisis ce que tu veux dire. Les visuels qui vont avec s'affichent, avec la règle à suivre."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSituationId(s.id)}
                aria-pressed={s.id === situationId}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  s.id === situationId
                    ? "bg-[#F2D04B] text-[#13004D] shadow-[0_6px_18px_rgba(242,208,75,.45)]"
                    : "border border-border bg-card hover:border-[var(--brand-violet)]"
                }`}
              >
                {s.titre}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] border border-border bg-card p-6 shadow-md md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-bold">{situation.titre}</h3>
              <p className="text-sm text-muted-foreground">{situation.canal}</p>
            </div>
            <p className="mt-4 rounded-2xl border-l-4 border-[#F2D04B] bg-muted p-4 text-[15px] leading-relaxed">
              <strong>La règle : </strong>
              {situation.regle}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {situation.visuals.map((v) => (
                <Thumb key={v.id} v={v} />
              ))}
            </div>
          </div>
        </section>

        <Reseaux />

        {/* ── Mascotte ──────────────────────────────────────────── */}
        <section id="mascotte" className="scroll-mt-32">
          <SectionTitle
            kicker="Mascotte v2"
            title="Une émotion = un type de message"
            intro="Tu as 19 poses. Elles ne servent pas à décorer : chacune porte un message précis. Choisis la pose d'après ce que dit ton post, pas d'après celle que tu n'as pas encore utilisée."
          />
          <div className="mt-10 space-y-6">
            {EMOTIONS.map((e) => (
              <article
                key={e.mood}
                className="grid gap-6 rounded-[2rem] border border-border bg-card p-6 md:grid-cols-[1fr_1.6fr]"
              >
                <div>
                  <h3 className="text-2xl font-bold">{e.mood}</h3>
                  <p className="mt-2 text-muted-foreground">{e.message}</p>
                  <ul className="mt-4 space-y-1 text-sm">
                    {e.exemples.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[3px] bg-[var(--brand-turquoise)]" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Dose : {e.dose}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {e.visuals.map((v) => (
                    <Thumb key={v.id} v={v} size="sm" />
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-6 rounded-[2rem] border border-dashed border-border p-6 sm:grid-cols-[160px_1fr] sm:items-center">
            <Thumb v={MASCOTTE.ligne} size="sm" />
            <div>
              <h3 className="text-xl font-bold">La version trait seul</h3>
              <p className="mt-1 text-muted-foreground">
                Pour ce qui s'imprime en une couleur : dorure, tampon, tote bag, sticker à colorier,
                marque-page. Personne ne l'a encore, c'est un objet cadeau client tout trouvé.
              </p>
            </div>
          </div>
        </section>

        {/* ── Série néon ────────────────────────────────────────── */}
        <section id="neon" className="scroll-mt-32">
          <SectionTitle
            kicker="Série néon"
            title="Le fond indigo, pour Instagram"
            intro="Cette série a son propre code (cercle lumineux, fond sombre). Elle vit sur Instagram : à la une, stories, avis. Garde-la là-bas, et le fond clair pour tout le reste."
          />
          <h3 className="mt-10 text-xl font-bold">Couvertures « à la une »</h3>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {NEON_COVERS.map((v) => (
              <Thumb key={v.id} v={v} size="sm" />
            ))}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h3 className="text-xl font-bold">Stories contact</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                La dernière story de chaque série. À refaire en « vous », comme tout ce qui vend.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {NEON_STORIES.map((v) => (
                  <Thumb key={v.id} v={v} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Posts avis clients</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Un toutes les deux semaines. Cinq prêts, soit plus de deux mois de preuve sociale.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {NEON_AVIS.map((v) => (
                  <Thumb key={v.id} v={v} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Logos ─────────────────────────────────────────────── */}
        <section id="logos" className="scroll-mt-32">
          <SectionTitle
            kicker="Logos"
            title="Huit déclinaisons, huit usages"
            intro="Le logotype est un lettrage dessiné : on ne le retape jamais au clavier. Pour le reste, choisis d'après la forme de l'espace."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {LOGOS.map((l) => (
              <article
                key={l.id}
                className="card-hover rounded-[2rem] border border-border bg-card p-5"
              >
                <div className="flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#FAFAFF,#F3F2FC)] p-4">
                  <img
                    src={l.src}
                    alt={l.label}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">{l.label}</h3>
                <p className="mt-2 flex gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                  {l.quand}
                </p>
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#F51D31]" />
                  {l.eviter}
                </p>
                <p className="mt-3 truncate text-[11px] text-muted-foreground">{l.source}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Couleurs ──────────────────────────────────────────── */}
        <section id="couleurs" className="scroll-mt-32">
          <SectionTitle
            kicker="Couleurs"
            title="Clique pour copier le code"
            intro="Règle d'or : un visuel = une couleur dominante + l'indigo + une touche de jaune au maximum."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {COULEURS.map((c) => (
              <Swatch key={c.hex} {...c} />
            ))}
          </div>
          <h3 className="mt-12 text-xl font-bold">Dégradés (toujours à 135°)</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-6">
            {DEGRADES.map((d) => (
              <div key={d.nom}>
                <div className="h-20 rounded-2xl" style={{ background: d.css }} />
                <p className="mt-2 text-sm font-semibold">{d.nom}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <Kicker>Titres</Kicker>
              <p className="mt-2 font-display text-4xl font-bold leading-none">Baloo 2</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Gras, casse normale (pas de Majuscule À Chaque Mot), lignes serrées.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <Kicker>Texte</Kicker>
              <p className="mt-2 text-4xl font-semibold leading-none">Nunito</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tout le reste. Les petits sur-titres en MAJUSCULES espacées, comme ceux de cette
                page.
              </p>
            </div>
          </div>
        </section>

        {/* ── Autres univers ────────────────────────────────────── */}
        <section id="univers" className="scroll-mt-32">
          <SectionTitle
            kicker="Ce qui ne se mélange pas"
            title="Quatre univers qui ne sont pas « la mascotte »"
            intro="C'est sûrement de là que vient l'impression de flou : plusieurs personnages cohabitent dans tes dossiers."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {AUTRES_UNIVERS.map((u) => (
              <article
                key={u.titre}
                className="grid grid-cols-[110px_1fr] gap-5 rounded-[2rem] border border-border bg-card p-5"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-muted p-2">
                  <img
                    src={u.src}
                    alt={u.titre}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      u.statut === "À trancher"
                        ? "bg-[#F2D04B] text-[#13004D]"
                        : u.statut === "À exploiter"
                          ? "bg-[#96F0F7] text-[#13004D]"
                          : "bg-muted"
                    }`}
                  >
                    {u.statut}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-tight">{u.titre}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{u.texte}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Rythme ────────────────────────────────────────────── */}
        <section id="rythme" className="scroll-mt-32">
          <SectionTitle
            kicker="Pour les exploiter vraiment"
            title="Une semaine type"
            intro="Pas une obligation, un point de départ. Avec ça, chaque visuel ressort au moins une fois par mois."
          />
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card">
            {SEMAINE.map((s, i) => (
              <div
                key={s.jour}
                className={`grid gap-1 p-5 sm:grid-cols-[180px_1fr_1fr] sm:items-center ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <p className="font-display text-lg font-bold">{s.jour}</p>
                <p>{s.post}</p>
                <p className="text-sm text-muted-foreground">{s.visuel}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] bg-[#13004D] p-8 text-white dark:border dark:border-white/15">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#96F0F7]">
              Recycler au lieu de créer
            </p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed">
              Un visuel sert quatre fois : post Instagram, story (recadrée), post LinkedIn, puis
              illustration d'un article ou d'une fiche Google. Avant de créer une image, regarde si
              une pose de cette page ne fait pas déjà le travail.
            </p>
          </div>
        </section>

        <Tarifs />
      </div>
    </main>
  );
}
