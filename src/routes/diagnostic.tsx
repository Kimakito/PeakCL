import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MERCI_BRIEF_PATH, stashCalendlyPrefill, submitNetlifyForm } from "@/lib/funnel";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { absUrl } from "@/seo/site";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Mini-audit gratuit de votre présence en ligne · PeakCL" },
      {
        name: "description",
        content:
          "Deux minutes, cinq champs : je regarde votre site, votre visibilité Google et vos réseaux, et je vous renvoie les 3 corrections prioritaires.",
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
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  /** `email` active la validation native du navigateur — un e-mail mal saisi
   *  est un lead definitivement injoignable, autant le bloquer a la source. */
  type?: "text" | "email" | "tel" | "url";
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-border"
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
    <fieldset className="relative rounded-2xl border border-border bg-card/30 p-5">
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      <div className="mt-3 grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground hover:border-border"
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
    <fieldset className="relative rounded-2xl border border-border bg-card/30 p-5">
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      {/* Ensures native required validation for multi-checkbox */}
      {required ? (
        <input tabIndex={-1} aria-hidden="true" className="sr-only" required={!hasAny} />
      ) : null}
      <div className="mt-3 grid gap-2">
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground hover:border-border"
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

/**
 * Curseur 0-10.
 *
 * Le champ cache n'est emis QUE si le visiteur a touche le curseur. Il partait
 * auparavant a chaque envoi avec sa valeur par defaut : le premier lead reel
 * du nouveau tunnel est arrive dans HubSpot avec « Importance de resoudre : 7 »
 * et « Importance presence en ligne : 7 » alors que la personne n'avait ouvert
 * ni l'un ni l'autre — tous les autres champs facultatifs etaient vides.
 *
 * Depuis que le bloc de qualification est repliable, la majorite des visiteurs
 * ne le deroulera jamais. Sans ce garde-fou, chaque fiche contact afficherait
 * un 7 invente, indiscernable d'une reponse donnee. Une donnee absente se voit
 * et se demande ; une donnee fausse se croit.
 */
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
  const [touched, setTouched] = useState(false);
  return (
    <fieldset className="relative rounded-2xl border border-border bg-card/30 p-5">
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <legend className="px-2">
        <FieldLabel label={label} required={required} />
      </legend>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-foreground">
            {value}
          </span>
          <span>10</span>
        </div>
        {touched ? <input type="hidden" name={name} value={String(value)} /> : null}
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => {
            setTouched(true);
            onChange(Number(e.target.value));
          }}
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
      {
        value: "site_pas_visiteurs",
        label: "Mon site web n'attire pas de visiteurs ou ne convertit pas en clients",
      },
      { value: "manque_visibilite", label: "Je manque de visibilité" },
      {
        value: "manque_temps",
        label: "Je n'ai pas le temps de gérer mon site et ma communication en parallèle",
      },
      {
        value: "site_soi_meme",
        label: "J'ai essayé de créer mon site moi-même mais le résultat ne me satisfait pas",
      },
      {
        value: "communiquer_diff",
        label: "Je ne sais pas quoi communiquer ni comment me différencier",
      },
      {
        value: "justifier_invest",
        label: "J'ai du mal à justifier l'investissement dans quelque chose que je ne maîtrise pas",
      },
    ],
    [],
  );

  const [prenomNom, setPrenomNom] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [activite, setActivite] = useState("");
  const [ville, setVille] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telephone, setTelephone] = useState("");
  const [caActuel, setCaActuel] = useState("");
  const [objectif, setObjectif] = useState("");
  const [problematique, setProblematique] = useState<string[]>([]);
  const [importanceProbleme, setImportanceProbleme] = useState(7);
  const [ranking, setRanking] = useState("");
  const [capableSeul, setCapableSeul] = useState("");
  const [importancePresence, setImportancePresence] = useState(7);
  const [ouvertAccompagnement, setOuvertAccompagnement] = useState("");
  const [engagement, setEngagement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    stashCalendlyPrefill({ name: prenomNom, email });

    try {
      await submitNetlifyForm(form);
      window.location.href = MERCI_BRIEF_PATH;
    } catch {
      alert("L’envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-border">
      <section className="relative overflow-hidden bg-hero py-20">
        <img
          src="/peakcl/assets/images/bureau-peakcl.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-[15] bg-background/70" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-[var(--brand-turquoise)]" />
            Mini-audit gratuit · 2 minutes
          </div>
          <div className="mt-6 flex justify-center">
            <ExpressionPhoto
              slug="lunettes-reflexion"
              caption="On regarde ça ensemble"
              tilt={-3}
              imgClassName="aspect-[3/4] w-24"
            />
          </div>
          <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Votre mini-audit de <span className="text-gradient">visibilité en ligne</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dites-moi votre activité et l’adresse de votre site. Je regarde votre visibilité Google,
            votre site, votre parcours client et vos réseaux, et je vous renvoie les
            <span className="font-semibold text-foreground"> 3 actions prioritaires</span> pour
            attirer plus de clients. Sans engagement, et sans appel obligatoire.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <form
            name="diagnostic"
            method="POST"
            action={MERCI_BRIEF_PATH}
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-6"
            data-event="diagnostic_submit"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="diagnostic" />
            {/* Sans `leadType` ni `source`, un lead arrive dans HubSpot sans
                origine : impossible ensuite de dire quel canal l'a produit. */}
            <input type="hidden" name="leadType" value="mini_audit" />
            <input type="hidden" name="source" value="site_peakcl" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="relative rounded-3xl border border-border bg-card/20 p-6 shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="grid gap-5">
                <TextInput
                  label="Votre prénom et nom"
                  name="prenom_nom"
                  required
                  value={prenomNom}
                  onChange={setPrenomNom}
                  placeholder="Ex: Charlotte Lacroix"
                />
                {/* L'e-mail est le seul champ vraiment indispensable : c'est la
                    cle de deduplication HubSpot, et sans lui l'edge function
                    ignore purement et simplement la soumission. */}
                <TextInput
                  label="Votre e-mail"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  placeholder="vous@exemple.com"
                />
                <TextInput
                  label="Votre activité"
                  name="activite"
                  required
                  value={activite}
                  onChange={setActivite}
                  placeholder="Ex: thérapeute, artisan menuisier, coach sportif…"
                />
                {/* Volontairement en texte libre et non en `type="url"` : la
                    validation native rejette « monsite.fr » sans protocole, et
                    un lead bloque par un message d'erreur qu'il ne comprend pas
                    coute plus cher qu'une valeur a nettoyer dans le CRM.
                    Le libelle precedent disait « l'adresse de votre site » : la
                    premiere personne a remplir le formulaire y a mis son adresse
                    postale, qui est partie dans la propriete `website` du
                    contact HubSpot. « Le lien » leve l'ambiguite. */}
                <TextInput
                  label="Le lien de votre site web"
                  name="website"
                  value={website}
                  onChange={setWebsite}
                  placeholder="monsite.fr — laissez vide si vous n'en avez pas"
                />
                <TextInput
                  label="Votre ville"
                  name="ville"
                  value={ville}
                  onChange={setVille}
                  placeholder="Ex: Albertville"
                />
              </div>
            </div>

            {/* Bloc de qualification, desormais FACULTATIF.
                Il etait integralement obligatoire : un visiteur froid venu de
                Google devait annoncer son chiffre d'affaires et s'engager a
                honorer un rendez-vous avant d'avoir obtenu quoi que ce soit.
                C'est un formulaire de closing pose a l'entree du tunnel. Les
                questions restent — elles qualifient bien — mais ne bloquent
                plus l'envoi : qui veut repondre repond, les autres deviennent
                quand meme un lead. */}
            <details className="group rounded-3xl border border-border bg-card/20 p-6 shadow-card">
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                <span className="text-[var(--brand-turquoise)]">+</span> Aller plus loin
                (facultatif) — plus vous m'en dites, plus l'audit est précis
              </summary>
              <div className="mt-6 space-y-6">
                <div className="grid gap-5">
                  <TextInput
                    label="Votre numéro de téléphone"
                    name="telephone"
                    type="tel"
                    value={telephone}
                    onChange={setTelephone}
                    placeholder="Ex: 06 12 34 56 78"
                  />
                  <TextInput
                    label="Votre compte Instagram"
                    name="instagram"
                    value={instagram}
                    onChange={setInstagram}
                    placeholder="Ex: @peakcl"
                  />
                </div>
                <ChoiceSingle
                  label="Quel est votre chiffre d'affaires actuel ?"
                  name="ca_actuel"
                  options={caOptions}
                  value={caActuel}
                  onChange={setCaActuel}
                />

                <ChoiceSingle
                  label="Quel est votre objectif pour les prochains mois ?"
                  name="objectif_prochains_mois"
                  options={objectifOptions}
                  value={objectif}
                  onChange={setObjectif}
                />

                <ChoiceMulti
                  label="Quelle est votre problématique ? (Plusieurs réponses possibles)"
                  name="problematique"
                  options={problematiqueOptions}
                  value={problematique}
                  onChange={setProblematique}
                />

                <Scale10
                  label="À quel point est-ce important pour vous de régler cette problématique et d'atteindre vos objectifs ?"
                  name="importance_regler_problematique"
                  value={importanceProbleme}
                  onChange={setImportanceProbleme}
                />

                <label className="relative block rounded-2xl border border-border bg-card/30 p-5">
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <FieldLabel label="Classez (par ordre) vos priorités du moment." />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Ex: (1) plus de leads · (2) crédibilité · (3) gagner du temps · (4)
                    visuels/branding
                  </div>
                  <textarea
                    name="ranking_priorites"
                    value={ranking}
                    onChange={(e) => setRanking(e.target.value)}
                    rows={4}
                    className="mt-3 w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-border"
                    placeholder="Écris simplement une liste numérotée."
                  />
                </label>

                <ChoiceSingle
                  label="Est-ce que vous pensez honnêtement être capable de régler cette problématique par vous-même ?"
                  name="capable_par_soi_meme"
                  options={[
                    { value: "oui", label: "Oui" },
                    { value: "non", label: "Non" },
                  ]}
                  value={capableSeul}
                  onChange={setCapableSeul}
                />

                <Scale10
                  label="À quel point c'est important pour vous d'améliorer votre présence en ligne aujourd'hui ?"
                  name="importance_presence_en_ligne"
                  value={importancePresence}
                  onChange={setImportancePresence}
                />

                <ChoiceSingle
                  label="Si vous aviez une solution claire pour améliorer votre présence en ligne, seriez-vous ouvert(e) à vous faire accompagner ?"
                  name="ouvert_accompagnement"
                  options={[
                    { value: "oui", label: "Oui" },
                    { value: "non", label: "Non" },
                  ]}
                  value={ouvertAccompagnement}
                  onChange={setOuvertAccompagnement}
                />

                <ChoiceSingle
                  label="Est-ce que vous pouvez vous engager à être présent(e) et à prévenir en cas d'empêchement ?"
                  name="engagement_presence"
                  options={[
                    { value: "oui", label: "Oui, je m'engage" },
                    { value: "non", label: "Non" },
                  ]}
                  value={engagement}
                  onChange={setEngagement}
                />
              </div>
            </details>

            <div className="relative flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-border bg-card/20 p-6 shadow-card sm:flex-row sm:items-center">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="text-sm text-muted-foreground">
                Champs obligatoires marqués d’une{" "}
                <span className="text-[var(--brand-turquoise)]">⭐</span> — les autres sont
                facultatifs.
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {isSubmitting ? "Envoi en cours…" : "Recevoir mon mini-audit"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
