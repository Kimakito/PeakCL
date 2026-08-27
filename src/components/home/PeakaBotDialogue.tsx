import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { metierPages } from "@/seo/metiers";
import { cn } from "@/lib/utils";

const AVATAR = {
  happy: "/peakcl/assets/images/avatar-happy.webp",
  think: "/peakcl/assets/images/avatar-think.webp",
  thumbs: "/peakcl/assets/images/avatar-thumbs-up.webp",
} as const;

type Turn =
  | { who: "bot"; text: string; mood: keyof typeof AVATAR }
  | { who: "visiteur"; text: string };

/**
 * Échange scénarisé. Volontairement court : au-delà de quatre répliques, le
 * visiteur décroche avant la fin et le bloc devient un décor qu'on fait défiler.
 */
const SCRIPT: Turn[] = [
  { who: "bot", text: "Salut, moi c’est PeakaBot 👋", mood: "happy" },
  { who: "bot", text: "Vous cherchez quoi, exactement ?", mood: "happy" },
  { who: "visiteur", text: "Un site qui m’amène des clients." },
  { who: "bot", text: "La bonne réponse dépend de votre métier.", mood: "think" },
  { who: "bot", text: "Vous êtes dans lequel ?", mood: "think" },
];

/** Les mêmes pistes que l'aiguillage du bloc « problème », dérivées du registre. */
const PISTES = [
  // TPE et PME en tete : cible prioritaire. Voir le commentaire d'AUDIENCES
  // dans src/routes/index.tsx, les deux listes doivent rester dans le meme
  // ordre — un visiteur qui voit deux classements differents sur la meme page
  // n'y lit plus aucune intention.
  { label: "TPE & PME", href: "/refonte-site-pme" },
  ...metierPages.map((m) => ({
    label: m.label.replace(/^Site internet /, ""),
    href: `/${m.slug}`,
  })),
];

/** Millisecondes par caractère. Assez lent pour se lire, assez vif pour ne pas lasser. */
const VITESSE = 22;
const PAUSE_ENTRE_REPLIQUES = 420;

/**
 * Conversation animée avec PeakaBot, sur l'accueil.
 *
 * Trois partis pris :
 *
 * 1. **La frappe s'écrit directement dans le DOM**, pas via un état React. Un
 *    `setState` par caractère, c'est une trentaine de rendus par seconde de
 *    tout le sous-arbre pour animer du texte. Le texte est écrit dans un
 *    `ref` ; React ne rend que lorsqu'une réplique entière est terminée, pour
 *    faire apparaître la suivante.
 * 2. **Rien ne démarre avant d'être visible.** L'échange se joue une fois, à
 *    l'entrée dans le viewport. Sans ça, un visiteur qui arrive directement en
 *    bas de page trouve une conversation déjà finie, dont il n'a rien vu.
 * 3. **`prefers-reduced-motion` affiche tout d'un coup.** L'information est la
 *    même, seule l'animation disparaît — ce qui est le but de ce réglage.
 *
 * Le bloc se termine sur les pistes métier : c'est le seul endroit de
 * l'accueil où le visiteur se désigne lui-même, ce qui en fait un aiguillage
 * bien plus fiable qu'une liste posée à froid.
 */
