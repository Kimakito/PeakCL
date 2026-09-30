import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { TopNav } from "@/components/TopNav";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { PeakaBot } from "@/components/PeakaBot";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";
import { absUrl } from "@/seo/site";
import { ogImageMeta } from "@/seo/og";
import { professionalServiceJsonLd } from "@/seo/jsonld";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <ExpressionPhoto
            slug="batman"
            caption="Même Batman a cherché"
            tilt={-3}
            imgClassName="aspect-[3/4] w-36"
            loading="eager"
          />
        </div>
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page a filé dans la nuit. Rentrons à l'accueil, c'est plus sûr.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  // La dernière correspondance est la page affichée : c'est elle qui fixe la
  // carte de partage (og:image). Rendu serveur à chaque requête, donc ce que
  // lisent LinkedIn, Facebook ou WhatsApp est toujours la bonne carte.
  head: ({ matches }) => ({
    meta: [
      // Couleur de l'interface du navigateur sur mobile, alignee sur le
      // violet profond de la charte et sur le manifeste.
      { name: "theme-color", content: "#360099" },
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Valeurs par défaut, remplacées par chaque page : elles ne servent qu'aux
      // pages qui n'en déclarent pas.
      { title: "PeakCL · Site internet, logo et réseaux sociaux en Savoie" },
      {
        name: "description",
        content:
          "Site internet, identité visuelle et réseaux sociaux pour les TPE et PME de Savoie, par une seule personne. Tarifs affichés, mini-audit gratuit.",
      },
      { name: "author", content: "PeakCL · Charlotte Lacroix" },
      { property: "og:title", content: "PeakCL · Site internet, logo et réseaux sociaux" },
      {
        property: "og:description",
        content:
          "Votre site, votre image et vos réseaux par une seule personne, pour les TPE et PME de Savoie.",
      },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      ...ogImageMeta(matches[matches.length - 1]?.pathname ?? "/"),
      { name: "twitter:card", content: "summary_large_image" },
      // Un seul nœud d'entreprise. Le site émettait en plus un `Organization`
      // sans @id décrivant la même société : deux entités concurrentes pour
      // une seule réalité, ce qui brouille le lien PeakCL -> Charlotte Lacroix
      // au lieu de le renforcer. ProfessionalService porte déjà tout (nom,
      // logo, contact, adresse, sameAs, avis, fondatrice).
      { "script:ld+json": professionalServiceJsonLd() },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/peakcl/assets/favicon/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/peakcl/assets/favicon/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/peakcl/assets/favicon/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/peakcl/assets/favicon/site.webmanifest" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // Site en français uniquement (version anglaise supprimée le 27/08/2026).
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Thème clair par défaut : le fond crème est l'identité de la charte.
            Suivre le réglage système montrait un site violet générique à tous
            les visiteurs en mode sombre. Le sombre reste un choix explicite
            (bouton du menu), mémorisé dans localStorage. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='peakcl-theme';var t=localStorage.getItem(k);if(t!=='dark'){t='light';}var e=document.documentElement;e.classList.toggle('dark',t==='dark');e.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <HeadContent />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          media="print"
          // Chargement non bloquant des polices Google
          onLoad={(e) => {
            (e.currentTarget as HTMLLinkElement).media = "all";
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          />
        </noscript>
      </head>
      <body>
        {/* Fond global animé : blobs violet · turquoise · jaune qui dérivent */}
        <div className="site-bg" aria-hidden="true">
          <div className="site-bg__blob site-bg__blob--v" />
          <div className="site-bg__blob site-bg__blob--t" />
          <div className="site-bg__blob site-bg__blob--y" />
        </div>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function send(n,p){try{if(window.plausible){window.plausible(n,{props:p||{}});return;}if(window.gtag){window.gtag('event',n,p||{});return;}console.log('[event]',n,p||{});}catch(e){}}document.addEventListener('submit',function(e){var f=e.target;if(!f||!f.getAttribute)return;var n=f.getAttribute('data-event');if(n)send(n,{form:f.getAttribute('name')||undefined});});document.addEventListener('click',function(e){var el=e.target&&e.target.closest?e.target.closest('[data-event],.js-track-portfolio,.js-track-email'):null;if(!el)return;var n=el.getAttribute('data-event')|| (el.classList.contains('js-track-portfolio')?'portfolio_open':'') || (el.classList.contains('js-track-email')?'email_click':'');if(n)send(n,{href:el.getAttribute('href')||undefined});});})();`,
          }}
        />
      </body>
    </html>
  );
}

function RootComponent() {
  // Le deck home (/) et /portfolio embarquent déjà DeckFooter : on évite le
  // doublon.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hasDeckFooter = pathname === "/" || pathname === "/portfolio";
  return (
    <>
      <SiteChrome />
      <TopNav />
      <Outlet />
      {!hasDeckFooter ? <SiteFooter /> : null}
      <PeakaBot />
      {/* Banniere de consentement + chargement conditionnel de GA4/HubSpot.
          Monte au niveau racine pour couvrir toutes les routes, y compris les
          landings. */}
      <CookieConsent />
      <Analytics />
    </>
  );
}
