import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Brief de projet — PeakCL" },
      {
        name: "description",
        content:
          "Questionnaire de cadrage PeakCL (8 à 12 minutes) pour recevoir un devis clair et précis sous 48h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/brief") },
    ],
    links: [{ rel: "canonical", href: absUrl("/brief") }],
  }),
  component: BriefPage,
});

const STORAGE_KEY = "peakcl_brief_v1";

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

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

function BriefPage() {
  const { values, setValues } = useAutosaveForm({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    cityZone: "",
    whatDoYouDo: "",
    customers: "",
    hasWebsite: "",
    websiteUrl: "",
    hasLogo: "",
    socialNetworks: [],
    servicesWanted: [],
    mainGoal: "",
    goalOther: "",
    projectSummary: "",
    frustrations: "",
    pagesCount: "",
    siteFeatures: [],
    inspirationSites: "",
    hasDomain: "",
    domainName: "",
    hasHosting: "",
    hostingProvider: "",
    hasContent: "",
    logoStyles: [],
    colorPreferences: "",
    inspirationLogos: "",
    logoSupports: [],
    socialPagesWanted: [],
    socialPagesExisting: "",
    contentHelp: "",
    budgetRange: "",
    idealDelay: "",
    startWhen: "",
    discovery: "",
    discoveryOther: "",
    finalNotes: "",
  });

  const requiredNames = useMemo(
    () => [
      "fullName",
      "email",
      "businessName",
      "cityZone",
      "whatDoYouDo",
      "customers",
      "hasWebsite",
      "hasLogo",
      "servicesWanted",
      "mainGoal",
      "projectSummary",
      "socialPagesWanted",
      "budgetRange",
      "idealDelay",
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

  const showGoalOther = values.mainGoal === "Autre";
  const showDomainName = values.hasDomain === "Oui";
  const showHostingProvider = values.hasHosting === "Oui";
  const showDiscoveryOther = values.discovery === "Autre";

  const forceRequiredMultiOk = (name: string) => {
    const v = values[name];
    return Array.isArray(v) ? v.length > 0 : true;
  };

  const canSubmit = completion.filled === completion.total && forceRequiredMultiOk("servicesWanted") && forceRequiredMultiOk("socialPagesWanted");

  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />
            8 à 12 minutes
            <span className="opacity-40">·</span>
            Devis sous 48h
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Confidentiel
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">Brief de projet — PeakCL</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Avant qu’on échange, j’ai besoin de mieux comprendre ton projet. Ce questionnaire prend 8 à 12 minutes. À la fin, tu auras un devis clair et précis sous 48h.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
            Tes réponses restent confidentielles. Si une question ne s’applique pas à toi, écris simplement “non concerné”.
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

          <div className="mb-8 rounded-2xl border border-white/5 bg-card/40 p-6 shadow-card backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]/80">
              Sommaire
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {[
                { href: "#s1", label: "SECTION 1 — Toi & ton activité" },
                { href: "#s2", label: "SECTION 2 — Ton projet" },
                { href: "#s3", label: "SECTION 3 — Site" },
                { href: "#s4", label: "SECTION 4 — Logo / identité" },
                { href: "#s5", label: "SECTION 5 — Réseaux sociaux" },
                { href: "#s6", label: "SECTION 6 — Budget & délai" },
                { href: "#s7", label: "SECTION 7 — Pour finir" },
              ].map((x) => (
                <a
                  key={x.href}
                  href={x.href}
                  className="rounded-xl border border-white/5 bg-background/40 px-4 py-3 text-sm font-semibold text-foreground/90 hover:border-white/10 hover:text-foreground"
                >
                  {x.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] bg-card/40 p-6 shadow-card backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Rappel des offres
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                <div className="text-sm font-semibold text-[var(--brand-turquoise)]">Pack présence en ligne (à pousser)</div>
                <div className="mt-1 text-xs text-muted-foreground">Site + logo + pages réseaux + premiers contenus si besoin.</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                <div className="text-sm font-semibold">Site vitrine codé</div>
                <div className="mt-1 text-xs text-muted-foreground">500–1500€ · 1 à 5 pages · propre, rapide, efficace.</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                <div className="text-sm font-semibold">Site sur‑mesure / custom</div>
                <div className="mt-1 text-xs text-muted-foreground">1500€+ · fonctionnalités spécifiques, UX/UI plus poussé.</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-background/40 p-4">
                <div className="text-sm font-semibold">Identité visuelle / logo</div>
                <div className="mt-1 text-xs text-muted-foreground">Sur devis · logo + déclinaisons selon le besoin.</div>
              </div>
            </div>
          </div>

          <form
            name="brief-projet"
            method="POST"
            action="/merci-brief"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="brief-projet" />
            <input type="hidden" name="leadType" value="brief_projet" />
            <input type="hidden" name="source" value="site_peakcl" />
            <p className="hidden">
              <label>
                Ne pas remplir: <input name="bot-field" />
              </label>
            </p>

            <div id="s1" />
            <SectionTitle title="SECTION 1 — Toi & ton activité" />
            <div className="grid gap-5">
              <TextInput
                label="Q1. Ton nom complet"
                name="fullName"
                required
                value={String(values.fullName)}
                onChange={(v) => setField(setValues, "fullName", v)}
              />
              <TextInput
                label="Q2. Ton email"
                name="email"
                type="email"
                required
                value={String(values.email)}
                onChange={(v) => setField(setValues, "email", v)}
              />
              <TextInput
                label="Q3. Ton numéro de téléphone (optionnel mais utile pour les questions rapides)"
                name="phone"
                type="tel"
                value={String(values.phone)}
                onChange={(v) => setField(setValues, "phone", v)}
              />
              <TextInput
                label="Q4. Le nom de ton activité / ta structure"
                name="businessName"
                required
                helper={'Si tu n’as pas encore de nom, écris “à définir”.'}
                value={String(values.businessName)}
                onChange={(v) => setField(setValues, "businessName", v)}
              />
              <TextInput
                label="Q4bis. Ta ville / zone (où tu veux être trouvé·e)"
                name="cityZone"
                required
                helper={"Ex : Annecy + 20 km · Lyon (6e/7e) · France entière · en visio."}
                value={String(values.cityZone)}
                onChange={(v) => setField(setValues, "cityZone", v)}
              />
              <TextArea
                label="Q5. En une phrase, qu’est‑ce que tu fais ?"
                name="whatDoYouDo"
                required
                maxLength={280}
                helper={
                  "Comme si tu te présentais à quelqu’un en soirée. Évite “je propose des solutions innovantes”. Va droit au but."
                }
                placeholder="Ex : Je suis ostéo à Lyon et j’aide les sportifs à reprendre l’entraînement sans douleur."
                rows={3}
                value={String(values.whatDoYouDo)}
                onChange={(v) => setField(setValues, "whatDoYouDo", v)}
              />
              <TextArea
                label="Q6. À qui tu vends / qui sont tes clients ?"
                name="customers"
                required
                helper={"Particuliers ? Pros ? Quel profil exactement ? Plus c’est précis, mieux je peux t’aider."}
                value={String(values.customers)}
                onChange={(v) => setField(setValues, "customers", v)}
              />
              <ChoiceSingle
                label="Q7. Tu as déjà un site web ?"
                name="hasWebsite"
                required
                value={String(values.hasWebsite)}
                onChange={(v) => setField(setValues, "hasWebsite", v)}
                options={[
                  { value: "Oui_fonctionne_mais_refaire", label: "Oui, et il fonctionne bien (mais je veux le refaire / l’améliorer)" },
                  { value: "Oui_obsolete", label: "Oui, mais il est obsolète / ne me ressemble pas" },
                  { value: "Non", label: "Non, pas encore" },
                  { value: "Commence_pas_fini", label: "J’ai commencé seul·e mais je n’ai jamais fini" },
                ]}
              />
              <TextInput
                label="Q8. Si oui, quel est le lien ?"
                name="websiteUrl"
                type="url"
                placeholder="https://"
                value={String(values.websiteUrl)}
                onChange={(v) => setField(setValues, "websiteUrl", v)}
              />
              <ChoiceSingle
                label="Q9. Tu as un logo ?"
                name="hasLogo"
                required
                value={String(values.hasLogo)}
                onChange={(v) => setField(setValues, "hasLogo", v)}
                options={[
                  { value: "Oui_garder", label: "Oui, et je veux le garder" },
                  { value: "Oui_refaire", label: "Oui, mais je veux le refaire" },
                  { value: "Non", label: "Non, j’en ai besoin" },
                  { value: "Je_sais_pas", label: "Je ne sais pas si j’en ai besoin" },
                ]}
              />
              <ChoiceMulti
                label="Q10. Quels réseaux sociaux tu utilises pour ton activité ? (coche tout ce qui s’applique)"
                name="socialNetworks"
                values={(values.socialNetworks as string[]) || []}
                onChange={(v) => setField(setValues, "socialNetworks", v)}
                options={[
                  { value: "LinkedIn", label: "LinkedIn" },
                  { value: "Instagram", label: "Instagram" },
                  { value: "Facebook", label: "Facebook" },
                  { value: "Google Business Profile", label: "Google Business Profile (fiche Google Maps)" },
                  { value: "TikTok", label: "TikTok" },
                  { value: "YouTube", label: "YouTube" },
                  { value: "Aucun", label: "Aucun pour l’instant" },
                ]}
              />
            </div>

            <div id="s2" />
            <SectionTitle title="SECTION 2 — Ton projet" />
            <div className="grid gap-5">
              <ChoiceMulti
                label="Q11. Quelle prestation t’intéresse ? (coche tout ce qui s’applique)"
                name="servicesWanted"
                required
                values={(values.servicesWanted as string[]) || []}
                onChange={(v) => setField(setValues, "servicesWanted", v)}
                options={[
                  { value: "Site vitrine codé (1 à 5 pages)", label: "Site vitrine codé (1 à 5 pages)" },
                  { value: "Site sur‑mesure", label: "Site sur‑mesure avec fonctionnalités spécifiques (espace membre, calculateur, etc.)" },
                  { value: "Création/refonte logo", label: "Création / refonte de logo" },
                  { value: "Identité visuelle complète", label: "Identité visuelle complète (logo + déclinaisons)" },
                  { value: "Réseaux sociaux", label: "Mise en place / refonte de pages réseaux sociaux" },
                  { value: "Pack combo", label: "Pack combo : site + logo + réseaux sociaux" },
                  { value: "Je ne sais pas", label: "Je ne sais pas encore, j’ai besoin de ton conseil" },
                ]}
              />
              <ChoiceSingle
                label="Q12. Quel est l’objectif principal de ce projet ?"
                name="mainGoal"
                required
                value={String(values.mainGoal)}
                onChange={(v) => setField(setValues, "mainGoal", v)}
                options={[
                  { value: "Acquérir de nouveaux clients", label: "Acquérir de nouveaux clients" },
                  { value: "Crédibilité / image pro", label: "Asseoir ma crédibilité / image pro" },
                  { value: "Vendre en ligne", label: "Vendre en ligne (e‑commerce, prise de RDV, paiement)" },
                  { value: "Lancer une nouvelle activité", label: "Lancer une nouvelle activité" },
                  { value: "Refaire ce qui ne me ressemble plus", label: "Refaire ce qui ne me ressemble plus" },
                  { value: "Autre", label: "Autre (préciser)" },
                ]}
              />
              {showGoalOther ? (
                <TextInput
                  label="Précise l’objectif (autre)"
                  name="goalOther"
                  required
                  value={String(values.goalOther)}
                  onChange={(v) => setField(setValues, "goalOther", v)}
                />
              ) : null}
              <TextArea
                label="Q13. Si tu devais résumer le projet en 3–4 phrases, qu’est‑ce que tu dirais ?"
                name="projectSummary"
                required
                helper={
                  "Fais simple. “Je veux un site qui montre mon travail à des clients potentiels et qui leur permette de me contacter facilement.”"
                }
                value={String(values.projectSummary)}
                onChange={(v) => setField(setValues, "projectSummary", v)}
              />
              <TextArea
                label="Q14. Qu’est‑ce qui te frustre dans ta présence en ligne actuelle (s’il y en a une) ?"
                name="frustrations"
                helper={
                  "Site vieux, pas mobile‑friendly, mauvais visuels, ne te ressemble pas, contenus mal écrits… Ce qui t’agace."
                }
                value={String(values.frustrations)}
                onChange={(v) => setField(setValues, "frustrations", v)}
              />
            </div>

            <div id="s3" />
            <SectionTitle title="SECTION 3 — Si tu veux un site (sinon passe la section)" />
            <div className="grid gap-5">
              <ChoiceSingle
                label="Q15. Combien de pages tu imagines ?"
                name="pagesCount"
                value={String(values.pagesCount)}
                onChange={(v) => setField(setValues, "pagesCount", v)}
                options={[
                  { value: "1", label: "1 seule page (one‑page)" },
                  { value: "2-3", label: "2 à 3 pages" },
                  { value: "4-6", label: "4 à 6 pages" },
                  { value: "7+", label: "7 pages ou plus" },
                  { value: "Je ne sais pas", label: "Je ne sais pas, à toi de me dire" },
                ]}
              />
              <ChoiceMulti
                label="Q16. Quelles fonctionnalités tu veux sur le site ? (coche tout ce qui s’applique)"
                name="siteFeatures"
                values={(values.siteFeatures as string[]) || []}
                onChange={(v) => setField(setValues, "siteFeatures", v)}
                options={[
                  { value: "Formulaire de contact", label: "Formulaire de contact" },
                  { value: "Prise de rendez‑vous", label: "Prise de rendez‑vous en ligne (Calendly ou équivalent)" },
                  { value: "Tarifs/services", label: "Page tarifs / services détaillés" },
                  { value: "Galerie/portfolio", label: "Galerie / portfolio" },
                  { value: "Blog/actu", label: "Blog ou actualités" },
                  { value: "Espace membre", label: "Espace membre / connexion" },
                  { value: "E‑commerce", label: "Boutique en ligne (e‑commerce)" },
                  { value: "Témoignages", label: "Témoignages clients" },
                  { value: "FAQ", label: "FAQ" },
                  { value: "Newsletter", label: "Newsletter / inscription email" },
                  { value: "Multilingue", label: "Multilingue" },
                  { value: "Autre", label: "Autre (préciser dans la dernière question)" },
                ]}
              />
              <TextArea
                label="Q17. As‑tu 2–3 sites web qui t’inspirent ? (URLs)"
                name="inspirationSites"
                helper={"Pas pour copier — pour comprendre ton goût. Note ce que tu aimes dans chacun."}
                rows={4}
                value={String(values.inspirationSites)}
                onChange={(v) => setField(setValues, "inspirationSites", v)}
              />
              <ChoiceSingle
                label="Q18. Tu as déjà un nom de domaine ?"
                name="hasDomain"
                value={String(values.hasDomain)}
                onChange={(v) => setField(setValues, "hasDomain", v)}
                options={[
                  { value: "Oui", label: "Oui (préciser le nom)" },
                  { value: "Non", label: "Non, à acheter" },
                  { value: "Je ne sais pas", label: "Je ne sais pas ce que c’est" },
                ]}
              />
              {showDomainName ? (
                <TextInput
                  label="Nom de domaine"
                  name="domainName"
                  placeholder="ex: monentreprise.fr"
                  value={String(values.domainName)}
                  onChange={(v) => setField(setValues, "domainName", v)}
                />
              ) : null}
              <ChoiceSingle
                label="Q19. Tu as déjà un hébergement ?"
                name="hasHosting"
                value={String(values.hasHosting)}
                onChange={(v) => setField(setValues, "hasHosting", v)}
                options={[
                  { value: "Oui", label: "Oui (préciser le prestataire)" },
                  { value: "Non", label: "Non, à mettre en place" },
                  { value: "Je ne sais pas", label: "Je ne sais pas ce que c’est" },
                ]}
              />
              {showHostingProvider ? (
                <TextInput
                  label="Prestataire d’hébergement"
                  name="hostingProvider"
                  value={String(values.hostingProvider)}
                  onChange={(v) => setField(setValues, "hostingProvider", v)}
                />
              ) : null}
              <ChoiceSingle
                label="Q20. Tu as déjà des contenus rédigés (textes, photos) ?"
                name="hasContent"
                value={String(values.hasContent)}
                onChange={(v) => setField(setValues, "hasContent", v)}
                options={[
                  { value: "Oui_tout_pret", label: "Oui, tout est prêt" },
                  { value: "Partiel", label: "J’ai une partie, il faut compléter" },
                  { value: "Non_besoin_redaction", label: "Non, j’ai besoin que tout soit rédigé / sourcé" },
                  { value: "Idees_rien_ecrit", label: "J’ai des idées mais rien d’écrit" },
                ]}
              />
            </div>

            <div id="s4" />
            <SectionTitle title="SECTION 4 — Si tu veux un logo / identité visuelle (sinon passe la section)" />
            <div className="grid gap-5">
              <ChoiceMulti
                label="Q21. Quel style tu imagines pour ton logo ? (coche tout ce qui s’applique)"
                name="logoStyles"
                values={(values.logoStyles as string[]) || []}
                onChange={(v) => setField(setValues, "logoStyles", v)}
                options={[
                  { value: "Minimaliste", label: "Minimaliste / épuré" },
                  { value: "Moderne", label: "Moderne / contemporain" },
                  { value: "Classique", label: "Classique / intemporel" },
                  { value: "Élégant", label: "Élégant / haut de gamme" },
                  { value: "Fun", label: "Fun / coloré / décalé" },
                  { value: "Artisanal", label: "Artisanal / fait main" },
                  { value: "Je ne sais pas", label: "Je ne sais pas, à toi de proposer" },
                ]}
              />
              <TextArea
                label="Q22. Des couleurs que tu aimes ou que tu veux absolument éviter ?"
                name="colorPreferences"
                rows={4}
                value={String(values.colorPreferences)}
                onChange={(v) => setField(setValues, "colorPreferences", v)}
              />
              <TextArea
                label="Q23. As‑tu 2–3 logos qui t’inspirent ? (URLs ou descriptions)"
                name="inspirationLogos"
                rows={4}
                value={String(values.inspirationLogos)}
                onChange={(v) => setField(setValues, "inspirationLogos", v)}
              />
              <ChoiceMulti
                label="Q24. Sur quels supports le logo va apparaître principalement ?"
                name="logoSupports"
                values={(values.logoSupports as string[]) || []}
                onChange={(v) => setField(setValues, "logoSupports", v)}
                options={[
                  { value: "Site web", label: "Site web" },
                  { value: "Réseaux sociaux", label: "Réseaux sociaux" },
                  { value: "Cartes de visite", label: "Cartes de visite" },
                  { value: "Devis/factures", label: "Devis / factures" },
                  { value: "Vêtements", label: "Vêtements / goodies" },
                  { value: "Devanture/véhicule", label: "Devanture / véhicule" },
                  { value: "Autre", label: "Autre (préciser dans la dernière question)" },
                ]}
              />
            </div>

            <div id="s5" />
            <SectionTitle title="SECTION 5 — Si tu veux des pages réseaux sociaux (sinon passe la section)" />
            <div className="grid gap-5">
              <ChoiceMulti
                label="Q25. Quelles pages tu veux mettre en place ou refaire ?"
                name="socialPagesWanted"
                required
                values={(values.socialPagesWanted as string[]) || []}
                onChange={(v) => setField(setValues, "socialPagesWanted", v)}
                options={[
                  { value: "LinkedIn", label: "LinkedIn (page entreprise)" },
                  { value: "Instagram", label: "Instagram (profil pro)" },
                  { value: "Facebook", label: "Facebook (page pro)" },
                  { value: "Google Business Profile", label: "Google Business Profile (fiche Google Maps)" },
                  { value: "Autre", label: "Autre (préciser)" },
                ]}
              />
              <TextArea
                label="Q26. Pour chaque page, tu en as déjà une ou il faut tout créer ?"
                name="socialPagesExisting"
                rows={4}
                value={String(values.socialPagesExisting)}
                onChange={(v) => setField(setValues, "socialPagesExisting", v)}
              />
              <ChoiceSingle
                label="Q27. Tu veux que je rédige les premiers contenus (bio, premiers posts) ou tu t’en occupes ?"
                name="contentHelp"
                value={String(values.contentHelp)}
                onChange={(v) => setField(setValues, "contentHelp", v)}
                options={[
                  { value: "Bios+3posts", label: "Tu rédiges les bios + 3 premiers posts" },
                  { value: "Bios_only", label: "Tu rédiges les bios uniquement, je gère les posts" },
                  { value: "Tout", label: "Je rédige tout, juste le visuel à faire" },
                ]}
              />
            </div>

            <div id="s6" />
            <SectionTitle title="SECTION 6 — Budget & délai (le filtre)" subtitle="Cette section sert à éviter les malentendus et à ne pas se faire perdre du temps." />
            <div className="grid gap-5">
              <ChoiceSingle
                label="Q28. Quelle est la fourchette de budget pour ce projet ?"
                name="budgetRange"
                required
                helper={
                  "Cette question filtre les projets. Si ton budget réel est sous mes prix, je préfère te le dire tout de suite plutôt que te faire perdre du temps. Sois honnête, ça nous arrange tous les deux."
                }
                value={String(values.budgetRange)}
                onChange={(v) => setField(setValues, "budgetRange", v)}
                options={[
                  { value: "<500", label: "Moins de 500€" },
                  { value: "500-1000", label: "500€ — 1 000€" },
                  { value: "1000-2000", label: "1 000€ — 2 000€" },
                  { value: "2000-3500", label: "2 000€ — 3 500€" },
                  { value: "3500+", label: "3 500€ et plus" },
                  { value: "Je ne sais pas", label: "Je ne sais pas, à toi de me proposer selon ce que je décris" },
                ]}
              />
              <ChoiceSingle
                label="Q29. Quel est le délai idéal pour avoir le projet livré ?"
                name="idealDelay"
                required
                value={String(values.idealDelay)}
                onChange={(v) => setField(setValues, "idealDelay", v)}
                options={[
                  { value: "Urgence_7j", label: "Sous 7 jours (urgence — premium +30% s’applique)" },
                  { value: "2-4sem", label: "2 à 4 semaines" },
                  { value: "1-2mois", label: "1 à 2 mois" },
                  { value: "2-3mois", label: "2 à 3 mois" },
                  { value: "Pas presse", label: "Pas pressé·e, on cale ensemble" },
                ]}
              />
              <ChoiceSingle
                label="Q30. Quand tu veux démarrer ?"
                name="startWhen"
                value={String(values.startWhen)}
                onChange={(v) => setField(setValues, "startWhen", v)}
                options={[
                  { value: "ASAP", label: "Le plus tôt possible" },
                  { value: "2sem", label: "Dans les 2 semaines" },
                  { value: "1mois", label: "Dans le mois" },
                  { value: "Plus tard", label: "Plus tard, je prépare en amont" },
                ]}
              />
            </div>

            <div id="s7" />
            <SectionTitle title="SECTION 7 — Pour finir" />
            <div className="grid gap-5">
              <ChoiceSingle
                label="Q31. Comment tu m’as connue ?"
                name="discovery"
                helper="Cette question m’aide à savoir où concentrer mes efforts."
                value={String(values.discovery)}
                onChange={(v) => setField(setValues, "discovery", v)}
                options={[
                  { value: "Recommandation", label: "Bouche‑à‑oreille / recommandation" },
                  { value: "LinkedIn", label: "LinkedIn" },
                  { value: "Instagram", label: "Instagram" },
                  { value: "Google", label: "Recherche Google" },
                  { value: "Autre", label: "Autre (préciser)" },
                ]}
              />
              {showDiscoveryOther ? (
                <TextInput
                  label="Précise (autre)"
                  name="discoveryOther"
                  value={String(values.discoveryOther)}
                  onChange={(v) => setField(setValues, "discoveryOther", v)}
                />
              ) : null}
              <TextArea
                label="Q32. Une dernière chose à savoir ?"
                name="finalNotes"
                helper="Une contrainte, une attente particulière, un truc qu’on n’a pas couvert ?"
                value={String(values.finalNotes)}
                onChange={(v) => setField(setValues, "finalNotes", v)}
              />
            </div>

            <div id="submit" className="rounded-2xl border border-white/10 bg-card/40 p-6 text-center shadow-card backdrop-blur">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Prêt·e à envoyer ?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Je lis ton brief attentivement et je reviens vers toi sous 48h ouvrées avec un devis détaillé, ou une proposition de rendez‑vous de 20 minutes si certains points méritent qu’on en parle de vive voix.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    canSubmit
                      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground"
                  }`}
                >
                  Envoyer mon brief <ArrowRight className="h-4 w-4" />
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

