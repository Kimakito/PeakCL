import { createFileRoute } from "@tanstack/react-router";
import { ValueAsset } from "@/components/ValueAsset";
import { valueAssetBySlug, valueAssetHead } from "@/content/peakcl/value-assets";

const asset = valueAssetBySlug("ressources-conversion")!;

export const Route = createFileRoute("/ressources-conversion")({
  head: () => valueAssetHead(asset),
  component: () => <ValueAsset asset={asset} />,
});
