import { createFileRoute, redirect } from "@tanstack/react-router";

// L'ancienne page « Offres » (/packs) est remplacée par le hub /services
// et les 4 pages dédiées (sites-web, community-management, design,
// accompagnement-automatisation). On redirige pour préserver les liens existants.
export const Route = createFileRoute("/packs")({
  beforeLoad: () => {
    throw redirect({ to: "/services" });
  },
});
