import { createFileRoute } from "@tanstack/react-router";
import { ValueAsset } from "@/components/ValueAsset";
import { valueAssetBySlug, valueAssetHead } from "@/content/peakcl/value-assets";

const asset = valueAssetBySlug("ressources-reseaux")!;

export const Route = createFileRoute("/ressources-reseaux")({
  head: () => valueAssetHead(asset),
  component: () => <ValueAsset asset={asset} />,
});
