import { useEffect, useRef } from "react";
import { bookingProvider } from "@/lib/links";

/**
 * Widget de prise de rendez-vous, agnostique du fournisseur.
 *
 * Le composant lit l'URL et choisit tout seul entre l'embed Calendly et celui
 * de HubSpot Meetings. C'est ce qui permet de basculer d'un outil a l'autre en
 * changeant la seule constante `BOOKING_URL` dans `src/lib/links.ts`, sans
 * toucher aux pages.
 *
 * Les deux embeds echouent silencieusement si leur script est bloque (bloqueur
 * de publicite, CSP trop stricte, reseau d'entreprise). Les pages appelantes
 * doivent donc TOUJOURS afficher a cote un lien direct vers l'URL de
 * reservation : c'est le seul filet quand l'iframe ne s'affiche pas.
 */

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const HUBSPOT_JS = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

function loadScript(src: string): Promise<void> {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("booking_script_failed"));
    document.head.appendChild(script);
  });
}

function ensureCalendlyAssets() {
  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS;
    document.head.appendChild(link);
  }
  return loadScript(CALENDLY_JS);
}

type BookingEmbedProps = {
  url: string;
  minHeight?: number;
};

export function BookingEmbed({ url, minHeight = 700 }: BookingEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const provider = bookingProvider(url);

    if (provider === "hubspot") {
      // HubSpot ne prend pas d'URL en argument : il scanne le DOM a la
      // recherche de `.meetings-iframe-container[data-src]`. On prepare donc le
      // conteneur AVANT de charger le script, sinon il ne trouve rien et
      // n'affiche jamais rien.
      const host = hostRef.current;
      if (host) {
        host.innerHTML = "";
        const container = document.createElement("div");
        container.className = "meetings-iframe-container";
        const separator = url.includes("?") ? "&" : "?";
        container.dataset.src = `${url}${separator}embed=true`;
        host.appendChild(container);
      }
      loadScript(HUBSPOT_JS).catch(() => {
        // Le lien de secours affiche par la page prend le relais.
      });
      return () => {
        cancelled = true;
      };
    }

    ensureCalendlyAssets()
      .then(() => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = "";
        const Calendly = (
          window as Window & { Calendly?: { initInlineWidget: (o: object) => void } }
        ).Calendly;
        Calendly?.initInlineWidget({
          url,
          parentElement: hostRef.current,
        });
      })
      .catch(() => {
        // Idem : lien de secours cote page.
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      ref={hostRef}
      className="w-full overflow-hidden rounded-2xl border border-border bg-card/20"
      style={{ height: minHeight, minHeight }}
    />
  );
}

/** @deprecated Renomme en `BookingEmbed`. Alias conserve le temps de la bascule. */
export const CalendlyEmbed = BookingEmbed;
