import { createFileRoute, redirect } from "@tanstack/react-router";

// L'ancienne page « Offres » (/packs) est remplacée par le hub /services
// et les 4 pages dédiées (sites-web, community-management, design,
// accompagnement-automatisation). On redirige pour préserver les liens existants.
//
// En production, netlify.toml intercepte /packs en 301 avant d'atteindre la
// fonction : cette route ne sert qu'au dev local. Le `statusCode` explicite
// évite le 307 par défaut, qui indique à Google une redirection temporaire et
// laisse donc l'ancienne URL dans l'index.
export const Route = createFileRoute("/packs")({
  beforeLoad: () => {
    throw redirect({ to: "/services", statusCode: 301 });
  },
});
