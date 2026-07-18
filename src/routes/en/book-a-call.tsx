import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import {
  MERCI_BRIEF_PATH,
  stashCalendlyPrefill,
  submitNetlifyForm,
} from "@/lib/funnel";
import { absUrl } from "@/seo/site";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
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

export const Route = createFileRoute("/en/book-a-call")({
  head: () => ({
    meta: [
      { title: "Book a call · PeakCL" },
      {
        name: "description",
        content:
          "A short diagnosis before your call, or book your slot directly. Work remotely with PeakCL, wherever you are.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Book a call · PeakCL" },
      {
        property: "og:description",
        content:
          "Fill in a quick diagnosis so I can prepare our call, or book your slot straight away.",
      },
      ...ogLocaleMeta("/reservation-appel", "en"),
    ],
    links: [
      { ...canonicalLink("/reservation-appel", "en") },
      ...hreflangLinks("/reservation-appel"),
    ],
  }),
  component: BookACallPage,
});

const STORAGE_KEY = "peakcl_book_a_call_en_v1";
const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

function BookACallPage() {
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

  // Qualified path: only the contact fields and the main challenge are
  // required. The qualification questions (revenue, goals, commitment...) are
  // optional, so we don't put up a wall at the door.
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
        "Something went wrong. Check your connection and try again, your answers stay saved in this browser.",
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
          <GlowingEffect
            spread={40}
            glow
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />2 to 3
            minutes
            <span className="opacity-40">·</span>
            45 min call
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Confidential
          </div>

          <div className="mt-6 flex justify-center">
            <ExpressionPhoto
              slug="sourire-exterieur"
              caption="Talk soon"
              tilt={-3}
              imgClassName="aspect-[3/4] w-24"
            />
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Book a call · PeakCL
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Two options: book your slot directly, or fill in this short
            diagnosis first (2 to 3 minutes) so I can prepare our conversation.
            The call runs 45 minutes, and we meet online wherever you are.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_calendly_direct"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Book my call directly <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/30"
            >
              Do the diagnosis first
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
            Your answers stay confidential.
          </p>
        </div>
      </section>

      <section id="diagnostic" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative mb-8 rounded-2xl border border-white/5 bg-card/40 p-5 text-sm text-muted-foreground shadow-card backdrop-blur">
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
                Required fields ⭐ :{" "}
                <span className="font-semibold text-foreground">
                  {completion.filled}/{completion.total}
                </span>
              </div>
              <a
                href="#submit"
                className="inline-flex items-center gap-2 font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
              >
                Go to submit <ArrowRight className="h-4 w-4" />
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
                Don't fill this in: <input name="bot-field" />
              </label>
            </p>

            <SectionTitle title="The essentials" />
            <div className="grid gap-5">
              <TextInput
                label="Your first and last name"
                name="fullName"
                required
                value={String(values.fullName)}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
              <TextInput
                label="Your phone number"
                name="phone"
                type="tel"
                required
                placeholder="+1 555 123 4567"
                value={String(values.phone)}
                onChange={(v) => setField(setValues, "phone", v)}
              />
              <TextInput
                label="Your email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={String(values.email)}
                onChange={(v) => setField(setValues, "email", v)}
              />
              <ChoiceMulti
                label="What is your challenge? (You can pick several)"
                name="painPoints"
                required
                values={(values.painPoints as string[]) || []}
                onChange={(v) => setField(setValues, "painPoints", v)}
                options={[
                  {
                    value: "Site n'attire/convertit pas",
                    label:
                      "My website doesn't attract visitors or convert them into clients",
                  },
                  { value: "Manque de visibilité", label: "I lack visibility" },
                  {
                    value: "Manque de temps",
                    label:
                      "I don't have time to manage my site and my communication at the same time",
                  },
                  {
                    value: "Résultat DIY insatisfaisant",
                    label:
                      "I tried to build my site myself but I'm not happy with the result",
                  },
                  {
                    value: "Ne sait pas se différencier",
                    label: "I don't know what to say or how to stand out",
                  },
                  {
                    value: "Difficulté à justifier l'investissement",
                    label:
                      "I find it hard to justify investing in something I don't master",
                  },
                ]}
              />
              <TextInput
                label="Your Instagram account (if you have one)"
                name="instagram"
                placeholder="@myhandle"
                value={String(values.instagram)}
                onChange={(v) => setField(setValues, "instagram", v)}
              />
            </div>

            <SectionTitle title="To prepare the call (optional)" />
            <p className="-mt-4 text-sm text-muted-foreground">
              These questions help me prepare a more useful conversation. You
              can leave them empty and book straight away.
            </p>
            <div className="grid gap-5">
              <ChoiceScale
                label="How important is it to you to solve this challenge and reach your goals?"
                name="importanceSolve"
                value={String(values.importanceSolve)}
                onChange={(v) => setField(setValues, "importanceSolve", v)}
              />
              <ChoiceSingle
                label="Honestly, do you think you can solve this challenge on your own?"
                name="ableAlone"
                value={String(values.ableAlone)}
                onChange={(v) => setField(setValues, "ableAlone", v)}
                options={[
                  { value: "Oui", label: "Yes" },
                  { value: "Non", label: "No" },
                ]}
              />
              <ChoiceScale
                label="How important is it to you to improve your online presence today?"
                name="importanceOnlinePresence"
                value={String(values.importanceOnlinePresence)}
                onChange={(v) =>
                  setField(setValues, "importanceOnlinePresence", v)
                }
              />
              <ChoiceSingle
                label="If you had a clear solution to improve your online presence, would you be open to getting support?"
                name="opennessToSupport"
                value={String(values.opennessToSupport)}
                onChange={(v) => setField(setValues, "opennessToSupport", v)}
                options={[
                  { value: "Oui", label: "Yes" },
                  { value: "Non", label: "No" },
                ]}
              />
              <ChoiceSingle
                label="Can you commit to showing up and letting me know if something comes up?"
                name="commitment"
                value={String(values.commitment)}
                onChange={(v) => setField(setValues, "commitment", v)}
                options={[
                  { value: "Oui, je m'engage", label: "Yes, I commit" },
                  { value: "Non", label: "No" },
                ]}
              />
              <ChoiceSingle
                label="What is your goal for the coming months?"
                name="goalRevenue"
                value={String(values.goalRevenue)}
                onChange={(v) => setField(setValues, "goalRevenue", v)}
                options={[
                  { value: "1000-2000", label: "€1,000-2,000" },
                  { value: "2000-3000", label: "€2,000-3,000" },
                  { value: "3000-5000", label: "€3,000-5,000" },
                  { value: "5000-10000", label: "€5,000-10,000" },
                  { value: "+10000", label: "€10,000+" },
                ]}
              />
              <ChoiceSingle
                label="What is your current revenue?"
                name="revenueRange"
                value={String(values.revenueRange)}
                onChange={(v) => setField(setValues, "revenueRange", v)}
                options={[
                  { value: "<1000", label: "Under €1,000/month" },
                  {
                    value: "1000-3000",
                    label: "Between €1,000 and €3,000/month",
                  },
                  {
                    value: "3000-5000",
                    label: "Between €3,000 and €5,000/month",
                  },
                  { value: "5000+", label: "Over €5,000/month" },
                  {
                    value: "Je préfère ne pas répondre",
                    label: "I'd rather not say",
                  },
                ]}
              />
            </div>

            <div
              id="submit"
              className="relative rounded-2xl border border-white/10 bg-card/40 p-6 text-center shadow-card backdrop-blur"
            >
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Ready to send?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Next, you'll pick your Calendly slot (45 min).
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
                  {isSubmitting ? "Sending…" : "Send and book my slot"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/en"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                >
                  Back to site
                </a>
              </div>

              {!canSubmit ? (
                <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground">
                  Some required fields ⭐ are still missing. You can fill them
                  in later: the form saves automatically on your device.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
