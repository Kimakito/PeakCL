import { SectionHeading } from "@/components/SectionHeading";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const VIDEO_SRC = "/peakcl/video-presentation.mp4";
const VIDEO_POSTER = "/peakcl/video-presentation-poster.jpg";

/** Vidéo de présentation verticale (9:16), sous-titres inclus dans le fichier.
 *  Lecture avec son : pas d'autoplay (bloqué par les navigateurs avec audio),
 *  l'utilisateur lance via les contrôles natifs. */
export function VideoPresentation() {
  return (
    <section id="presentation" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-10"
          accent="turquoise"
          eyebrow="En quelques mots"
          title={<>Faisons connaissance <span className="text-gradient">en vidéo</span>.</>}
          subtitle="Une courte présentation pour comprendre qui je suis et comment je peux vous aider."
        />
        <div className="mx-auto w-full max-w-[340px]">
          <div className="card-hover relative rounded-[2rem] border border-white/10 bg-card/50 p-2.5 shadow-card backdrop-blur">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <video
              className="w-full rounded-3xl bg-black"
              controls
              playsInline
              preload="none"
              poster={VIDEO_POSTER}
              width={1080}
              height={1920}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Votre navigateur ne peut pas lire la vidéo.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
