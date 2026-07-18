import { useEffect, useRef, useState } from "react";
import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { SERVICES } from "@/content/peakcl/services";
import { localeFromPath } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/** Les chemins de route générés sont typés ; nos tables i18n portent des string. */
type To = LinkProps["to"];

/** Barre de navigation unique du site : libellés visibles en desktop, menu burger en mobile. */
export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = ui(locale);

  // Entrées du menu Services selon la langue. En FR elles viennent du module de
  // contenu (slugs + emojis) ; en EN d'une table i18n dédiée (slugs anglais).
  const serviceItems =
    locale === "en"
      ? t.nav.serviceItems
      : SERVICES.map((s) => ({
          to: s.slug,
          label: s.navLabel,
          emoji: s.emoji,
        }));
  const servicesOverview = locale === "en" ? "/en/services" : "/services";
  const servicePaths = serviceItems.map((s) => s.to);
  const homeHref = locale === "en" ? "/en" : "/";

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // Décalage vertical (px) de la barre par rapport au haut de l'écran.
  // null tant que non mesuré (évite un flash au chargement / hydratation SSR).
  const [offset, setOffset] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const isActive = (to: string) => path === to || path.startsWith(to + "/");
  const servicesActive =
    path === servicesOverview || servicePaths.some((p) => isActive(p));

  // La navbar est visible en permanence, posée sous le hero au chargement. Quand
  // on scrolle, elle remonte avec la page puis se colle en haut de l'écran :
  // translateY = max(0, bas_du_hero − scroll). Le hero est l'élément marqué
  // [data-hero], sinon la première section de la page.
  useEffect(() => {
    let raf = 0;
    let restTop = 0;
    let heroEl: HTMLElement | null = null;
    const scrollTop = () =>
      document.scrollingElement?.scrollTop ?? window.scrollY;
    const measure = () => {
      heroEl =
        document.querySelector<HTMLElement>("[data-hero]") ??
        document.querySelector<HTMLElement>("main section, section");
      if (!heroEl) {
        restTop = window.innerHeight;
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      const heroBottom = rect.bottom + scrollTop();
      // Hero plein écran (accueil) : la barre est posée sous le hero, donc hors
      // écran au repos → son bord haut est au bas du hero. Hero compact
      // (portfolio, qui-suis-je…) : elle est visible au repos, on la cale pour
      // que son bord BAS touche le bas du hero, dans la marge basse du hero, sans
      // recouvrir la section suivante.
      const navH = headerRef.current?.offsetHeight ?? 0;
      const heroIsFull = rect.height >= window.innerHeight - 1;
      restTop = heroIsFull ? heroBottom : Math.max(0, heroBottom - navH);
    };
    const compute = () => {
      raf = 0;
      setOffset(Math.max(0, restTop - scrollTop()));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    const onResize = () => {
      measure();
      compute();
    };
    measure();
    compute();
    // Le hero change de hauteur après coup (images lazy, polices, hydratation).
    // Un ResizeObserver garde heroBottom juste : sinon la barre reste figée à une
    // position mesurée trop tôt et recouvre le contenu qui suit.
    const ro = new ResizeObserver(onResize);
    if (heroEl) ro.observe(heroEl);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("resize", onResize);
    };
  }, [path]);

  // Ouverture/fermeture du menu Services avec petit délai : évite qu'il se ferme
  // quand le curseur traverse l'espace entre le bouton et le panneau.
  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  // Ferme le menu Services au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      )
        setServicesOpen(false);
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
      ref={headerRef}
      style={{
        transform: `translateY(${offset ?? 0}px)`,
        opacity: offset === null ? 0 : 1,
      }}
      className={`fixed inset-x-0 top-0 z-[60] border-b border-white/5 bg-background/80 backdrop-blur-xl transition-opacity duration-300 ${
        offset === 0 ? "shadow-card" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href={homeHref} className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="PeakCL logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="font-display text-base font-bold tracking-tight md:text-lg">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>

        {/* Nav desktop : libellés texte + menu déroulant Services */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              data-active={servicesActive}
              onClick={() => setServicesOpen((v) => !v)}
              className={`nav-underline inline-flex items-center gap-1 transition-colors hover:text-foreground ${servicesActive ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {t.nav.services}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
                <div
                  role="menu"
                  className="rounded-2xl border border-white/10 bg-card/95 p-2 shadow-card backdrop-blur-xl"
                >
                  <Link
                    to={servicesOverview as To}
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                    className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${path === servicesOverview ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {t.nav.overview}
                  </Link>
                  <div className="my-1 h-px bg-white/5" />
                  {serviceItems.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to as To}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${isActive(s.to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      <span aria-hidden className="text-base">
                        {s.emoji}
                      </span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {t.nav.links.map(({ to, label }) => (
            <Link
              key={to}
              to={to as To}
              data-active={isActive(to)}
              className={`nav-underline transition-colors hover:text-foreground ${isActive(to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_calendly_nav"
            className="cta-anim inline-flex items-center justify-center rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] md:text-sm"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
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
        <nav
          aria-label="Navigation mobile"
          className="border-t border-white/5 bg-background/95 px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                to={servicesOverview as To}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${path === servicesOverview ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                {t.nav.services}
              </Link>
              <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                {serviceItems.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to as To}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 ${isActive(s.to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      <span aria-hidden>{s.emoji}</span>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {t.nav.links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to as To}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${isActive(to) ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-white/5 pt-3">
              <LanguageSwitcher className="w-max" />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
