import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import {
  MERCI_BRIEF_PATH,
  stashCalendlyPrefill,
  submitNetlifyForm,
} from "@/lib/funnel";
import { absUrl } from "@/seo/site";
import { hreflangLinks } from "@/seo/hreflang";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";
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

export const Route = createFileRoute("/reservation-appel")({
  head: () => ({
    meta: [
      { title: "Réservation d’appel · PeakCL" },
      {
        name: "description",
        content:
          "Diagnostic approfondi PeakCL avant votre appel, ou réservez directement votre créneau.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reservation-appel") },
    ],
    links: [
      { rel: "canonical", href: absUrl("/reservation-appel") },
      ...hreflangLinks("/reservation-appel"),
    ],
  }),
  component: ReservationAppelPage,
});

const STORAGE_KEY = "peakcl_reservation_appel_v1";
const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

function ReservationAppelPage() {
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

  // Voie qualifiée : seuls les champs de contact + la problématique sont
  // obligatoires. Les questions de qualification (CA, objectifs, engagement…)
  // sont facultatives, pour ne pas dresser un mur à l'entrée.
  const requiredNames = useMemo(
    () => ["fullName", "phone", "email", "painPoints"],
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
    <main className="min-h-screen border-t border-border">
      <section className="relative grid min-h-[55vh] place-items-center overflow-hidden py-24">
        <img
          src={BUREAU_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-100"
        />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <div className="relative mx-4 max-w-2xl justify-self-center rounded-3xl border border-border bg-muted px-6 py-10 text-center shadow-card backdrop-blur-2xl sm:px-10">
          <GlowingEffect
            spread={40}
            glow
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />2 à 3
            minutes
            <span className="opacity-40">·</span>
            Diagnostic 45 min
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Confidentiel
          </div>

          <div className="mt-6 flex justify-center">
            <ExpressionPhoto
              slug="sourire-exterieur"
              caption="À tout de suite"
              tilt={-3}
              imgClassName="aspect-[3/4] w-24"
            />
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Réservation d’appel · PeakCL
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Deux options : réservez directement votre créneau, ou remplissez
            d’abord ce diagnostic (2 à 3 minutes) pour que je prépare notre
            échange. Appel de 45 minutes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_calendly_direct"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Réserver directement mon appel <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
            >
              Faire d’abord le diagnostic
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
            Vos réponses restent confidentielles.
          </p>
        </div>
      </section>

      <section id="diagnostic" className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative mb-8 rounded-2xl border border-border bg-card/40 p-5 text-sm text-muted-foreground shadow-card backdrop-blur">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                Champs obligatoires ⭐ :{" "}
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

            <SectionTitle title="L’essentiel" />
            <div className="grid gap-5">
              <TextInput
                label="Vos prénom et nom"
                name="fullName"
                required
                value={String(values.fullName)}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
              <TextInput
                label="Votre numéro de téléphone"
                name="phone"
                type="tel"
                required
                placeholder="06 12 34 56 78"
                value={String(values.phone)}
                onChange={(v) => setField(setValues, "phone", v)}
              />
              <TextInput
                label="Votre e-mail"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                value={String(values.email)}
                onChange={(v) => setField(setValues, "email", v)}
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
              <TextInput
                label="Votre compte Instagram (si vous en avez un)"
                name="instagram"
                placeholder="@moncompte"
                value={String(values.instagram)}
                onChange={(v) => setField(setValues, "instagram", v)}
              />
            </div>

            <SectionTitle title="Pour préparer l’appel (facultatif)" />
            <p className="-mt-4 text-sm text-muted-foreground">
              Ces questions m’aident à préparer un échange plus utile. Vous
              pouvez les laisser vides et réserver directement.
            </p>
            <div className="grid gap-5">
              <ChoiceScale
                label="À quel point est-ce important pour vous de régler cette problématique et d’atteindre vos objectifs ?"
                name="importanceSolve"
                value={String(values.importanceSolve)}
                onChange={(v) => setField(setValues, "importanceSolve", v)}
              />
              <ChoiceSingle
                label="Pensez-vous honnêtement être capable de régler cette problématique par vous-même ?"
                name="ableAlone"
                value={String(values.ableAlone)}
                onChange={(v) => setField(setValues, "ableAlone", v)}
                options={[
                  { value: "Oui", label: "Oui" },
                  { value: "Non", label: "Non" },
                ]}
              />
              <ChoiceScale
                label="À quel point est-ce important pour vous d’améliorer votre présence en ligne aujourd’hui ?"
                name="importanceOnlinePresence"
                value={String(values.importanceOnlinePresence)}
                onChange={(v) =>
                  setField(setValues, "importanceOnlinePresence", v)
                }
              />
              <ChoiceSingle
                label="Si vous aviez une solution claire pour améliorer votre présence en ligne, seriez-vous ouvert(e) à vous faire accompagner ?"
                name="opennessToSupport"
                value={String(values.opennessToSupport)}
                onChange={(v) => setField(setValues, "opennessToSupport", v)}
                options={[
                  { value: "Oui", label: "Oui" },
                  { value: "Non", label: "Non" },
                ]}
              />
              <ChoiceSingle
                label="Pouvez-vous vous engager à être présent(e) et à prévenir en cas d’empêchement ?"
                name="commitment"
                value={String(values.commitment)}
                onChange={(v) => setField(setValues, "commitment", v)}
                options={[
                  { value: "Oui, je m'engage", label: "Oui, je m’engage" },
                  { value: "Non", label: "Non" },
                ]}
              />
              <ChoiceSingle
                label="Quel est votre objectif pour les prochains mois ?"
                name="goalRevenue"
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
              <ChoiceSingle
                label="Quel est votre chiffre d’affaires actuel ?"
                name="revenueRange"
                value={String(values.revenueRange)}
                onChange={(v) => setField(setValues, "revenueRange", v)}
                options={[
                  { value: "<1000", label: "Moins de 1 000€/mois" },
                  { value: "1000-3000", label: "Entre 1 000€ et 3 000€/mois" },
                  { value: "3000-5000", label: "Entre 3 000€ et 5 000€/mois" },
                  { value: "5000+", label: "Plus de 5 000€/mois" },
                  {
                    value: "Je préfère ne pas répondre",
                    label: "Je préfère ne pas répondre",
                  },
                ]}
              />
            </div>

            <div
              id="submit"
              className="relative rounded-2xl border border-border bg-card/40 p-6 text-center shadow-card backdrop-blur"
            >
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-[var(--brand-turquoise)]">
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
                      : "cursor-not-allowed border border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isSubmitting
                    ? "Envoi en cours…"
                    : "Envoyer et réserver mon créneau"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
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
