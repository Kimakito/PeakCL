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
import { ExpressionPhoto } from "@/components/ExpressionPhoto";
import { absUrl } from "@/seo/site";
import { organizationJsonLd, professionalServiceJsonLd } from "@/seo/jsonld";
import { localeFromPath, HTML_LANG } from "@/i18n/config";

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
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page introuvable
        </h2>
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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PeakCL · Sites web qui transforment vos visiteurs en clients" },
      {
        name: "description",
        content:
          "PeakCL conçoit des sites web premium, logos et identités visuelles pensés pour la conversion. Pour entrepreneurs, coachs et consultants.",
      },
      { name: "author", content: "PeakCL · Charlotte Lacroix" },
      { property: "og:title", content: "PeakCL · Sites web qui convertissent" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites, logos, identité visuelle et contenus pour entrepreneurs ambitieux.",
      },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      { property: "og:image", content: absUrl("/peakcl/og-cover.jpg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "PeakCL · Déléguez votre communication en ligne",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl("/peakcl/og-cover.jpg") },
      { "script:ld+json": organizationJsonLd() },
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
  // <html lang> suit la langue de l'URL, côté SSR comme au montage.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = HTML_LANG[localeFromPath(pathname)];
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap"
          media="print"
          // Chargement non bloquant des polices Google
          onLoad={(e) => {
            (e.currentTarget as HTMLLinkElement).media = "all";
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap"
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
  // doublon. Idem pour leurs équivalents anglais.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hasDeckFooter =
    pathname === "/" ||
    pathname === "/portfolio" ||
    pathname === "/en" ||
    pathname === "/en/portfolio";
  return (
    <>
      <SiteChrome />
      <TopNav />
      <Outlet />
      {!hasDeckFooter ? <SiteFooter /> : null}
      <PeakaBot />
    </>
  );
}
