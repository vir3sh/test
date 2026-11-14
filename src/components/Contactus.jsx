import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Mail,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

const PHONE_DISPLAY = "+91 98191 62911";
const PHONE_LINK = "+919819162911";
const WHATSAPP_NUMBER = "919819162911"; // country code first, no "+"
const EMAIL = "amit@valueproperties.homes";
const ADDRESS =
  "Satya House, 602, Sriram Tekdi Rd, Parel Village, Sindhu Nagar, Parel, Mumbai, Maharashtra 400015";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'd like to talk to an advisor about a property.",
)}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;
const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  ADDRESS,
)}&z=16&output=embed`;

const quickContacts = [
  {
    id: "call",
    icon: Phone,
    label: "Call us",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_LINK}`,
    chip: "bg-[#0875d1]/10 text-[#0875d1]",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with an advisor",
    href: whatsappHref,
    external: true,
    chip: "bg-[#25D366]/15 text-[#16a34a]",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email us",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    chip: "bg-[#172d45]/10 text-[#172d45]",
  },
];

export default function ContactUs() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="bg-[#f4f8fc] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-3xl font-bold text-[#172d45] md:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Talk to a real advisor about your next move — no pressure, no pitch.
          </p>
        </div>

        {/* Contact details */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 lg:grid-cols-[1fr_1.2fr]"
        >
          {/* Call / WhatsApp / Email */}
          <ul className="grid gap-4 lg:grid-rows-3">
            {quickContacts.map((contact) => {
              const Icon = contact.icon;

              return (
                <motion.li key={contact.id} variants={item} className="h-full">
                  <a
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    className="group flex h-full items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-0.5 hover:ring-[#0875d1]/40 hover:shadow-[0_18px_40px_-18px_rgba(8,117,209,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${contact.chip}`}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-slate-500">
                        {contact.label}
                      </span>
                      <span className="mt-0.5 block break-words text-lg font-semibold text-[#172d45]">
                        {contact.value}
                      </span>
                    </span>

                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-[#172d45] transition duration-300 group-hover:border-[#0875d1] group-hover:bg-[#0875d1] group-hover:text-white">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Office + map */}
          <motion.div
            variants={item}
            className="flex flex-col rounded-3xl bg-white p-2.5 ring-1 ring-slate-200/70"
          >
            <div className="min-h-[240px] flex-1 overflow-hidden rounded-[20px] bg-slate-100">
              <iframe
                title="Value Properties office location"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[240px] w-full border-0"
              />
            </div>

            <div className="flex flex-col gap-4 px-3 pb-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0875d1]/10 text-[#0875d1]">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-slate-500">Visit our office</p>
                  <address className="mt-0.5 max-w-md text-sm not-italic leading-6 text-[#172d45]">
                    {ADDRESS}
                  </address>
                </div>
              </div>

              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#172d45] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0875d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2"
              >
                <Navigation size={16} aria-hidden="true" />
                Get directions
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Call us now */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 grid items-center gap-6 overflow-hidden rounded-[32px] bg-[#0875d1] p-8 text-white md:grid-cols-[1fr_auto] md:gap-10 md:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-[#172d45]/25 blur-3xl"
          />

          <div className="relative">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Call us now
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-white/95">
              Prefer to talk it through? Speak to an advisor directly and get
              straight answers.
            </p>
          </div>

          <a
            href={`tel:${PHONE_LINK}`}
            className="relative inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-8 text-xl font-bold tabular-nums text-[#0875d1] shadow-lg shadow-[#0b2540]/20 transition hover:bg-[#f4f8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0875d1]"
          >
            <Phone size={22} aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
