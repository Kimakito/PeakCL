import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { conseilBySlug, conseilHead } from "@/content/peakcl/conseils";

const conseil = conseilBySlug("conseils-site-web-ou-instagram")!;

export const Route = createFileRoute("/conseils-site-web-ou-instagram")({
  head: () => conseilHead(conseil),
  component: () => <ArticleLayout conseil={conseil} />,
});
