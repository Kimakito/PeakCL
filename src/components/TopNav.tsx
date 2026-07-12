import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { SERVICES } from "@/content/peakcl/services";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/** Slugs regroupés sous le menu déroulant « Services ». */
const SERVICE_PATHS = SERVICES.map((s) => s.slug);

/** Entrées de navigation simples (hors menu Services), mêmes libellés sur tout le site. */
const LINKS = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/qui-suis-je", label: "Qui suis-je" },
  { to: "/conseils", label: "Conseils" },
  { to: "/contact", label: "Contact" },
] as const;

/** Barre de navigation unique du site : libellés visibles en desktop, menu burger en mobile. */
export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isActive = (to: string) => path === to || path.startsWith(to + "/");
  const servicesActive = path === "/services" || SERVICE_PATHS.some((p) => isActive(p));

  // La navbar reste sous le hero : invisible en haut de page, elle glisse et se
  // colle en haut dès qu'on scrolle au-delà du hero (seuil ~70% de la fenêtre).
  // On écoute le scroll de la fenêtre et, en phase de capture, celui des
  // conteneurs internes (pages snap plein écran) pour couvrir tous les cas.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const threshold = window.innerHeight * 0.7;
      const doc = document.scrollingElement?.scrollTop ?? window.scrollY;
      setRevealed(doc > threshold);
    };
    const onScroll = (e: Event) => {
      // Pour un scroll interne (conteneur snap), lit le scrollTop de la cible.
      const target = e.target;
      if (target instanceof HTMLElement && target.scrollTop > 0) {
        if (target.scrollTop > window.innerHeight * 0.7) {
          setRevealed(true);
          return;
        }
      }
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", compute);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("resize", compute);
    };
  }, [path]);

  // Referme le menu mobile quand la navbar se cache (retour en haut de page).
  useEffect(() => {
    if (!revealed) setOpen(false);
  }, [revealed]);

  // Ferme le menu Services au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] border-b border-white/5 bg-background/80 backdrop-blur-xl transition-all duration-500 ${
        revealed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="PeakCL logo" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-display text-base font-bold tracking-tight md:text-lg">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>

        {/* Nav desktop : libellés texte + menu déroulant Services */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm md:flex">
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              data-active={servicesActive}
              onClick={() => setServicesOpen((v) => !v)}
              className={`nav-underline inline-flex items-center gap-1 transition-colors hover:text-foreground ${servicesActive ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen ? (
              <div
                role="menu"
                className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-card/95 p-2 shadow-card backdrop-blur-xl"
              >
                <Link
                  to="/services"
                  role="menuitem"
                  onClick={() => setServicesOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${path === "/services" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  Vue d’ensemble
                </Link>
                <div className="my-1 h-px bg-white/5" />
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.slug}
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${isActive(s.slug) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    <span aria-hidden className="text-base">{s.emoji}</span>
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              data-active={isActive(to)}
              className={`nav-underline transition-colors hover:text-foreground ${isActive(to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
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
            className="cta-anim inline-flex items-center justify-center rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] md:text-sm"
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
            <li>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${path === "/services" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                Services
              </Link>
              <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={s.slug}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 ${isActive(s.slug) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      <span aria-hidden>{s.emoji}</span>
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
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
