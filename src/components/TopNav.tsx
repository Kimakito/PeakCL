import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/peakcl-logo.png";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/** Entrées de navigation, mêmes libellés texte sur tout le site. */
const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/qui-suis-je", label: "Qui suis-je" },
  { to: "/conseils", label: "Conseils" },
  { to: "/contact", label: "Contact" },
] as const;

/** Barre de navigation unique du site : libellés visibles en desktop, menu burger en mobile. */
export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => path === to || path.startsWith(to + "/");

  return (
    <header className="sticky top-0 z-[60] border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="PeakCL logo" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-display text-base font-bold tracking-tight md:text-lg">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>

        {/* Nav desktop : libellés texte */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm md:flex">
          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors hover:text-foreground ${isActive(to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_calendly_nav"
            className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] md:text-sm"
          >
            Réserver un appel
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {open ? (
        <nav aria-label="Navigation mobile" className="border-t border-white/5 bg-background/95 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${isActive(to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
