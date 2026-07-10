import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import {
  MERCI_BRIEF_PATH,
  stashCalendlyPrefill,
  submitNetlifyForm,
} from "@/lib/funnel";
import { absUrl } from "@/seo/site";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  ChoiceMulti,
  ChoiceScale,
  ChoiceSingle,
  SectionTitle,
  TextInput,
  setField,
  useAutosaveForm,
  useFormCompletion,
} from "@/components/reservation-appel/FormFields";

const BUREAU_IMAGE = "/peakcl/assets/images/bureau-peakcl.webp";

export const Route = createFileRoute("/reservation-appel-hors-ue")({
  beforeLoad: () => {
    throw redirect({ to: "/bienvenue" });
  },
  head: () => ({
    meta: [
      { title: "Réservation d’appel (Hors UE) · PeakCL" },
      {
        name: "description",
        content:
          "Questionnaire de diagnostic PeakCL avant votre appel, version internationale.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reservation-appel-hors-ue") },
    ],
    links: [{ rel: "canonical", href: absUrl("/reservation-appel-hors-ue") }],
  }),
  component: ReservationAppelHorsUePage,
});

const STORAGE_KEY = "peakcl_reservation_appel_hors_ue_v1";

function ReservationAppelHorsUePage() {
  const { values, setValues } = useAutosaveForm(STORAGE_KEY, {
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

  const completion = useFormCompletion(values, requiredNames);

  const forceRequiredMultiOk = (name: string) => {
    const v = values[name];
    return Array.isArray(v) ? v.length > 0 : true;
  };

  const canSubmit =
    completion.filled === completion.total &&
    forceRequiredMultiOk("painPoints");

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
        "L’envoi a échoué. Vérifiez votre connexion et réessayez, vos réponses restent sauvegardées dans ce navigateur.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative grid min-h-[55vh] place-items-center overflow-hidden py-24">
        <img
          src={BUREAU_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-100"
        />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <div className="relative mx-4 max-w-2xl justify-self-center rounded-3xl border border-white/20 bg-white/5 px-6 py-10 text-center shadow-card backdrop-blur-2xl sm:px-10">
          <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />2 à 3
            minutes
            <span className="opacity-40">·</span>
            Diagnostic 45 min
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Confidentiel
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Réservation d’appel · PeakCL
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Avant notre appel, j’ai besoin de comprendre votre situation. Ce
            questionnaire prend 2 à 3 minutes. À la fin, vous pourrez réserver votre
            créneau de diagnostic (45 min).
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
            Vos réponses restent confidentielles.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative mb-8 rounded-2xl border border-white/5 bg-card/40 p-5 text-sm text-muted-foreground shadow-card backdrop-blur">
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
            name="reservation-appel-hors-ue"
            method="POST"
            action={MERCI_BRIEF_PATH}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="form-name"
              value="reservation-appel-hors-ue"
            />
            <input
              type="hidden"
              name="leadType"
              value="reservation_appel_hors_ue"
            />
            <input type="hidden" name="source" value="site_peakcl" />
            <p className="hidden">
              <label>
                Ne pas remplir: <input name="bot-field" />
              </label>
            </p>

            <SectionTitle title="Diagnostic" />
            <div className="grid gap-5">
              <TextInput
                label="Quels sont vos prénom et nom ?"
                name="fullName"
                required
                value={String(values.fullName)}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
              <TextInput
                label="Quel est votre numéro de téléphone ?"
                name="phone"
                type="tel"
                required
                placeholder="+1 555 123 4567"
                value={String(values.phone)}
                onChange={(v) => setField(setValues, "phone", v)}
              />
              <TextInput
                label="Quel est votre mail ?"
                name="email"
                type="email"
                required
                placeholder="tonmail@example.com"
                value={String(values.email)}
                onChange={(v) => setField(setValues, "email", v)}
              />
              <TextInput
                label="Quel est votre compte Instagram ?"
                name="instagram"
                required
                placeholder="@moncompte"
                value={String(values.instagram)}
                onChange={(v) => setField(setValues, "instagram", v)}
              />
              <ChoiceSingle
                label="Quel est votre chiffre d’affaires actuel ?"
                name="revenueRange"
                required
                value={String(values.revenueRange)}
                onChange={(v) => setField(setValues, "revenueRange", v)}
                options={[
                  { value: "<1000", label: "Moins de 1 000 $/mois" },
                  {
                    value: "1000-3000",
                    label: "Entre 1 000 $ et 3 000 $/mois",
                  },
                  {
                    value: "3000-5000",
                    label: "Entre 3 000 $ et 5 000 $/mois",
                  },
                  { value: "5000+", label: "Plus de 5 000 $/mois" },
                  {
                    value: "Je préfère ne pas répondre",
                    label: "Je préfère ne pas répondre",
                  },
                ]}
              />
              <ChoiceSingle
                label="Quel est votre objectif pour les prochains mois ?"
                name="goalRevenue"
                required
                value={String(values.goalRevenue)}
                onChange={(v) => setField(setValues, "goalRevenue", v)}
                options={[
                  { value: "1000-2000", label: "1 000 $ – 2 000 $" },
                  { value: "2000-3000", label: "2 000 $ – 3 000 $" },
                  { value: "3000-5000", label: "3 000 $ – 5 000 $" },
                  { value: "5000-10000", label: "5 000 $ – 10 000 $" },
                  { value: "+10000", label: "+ 10 000 $" },
                ]}
              />
              <ChoiceMulti
                label="Quelle est votre problématique ? (Plusieurs réponses possibles)"
                name="painPoints"
                required
                values={(values.painPoints as string[]) || []}
                onChange={(v) => setField(setValues, "painPoints", v)}
                options={[
                  {
                    value: "Site n'attire/convertit pas",
                    label:
                      "Mon site web n’attire pas de visiteurs ou ne convertit pas en clients",
                  },
                  {
                    value: "Manque de visibilité",
                    label: "Je manque de visibilité",
                  },
                  {
                    value: "Manque de temps",
                    label:
                      "Je n’ai pas le temps de gérer mon site et ma communication en parallèle",
                  },
                  {
                    value: "Résultat DIY insatisfaisant",
                    label:
                      "J’ai essayé de créer mon site moi‑même mais le résultat ne me satisfait pas",
                  },
                  {
                    value: "Ne sait pas se différencier",
                    label:
                      "Je ne sais pas quoi communiquer ni comment me différencier",
                  },
                  {
                    value: "Difficulté à justifier l'investissement",
                    label:
                      "J’ai du mal à justifier l’investissement dans quelque chose que je ne maîtrise pas",
                  },
                ]}
              />
              <ChoiceScale
                label="À quel point est-ce important pour vous de régler cette problématique et d’atteindre vos objectifs ?"
                name="importanceSolve"
                required
                value={String(values.importanceSolve)}
                onChange={(v) => setField(setValues, "importanceSolve", v)}
              />
              <ChoiceSingle
                label="Est-ce que vous pensez honnêtement être capable de régler cette problématique par vous-même ?"
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
                label="À quel point c’est important pour vous d’améliorer votre présence en ligne aujourd’hui ?"
                name="importanceOnlinePresence"
                required
                value={String(values.importanceOnlinePresence)}
                onChange={(v) =>
                  setField(setValues, "importanceOnlinePresence", v)
                }
              />
              <ChoiceSingle
                label="Si vous aviez une solution claire pour améliorer votre présence en ligne, seriez-vous ouvert(e) à vous faire accompagner ?"
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
                label="Est-ce que vous pouvez vous engager à être présent(e) et à prévenir en cas d’empêchement ?"
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

            <div
              id="submit"
              className="relative rounded-2xl border border-white/10 bg-card/40 p-6 text-center shadow-card backdrop-blur"
            >
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Prêt·e à envoyer ?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Ensuite, vous choisirez votre créneau Calendly (45 min).
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
                  {isSubmitting
                    ? "Envoi en cours…"
                    : "Envoyer et réserver mon créneau"}
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
                  Il manque encore des champs ⭐ obligatoires. Vous pouvez les
                  remplir plus tard : le formulaire se sauvegarde
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
