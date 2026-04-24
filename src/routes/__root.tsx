import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { absUrl } from "@/seo/site";
import { organizationJsonLd, professionalServiceJsonLd } from "@/seo/jsonld";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
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
      { title: "PeakCL — Sites web qui transforment vos visiteurs en clients" },
      {
        name: "description",
        content:
          "PeakCL conçoit des sites web premium, logos et identités visuelles pensés pour la conversion. Pour entrepreneurs, coachs et consultants.",
      },
      { name: "author", content: "PeakCL — Charlotte Lacroix" },
      { property: "og:title", content: "PeakCL — Sites web qui convertissent" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites, logos, identité visuelle et contenus pour entrepreneurs ambitieux.",
      },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { "script:ld+json": organizationJsonLd() },
      { "script:ld+json": professionalServiceJsonLd() },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/peakcl/PeakCL.svg" },
      { rel: "alternate icon", href: "/peakcl/PeakCL.svg" },
      { rel: "canonical", href: absUrl("/") },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
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
  return <Outlet />;
}
