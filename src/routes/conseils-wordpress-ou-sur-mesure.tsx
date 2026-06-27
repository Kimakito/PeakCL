import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { conseilBySlug, conseilHead } from "@/content/peakcl/conseils";

const conseil = conseilBySlug("conseils-wordpress-ou-sur-mesure")!;

export const Route = createFileRoute("/conseils-wordpress-ou-sur-mesure")({
  head: () => conseilHead(conseil),
  component: () => <ArticleLayout conseil={conseil} />,
});
