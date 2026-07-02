import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { MERCI_BRIEF_PATH, stashCalendlyPrefill, submitNetlifyForm } from "@/lib/funnel";
import { absUrl } from "@/seo/site";
import { HeroPanel } from "@/components/home/HeroPanel";

export const Route = createFileRoute("/reservation-appel")({
  head: () => ({
    meta: [
      { title: "Réservation d’appel · PeakCL" },
      {
        name: "description",
        content: "Questionnaire de diagnostic PeakCL avant ton appel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reservation-appel") },
    ],
    links: [{ rel: "canonical", href: absUrl("/reservation-appel") }],
  }),
  component: ReservationAppelPage,
});

const STORAGE_KEY = "peakcl_reservation_appel_v1";

type FormValues = Record<string, string | string[]>;

function useAutosaveForm(initial: FormValues) {
  const [values, setValues] = useState<FormValues>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as FormValues;
      if (parsed && typeof parsed === "object") setValues((v) => ({ ...v, ...parsed }));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, [values]);

  return { values, setValues };
}

function setField(setValues: React.Dispatch<React.SetStateAction<FormValues>>, name: string, value: string | string[]) {
  setValues((prev) => ({ ...prev, [name]: value }));
}

function TextInput({
  label,
  helper,
  name,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
        </span>
      </div>
      {helper ? <div className="mt-1 text-xs text-muted-foreground">{helper}</div> : null}
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
      />
    </label>
  );
}

