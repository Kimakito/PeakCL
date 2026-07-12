/**
 * Arbre de dialogue du chatbot PeakaBot (scénarisé, sans IA ni backend).
 * Chaque nœud affiche des bulles du bot + des choix cliquables. Un choix
 * renvoie soit vers un autre nœud (`goto`), soit vers un lien (`href`).
 *
 * Avatars : public/peakcl/assets/images/avatar-<mood>.webp
 */

export type BotMood = "happy" | "think" | "thumbs-up";

export type BotChoice = {
  label: string;
  /** Nœud suivant. */
  goto?: string;
  /** Lien (prioritaire sur goto). */
  href?: string;
  /** Ouvre le lien dans un nouvel onglet. */
  external?: boolean;
  /** Nom d'événement analytics (tracker global sur [data-event]). */
  event?: string;
};

export type BotNode = {
  id: string;
  mood: BotMood;
  bot: string[];
  choices: BotChoice[];
};

import { CONTACT, SOCIAL } from "@/lib/links";

const CALENDLY_URL = CONTACT.calendly;

/** Lien WhatsApp pré-rempli, pour les questions non couvertes par le bot. */
export const PEAKABOT_WHATSAPP = `${SOCIAL.whatsapp}?text=${encodeURIComponent(
  "Bonjour Charlotte, j'ai une question depuis le site PeakCL :",
)}`;

export const PEAKABOT_START = "start";

export const PEAKABOT_NODES: Record<string, BotNode> = {
  start: {
    id: "start",
    mood: "happy",
    bot: [
      "Salut, moi c’est PeakaBot 👋",
      "Je réponds à vos questions sur PeakCL. Qu’est-ce qui vous amène ?",
    ],
    choices: [
      { label: "Vos services", goto: "services" },
      { label: "Les tarifs", goto: "tarifs" },
      { label: "Les délais", goto: "delais" },
      { label: "Prendre rendez-vous", goto: "rdv" },
    ],
  },
  services: {
    id: "services",
    mood: "think",
    bot: ["PeakCL couvre quatre domaines. Lequel vous intéresse ?"],
    choices: [
      { label: "💻 Sites web", href: "/sites-web" },
      { label: "📱 Réseaux sociaux", href: "/community-management" },
      { label: "🎨 Graphisme", href: "/design" },
      { label: "⚙️ Automatisation & IA", href: "/accompagnement-automatisation" },
      { label: "↩︎ Retour", goto: "start" },
    ],
  },
  tarifs: {
    id: "tarifs",
    mood: "think",
    bot: [
      "La plupart des prestations sont sur devis, adaptées à votre projet.",
      "Seuls les forfaits réseaux sociaux ont un tarif public. Le plus fiable : un devis clair après un court échange.",
    ],
    choices: [
      { label: "Demander un devis", href: "/reservation-appel", event: "cta_brief_peakabot" },
      { label: "Voir les services", goto: "services" },
      { label: "↩︎ Retour", goto: "start" },
    ],
  },
  delais: {
    id: "delais",
    mood: "think",
    bot: [
      "Ça dépend du projet : environ 1 à 2 semaines pour un logo, 3 à 5 semaines pour un site vitrine, 4 à 7 pour une boutique.",
      "On cale les délais ensemble au moment du devis.",
    ],
    choices: [
      { label: "Prendre rendez-vous", goto: "rdv" },
      { label: "↩︎ Retour", goto: "start" },
    ],
  },
  rdv: {
    id: "rdv",
    mood: "thumbs-up",
    bot: [
      "Le plus simple : on réserve un appel découverte, ça prend quelques minutes.",
      "Je reviens ensuite vers vous avec un devis clair.",
    ],
    choices: [
      { label: "Réserver un appel", href: CALENDLY_URL, external: true, event: "cta_calendly_peakabot" },
      { label: "Remplir le brief", href: "/reservation-appel", event: "cta_brief_peakabot" },
      { label: "↩︎ Retour", goto: "start" },
    ],
  },
};
