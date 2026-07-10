import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import {
  CheckboxGroup,
  QuestionBlock,
  RadioGroup,
  SectionTitle,
  TextArea,
  TextInput,
} from "@/components/cadrage/FormFields";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { submitNetlifyForm } from "@/lib/funnel";
import { absUrl } from "@/seo/site";

const STORAGE_KEY = "peakcl_cadrage_pascale_v1";
const FORM_NAME = "cadrage-pascale";
const MERCI_PATH = "/cadrage/pascale/merci";

export const Route = createFileRoute("/cadrage/pascale")({
  head: () => ({
    meta: [
      { title: "Questionnaire de cadrage · Pascale · PeakCL" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Questionnaire privé de cadrage pour la refonte du site.",
      },
      { property: "og:url", content: absUrl("/cadrage/pascale") },
    ],
  }),
  component: CadragePascalePage,
});

type Values = Record<string, string | string[]>;

function emptyValues(): Values {
  const keys = [
    "parcours",
    "depuis_quand",
    "activite_principale",
    "zone_geographique",
    "seule_ou_equipe",
    "approche",
    "valeurs",
    "ressenti_souhaite",
    "problematiques_frequentes",
    "sujets_eviter",
    "prestations_actuelles",
    "detail_soins",
    "prestations_prioritaires",
    "prestations_evolution",
    "tarifs_afficher",
    "clientele",
    "public_principal",
    "besoins_frequents",
    "connaissance_magnetisme",
    "explications_necessaires",
    "pourquoi_refonte",
    "site_actuel_problemes",
    "objectifs_autre",
    "actions_visiteurs_autre",
    "conserver_actuel",
    "changer_completement",
    "couleurs_appreciees",
    "couleurs_eviter",
    "inspirations_sites",
    "logo_exploitable",
    "logo_souhait",
    "charte_graphique",
    "structure_pages_commentaire",
    "page_par_soin",
    "blog_souhaite",
    "temoignages_integration",
    "faq_souhaite",
    "formulaires_besoins",
    "agenda_reservation",
    "contenus_redaction",
    "photos_utilisation",
    "visibilite_google",
    "fiche_google",
    "mots_cles_google",
    "reseaux_autre",
    "lier_reseaux",
    "coherence_graphique",
    "hebergement_acces",
    "date_mise_en_ligne",
    "periode_importante",
    "organisation_projet",
    "notes_libres",
  ];
  const v: Values = {};
  for (const k of keys) v[k] = "";
  const multi = [
    "modes_exercice",
    "types_prestations",
    "objectifs_site",
    "actions_visiteurs",
    "mots_univers",
    "declinaisons_identite",
    "pages_envisagees",
    "contact_canaux",
    "contenus_disponibles",
    "reseaux_presence",
    "gestion_souhaits",
    "google_actions",
  ];
  for (const k of multi) v[k] = [];
  return v;
}

function useFormState() {
  const [values, setValues] = useState<Values>(emptyValues);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Values;
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

  const set = (name: string, value: string | string[]) =>
    setValues((prev) => ({ ...prev, [name]: value }));
  const str = (name: string) => String(values[name] ?? "");
  const arr = (name: string) =>
    (Array.isArray(values[name]) ? values[name] : []) as string[];

  return { values, set, str, arr };
}

