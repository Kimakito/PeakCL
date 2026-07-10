import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Music2,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";
import { SOCIAL, CONTACT } from "@/lib/links";
import { absUrl } from "@/seo/site";
import { submitNetlifyForm } from "@/lib/funnel";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionPhoto, SectionAvatarCard } from "@/components/ExpressionPhoto";

const SECTIONS = [
  { id: "intro", label: "Contact" },
  { id: "canaux", label: "Nous échanger" },
  { id: "diagnostic", label: "Réserver un appel" },
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · PeakCL" },
      {
        name: "description",
        content:
          "Contactez PeakCL (Charlotte Lacroix) : téléphone, email, réseaux sociaux, localisation à Gilly-sur-Isère en Savoie. Toutes les questions sont les bienvenues.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/contact") },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
  }),
  component: ContactPage,
});

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Gilly-sur-Is%C3%A8re,+Savoie,+France&z=12&output=embed";

const CHANNELS = [
  {
    icon: Phone,
    label: "Téléphone",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneTel,
    dataEvent: "contact_page_phone",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    dataEvent: "contact_page_email",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message direct",
    href: SOCIAL.whatsapp,
    external: true,
    dataEvent: "contact_page_whatsapp",
  },
] as const;

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: SOCIAL.instagram },
  { icon: Facebook, label: "Facebook", href: SOCIAL.facebook },
  { icon: Music2, label: "TikTok", href: SOCIAL.tiktok },
  { icon: Linkedin, label: "LinkedIn", href: SOCIAL.linkedin },
] as const;

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      await submitNetlifyForm(form);
      window.location.href = "/merci";
    } catch {
      alert(`L’envoi a échoué. Écrivez-moi directement à ${CONTACT.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen border-t border-white/5">
      <SectionDots
        sections={SECTIONS.map((s) => ({ id: s.id, label: s.label }))}
      />
      <SnapPage>
        <SnapSection
          id="intro"
          className="relative flex items-center overflow-hidden bg-hero py-20"
        >
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="hero-aurora" aria-hidden />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
              <HeartHandshake className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
              Toutes les questions sont les bienvenues
            </div>
            <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
              Parlons de <span className="text-gradient">votre projet</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Une question sur une offre, un tarif, un délai, ou juste envie de
              discuter avant de vous lancer ? Il n’y a pas de question bête, ni
              d’engagement à me contacter. Choisissez le canal qui vous
              convient.
            </p>
            <div className="mt-10 flex justify-center">
              <SectionAvatarCard slug="contact" imgClassName="w-full max-w-[230px]" />
            </div>
          </div>
        </SnapSection>

        <SnapSection
          id="canaux"
          className="flex items-center border-t border-white/5 py-16"
        >
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={"external" in c && c.external ? "_blank" : undefined}
                  rel={
                    "external" in c && c.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  data-event={c.dataEvent}
                  className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-card/30 p-6 text-center shadow-card transition-colors hover:border-white/20"
                >
                  <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[var(--brand-turquoise)]">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-turquoise)]">
                    {c.value}
                  </span>
                </a>
              ))}
            </div>

            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-card/20 p-5">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Sur les réseaux
              </span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event={`contact_page_${s.label.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-white/25 hover:text-[var(--brand-turquoise)]"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="relative rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-[var(--brand-turquoise)]" />
                  Basée à Gilly-sur-Isère, Savoie
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  J’accompagne mes clients partout en France (visio, téléphone,
                  email). Une rencontre en Savoie est possible sur demande.
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title="Localisation PeakCL, Gilly-sur-Isère, Savoie"
                    src={MAP_EMBED_SRC}
                    className="h-64 w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <form
                name="contact"
                method="POST"
                action="/merci"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                data-event="contact_page_form_submit"
                onSubmit={handleSubmit}
                className="relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="leadType" value="contact" />
                <input type="hidden" name="source" value="site_peakcl" />
                <p className="hidden">
                  <label>
                    Ne pas remplir: <input name="bot-field" />
                  </label>
                </p>
                <div className="text-sm font-semibold text-foreground">
                  Ou écrivez-moi directement
                </div>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Nom
                  </span>
                  <input
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20"
                    placeholder="Votre nom"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20"
                    placeholder="vous@exemple.com"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Téléphone (optionnel)
                  </span>
                  <input
                    name="telephone"
                    type="tel"
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20"
                    placeholder="06 12 34 56 78"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20"
                    placeholder="Votre question, votre projet, votre situation..."
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60"
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer mon message"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </SnapSection>

        <SnapSection
          id="diagnostic"
          className="flex items-center border-t border-white/5 py-16"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="relative rounded-3xl border border-white/10 bg-card/20 p-6 text-center shadow-card">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="mb-6 flex justify-center">
                <ExpressionPhoto slug="sourire-exterieur" caption="À vous lire" tilt={-3} imgClassName="aspect-[3/4] w-28" />
              </div>
              <p className="text-sm text-muted-foreground">
                Vous préférez qu’on en parle de vive voix pour cerner
                précisément votre besoin ?
              </p>
              <div className="mt-4">
                <a
                  href="/reservation-appel"
                  data-event="contact_page_diagnostic"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Faire le diagnostic et réserver un appel
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </SnapSection>
      </SnapPage>
    </main>
  );
}
