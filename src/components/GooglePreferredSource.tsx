import { useEffect, useState } from "react";
import { CONSENT_EVENT, hasAnalyticsConsent, type ConsentState } from "@/lib/consent";

const SCRIPT_ID = "google-swg-publisher";
const SCRIPT_SRC = "https://news.google.com/swg/js/v1/publisher.js";

/**
 * Bouton « Sources préférées » de Google Search.
 *
 * Permet à un lecteur d'ajouter peakcl.com à ses sources privilégiées, ce qui
 * met le site en avant pour lui dans Top Stories, Discover, les AI Overviews
 * et le mode IA. Éligibilité vérifiée le 27/08/2026 : le domaine apparaît bien
 * dans l'outil de préférences de sources de Google, ce qui est la condition
 * posée par la documentation.
 *
 * CHARGÉ SOUS CONSENTEMENT, comme GA4 et HubSpot. C'est un script tiers servi
 * par `news.google.com` et exécuté chez le visiteur : le charger d'office
 * contredirait la bannière et la politique de confidentialité, qui affirment
 * toutes deux qu'aucun script tiers ne s'exécute avant acceptation. Tant que
 * le consentement n'est pas donné, ce composant ne rend rien du tout — pas
 * même un emplacement vide.
 *
 * POURQUOI SEULEMENT SUR LES ARTICLES : la fonctionnalité s'adresse aux
 * lecteurs réguliers, et Google prévient qu'une source rarement mise à jour
 * peut devenir indisponible. Les conseils sont la seule partie du site qui ait
 * une logique de lecture répétée. Sur une page de vente, ce bouton prendrait
 * la place d'un appel à l'action qui, lui, produit des demandes.
 */
export function GooglePreferredSource({ className = "" }: { className?: string }) {
  const [autorise, setAutorise] = useState(false);

  useEffect(() => {
    const sync = () => setAutorise(hasAnalyticsConsent());
    sync();
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState | null>).detail;
      setAutorise(detail?.analytics === "granted");
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!autorise) return;
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }, [autorise]);

  if (!autorise) return null;

  return (
    <div className={className}>
      <p className="text-xs text-muted-foreground">
        Ces conseils vous sont utiles ? Dites à Google de vous les montrer plus souvent.
      </p>
      {/* Google remplace ce conteneur par son bouton. L'attribut sans valeur
          est bien la forme documentée. */}
      <div
        className="mt-2"
        data-theme="dark"
        data-lang="fr"
        {...{ "google-add-preferred-source-btn": "" }}
      />
    </div>
  );
}
