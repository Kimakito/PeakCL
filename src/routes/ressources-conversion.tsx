import { createFileRoute } from "@tanstack/react-router";
import { ValueAsset } from "@/components/ValueAsset";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";
import { valueAssetBySlug, valueAssetHead } from "@/content/peakcl/value-assets";

const asset = valueAssetBySlug("ressources-conversion")!;

export const Route = createFileRoute("/ressources-conversion")({
  head: () => valueAssetHead(asset),
  component: () => (
    <>
      <ValueAsset asset={asset} />
      <div className="no-print mx-auto flex max-w-3xl justify-center px-6 pb-16">
        <ExpressionPhoto slug="sourcil-leve" caption="On convertit" tilt={-3} imgClassName="aspect-[3/4] w-24" />
      </div>
    </>
  ),
});
