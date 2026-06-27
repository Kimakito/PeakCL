import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { conseilBySlug, conseilHead } from "@/content/peakcl/conseils";

const conseil = conseilBySlug("conseils-community-manager-utile")!;

export const Route = createFileRoute("/conseils-community-manager-utile")({
  head: () => conseilHead(conseil),
  component: () => <ArticleLayout conseil={conseil} />,
});
