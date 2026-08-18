import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { CONTACT } from "@/lib/links";

/**
 * Politique de confidentialité (RGPD).
 *
 * Cette URL existait sur l'ancien site et était redirigée en 301 vers
 * l'accueil : Google traite une page légale redirigée vers la home comme un
 * soft 404, et l'obligation d'information de l'article 13 du RGPD n'était plus
 * remplie. La redirection a été retirée de netlify.toml au profit de cette page.
 *
 * Le contenu décrit les traitements réellement en place dans le code :
 * formulaires Netlify Forms, embed Calendly, assistant PeakaBot (API Anthropic),
 * hébergement Netlify. Aucun outil de mesure d'audience n'est chargé
 * aujourd'hui — le tracker de __root.tsx est un no-op tant que window.plausible
 * ou window.gtag n'existe pas. Si un tel outil est ajouté, la section
 * « Mesure d'audience » doit être mise à jour EN MÊME TEMPS.
 */

const UPDATED_AT = "9 août 2026";

type Section = { id: string; title: string; body: ReactNode };

const SECTIONS: Section[] = [
  {
    id: "responsable",
    title: "1. Qui est responsable du traitement ?",
    body: (
      <>
        <p>
          Le site <strong>peakcl.com</strong> est édité par Charlotte Lacroix, exerçant sous le nom
          commercial <strong>PeakCL</strong>, entrepreneure individuelle établie à Gilly-sur-Isère
          (73200), Savoie, France.
        </p>
        <p>
          C'est elle qui décide des finalités et des moyens des traitements décrits ci-dessous :
          elle est donc le responsable de traitement au sens de l'article 4 du RGPD.
        </p>
        <ul>
          <li>
            E-mail :{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[var(--brand-turquoise)] hover:underline"
            >
              {CONTACT.email}
            </a>
          </li>
          <li>
            Téléphone :{" "}
            <a href={CONTACT.phoneTel} className="text-[var(--brand-turquoise)] hover:underline">
              {CONTACT.phoneDisplay}
            </a>
          </li>
        </ul>
        <p>
          Compte tenu de la taille de la structure, aucun délégué à la protection des données (DPO)
          n'a été désigné : ce n'est pas obligatoire ici, et c'est Charlotte Lacroix qui répond
          directement à vos demandes.
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "2. Quelles données sont collectées, et pourquoi ?",
    body: (
      <>
        <p>
          Aucune donnée n'est collectée à votre insu&nbsp;: tout part d'une action de votre part
          (remplir un formulaire, réserver un appel, écrire à l'assistant).
        </p>
        <h3>Formulaires de contact et de diagnostic</h3>
        <p>
          Les formulaires du site (page contact, diagnostic, brief, questionnaires de cadrage) sont
          traités par <strong>Netlify Forms</strong>. Les données transmises sont celles que vous
          saisissez&nbsp;: nom, adresse e-mail, éventuellement téléphone, nom de l'entreprise, et le
          contenu de votre message ou de vos réponses.
        </p>
        <ul>
          <li>
            <strong>Finalité</strong> : répondre à votre demande, préparer un devis, assurer le
            suivi de la relation commerciale.
          </li>
          <li>
            <strong>Base légale</strong> : votre consentement, et l'exécution de mesures
            précontractuelles prises à votre demande (article 6.1.a et 6.1.b du RGPD).
          </li>
          <li>
            <strong>Durée de conservation</strong> : 3 ans à compter du dernier contact si la
            demande n'aboutit pas. En cas de mission, les données sont conservées pendant la durée
            de la relation contractuelle, puis archivées le temps des obligations comptables et
            fiscales (10 ans pour les pièces comptables).
          </li>
        </ul>
        <h3>Réservation d'appel</h3>
        <p>
          Les pages de réservation intègrent un module <strong>Calendly</strong>. Quand vous
          réservez un créneau, Calendly collecte votre nom, votre e-mail et les informations du
          rendez-vous, selon sa propre politique de confidentialité. Le simple chargement du module
          fait appel aux serveurs de Calendly, qui reçoivent alors votre adresse IP.
        </p>
        <ul>
          <li>
            <strong>Finalité</strong> : planifier et confirmer un rendez-vous téléphonique ou visio.
          </li>
          <li>
            <strong>Base légale</strong> : mesures précontractuelles prises à votre demande.
          </li>
        </ul>
        <h3>Assistant PeakaBot</h3>
        <p>
          Le site propose un assistant conversationnel. Le contenu de vos messages est transmis à
          l'API d'<strong>Anthropic</strong> (modèle Claude) pour générer une réponse. N'y saisissez
          pas d'informations sensibles ou confidentielles.
        </p>
        <ul>
          <li>
            <strong>Finalité</strong> : vous orienter vers la bonne page ou la bonne offre.
          </li>
          <li>
            <strong>Base légale</strong> : votre consentement, matérialisé par l'envoi du message.
          </li>
          <li>
            <strong>Durée de conservation</strong> : les conversations ne sont pas conservées à des
            fins de profilage. Un mécanisme anti-abus mémorise en revanche un compteur de requêtes
            rattaché à votre adresse IP, sur une fenêtre glissante de 5 minutes, ainsi qu'un
            compteur global quotidien.
          </li>
        </ul>
        <h3>Journaux techniques du serveur</h3>
        <p>
          L'hébergeur enregistre automatiquement des journaux de connexion (adresse IP, date et
          heure, page demandée, type de navigateur) nécessaires au fonctionnement et à la sécurité
          du site.
        </p>
        <ul>
          <li>
            <strong>Base légale</strong> : intérêt légitime à assurer la sécurité et la
            disponibilité du service (article 6.1.f du RGPD).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "audience",
    title: "3. Cookies et mesure d'audience",
    body: (
      <>
        <p>
          <strong>Aucun cookie de mesure d'audience n'est déposé avant votre accord.</strong> À
          votre première visite, une bannière vous propose deux choix de poids égal&nbsp;: tout
          accepter ou tout refuser. Tant que vous n'avez pas choisi, et si vous refusez, aucun
          script de mesure n'est chargé. Le site fonctionne à l'identique dans les deux cas.
        </p>
        <p>Les outils concernés, et eux seuls, sont&nbsp;:</p>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> — nombre de visites, pages consultées, provenance du
            trafic. L'anonymisation de l'adresse IP est activée et aucune fonctionnalité
            publicitaire n'est utilisée&nbsp;: le mode consentement de Google est initialisé avec le
            stockage publicitaire refusé, et il le reste même si vous acceptez la mesure d'audience.
          </li>
          <li>
            <strong>HubSpot</strong> — rattachement des pages consultées à votre fiche si vous
            remplissez ensuite un formulaire, afin de savoir ce qui vous a amené à nous contacter.
          </li>
        </ul>
        <p>
          <strong>Base légale</strong>&nbsp;: votre consentement (article 82 de la loi Informatique
          et Libertés). Votre choix est conservé sur votre appareil pendant 6 mois, après quoi la
          question vous est reposée. Vous pouvez le modifier à tout moment via le lien{" "}
          <strong>«&nbsp;Gérer mes cookies&nbsp;»</strong> en bas de chaque page, sans avoir à nous
          écrire.
        </p>
        <p>
          Le stockage local du navigateur (localStorage, sessionStorage) est utilisé indépendamment
          de ce choix, pour trois usages de confort qui ne quittent jamais votre appareil&nbsp;:
          mémoriser votre préférence de thème (clair ou sombre), conserver le brouillon des
          formulaires longs (diagnostic, questionnaires) pour que vous ne perdiez pas vos réponses
          si vous fermez l'onglet, et retenir votre réponse à la bannière ci-dessus. Ces
          informations ne sont transmises que si vous validez le formulaire concerné.
        </p>
        <p>
          Les modules de réservation de rendez-vous peuvent, eux, déposer leurs propres cookies
          lorsque vous interagissez avec eux. Ils relèvent de leurs politiques respectives.
        </p>
      </>
    ),
  },
  {
    id: "destinataires",
    title: "4. Qui a accès à vos données ?",
    body: (
      <>
        <p>
          Vos données ne sont ni vendues, ni louées, ni échangées. Elles sont accessibles à
          Charlotte Lacroix et aux sous-traitants techniques strictement nécessaires au
          fonctionnement du site&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Netlify</strong> — hébergement du site et traitement des formulaires.
          </li>
          <li>
            <strong>Calendly</strong> — prise de rendez-vous.
          </li>
          <li>
            <strong>HubSpot</strong> — outil de gestion de la relation client&nbsp;: réception des
            demandes envoyées via les formulaires, prise de rendez-vous et suivi des échanges.
          </li>
          <li>
            <strong>Google Analytics</strong> — mesure d'audience, uniquement si vous y avez
            consenti.
          </li>
          <li>
            <strong>Anthropic</strong> — génération des réponses de l'assistant conversationnel.
          </li>
          <li>
            <strong>Google</strong> (Gmail) — réception et suivi des e-mails de contact.
          </li>
        </ul>
        <p>
          Certains de ces prestataires sont établis aux États-Unis. Les transferts hors Union
          européenne s'appuient sur les garanties prévues au chapitre V du RGPD (clauses
          contractuelles types de la Commission européenne et/ou certification au cadre de
          protection des données UE–États-Unis, selon le prestataire).
        </p>
      </>
    ),
  },
  {
    id: "droits",
    title: "5. Vos droits",
    body: (
      <>
        <p>
          Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité
          de vos données. Vous pouvez également définir des directives sur leur sort après votre
          décès.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-[var(--brand-turquoise)] hover:underline"
          >
            {CONTACT.email}
          </a>
          . Une réponse vous sera apportée dans un délai d'un mois. Une pièce justificative
          d'identité peut être demandée en cas de doute raisonnable sur l'identité du demandeur.
        </p>
        <p>
          Si la réponse ne vous satisfait pas, vous pouvez introduire une réclamation auprès de la
          CNIL&nbsp;:{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--brand-turquoise)] hover:underline"
          >
            cnil.fr/fr/plaintes
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "securite",
    title: "6. Sécurité",
    body: (
      <>
        <p>
          Le site est servi exclusivement en HTTPS (chiffrement TLS), avec une politique HSTS, des
          en-têtes de sécurité restrictifs et une protection anti-spam sur les formulaires. L'accès
          aux données transmises est limité à Charlotte Lacroix.
        </p>
        <p>
          Aucun système n'est infaillible&nbsp;: en cas de violation de données susceptible
          d'engendrer un risque pour vos droits et libertés, vous en seriez informé conformément à
          l'article 34 du RGPD.
        </p>
      </>
    ),
  },
  {
    id: "hebergeur",
    title: "7. Hébergeur",
    body: (
      <p>
        Le site est hébergé par <strong>Netlify, Inc.</strong>, 512 2nd Street, Suite 200, San
        Francisco, CA 94107, États-Unis —{" "}
        <a
          href="https://www.netlify.com"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--brand-turquoise)] hover:underline"
        >
          netlify.com
        </a>
        .
      </p>
    ),
  },
  {
    id: "modifications",
    title: "8. Modifications de cette politique",
    body: (
      <p>
        Cette politique peut évoluer, notamment si un nouvel outil est intégré au site. La date de
        dernière mise à jour indiquée en haut de page fait foi. En cas de changement substantiel,
        les personnes concernées en sont informées par e-mail lorsque c'est possible.
      </p>
    ),
  },
];

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité · PeakCL" },
      {
        name: "description",
        content:
          "Politique de confidentialité de peakcl.com : données collectées via les formulaires, cookies, destinataires, durées de conservation et exercice de vos droits RGPD.",
      },
      {
        property: "og:title",
        content: "Politique de confidentialité · PeakCL",
      },
      {
        property: "og:description",
        content:
          "Comment PeakCL collecte, utilise et protège vos données personnelles, et comment exercer vos droits RGPD.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/politique-confidentialite") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          {
            name: "Politique de confidentialité",
            path: "/politique-confidentialite",
          },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/politique-confidentialite") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-border">
      <section className="relative overflow-hidden bg-hero py-16">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
            Politique de <span className="text-gradient">confidentialité</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Ce que PeakCL fait — et ne fait pas — de vos données personnelles quand vous utilisez
            peakcl.com. Pas de formule creuse&nbsp;: chaque traitement listé ici correspond à un
            outil réellement présent sur le site.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Dernière mise à jour : {UPDATED_AT}</p>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Sommaire" className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="text-sm font-semibold text-foreground">Sommaire</h2>
            <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-foreground">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold">{s.title}</h2>
                {/* Styles de prose portés par des variants ciblés : le site
                    n'embarque pas @tailwindcss/typography. */}
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:leading-relaxed [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card/50 p-6">
            <h2 className="text-base font-semibold text-foreground">
              Une question sur vos données ?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Écrivez-moi directement, je réponds moi-même.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
