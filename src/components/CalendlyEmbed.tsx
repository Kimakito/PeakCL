import { useEffect, useRef } from "react";

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

function ensureCalendlyAssets() {
  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
  }

  const existing = document.querySelector(`script[src="${WIDGET_JS}"]`);
  if (existing) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("calendly_script_failed"));
    document.head.appendChild(script);
  });
}

type CalendlyEmbedProps = {
  url: string;
  minHeight?: number;
};

export function CalendlyEmbed({ url, minHeight = 700 }: CalendlyEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    ensureCalendlyAssets()
      .then(() => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = "";
        const Calendly = (window as Window & { Calendly?: { initInlineWidget: (o: object) => void } }).Calendly;
        Calendly?.initInlineWidget({
          url,
          parentElement: hostRef.current,
        });
      })
      .catch(() => {
        // Widget script blocked — fallback link is shown on the parent page.
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return <div ref={hostRef} className="w-full overflow-hidden rounded-2xl border border-white/10 bg-card/20" style={{ minHeight }} />;
}