export function PeakaBotDialogue() {
  const [visibles, setVisibles] = useState(0);
  const [fini, setFini] = useState(false);
  const [cle, setCle] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lignesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const demarre = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const toutAfficher = () => {
      SCRIPT.forEach((t, i) => {
        const el = lignesRef.current[i];
        if (el) el.textContent = t.text;
      });
      setVisibles(SCRIPT.length);
      setFini(true);
    };

    if (reduit) {
      toutAfficher();
      return;
    }

    /**
     * Animation pilotee par le TEMPS ECOULE, et non par le nombre de fois ou
     * le minuteur s'est declenche.
     *
     * Les deux premieres versions comptaient les ticks : une chaine de
     * `setTimeout` par caractere, puis un `setInterval` unique. Les deux se
     * sont effondrees des que le navigateur a bride ses minuteurs — mesure
     * faite, vingt caracteres en dix secondes au lieu d'une demi-seconde. Un
     * onglet en arriere-plan, un appareil en economie d'energie ou une machine
     * chargee produisent exactement le meme effet chez un visiteur.
     *
     * Ici, chaque image calcule ce qui DEVRAIT etre affiche a cet instant. Si
     * le navigateur saute des images, le texte rattrape simplement son retard :
     * la conversation dure toujours le meme temps, quoi qu'il arrive.
     */
    const PAUSE = PAUSE_ENTRE_REPLIQUES;
    const debuts: number[] = [];
    let curseur = 0;
    for (const t of SCRIPT) {
      debuts.push(curseur);
      curseur += t.text.length * VITESSE + PAUSE;
    }
    const duree = curseur;

    let frame = 0;
    let secours = 0;
    let t0 = 0;
    let dernierTour = -1;
    let termine = false;

    const boucle = (now: number) => {
      if (termine) return;
      if (!t0) t0 = now;
      const ecoule = now - t0;

      let tour = 0;
      while (tour + 1 < SCRIPT.length && ecoule >= debuts[tour + 1]) tour += 1;

      // Toutes les repliques precedentes sont ecrites en entier : si des images
      // ont ete sautees, elles ne restent pas a moitie tapees.
      for (let i = 0; i < tour; i += 1) {
        const el = lignesRef.current[i];
        if (el && el.textContent !== SCRIPT[i].text) el.textContent = SCRIPT[i].text;
      }

      if (tour !== dernierTour) {
        dernierTour = tour;
        setVisibles(tour + 1);
      }

      const el = lignesRef.current[tour];
      if (el) {
        const n = Math.max(
          0,
          Math.min(SCRIPT[tour].text.length, Math.floor((ecoule - debuts[tour]) / VITESSE)),
        );
        const attendu = SCRIPT[tour].text.slice(0, n);
        if (el.textContent !== attendu) el.textContent = attendu;
      }

      if (ecoule >= duree) {
        termine = true;
        toutAfficher();
        if (frame) cancelAnimationFrame(frame);
        if (secours) window.clearInterval(secours);
        frame = 0;
        secours = 0;
        return;
      }
      frame = requestAnimationFrame(boucle);
    };

    // Second moteur, volontairement redondant. `requestAnimationFrame` est
    // suspendu quand l'onglet passe en arriere-plan : sans ce filet, un
    // visiteur qui change d'onglet pendant la conversation la retrouve figee
    // au caractere pres ou il l'a laissee. Comme tout est calcule a partir du
    // temps ecoule, ce minuteur de secours n'accelere ni ne double rien — il
    // se contente de redemander l'etat correct, meme si le navigateur le bride
    // a un declenchement par seconde.
    const relancer = () => {
      if (termine) return;
      boucle(performance.now());
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !demarre.current) {
          demarre.current = true;
          frame = requestAnimationFrame(boucle);
          secours = window.setInterval(relancer, 120);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);

    return () => {
      termine = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (secours) window.clearInterval(secours);
    };
  }, [cle]);

  const rejouer = () => {
    lignesRef.current.forEach((el) => {
      if (el) el.textContent = "";
    });
    demarre.current = false;
    setVisibles(0);
    setFini(false);
    setCle((k) => k + 1);
  };

  return (
    <section
      id="peakabot"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
      aria-label="Conversation avec PeakaBot"
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-3xl px-8 md:px-16">
        <div className="relative rounded-3xl border border-border bg-card/40 p-6 shadow-card backdrop-blur md:p-8">
          <div className="min-h-[200px] space-y-4 sm:min-h-[240px]">
            {SCRIPT.map((turn, i) => {
              if (i >= visibles) return null;
              const bot = turn.who === "bot";
              return (
                <div
                  key={i}
                  className={cn("flex items-end gap-3", bot ? "justify-start" : "justify-end")}
                >
                  {bot ? (
                    <img
                      src={AVATAR[turn.mood]}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full border border-border bg-card object-cover"
                    />
                  ) : null}
                  <p
                    className={cn(
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      bot
                        ? "rounded-bl-sm border border-border bg-muted text-foreground"
                        : "rounded-br-sm bg-primary-gradient text-primary-foreground",
                    )}
                  >
                    <span
                      ref={(el) => {
                        lignesRef.current[i] = el;
                      }}
                    />
                    {/* Curseur de frappe sur la réplique en cours seulement. */}
                    {!fini && i === visibles - 1 ? (
                      <span
                        aria-hidden
                        className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-current"
                      />
                    ) : null}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Les pistes n'apparaissent qu'une fois la question posée : les
              montrer avant reviendrait à répondre à la place du visiteur. */}
          <div
            className={cn(
              "mt-6 border-t border-border pt-6 transition-opacity duration-500",
              fini ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="flex flex-wrap gap-2">
              {PISTES.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  data-event="peakabot_dialogue_metier"
                  className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[var(--brand-turquoise)] hover:text-foreground"
                >
                  {p.label}
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="/diagnostic"
                data-event="cta_mini_audit_peakabot_dialogue"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Aucun ne correspond ? Recevoir mon mini-audit
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={rejouer}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Rejouer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
