import {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { SOCIAL, FREELANCE, CONTACT } from "@/lib/links";
import logo from "@/assets/peakcl-logo.png";

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: SOCIAL.whatsapp, label: "WhatsApp", icon: MessageCircle },
];

/** Footer plein écran — pensé pour terminer un deck horizontal. */
export function DeckFooter() {
  const year = new Date().getFullYear();
  return (
    <section className="flex h-full w-full items-center justify-center overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-8 py-10 text-center">
        <img
          src={logo}
          alt="PeakCL"
          className="mx-auto h-12 w-12 rounded-xl object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">
          Construisons votre image en ligne.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Site, identité, réseaux, Google : un seul interlocuteur, de A à Z.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--brand-turquoise)]"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" /> {CONTACT.email}
          </a>
          <a
            href={CONTACT.phoneTel}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Accueil
          </a>
          <a
            href="/portfolio"
            className="text-muted-foreground hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="/services"
            className="text-muted-foreground hover:text-foreground"
          >
            Services
          </a>
          <a
            href="/qui-suis-je"
            className="text-muted-foreground hover:text-foreground"
          >
            Qui suis-je
          </a>
          <a
            href="/conseils"
            className="text-muted-foreground hover:text-foreground"
          >
            Conseils
          </a>
          <a
            href="/reservation-appel"
            className="text-muted-foreground hover:text-foreground"
          >
            Réservation d’appel
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
          <span>Aussi disponible sur&nbsp;:</span>
          <a
            href={FREELANCE.malt}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            Malt
          </a>
          <a
            href={FREELANCE.fiverr}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            Fiverr
          </a>
          <a
            href={FREELANCE.comeup}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            ComeUp
          </a>
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/60">
          <a href="/agence-web-albertville" className="hover:text-foreground">
            Albertville
          </a>
          <a href="/agence-web-chambery" className="hover:text-foreground">
            Chambéry
          </a>
          <a href="/agence-web-annecy" className="hover:text-foreground">
            Annecy
          </a>
          <a href="/agence-web-aix-les-bains" className="hover:text-foreground">
            Aix-les-Bains
          </a>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/60">
          © {year} PeakCL · Charlotte Lacroix
        </p>
      </div>
    </section>
  );
}
