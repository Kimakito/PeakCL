import { useRouterState } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { localeFromPath, type Locale } from "@/i18n/config";

const VIDEO_SRC = "/peakcl/video-presentation.mp4";
const VIDEO_POSTER = "/design-system/logo-carre-compo.png";

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
    subtitle:
      "Une courte présentation pour comprendre qui je suis et comment je peux vous aider.",
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
        <div className="mx-auto w-full max-w-[340px]">
          <div className="card-hover relative rounded-[2rem] border border-border bg-card/50 p-2.5 shadow-card backdrop-blur">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <video
              className="w-full rounded-3xl bg-white object-cover"
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
          </div>
        </div>
      </div>
    </section>
  );
}
