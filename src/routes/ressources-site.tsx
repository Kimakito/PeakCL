import { createFileRoute } from "@tanstack/react-router";
import { ValueAsset } from "@/components/ValueAsset";
import { valueAssetBySlug, valueAssetHead } from "@/content/peakcl/value-assets";

const asset = valueAssetBySlug("ressources-site")!;

export const Route = createFileRoute("/ressources-site")({
  head: () => valueAssetHead(asset),
  component: () => <ValueAsset asset={asset} />,
});
