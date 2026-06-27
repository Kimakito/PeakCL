import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { conseilBySlug, conseilHead } from "@/content/peakcl/conseils";

const conseil = conseilBySlug("conseils-prix-site-internet")!;

export const Route = createFileRoute("/conseils-prix-site-internet")({
  head: () => conseilHead(conseil),
  component: () => <ArticleLayout conseil={conseil} />,
});
