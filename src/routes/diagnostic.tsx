import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Diagnostic — PeakCL" },
      {
        name: "description",
        content:
          "Questionnaire diagnostic (3 à 5 minutes) pour clarifier ta présence en ligne, tes objectifs et tes priorités.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/diagnostic") },
    ],
    links: [{ rel: "canonical", href: absUrl("/diagnostic") }],
  }),
  component: DiagnosticPage,
});

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="text-sm font-semibold text-foreground">
      {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
    </span>
  );
}

function TextInput({
  label,
  name,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
      />
    </label>
  );
}

function ChoiceSingle({
  label,
  name,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-card/30 p-5">
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      <div className="mt-3 grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-foreground hover:border-white/10"
          >
            <input
              type="radio"
              name={name}
              required={required}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-0.5 h-4 w-4 accent-[var(--brand-turquoise)]"
            />
            <span className="leading-snug">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ChoiceMulti({
  label,
  name,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const hasAny = value.length > 0;
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-card/30 p-5">
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      {/* Ensures native required validation for multi-checkbox */}
      {required ? <input tabIndex={-1} aria-hidden="true" className="sr-only" required={!hasAny} /> : null}
      <div className="mt-3 grid gap-2">
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-foreground hover:border-white/10"
            >
              <input
                type="checkbox"
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) => {
                  if (e.target.checked) onChange([...value, o.value]);
                  else onChange(value.filter((v) => v !== o.value));
                }}
                className="mt-0.5 h-4 w-4 accent-[var(--brand-turquoise)]"
              />
              <span className="leading-snug">{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Scale10({
  label,
  name,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-card/30 p-5">
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-foreground">{value}</span>
          <span>10</span>
        </div>
        <input type="hidden" name={name} value={String(value)} />
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--brand-violet)]"
          aria-label={label}
        />
      </div>
    </fieldset>
  );
}

function DiagnosticPage() {
  const caOptions = useMemo(
    () => [
      { value: "moins_1000", label: "Moins de 1 000€/mois" },
      { value: "1000_3000", label: "Entre 1 000€ et 3 000€/mois" },
      { value: "3000_5000", label: "Entre 3 000€ et 5 000€/mois" },
      { value: "plus_5000", label: "Plus de 5 000€/mois" },
      { value: "prefere_pas", label: "Je préfère ne pas répondre" },
    ],
    [],
  );

  const objectifOptions = useMemo(
    () => [
      { value: "1000_2000", label: "1000–2000€" },
      { value: "2000_3000", label: "2000–3000€" },
      { value: "3000_5000", label: "3000–5000€" },
      { value: "5000_10000", label: "5000–10000€" },
      { value: "plus_10000", label: "+ 10000€" },
    ],
    [],
  );

  const problematiqueOptions = useMemo(
    () => [
      { value: "site_pas_visiteurs", label: "Mon site web n'attire pas de visiteurs ou ne convertit pas en clients" },
      { value: "manque_visibilite", label: "Je manque de visibilité" },
      { value: "manque_temps", label: "Je n'ai pas le temps de gérer mon site et ma communication en parallèle" },
      { value: "site_soi_meme", label: "J'ai essayé de créer mon site moi-même mais le résultat ne me satisfait pas" },
      { value: "communiquer_diff", label: "Je ne sais pas quoi communiquer ni comment me différencier" },
      {
        value: "justifier_invest",
        label: "J'ai du mal à justifier l'investissement dans quelque chose que je ne maîtrise pas",
      },
    ],
    [],
  );

  const [prenomNom, setPrenomNom] = useState("");
  const [instagram, setInstagram] = useState("");
  const [caActuel, setCaActuel] = useState("");
  const [objectif, setObjectif] = useState("");
  const [problematique, setProblematique] = useState<string[]>([]);
  const [importanceProbleme, setImportanceProbleme] = useState(7);
  const [ranking, setRanking] = useState("");
  const [capableSeul, setCapableSeul] = useState("");
  const [importancePresence, setImportancePresence] = useState(7);
  const [ouvertAccompagnement, setOuvertAccompagnement] = useState("");
  const [engagement, setEngagement] = useState("");

  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-[var(--brand-turquoise)]" />
            Diagnostic · 3 à 5 minutes
          </div>
          <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Questionnaire <span className="text-gradient">diagnostic</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            L’objectif: comprendre ta situation, ta priorité n°1 et ce qui bloquerait aujourd’hui ton passage au niveau
            supérieur.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <form
            name="diagnostic"
            method="POST"
            action="/bienvenue-strategie"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-6"
            data-event="diagnostic_submit"
          >
            <input type="hidden" name="form-name" value="diagnostic" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card">
              <div className="grid gap-5">
                <TextInput
                  label="Quels sont tes prénom et nom ?"
                  name="prenom_nom"
                  required
                  value={prenomNom}
                  onChange={setPrenomNom}
                  placeholder="Ex: Charlotte Lacroix"
                />
                <TextInput
                  label="Quel est ton compte instagram ?"
                  name="instagram"
                  required
                  value={instagram}
                  onChange={setInstagram}
                  placeholder="Ex: @peakcl"
                />
              </div>
            </div>

            <ChoiceSingle
              label="Quel est ton chiffre d'affaire actuel ?"
              name="ca_actuel"
              required
              options={caOptions}
              value={caActuel}
              onChange={setCaActuel}
            />

            <ChoiceSingle
              label="Quel est ton objectif pour les prochains mois ?"
              name="objectif_prochains_mois"
              required
              options={objectifOptions}
              value={objectif}
              onChange={setObjectif}
            />

            <ChoiceMulti
              label="Quelle est ta problématique ? (Plusieurs réponses possibles)"
              name="problematique"
              required
              options={problematiqueOptions}
              value={problematique}
              onChange={setProblematique}
            />

            <Scale10
              label="À quel point est-ce important pour toi de régler cette problématique et d'atteindre tes objectifs ?"
              name="importance_regler_problematique"
              required
              value={importanceProbleme}
              onChange={setImportanceProbleme}
            />

            <label className="block rounded-2xl border border-white/10 bg-card/30 p-5">
              <FieldLabel label="Classe (par ordre) tes priorités du moment." required />
              <div className="mt-2 text-xs text-muted-foreground">
                Ex: (1) plus de leads · (2) crédibilité · (3) gagner du temps · (4) visuels/branding
              </div>
              <textarea
                name="ranking_priorites"
                required
                value={ranking}
                onChange={(e) => setRanking(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="Écris simplement une liste numérotée."
              />
            </label>

            <ChoiceSingle
              label="Est-ce que tu penses honnêtement être capable de régler cette problématique par toi-même ?"
              name="capable_par_soi_meme"
              required
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
              value={capableSeul}
              onChange={setCapableSeul}
            />

            <Scale10
              label="À quel point c'est important pour toi d'améliorer ta présence en ligne aujourd'hui ?"
              name="importance_presence_en_ligne"
              required
              value={importancePresence}
              onChange={setImportancePresence}
            />

            <ChoiceSingle
              label="Si tu avais une solution claire pour améliorer ta présence en ligne, serais-tu ouvert(e) à te faire accompagner ?"
              name="ouvert_accompagnement"
              required
              options={[
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
              value={ouvertAccompagnement}
              onChange={setOuvertAccompagnement}
            />

            <ChoiceSingle
              label="Est-ce que tu peux t'engager à être présent(e) et à prévenir en cas d'empêchement ?"
              name="engagement_presence"
              required
              options={[
                { value: "oui", label: "Oui, je m'engage" },
                { value: "non", label: "Non" },
              ]}
              value={engagement}
              onChange={setEngagement}
            />

            <div className="flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card sm:flex-row sm:items-center">
              <div className="text-sm text-muted-foreground">
                Champs obligatoires marqués d’une <span className="text-[var(--brand-turquoise)]">⭐</span>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Envoyer <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

