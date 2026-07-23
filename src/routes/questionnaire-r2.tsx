import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { MERCI_R2_PATH, submitNetlifyForm } from "@/lib/funnel";
import { absUrl } from "@/seo/site";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const BUREAU_IMAGE = "/peakcl/assets/images/bureau-peakcl.webp";

export const Route = createFileRoute("/questionnaire-r2")({
  head: () => ({
    meta: [
      { title: "Avant notre 2ᵉ appel · PeakCL" },
      {
        name: "description",
        content:
          "Questionnaire à remplir avant notre deuxième appel, pour préparer une proposition adaptée à votre situation.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/questionnaire-r2") },
    ],
    links: [{ rel: "canonical", href: absUrl("/questionnaire-r2") }],
  }),
  component: QuestionnaireR2Page,
});

const STORAGE_KEY = "peakcl_questionnaire_r2_v1";

type FormValues = Record<string, string>;

function useAutosaveForm(initial: FormValues) {
  const [values, setValues] = useState<FormValues>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as FormValues;
      if (parsed && typeof parsed === "object")
        setValues((v) => ({ ...v, ...parsed }));
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

function setField(
  setValues: React.Dispatch<React.SetStateAction<FormValues>>,
  name: string,
  value: string,
) {
  setValues((prev) => ({ ...prev, [name]: value }));
}

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <span className="text-sm font-semibold text-foreground">
      {label}{" "}
      {required ? (
        <span className="text-[var(--brand-turquoise)]">⭐</span>
      ) : null}
    </span>
  );
}

