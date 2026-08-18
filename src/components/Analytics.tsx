import { useEffect, useState } from "react";
import { CONSENT_EVENT, hasAnalyticsConsent, type ConsentState } from "@/lib/consent";
import { GA4_MEASUREMENT_ID, HAS_GA4, HUBSPOT_TRACKING_SRC } from "@/lib/tracking";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (name: string, opts?: Record<string, unknown>) => void;
    _hsq?: unknown[];
  }
}

/**
 * Charge GA4 et le code de suivi HubSpot, uniquement apres consentement.
 *
 * Deux garde-fous plutot qu'un :
 * 1. les balises `<script>` ne sont injectees qu'une fois le consentement
 *    accorde, donc aucun cookie tiers n'existe avant le clic ;
 * 2. GA4 est initialise en Consent Mode v2 avec tout refuse par defaut, ce qui
 *    couvre le cas ou un script GA arriverait par un autre chemin (extension,
 *    Tag Manager ajoute plus tard).
 *
 * Le dispatcher d'evenements `data-event` pose dans `__root.tsx` cherche
 * `window.gtag`. Il se branche donc tout seul des que GA4 est charge, sans
 * modification : les CTA `cta_calendly_hero`, `cta_calendly_service_final`,
 * `portfolio_open` et consorts commencent a remonter a ce moment-la.
 */
function loadGa4() {
  if (!HAS_GA4) return;
  if (document.getElementById("ga4-src")) return;

  window.dataLayer = window.dataLayer || [];
  const gtag: (...args: unknown[]) => void = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  // Consent Mode v2 : on part de tout refuse, puis on accorde explicitement.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
  gtag("consent", "update", { analytics_storage: "granted" });

  const script = document.createElement("script");
  script.id = "ga4-src";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  // `anonymize_ip` est implicite en GA4, on le laisse explicite pour la trace.
  gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true });
}

function loadHubSpot() {
  if (document.getElementById("hs-script-loader")) return;
  window._hsq = window._hsq || [];
  const script = document.createElement("script");
  script.id = "hs-script-loader";
  script.async = true;
  script.defer = true;
  script.src = HUBSPOT_TRACKING_SRC;
  document.head.appendChild(script);
}

export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(hasAnalyticsConsent());
    sync();

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState | null>).detail;
      setGranted(detail?.analytics === "granted");
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    // Un choix fait dans un autre onglet doit s'appliquer ici aussi.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!granted) return;
    loadGa4();
    loadHubSpot();
  }, [granted]);

  return null;
}
