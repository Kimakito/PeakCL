import { useRouterState } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DeviceFrame } from "@/components/ui/device-frame";
import { localeFromPath, type Locale } from "@/i18n/config";

const VIDEO_SRC = "/peakcl/video-presentation.mp4";

/**
 * Image d'attente : une vraie image extraite de la video (a 16 secondes),
 * et non plus le logo carre.
 *
 * Le logo etait une composition carree recadree dans un ecran 9/16 : il y
 * perdait ses bords et ne montrait pas le sujet. Une vignette ou l'on voit
 * Charlotte, de face et souriante, donne davantage envie de lancer la lecture
 * qu'un logo — c'est la seule chose que le visiteur voit avant de cliquer.
 */
const VIDEO_POSTER = "/peakcl/video-poster.webp";

/** Textes de la section selon la langue. En anglais : angle international. */
function videoText(locale: Locale) {
  if (locale === "en") {
    return {
      eyebrow: "In a few words",
      title: (
        <>
          Get to know me <span className="text-gradient">on video</span>.
        </>
      ),
      subtitle: "A short intro so you can see who I am and how I can help you.",
      fallback: "Your browser can't play this video.",
    };
  }
  return {
    eyebrow: "En quelques mots",
    title: (
      <>
        Faisons connaissance <span className="text-gradient">en vidéo</span>.
      </>
    ),
    subtitle: "Une courte présentation pour comprendre qui je suis et comment je peux vous aider.",
    fallback: "Votre navigateur ne peut pas lire la vidéo.",
  };
}

/** Vidéo de présentation verticale (9:16), sous-titres inclus dans le fichier.
 *  Lecture avec son : pas d'autoplay (bloqué par les navigateurs avec audio),
 *  l'utilisateur lance via les contrôles natifs. */
export function VideoPresentation() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = videoText(locale);

  return (
    <section
      id="presentation"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-10"
          accent="turquoise"
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />
        {/* Cadre d'appareil autour de la vidéo.
            `phone` et non `laptop` : la vidéo est verticale (1080x1920). Dans
            un écran d'ordinateur en 16/10, une vidéo 9/16 doit être contenue en
            hauteur — elle tomberait à 238px de large dans un MacBook de 720px,
            contre 320px ici. Le cadre portable existe dans `DeviceFrame` et
            s'active en changeant ce seul mot, mais il rapetisse le sujet de
            près d'un tiers. */}
        <div className="relative mx-auto w-full max-w-[340px]">
          <GlowingEffect
            spread={40}
            glow
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <DeviceFrame variant="phone">
            {/* `scale-[1.06]` : la video porte deja un contour arrondi incruste
                au montage. Dans un chassis d'iPhone, ca faisait un cadre dans
                le cadre. On l'agrandit juste assez pour pousser ce contour
                hors de l'ecran ; le sujet reste centre et rien d'utile n'est
                rogne. */}
            <video
              className="h-full w-full scale-[1.06] bg-black object-cover"
              controls
              playsInline
              preload="none"
              poster={VIDEO_POSTER}
              width={1080}
              height={1920}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              {t.fallback}
            </video>
          </DeviceFrame>
        </div>
      </div>
    </section>
  );
}
