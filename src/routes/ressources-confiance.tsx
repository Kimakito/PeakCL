import { createFileRoute } from "@tanstack/react-router";
import { ValueAsset } from "@/components/ValueAsset";
import { valueAssetBySlug, valueAssetHead } from "@/content/peakcl/value-assets";

const asset = valueAssetBySlug("ressources-confiance")!;

export const Route = createFileRoute("/ressources-confiance")({
  head: () => valueAssetHead(asset),
  component: () => <ValueAsset asset={asset} />,
});
