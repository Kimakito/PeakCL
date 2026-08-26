import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
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

  /**
   * ATTENTION : cette fonction doit pousser l'objet `arguments`, PAS un tableau.
   *
   * Elle poussait `[...args]` — un vrai `Array`, via un parametre rest. Le
   * code paraissait equivalent et ne produisait aucune erreur : gtag.js se
   * chargeait, `google_tag_manager` existait, le dataLayer contenait bien
   * `consent`, `js` et `config`. Mais gtag.js ne reconnait une commande qu'a
   * un objet `arguments`. Un `Array` est pousse comme une donnee inerte : le
   * `config` n'etait donc jamais execute.
   *
   * Symptome exact, mesure en production le 26/08/2026 : aucun cookie `_ga`
   * ni `_ga_<ID>`, aucune requete vers `/g/collect`, zero donnee dans GA4 —
   * alors que tout, cote consentement et chargement, avait l'air correct.
   * Rejouer la meme commande `config` via un `arguments` sur la page live a
   * fait apparaitre les deux cookies et partir le `page_view` dans la seconde.
   *
   * C'est la forme du snippet officiel de Google, et la raison pour laquelle
   * il s'ecrit avec `function` et non avec une fonction flechee.
   */
  function gtagRaw() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  // `gtagRaw` ne declare aucun parametre, par construction : c'est `arguments`
  // qui porte la commande. On expose donc une vue typee pour l'appeler, sans
  // toucher a l'implementation.
  const gtag = gtagRaw as unknown as (...args: unknown[]) => void;
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

/**
 * Envoie une vue de page a HubSpot et a GA4.
 *
 * Indispensable en SPA : le loader HubSpot et `gtag('config')` ne comptent
 * qu'une seule vue, celle du chargement initial. Sans ces appels manuels, un
 * visiteur qui parcourt cinq pages n'en laisse qu'une dans les deux outils, et
 * toute la navigation interne est invisible.
 */
function trackPageView(path: string) {
  const hsq = (window._hsq = window._hsq || []);
  hsq.push(["setPath", path]);
  hsq.push(["trackPageView"]);

  if (HAS_GA4) {
    window.gtag?.("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

export function Analytics() {
  const [granted, setGranted] = useState(false);
  // `searchStr` porte la query string ; il n'existe pas sur toutes les versions
  // du routeur, d'ou le repli sur une chaine vide plutot qu'un plantage.
  const path = useRouterState({
    select: (s) => s.location.pathname + (s.location.searchStr ?? ""),
  });
  // La toute premiere vue est deja comptee par le loader HubSpot et par
  // `gtag('config')` au moment ou ils se chargent. La repousser ici la
  // doublerait.
  const skipFirst = useRef(true);

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

  useEffect(() => {
    if (!granted) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    trackPageView(path);
  }, [granted, path]);

  return null;
}