function TextArea({
  label,
  helper,
  name,
  required,
  placeholder,
  rows = 5,
  maxLength,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
        </span>
        {maxLength ? (
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      {helper ? <div className="mt-1 text-xs text-muted-foreground">{helper}</div> : null}
      <textarea
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
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
  helper,
  name,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      {helper ? <div className="mt-2 px-2 text-xs text-muted-foreground">{helper}</div> : null}
      <div className="mt-4 grid gap-2">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-background/40 px-4 py-3 hover:border-white/10">
            <input
              type="radio"
              name={name}
              required={required}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-1"
            />
            <span className="text-sm text-foreground/90">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ChoiceMulti({
  label,
  helper,
  name,
  required,
  options,
  values,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const hasValue = values.length > 0;

  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      {helper ? <div className="mt-2 px-2 text-xs text-muted-foreground">{helper}</div> : null}
      {required && !hasValue ? <div className="mt-2 px-2 text-xs text-[var(--brand-yellow)]">Choisis au moins une option.</div> : null}
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {options.map((o) => {
          const checked = values.includes(o.value);
          return (
            <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-background/40 px-4 py-3 hover:border-white/10">
              <input
                type="checkbox"
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) => {
                  if (e.target.checked) onChange([...values, o.value]);
                  else onChange(values.filter((x) => x !== o.value));
                }}
                className="mt-1"
              />
              <span className="text-sm text-foreground/90">{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ChoiceScale({
  label,
  name,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      <div className="mt-4 grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => String(i)).map((n) => (
          <label
            key={n}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-1 py-2 text-xs font-semibold ${
              value === n ? "border-[var(--brand-turquoise)] bg-[var(--brand-turquoise)]/10 text-foreground" : "border-white/5 bg-background/40 text-foreground/70 hover:border-white/10"
            }`}
          >
            <input
              type="radio"
              name={name}
              required={required}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

function ReservationAppelPage() {
  const { values, setValues } = useAutosaveForm({
    fullName: "",
    phone: "",
    email: "",
    instagram: "",
    revenueRange: "",
    goalRevenue: "",
    painPoints: [],
    importanceSolve: "",
    ableAlone: "",
    importanceOnlinePresence: "",
    opennessToSupport: "",
    commitment: "",
  });

  const requiredNames = useMemo(
    () => [
      "fullName",
      "phone",
      "email",
      "instagram",
      "revenueRange",
      "goalRevenue",
      "painPoints",
      "importanceSolve",
      "ableAlone",
      "importanceOnlinePresence",
      "opennessToSupport",
      "commitment",
    ],
    [],
  );

  const completion = useMemo(() => {
    const isFilled = (name: string) => {
      const v = values[name];
      if (Array.isArray(v)) return v.length > 0;
      return typeof v === "string" && v.trim().length > 0;
    };
    const filled = requiredNames.filter(isFilled).length;
    return { filled, total: requiredNames.length };
  }, [requiredNames, values]);

  const forceRequiredMultiOk = (name: string) => {
    const v = values[name];
    return Array.isArray(v) ? v.length > 0 : true;
  };

  const canSubmit = completion.filled === completion.total && forceRequiredMultiOk("painPoints");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    stashCalendlyPrefill({
      name: String(values.fullName),
      email: String(values.email),
    });

    try {
      await submitNetlifyForm(form);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      window.location.href = MERCI_BRIEF_PATH;
    } catch {
      alert(
        "L’envoi a échoué. Vérifie ta connexion et réessaie, tes réponses restent sauvegardées dans ce navigateur.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-white/5">
      <HeroPanel />

      <section className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />
            2 à 3 minutes
            <span className="opacity-40">·</span>
            Diagnostic 45 min
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Confidentiel
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">Réservation d’appel · PeakCL</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Avant notre appel, j’ai besoin de comprendre ta situation. Ce questionnaire prend 2 à 3 minutes. À la fin, tu pourras réserver ton créneau de diagnostic (45 min).
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
            Tes réponses restent confidentielles.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-8 rounded-2xl border border-white/5 bg-card/40 p-5 text-sm text-muted-foreground shadow-card backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                Progression des champs ⭐ :{" "}
                <span className="font-semibold text-foreground">
                  {completion.filled}/{completion.total}
                </span>
              </div>
              <a href="#submit" className="inline-flex items-center gap-2 font-semibold text-[var(--brand-turquoise)] hover:text-foreground">
                Aller à l’envoi <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form
            name="reservation-appel"
            method="POST"
            action={MERCI_BRIEF_PATH}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="reservation-appel" />
            <input type="hidden" name="leadType" value="reservation_appel" />
            <input type="hidden" name="source" value="site_peakcl" />
            <p className="hidden">
              <label>
                Ne pas remplir: <input name="bot-field" />
              </label>
            </p>

            <SectionTitle title="Diagnostic" />
            <div className="grid gap-5">
              <TextInput
                label="Quels sont tes prénom et nom ?"
                name="fullName"
                required
                value={String(values.fullName)}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
              <TextInput
                label="Quel est ton numéro de téléphone ?"
                name="phone"
                type="tel"
                required
                placeholder="06 12 34 56 78"
                value={String(values.phone)}
                onChange={(v) => setField(setValues, "phone", v)}
              />
              <TextInput
                label="Quel est ton mail ?"
                name="email"
                type="email"
                required
                placeholder="tonmail@example.com"
                value={String(values.email)}
                onChange={(v) => setField(setValues, "email", v)}
              />
              <TextInput
                label="Quel est ton compte Instagram ?"
                name="instagram"
                required
                placeholder="@moncompte"
                value={String(values.instagram)}
                onChange={(v) => setField(setValues, "instagram", v)}
              />
              <ChoiceSingle
                label="Quel est ton chiffre d’affaire actuel ?"
                name="revenueRange"
                required
                value={String(values.revenueRange)}
                onChange={(v) => setField(setValues, "revenueRange", v)}
                options={[
                  { value: "<1000", label: "Moins de 1 000€/mois" },
                  { value: "1000-3000", label: "Entre 1 000€ et 3 000€/mois" },
                  { value: "3000-5000", label: "Entre 3 000€ et 5 000€/mois" },
                  { value: "5000+", label: "Plus de 5 000€/mois" },
                  { value: "Je préfère ne pas répondre", label: "Je préfère ne pas répondre" },
                ]}
              />
              <ChoiceSingle
                label="Quel est ton objectif pour les prochains mois ?"
                name="goalRevenue"
                required
                value={String(values.goalRevenue)}
                onChange={(v) => setField(setValues, "goalRevenue", v)}
                options={[
                  { value: "1000-2000", label: "1000-2000€" },
                  { value: "2000-3000", label: "2000-3000€" },
                  { value: "3000-5000", label: "3000-5000€" },
                  { value: "5000-10000", label: "5000-10000€" },
                  { value: "+10000", label: "+ 10000€" },
                ]}
              />
              <ChoiceMulti
                label="Quelle est ta problématique ? (Plusieurs réponses possibles)"
                name="painPoints"
                required
                values={(values.painPoints as string[]) || []}
                onChange={(v) => setField(setValues, "painPoints", v)}
                options={[
                  { value: "Site n'attire/convertit pas", label: "Mon site web n’attire pas de visiteurs ou ne convertit pas en clients" },
                  { value: "Manque de visibilité", label: "Je manque de visibilité" },
                  { value: "Manque de temps", label: "Je n’ai pas le temps de gérer mon site et ma communication en parallèle" },
                  { value: "Résultat DIY insatisfaisant", label: "J’ai essayé de créer mon site moi‑même mais le résultat ne me satisfait pas" },
                  { value: "Ne sait pas se différencier", label: "Je ne sais pas quoi communiquer ni comment me différencier" },
                  { value: "Difficulté à justifier l'investissement", label: "J’ai du mal à justifier l’investissement dans quelque chose que je ne maîtrise pas" },
                ]}
              />
              <ChoiceScale
                label="À quel point est-ce important pour toi de régler cette problématique et d’atteindre tes objectifs ?"
                name="importanceSolve"
                required
                value={String(values.importanceSolve)}
                onChange={(v) => setField(setValues, "importanceSolve", v)}
              />
              <ChoiceSingle
                label="Est-ce que tu penses honnêtement être capable de régler cette problématique par toi-même ?"
                name="ableAlone"
                required
                value={String(values.ableAlone)}
                onChange={(v) => setField(setValues, "ableAlone", v)}
                options={[
                  { value: "Oui", label: "Oui" },
                  { value: "Non", label: "Non" },
                ]}
              />
              <ChoiceScale
                label="À quel point c’est important pour toi d’améliorer ta présence en ligne aujourd’hui ?"
                name="importanceOnlinePresence"
                required
                value={String(values.importanceOnlinePresence)}
                onChange={(v) => setField(setValues, "importanceOnlinePresence", v)}
              />
              <ChoiceSingle
                label="Si tu avais une solution claire pour améliorer ta présence en ligne, serais-tu ouvert(e) à te faire accompagner ?"
                name="opennessToSupport"
                required
                value={String(values.opennessToSupport)}
                onChange={(v) => setField(setValues, "opennessToSupport", v)}
                options={[
                  { value: "Oui", label: "Oui" },
                  { value: "Non", label: "Non" },
                ]}
              />
              <ChoiceSingle
                label="Est-ce que tu peux t’engager à être présent(e) et à prévenir en cas d’empêchement ?"
                name="commitment"
                required
                value={String(values.commitment)}
                onChange={(v) => setField(setValues, "commitment", v)}
                options={[
                  { value: "Oui, je m'engage", label: "Oui, je m’engage" },
                  { value: "Non", label: "Non" },
                ]}
              />
            </div>

            <div id="submit" className="rounded-2xl border border-white/10 bg-card/40 p-6 text-center shadow-card backdrop-blur">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Prêt·e à envoyer ?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Ensuite, tu choisiras ton créneau Calendly (45 min).
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    canSubmit && !isSubmitting
                      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground"
                  }`}
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer et réserver mon créneau"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                >
                  Retour au site
                </a>
              </div>

              {!canSubmit ? (
                <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground">
                  Il manque encore des champs ⭐ obligatoires. Tu peux les remplir plus tard : le formulaire se sauvegarde automatiquement sur ton appareil.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

