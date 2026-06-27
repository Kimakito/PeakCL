import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { conseilBySlug, conseilHead } from "@/content/peakcl/conseils";

const conseil = conseilBySlug("conseils-referencer-site-google")!;

export const Route = createFileRoute("/conseils-referencer-site-google")({
  head: () => conseilHead(conseil),
  component: () => <ArticleLayout conseil={conseil} />,
});