function CadragePascalePage() {
  const { set, str, arr } = useFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      await submitNetlifyForm(form);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      window.location.href = MERCI_PATH;
    } catch {
      alert(
        "L'envoi a échoué. Vérifie ta connexion et réessaie, ou écris à peakcl73@gmail.com : tes réponses sont sauvegardées dans ce navigateur.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-white/5">
      <header className="border-b border-white/5 bg-background/80 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <span className="font-display text-sm font-bold tracking-tight">
            Peak<span className="text-gradient">CL</span>
            <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
              · Cadrage privé
            </span>
          </span>
          <span className="text-xs text-muted-foreground">Pascale Vert</span>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero py-14">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-[var(--brand-yellow)]" />
            30 à 45 min · en plusieurs fois si besoin
            <span className="opacity-40">·</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
            Sauvegarde automatique
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold leading-tight md:text-4xl">
            Questionnaire de cadrage
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Refonte du site ·{" "}
            <span className="text-foreground">pascale-vert-magnetiseur.fr</span>
            <br />
            Magnétiseuse
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Réponds librement, même de manière intuitive. L'objectif n'est pas
            la perfection : c'est de poser les bonnes bases pour un site
            cohérent et aligné avec ton activité. Aucun champ n'est obligatoire.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-3xl px-6">
          <form
            name={FORM_NAME}
            method="POST"
            action={MERCI_PATH}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <input type="hidden" name="leadType" value="cadrage_client" />
            <input type="hidden" name="source" value="cadrage_pascale_prive" />
            <input type="hidden" name="client_name" value="Pascale Vert" />
            <input type="hidden" name="client_activity" value="Magnétiseuse" />
            <input
              type="hidden"
              name="site_actuel"
              value="pascale-vert-magnetiseur.fr"
            />
            <input
              type="hidden"
              name="subject"
              value="[PeakCL] Cadrage Pascale : questionnaire reçu"
            />
            <p className="hidden">
              <label>
                Ne pas remplir : <input name="bot-field" />
              </label>
            </p>

            {/* ── 1. Activité & parcours ── */}
            <SectionTitle title="1. Ton activité & ton parcours" />
            <QuestionBlock label="Peux-tu me raconter ton parcours et ce qui t'a amenée vers le magnétisme ?">
              <TextArea
                name="parcours"
                rows={6}
                value={str("parcours")}
                onChange={(v) => set("parcours", v)}
                placeholder="Ton histoire, ta formation, les déclencheurs, ce qui a donné sens à ta pratique…"
              />
            </QuestionBlock>
            <QuestionBlock label="Depuis combien de temps exerces-tu ?">
              <TextInput
                name="depuis_quand"
                value={str("depuis_quand")}
                onChange={(v) => set("depuis_quand", v)}
                placeholder="Ex : depuis 2016 · 8 ans"
              />
            </QuestionBlock>
            <QuestionBlock label="Quelle est aujourd'hui ton activité principale ?">
              <TextArea
                name="activite_principale"
                rows={3}
                value={str("activite_principale")}
                onChange={(v) => set("activite_principale", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Tu exerces (plusieurs choix possibles) :">
              <CheckboxGroup
                name="modes_exercice"
                options={[
                  { value: "domicile", label: "À domicile" },
                  { value: "cabinet", label: "En cabinet" },
                  { value: "distance", label: "À distance / en visio" },
                  {
                    value: "deplacement",
                    label: "En déplacement chez les clients",
                  },
                  { value: "evenements", label: "Lors d'événements / salons" },
                ]}
                values={arr("modes_exercice")}
                onChange={(v) => set("modes_exercice", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Quelle est ta zone géographique d'intervention ?">
              <TextArea
                name="zone_geographique"
                rows={2}
                value={str("zone_geographique")}
                onChange={(v) => set("zone_geographique", v)}
                placeholder="Ville, département, rayon de déplacement, visio France entière…"
              />
            </QuestionBlock>
            <QuestionBlock label="Tu travailles seule ou avec d'autres praticiens ?">
              <TextArea
                name="seule_ou_equipe"
                rows={2}
                value={str("seule_ou_equipe")}
                onChange={(v) => set("seule_ou_equipe", v)}
              />
            </QuestionBlock>

            {/* ── 2. Vision & approche ── */}
            <SectionTitle title="2. Ta vision & ton approche" />
            <QuestionBlock label="Comment décrirais-tu ta façon de pratiquer le magnétisme ?">
              <TextArea
                name="approche"
                rows={5}
                value={str("approche")}
                onChange={(v) => set("approche", v)}
                placeholder="Ton positionnement, ce qui te différencie d'autres magnétiseurs, ta philosophie de soin…"
              />
            </QuestionBlock>
            <QuestionBlock label="Quelles sont les valeurs les plus importantes dans ton accompagnement ?">
              <TextArea
                name="valeurs"
                rows={4}
                value={str("valeurs")}
                onChange={(v) => set("valeurs", v)}
                placeholder="Ex : bienveillance, confidentialité, écoute, respect du rythme de chacun…"
              />
            </QuestionBlock>
            <QuestionBlock label="Que souhaites-tu que les personnes ressentent lorsqu'elles arrivent sur ton site ?">
              <TextArea
                name="ressenti_souhaite"
                rows={3}
                value={str("ressenti_souhaite")}
                onChange={(v) => set("ressenti_souhaite", v)}
                placeholder="Ex : confiance, sérénité, curiosité, envie de te contacter…"
              />
            </QuestionBlock>
            <QuestionBlock label="Quels types de problématiques accompagnes-tu le plus souvent ?">
              <TextArea
                name="problematiques_frequentes"
                rows={6}
                value={str("problematiques_frequentes")}
                onChange={(v) => set("problematiques_frequentes", v)}
                placeholder="Douleurs, stress, fatigue, animaux, deuil, blocages… tout ce que tu traites régulièrement"
              />
            </QuestionBlock>
            <QuestionBlock label="Y a-t-il des sujets, pratiques ou associations d'idées que tu ne souhaites pas voir sur ton site ?">
              <TextArea
                name="sujets_eviter"
                rows={3}
                value={str("sujets_eviter")}
                onChange={(v) => set("sujets_eviter", v)}
              />
            </QuestionBlock>

            {/* ── 3. Prestations ── */}
            <SectionTitle title="3. Tes prestations" />
            <QuestionBlock label="Quelles prestations proposes-tu aujourd'hui ?">
              <TextArea
                name="prestations_actuelles"
                rows={7}
                value={str("prestations_actuelles")}
                onChange={(v) => set("prestations_actuelles", v)}
                placeholder="Liste tes soins, leur nom, durée approximative, tarifs indicatifs si tu le souhaites…"
              />
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu détailler chaque soin individuellement sur le site ?">
              <TextArea
                name="detail_soins"
                rows={3}
                value={str("detail_soins")}
                onChange={(v) => set("detail_soins", v)}
                placeholder="Oui pour tous · seulement certains (lesquels ?) · non, une page globale suffit"
              />
            </QuestionBlock>
            <QuestionBlock label="Certaines prestations sont-elles plus importantes à mettre en avant ?">
              <TextArea
                name="prestations_prioritaires"
                rows={3}
                value={str("prestations_prioritaires")}
                onChange={(v) => set("prestations_prioritaires", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Tu proposes (plusieurs choix possibles) :">
              <CheckboxGroup
                name="types_prestations"
                options={[
                  {
                    value: "seances_individuelles",
                    label: "Séances individuelles",
                  },
                  {
                    value: "accompagnements",
                    label: "Accompagnements sur plusieurs séances",
                  },
                  { value: "distance", label: "Soins à distance" },
                  { value: "animaux", label: "Soins pour animaux" },
                  { value: "ateliers", label: "Ateliers / cours" },
                  {
                    value: "evenements",
                    label: "Présence en foires / salons bien-être",
                  },
                ]}
                values={arr("types_prestations")}
                onChange={(v) => set("types_prestations", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu afficher les tarifs sur le site ?">
              <TextArea
                name="tarifs_afficher"
                rows={2}
                value={str("tarifs_afficher")}
                onChange={(v) => set("tarifs_afficher", v)}
                placeholder="Oui · non · seulement une fourchette · tarifs sur demande"
              />
            </QuestionBlock>
            <QuestionBlock label="Tes prestations évoluent-elles régulièrement ?">
              <TextArea
                name="prestations_evolution"
                rows={2}
                value={str("prestations_evolution")}
                onChange={(v) => set("prestations_evolution", v)}
              />
            </QuestionBlock>

            {/* ── 4. Clientèle ── */}
            <SectionTitle title="4. Ta clientèle" />
            <QuestionBlock label="Qui sont les personnes qui viennent te consulter aujourd'hui ?">
              <TextArea
                name="clientele"
                rows={4}
                value={str("clientele")}
                onChange={(v) => set("clientele", v)}
                placeholder="Âge, profil, situation, ce qui les amène en général…"
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu un public principal que tu cibles ou qui revient souvent ?">
              <TextArea
                name="public_principal"
                rows={3}
                value={str("public_principal")}
                onChange={(v) => set("public_principal", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Quels sont les besoins ou souffrances les plus fréquents de tes clients ?">
              <TextArea
                name="besoins_frequents"
                rows={4}
                value={str("besoins_frequents")}
                onChange={(v) => set("besoins_frequents", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Tes visiteurs connaissent-ils généralement le magnétisme avant de te contacter ?">
              <TextArea
                name="connaissance_magnetisme"
                rows={3}
                value={str("connaissance_magnetisme")}
                onChange={(v) => set("connaissance_magnetisme", v)}
                placeholder="Souvent oui · souvent non · mitigé, ça aide à calibrer les explications sur le site"
              />
            </QuestionBlock>
            <QuestionBlock label="Faut-il expliquer davantage certaines notions pour rassurer ou lever des doutes ?">
              <TextArea
                name="explications_necessaires"
                rows={4}
                value={str("explications_necessaires")}
                onChange={(v) => set("explications_necessaires", v)}
                placeholder="Ex : expliquer ce qu'est le magnétisme, les limites de la pratique, la complémentarité avec la médecine…"
              />
            </QuestionBlock>

            {/* ── 5. Objectifs du futur site ── */}
            <SectionTitle title="5. Objectifs du futur site" />
            <QuestionBlock label="Pourquoi souhaites-tu refaire ton site aujourd'hui ?">
              <TextArea
                name="pourquoi_refonte"
                rows={4}
                value={str("pourquoi_refonte")}
                onChange={(v) => set("pourquoi_refonte", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Qu'est-ce qui ne te convient plus dans le site actuel ?">
              <TextArea
                name="site_actuel_problemes"
                rows={4}
                value={str("site_actuel_problemes")}
                onChange={(v) => set("site_actuel_problemes", v)}
                placeholder="Design, contenu, navigation, référencement, gestion technique…"
              />
            </QuestionBlock>
            <QuestionBlock label="Quels sont tes objectifs principaux ? (plusieurs choix)">
              <CheckboxGroup
                name="objectifs_site"
                options={[
                  {
                    value: "visible",
                    label: "Être plus visible localement sur Google",
                  },
                  { value: "moderniser", label: "Moderniser mon image" },
                  {
                    value: "expliquer",
                    label: "Mieux expliquer le magnétisme et mes soins",
                  },
                  {
                    value: "contact",
                    label: "Faciliter la prise de contact / rendez-vous",
                  },
                  {
                    value: "rassurer",
                    label: "Rassurer les visiteurs sceptiques",
                  },
                  {
                    value: "developper",
                    label: "Développer certaines prestations spécifiques",
                  },
                  {
                    value: "credibilite",
                    label: "Asseoir ma crédibilité et mon sérieux",
                  },
                ]}
                values={arr("objectifs_site")}
                onChange={(v) => set("objectifs_site", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Autres objectifs ?">
              <TextArea
                name="objectifs_autre"
                rows={2}
                value={str("objectifs_autre")}
                onChange={(v) => set("objectifs_autre", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Que voudrais-tu que les visiteurs fassent après avoir visité le site ?">
              <CheckboxGroup
                name="actions_visiteurs"
                options={[
                  { value: "rdv", label: "Prendre rendez-vous" },
                  { value: "appeler", label: "Appeler" },
                  { value: "message", label: "Envoyer un message" },
                  {
                    value: "univers",
                    label: "Découvrir ton univers et ta façon de travailler",
                  },
                  { value: "reseaux", label: "Suivre tes réseaux sociaux" },
                ]}
                values={arr("actions_visiteurs")}
                onChange={(v) => set("actions_visiteurs", v)}
              />
              <div className="mt-3">
                <TextArea
                  name="actions_visiteurs_autre"
                  rows={2}
                  value={str("actions_visiteurs_autre")}
                  onChange={(v) => set("actions_visiteurs_autre", v)}
                  placeholder="Autre action souhaitée…"
                />
              </div>
            </QuestionBlock>

            {/* ── 6. Univers visuel ── */}
            <SectionTitle title="6. Ton univers visuel & ton image" />
            <QuestionBlock label="Que souhaites-tu conserver du site actuel ?">
              <TextArea
                name="conserver_actuel"
                rows={3}
                value={str("conserver_actuel")}
                onChange={(v) => set("conserver_actuel", v)}
                placeholder="Une couleur, un texte, une photo, la structure générale…"
              />
            </QuestionBlock>
            <QuestionBlock label="Que souhaites-tu changer complètement ?">
              <TextArea
                name="changer_completement"
                rows={3}
                value={str("changer_completement")}
                onChange={(v) => set("changer_completement", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Quels mots décrivent l'univers que tu aimerais transmettre ?">
              <CheckboxGroup
                name="mots_univers"
                options={[
                  { value: "apaisant", label: "Apaisant" },
                  { value: "lumineux", label: "Lumineux" },
                  { value: "naturel", label: "Naturel" },
                  { value: "sobre", label: "Sobre & épuré" },
                  { value: "chaleureux", label: "Chaleureux" },
                  { value: "professionnel", label: "Professionnel & sérieux" },
                  { value: "spirituel", label: "Spirituel / énergétique" },
                  { value: "moderne", label: "Moderne" },
                ]}
                values={arr("mots_univers")}
                onChange={(v) => set("mots_univers", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu des couleurs que tu apprécies particulièrement ?">
              <TextArea
                name="couleurs_appreciees"
                rows={2}
                value={str("couleurs_appreciees")}
                onChange={(v) => set("couleurs_appreciees", v)}
                placeholder="Ex : verts naturels, beiges, bleus profonds, dorés…"
              />
            </QuestionBlock>
            <QuestionBlock label="Y a-t-il des couleurs ou styles que tu ne veux surtout pas ?">
              <TextArea
                name="couleurs_eviter"
                rows={2}
                value={str("couleurs_eviter")}
                onChange={(v) => set("couleurs_eviter", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu des sites web ou univers visuels qui t'inspirent ?">
              <TextArea
                name="inspirations_sites"
                rows={4}
                value={str("inspirations_sites")}
                onChange={(v) => set("inspirations_sites", v)}
                placeholder="URLs, captures d'écran, ou décris ce que tu aimes, pas forcément des sites de magnétisme"
              />
            </QuestionBlock>

            {/* ── 7. Logo & identité ── */}
            <SectionTitle title="7. Logo & identité visuelle" />
            <QuestionBlock label="As-tu déjà un logo exploitable ?">
              <TextArea
                name="logo_exploitable"
                rows={2}
                value={str("logo_exploitable")}
                onChange={(v) => set("logo_exploitable", v)}
                placeholder="Oui, en .png ou .svg · oui mais basse qualité · non"
              />
            </QuestionBlock>
            <QuestionBlock label="Pour le logo, tu souhaites :">
              <RadioGroup
                name="logo_souhait"
                options={[
                  {
                    value: "conserver",
                    label: "Conserver le logo actuel tel quel",
                  },
                  { value: "moderniser", label: "Le moderniser légèrement" },
                  {
                    value: "nouveau",
                    label: "Repartir sur une nouvelle identité visuelle",
                  },
                ]}
                value={str("logo_souhait")}
                onChange={(v) => set("logo_souhait", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu une charte graphique complète (couleurs, typographies, règles visuelles) ?">
              <TextArea
                name="charte_graphique"
                rows={2}
                value={str("charte_graphique")}
                onChange={(v) => set("charte_graphique", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu besoin de déclinaisons pour :">
              <CheckboxGroup
                name="declinaisons_identite"
                options={[
                  {
                    value: "reseaux",
                    label: "Réseaux sociaux (bannières, visuels de posts)",
                  },
                  { value: "cartes", label: "Cartes de visite" },
                  { value: "print", label: "Flyers / supports imprimés" },
                ]}
                values={arr("declinaisons_identite")}
                onChange={(v) => set("declinaisons_identite", v)}
              />
            </QuestionBlock>

            {/* ── 8. Structure du site ── */}
            <SectionTitle
              title="8. Structure du futur site"
              subtitle="Pages possibles : Accueil · À propos · Le magnétisme · Soins & tarifs · Témoignages · FAQ · Contact"
            />
            <QuestionBlock label="Parmi ces pages, lesquelles te semblent indispensables ?">
              <CheckboxGroup
                name="pages_envisagees"
                options={[
                  { value: "accueil", label: "Accueil" },
                  { value: "apropos", label: "À propos / mon parcours" },
                  {
                    value: "magnetisme",
                    label: "Qu'est-ce que le magnétisme ?",
                  },
                  { value: "soins", label: "Soins & tarifs" },
                  { value: "temoignages", label: "Témoignages clients" },
                  { value: "faq", label: "Questions fréquentes" },
                  { value: "contact", label: "Contact / prise de rendez-vous" },
                  {
                    value: "legal",
                    label: "Mentions légales & confidentialité",
                  },
                ]}
                values={arr("pages_envisagees")}
                onChange={(v) => set("pages_envisagees", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu une page dédiée pour chaque soin ?">
              <TextArea
                name="page_par_soin"
                rows={3}
                value={str("page_par_soin")}
                onChange={(v) => set("page_par_soin", v)}
                placeholder="Oui, chaque soin mérite sa propre page · non, une page globale suffit · seulement les principaux"
              />
            </QuestionBlock>
            <QuestionBlock label="Veux-tu intégrer un blog ou des articles (explications, conseils, actualités) ?">
              <TextArea
                name="blog_souhaite"
                rows={2}
                value={str("blog_souhaite")}
                onChange={(v) => set("blog_souhaite", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Veux-tu mettre en avant des témoignages de clients ?">
              <TextArea
                name="temoignages_integration"
                rows={3}
                value={str("temoignages_integration")}
                onChange={(v) => set("temoignages_integration", v)}
                placeholder="Oui · non · j'en ai combien environ ? Sous quelle forme (texte, Google, vidéo…) ?"
              />
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu une section FAQ ?">
              <TextArea
                name="faq_souhaite"
                rows={2}
                value={str("faq_souhaite")}
                onChange={(v) => set("faq_souhaite", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Remarques sur la structure ou l'organisation du site :">
              <TextArea
                name="structure_pages_commentaire"
                rows={3}
                value={str("structure_pages_commentaire")}
                onChange={(v) => set("structure_pages_commentaire", v)}
              />
            </QuestionBlock>

            {/* ── 9. Contact & réservation ── */}
            <SectionTitle title="9. Prise de contact & réservation" />
            <QuestionBlock label="Comment souhaites-tu être contactée principalement ?">
              <CheckboxGroup
                name="contact_canaux"
                options={[
                  { value: "telephone", label: "Téléphone" },
                  { value: "email", label: "Email" },
                  {
                    value: "formulaire",
                    label: "Formulaire de contact sur le site",
                  },
                  {
                    value: "plateforme",
                    label: "Plateforme de réservation en ligne",
                  },
                  { value: "sms", label: "SMS / WhatsApp" },
                ]}
                values={arr("contact_canaux")}
                onChange={(v) => set("contact_canaux", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu besoin d'un formulaire de demande de renseignements ? D'un formulaire de prise de RDV ?">
              <TextArea
                name="formulaires_besoins"
                rows={3}
                value={str("formulaires_besoins")}
                onChange={(v) => set("formulaires_besoins", v)}
                placeholder="Formulaire simple · demande de RDV avec créneaux · les deux · autre"
              />
            </QuestionBlock>
            <QuestionBlock label="Utilises-tu déjà un système de réservation en ligne ?">
              <TextArea
                name="agenda_reservation"
                rows={3}
                value={str("agenda_reservation")}
                onChange={(v) => set("agenda_reservation", v)}
                placeholder="Doctolib, Calendly, Acuity, Planity, autre, aucun : souhaites-tu en intégrer un ?"
              />
            </QuestionBlock>

            {/* ── 10. Contenus & médias ── */}
            <SectionTitle title="10. Contenus & médias" />
            <QuestionBlock label="Tu as déjà (plusieurs choix) :">
              <CheckboxGroup
                name="contenus_disponibles"
                options={[
                  {
                    value: "photos_pro",
                    label: "Photos professionnelles de toi",
                  },
                  {
                    value: "photos_perso",
                    label: "Photos personnelles utilisables",
                  },
                  {
                    value: "textes",
                    label: "Textes existants sur le site actuel réutilisables",
                  },
                  { value: "temoignages", label: "Témoignages clients écrits" },
                  { value: "avis_google", label: "Avis Google" },
                  { value: "videos", label: "Vidéos" },
                ]}
                values={arr("contenus_disponibles")}
                onChange={(v) => set("contenus_disponibles", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Pour la rédaction des textes du site :">
              <RadioGroup
                name="contenus_redaction"
                options={[
                  {
                    value: "peakcl",
                    label: "Je préfère que tu rédiges les textes",
                  },
                  { value: "cliente", label: "Je rédige moi-même" },
                  {
                    value: "ensemble",
                    label:
                      "On travaille ensemble (j'apporte la matière, tu structures)",
                  },
                ]}
                value={str("contenus_redaction")}
                onChange={(v) => set("contenus_redaction", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Pour les photos : en as-tu que tu souhaites utiliser ou faut-il prévoir une séance photo ?">
              <TextArea
                name="photos_utilisation"
                rows={3}
                value={str("photos_utilisation")}
                onChange={(v) => set("photos_utilisation", v)}
              />
            </QuestionBlock>

            {/* ── 11. Visibilité & référencement ── */}
            <SectionTitle title="11. Visibilité & référencement local" />
            <QuestionBlock label="La visibilité sur Google est-elle importante pour toi ?">
              <TextArea
                name="visibilite_google"
                rows={3}
                value={str("visibilite_google")}
                onChange={(v) => set("visibilite_google", v)}
                placeholder="Apparaître quand quelqu'un cherche 'magnétiseur [ta ville]' par exemple"
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu déjà une fiche Google Business (anciennement Google My Business) ?">
              <TextArea
                name="fiche_google"
                rows={2}
                value={str("fiche_google")}
                onChange={(v) => set("fiche_google", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Pour ta fiche Google, tu souhaites :">
              <CheckboxGroup
                name="google_actions"
                options={[
                  { value: "creer", label: "La créer" },
                  { value: "optimiser", label: "Optimiser la fiche existante" },
                ]}
                values={arr("google_actions")}
                onChange={(v) => set("google_actions", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Sur quels mots-clés ou activités aimerais-tu être trouvée sur Google ?">
              <TextArea
                name="mots_cles_google"
                rows={3}
                value={str("mots_cles_google")}
                onChange={(v) => set("mots_cles_google", v)}
                placeholder="Ex : magnétiseur Grenoble · magnétiseur animaux Isère · soin énergétique à distance…"
              />
            </QuestionBlock>

            {/* ── 12. Réseaux sociaux ── */}
            <SectionTitle title="12. Réseaux sociaux" />
            <QuestionBlock label="Tu es présente sur :">
              <CheckboxGroup
                name="reseaux_presence"
                options={[
                  { value: "facebook", label: "Facebook" },
                  { value: "instagram", label: "Instagram" },
                  { value: "autre", label: "Autre" },
                ]}
                values={arr("reseaux_presence")}
                onChange={(v) => set("reseaux_presence", v)}
              />
              <div className="mt-3">
                <TextInput
                  name="reseaux_autre"
                  value={str("reseaux_autre")}
                  onChange={(v) => set("reseaux_autre", v)}
                  placeholder="Si autre : LinkedIn, YouTube, TikTok…"
                />
              </div>
            </QuestionBlock>
            <QuestionBlock label="Souhaites-tu relier le site à tes réseaux sociaux ?">
              <TextArea
                name="lier_reseaux"
                rows={2}
                value={str("lier_reseaux")}
                onChange={(v) => set("lier_reseaux", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Veux-tu une cohérence visuelle globale entre le site, le logo et tes réseaux ?">
              <TextArea
                name="coherence_graphique"
                rows={3}
                value={str("coherence_graphique")}
                onChange={(v) => set("coherence_graphique", v)}
              />
            </QuestionBlock>

            {/* ── 13. Technique & gestion ── */}
            <SectionTitle title="13. Technique & gestion du site" />
            <QuestionBlock label="Tu souhaites :">
              <CheckboxGroup
                name="gestion_souhaits"
                options={[
                  {
                    value: "simple",
                    label: "Un site simple, fiable et évolutif",
                  },
                  {
                    value: "autonomie",
                    label:
                      "Pouvoir modifier certains contenus toi-même (textes, tarifs…)",
                  },
                  {
                    value: "ponctuel",
                    label: "Un accompagnement technique ponctuel si besoin",
                  },
                  {
                    value: "maintenance",
                    label: "Une maintenance assurée par PeakCL",
                  },
                ]}
                values={arr("gestion_souhaits")}
                onChange={(v) => set("gestion_souhaits", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="As-tu déjà un hébergement, un nom de domaine, ou des accès chez un prestataire ?">
              <TextArea
                name="hebergement_acces"
                rows={4}
                value={str("hebergement_acces")}
                onChange={(v) => set("hebergement_acces", v)}
                placeholder="Fournisseur, identifiants disponibles, ou aucune idée, tout est utile"
              />
            </QuestionBlock>

            {/* ── 14. Organisation ── */}
            <SectionTitle title="14. Organisation du projet" />
            <QuestionBlock label="As-tu une date idéale pour la mise en ligne ?">
              <TextInput
                name="date_mise_en_ligne"
                value={str("date_mise_en_ligne")}
                onChange={(v) => set("date_mise_en_ligne", v)}
                placeholder="Ex : automne 2026 · pas de date fixe · le plus tôt possible"
              />
            </QuestionBlock>
            <QuestionBlock label="Y a-t-il une période importante pour ton activité (rentrée, salons, fêtes) ?">
              <TextArea
                name="periode_importante"
                rows={2}
                value={str("periode_importante")}
                onChange={(v) => set("periode_importante", v)}
              />
            </QuestionBlock>
            <QuestionBlock label="Tu préfères avancer :">
              <RadioGroup
                name="organisation_projet"
                options={[
                  {
                    value: "etapes",
                    label: "Étape par étape avec des validations régulières",
                  },
                  {
                    value: "global",
                    label: "Me présenter le projet global une fois finalisé",
                  },
                ]}
                value={str("organisation_projet")}
                onChange={(v) => set("organisation_projet", v)}
              />
            </QuestionBlock>

            {/* ── 15. Notes libres ── */}
            <SectionTitle title="15. Notes & idées libres" />
            <QuestionBlock label="Y a-t-il des éléments importants que nous n'avons pas abordés ?">
              <TextArea
                name="notes_libres"
                rows={8}
                value={str("notes_libres")}
                onChange={(v) => set("notes_libres", v)}
                placeholder="Idées, envies, contraintes, questions, choses que tu veux absolument / absolument pas…"
              />
            </QuestionBlock>

            <div className="relative mt-12 rounded-2xl border border-white/10 bg-card/40 p-6 text-center shadow-card">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <p className="text-sm text-muted-foreground">
                Tu peux envoyer même si tout n'est pas rempli. Tes réponses sont
                sauvegardées sur cet appareil jusqu'à l'envoi.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60"
              >
                {isSubmitting ? "Envoi en cours…" : "Envoyer mon questionnaire"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
