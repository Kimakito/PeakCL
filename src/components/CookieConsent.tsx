import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

/**
 * Banniere de consentement cookies.
 *
 * Contraintes CNIL respectees ici, chacune volontairement :
 * - « Tout refuser » a exactement le meme poids visuel et la meme taille que
 *   « Tout accepter ». Un refus grise ou relegue en lien discret est le motif
 *   de mise en demeure le plus courant ;
 * - aucune croix de fermeture : fermer sans choisir n'est pas un consentement,
 *   et une croix laisse croire l'inverse. Tant qu'aucun bouton n'est clique,
 *   rien n'est charge, donc rien ne presse ;
 * - le texte dit quels outils sont concernes, pas « nous utilisons des cookies
 *   pour ameliorer votre experience », qui n'informe de rien.
 *
 * Le rendu est purement client : la banniere depend de `localStorage`, que le
 * SSR ne connait pas. Sans le garde `mounted`, React signale une divergence
 * d'hydratation et peut afficher la banniere une fraction de seconde a
 * quelqu'un qui a deja repondu.
 */
export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVisible(readConsent() === null);

    const onConsent = () => setVisible(readConsent() === null);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!mounted || !visible) return null;

  const decide = (choice: "granted" | "denied") => {
    writeConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-5 shadow-card backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-gradient text-primary-foreground"
          >
            <Cookie className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h2 id="cookie-consent-title" className="text-base font-semibold text-foreground">
              Cookies de mesure d'audience
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              PeakCL utilise Google Analytics et HubSpot pour savoir quelles pages sont consultees
              et d'ou viennent les visiteurs. Ces outils deposent des cookies sur votre appareil.
              Rien n'est charge tant que vous n'avez pas choisi, et le site fonctionne a l'identique
              si vous refusez.{" "}
              <Link
                to="/politique-confidentialite"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialite
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {/* Meme taille, meme hauteur, meme lisibilite pour les deux choix. */}
          <button
            type="button"
            onClick={() => decide("granted")}
            className="flex-1 rounded-xl bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Tout accepter
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="flex-1 rounded-xl border border-border bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Tout refuser
          </button>
        </div>
      </div>
    </div>
  );
}