function SuggestionChips({
  suggestions,
  value,
  onChange,
}: {
  suggestions: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {suggestions.map((s) => {
        const active = value
          .split(", ")
          .map((p) => p.trim())
          .includes(s);
        return (
          <button
            key={s}
            type="button"
            onClick={() => {
              const parts = value
                .split(", ")
                .map((p) => p.trim())
                .filter(Boolean);
              if (active) {
                onChange(parts.filter((p) => p !== s).join(", "));
              } else {
                onChange([...parts, s].join(", "));
              }
            }}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "border-[var(--brand-turquoise)] bg-[var(--brand-turquoise)]/10 text-foreground"
                : "border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({
  label,
  helper,
  name,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      {helper ? (
        <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
      ) : null}
      <input
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-border"
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
  rows = 4,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      {helper ? (
        <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
      ) : null}
      <textarea
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-border"
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
    <fieldset className="rounded-2xl border border-border bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label}{" "}
        {required ? (
          <span className="text-[var(--brand-turquoise)]">⭐</span>
        ) : null}
      </legend>
      <div className="mt-4 grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 hover:border-border"
          >
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
    <fieldset className="rounded-2xl border border-border bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label}{" "}
        {required ? (
          <span className="text-[var(--brand-turquoise)]">⭐</span>
        ) : null}
      </legend>
      <div className="mt-4 grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => String(i)).map((n) => (
          <label
            key={n}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-1 py-2 text-xs font-semibold ${
              value === n
                ? "border-[var(--brand-turquoise)] bg-[var(--brand-turquoise)]/10 text-foreground"
                : "border-border bg-background/40 text-foreground/70 hover:border-border"
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

function QuestionnaireR2Page() {
  const { values, setValues } = useAutosaveForm({
    fullName: "",
    ratingCall1: "",
    objectif: "",
    budget: "",
    infosNecessaires: "",
    serviceFocus: "",
    readyToDecide: "",
    reasonIfNot: "",
  });

  const requiredNames = useMemo(
    () => [
      "fullName",
      "ratingCall1",
      "objectif",
      "serviceFocus",
      "budget",
      "infosNecessaires",
      "readyToDecide",
    ],
    [],
  );

  const budgetSuggestionsByFocus: Record<string, string[]> = {
    landing: ["800 à 1200€", "1200 à 2000€", "2000€ et plus"],
    site: ["2000 à 3000€", "3000 à 4000€", "4000€ et plus"],
    ecommerce: ["3800 à 5000€", "5000 à 7000€", "7000€ et plus"],
    refonte: ["1200 à 2000€", "2000 à 3000€", "3000€ et plus"],
    debug: ["60€/h (ponctuel)", "99€/mois (maintenance)", "300€ et plus"],
    identite: ["500 à 800€", "800 à 1500€", "1500€ et plus"],
    reseaux: ["150 à 300€/mois", "300 à 450€/mois", "450 à 600€/mois et plus"],
    global: ["2200 à 3200€", "3200 à 4500€", "4500€ et plus"],
  };
  const budgetSuggestions =
    budgetSuggestionsByFocus[values.serviceFocus] ??
    budgetSuggestionsByFocus.global;
  const budgetOptions = [
    ...budgetSuggestions.map((s) => ({ value: s, label: s })),
    { value: "ne_sais_pas", label: "Je ne sais pas encore" },
  ];

  const completion = useMemo(() => {
    const isFilled = (name: string) => values[name]?.trim().length > 0;
    let filled = requiredNames.filter(isFilled).length;
    let total = requiredNames.length;
    if (values.readyToDecide === "non") {
      total += 1;
      if (isFilled("reasonIfNot")) filled += 1;
    }
    return { filled, total };
  }, [requiredNames, values]);

  const canSubmit = completion.filled === completion.total;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      await submitNetlifyForm(form);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      window.location.href = MERCI_R2_PATH;
    } catch {
      alert(
        "L’envoi a échoué. Vérifiez votre connexion et réessayez, vos réponses restent sauvegardées dans ce navigateur.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-border">
      <section className="relative grid min-h-[55vh] place-items-center overflow-hidden py-20">
        <img
          src={BUREAU_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-100"
        />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <div className="relative mx-4 max-w-2xl justify-self-center rounded-3xl border border-border bg-muted px-6 py-10 text-center shadow-card backdrop-blur-2xl sm:px-10">
          <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            2 minutes · Confidentiel
          </div>
          <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Avant notre <span className="text-gradient">2ᵉ appel</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pour préparer une proposition de communication digitale (site,
            identité, réseaux, Google) qui correspond vraiment à votre situation,
            j’ai besoin de quelques précisions. 2 minutes, pas plus.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative mb-8 rounded-2xl border border-border bg-card/40 p-5 text-sm text-muted-foreground shadow-card backdrop-blur">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                Progression des champs ⭐ :{" "}
                <span className="font-semibold text-foreground">
                  {completion.filled}/{completion.total}
                </span>
              </div>
              <a
                href="#submit"
                className="inline-flex items-center gap-2 font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
              >
                Aller à l’envoi <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form
            name="questionnaire-r2"
            method="POST"
            action={MERCI_R2_PATH}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="questionnaire-r2" />
            <input type="hidden" name="leadType" value="questionnaire_r2" />
            <input type="hidden" name="source" value="site_peakcl" />
            <p className="hidden">
              <label>
                Ne pas remplir: <input name="bot-field" />
              </label>
            </p>

            <div className="rounded-3xl border border-border bg-card/20 p-6 shadow-card">
              <TextInput
                label="Quel est votre nom et votre prénom ?"
                name="fullName"
                required
                value={values.fullName}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
            </div>

            <ChoiceScale
              label="Quelle note mettriez-vous à notre premier appel ?"
              name="ratingCall1"
              required
              value={values.ratingCall1}
              onChange={(v) => setField(setValues, "ratingCall1", v)}
            />

            <div>
              <TextArea
                label="Quel est votre objectif sur les prochaines semaines ou mois pour votre communication digitale ?"
                helper="Site, identité visuelle, réseaux sociaux, visibilité Google : ce que vous voulez voir changer en priorité."
                name="objectif"
                required
                value={values.objectif}
                onChange={(v) => setField(setValues, "objectif", v)}
                placeholder="Ex: un site qui inspire confiance, une image cohérente sur tous mes canaux, être trouvé sur Google..."
              />
              <SuggestionChips
                suggestions={[
                  "Un site qui inspire confiance",
                  "Une image cohérente sur tous mes canaux",
                  "Être visible sur Google",
                  "Développer ma clientèle rapidement",
                ]}
                value={values.objectif}
                onChange={(v) => setField(setValues, "objectif", v)}
              />
            </div>

            <ChoiceSingle
              label="Sur quoi voulez-vous qu'on avance en priorité lors de notre prochain appel ?"
              name="serviceFocus"
              required
              value={values.serviceFocus}
              onChange={(v) => setField(setValues, "serviceFocus", v)}
              options={[
                {
                  value: "landing",
                  label: "Une landing page (page unique)",
                },
                {
                  value: "site",
                  label: "Un site vitrine (sur mesure ou WordPress)",
                },
                {
                  value: "ecommerce",
                  label: "Une boutique en ligne / e-commerce",
                },
                {
                  value: "refonte",
                  label: "La refonte d'un site existant",
                },
                {
                  value: "debug",
                  label: "Corriger un bug / maintenance d'un site existant",
                },
                {
                  value: "identite",
                  label: "Une identité visuelle (logo, charte graphique)",
                },
                {
                  value: "reseaux",
                  label: "Les réseaux sociaux / community management",
                },
                {
                  value: "global",
                  label: "Un accompagnement complet (plusieurs de ces besoins)",
                },
              ]}
            />

            {values.serviceFocus ? (
              <ChoiceSingle
                label="Si, lors de notre prochain appel, je vous présente une offre qui répond à ce besoin et vous aide à atteindre votre objectif, combien seriez-vous prêt·e à investir ?"
                name="budget"
                required
                value={values.budget}
                onChange={(v) => setField(setValues, "budget", v)}
                options={budgetOptions}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/20 p-5 text-sm text-muted-foreground">
                Choisissez d’abord votre priorité ci-dessus pour voir les fourchettes
                de budget adaptées. ⭐
              </div>
            )}

            <div>
              <TextArea
                label="Pour prendre la meilleure décision possible, de quelles informations auriez-vous besoin ?"
                helper="Avis clients, garanties, exemples de réalisations, précisions techniques, autres questions en tête..."
                name="infosNecessaires"
                required
                value={values.infosNecessaires}
                onChange={(v) => setField(setValues, "infosNecessaires", v)}
              />
              <SuggestionChips
                suggestions={[
                  "Des exemples de réalisations",
                  "Les avis d'anciens clients",
                  "Le détail de l'accompagnement",
                  "Les garanties proposées",
                ]}
                value={values.infosNecessaires}
                onChange={(v) => setField(setValues, "infosNecessaires", v)}
              />
            </div>

            <div>
              <ChoiceSingle
                label="Si l’offre vous correspond et que vous avez toutes les informations nécessaires, seriez-vous prêt·e à prendre votre décision à la fin de notre prochain appel ?"
                name="readyToDecide"
                required
                value={values.readyToDecide}
                onChange={(v) => setField(setValues, "readyToDecide", v)}
                options={[
                  {
                    value: "oui",
                    label:
                      "Oui, si l'offre correspond à mes attentes je suis prêt·e à avancer",
                  },
                  {
                    value: "non",
                    label: "Non, j'aurai besoin de plus de temps",
                  },
                ]}
              />
              <p className="mt-2 px-2 text-xs text-muted-foreground">
                La plupart des personnes qui font cette démarche sérieusement
                sont prêtes à avancer dès que l'offre correspond à ce qu'elles
                cherchent, c'est justement l'objectif de notre prochain appel.
              </p>
              {values.readyToDecide === "oui" ? (
                <p className="mt-2 px-2 text-xs font-medium text-[var(--brand-turquoise)]">
                  Parfait, on prépare tout pour notre appel afin que ce soit un
                  oui aussi de votre côté.
                </p>
              ) : null}
            </div>

            {values.readyToDecide === "non" ? (
              <TextArea
                label="Qu’est-ce qui pourrait t’en empêcher ?"
                helper="Note-le précisément : on s'assure de lever ce point pendant l'appel pour que vous puissiez décider en toute confiance."
                name="reasonIfNot"
                required
                value={values.reasonIfNot}
                onChange={(v) => setField(setValues, "reasonIfNot", v)}
                placeholder="Ex: besoin d'en parler à mon associé, budget à valider, timing..."
              />
            ) : (
              <input type="hidden" name="reasonIfNot" value="" />
            )}

            <div
              id="submit"
              className="relative rounded-2xl border border-border bg-card/40 p-6 text-center shadow-card backdrop-blur"
            >
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-[var(--brand-turquoise)]">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Prêt·e à envoyer ?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                On se retrouve pour notre appel avec tout ça en tête.
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    canSubmit && !isSubmitting
                      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "border border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer mes réponses"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {!canSubmit ? (
                <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground">
                  Il manque encore des champs ⭐ obligatoires. Clique sur
                  "Envoyer mes réponses" : on t’emmène directement au premier
                  champ à compléter. Vos réponses restent sauvegardées
                  automatiquement sur votre appareil.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
