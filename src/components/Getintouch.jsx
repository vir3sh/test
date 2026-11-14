import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";


const PHONE_DISPLAY = "+91 98191 62911";
const PHONE_LINK = "+919819162911";
const WHATSAPP_NUMBER = "919819162911";
const EMAIL = "amit@valueproperties.homes";

const ADDRESS =
  "Satya House, 602, Sriram Tekdi Rd, Parel Village, Sindhu Nagar, Parel, Mumbai, Maharashtra 400015";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'd like to talk to an advisor about a property.",
)}`;

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;

const contacts = [
  {
    id: "call",
    icon: Phone,
    label: "Call us",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_LINK}`,
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    id: "visit",
    icon: MapPin,
    label: "Visit our office",
    value: ADDRESS,
    href: mapsHref,
    external: true,
    small: true,
  },
];


export default function GetInTouch() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = reduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section className="bg-white py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-3 sm:px-4 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative grid items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#075eae] via-[#0875d1] to-[#064b91] p-5 shadow-[0_25px_70px_-25px_rgba(8,117,209,0.5)] sm:gap-10 sm:rounded-[32px] sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-14"
        >
          {/* Decorative background elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#65bdff]/20 blur-3xl sm:-right-24 sm:-top-24 sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#003b78]/30 blur-3xl sm:-bottom-40 sm:-left-24 sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.12),transparent_40%)]"
          />

          {/* Left: Heading and WhatsApp CTA */}
          <motion.div variants={item} className="relative z-10">
            <h2 className="font-serif text-[26px] font-bold leading-[1.15] text-white min-[400px]:text-[30px] sm:mt-6 sm:text-4xl sm:leading-tight lg:text-5xl">
              Get in Touch
              <span className="mt-1 block text-[#b8e1ff]">
                Let's Find Your Place.
              </span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-blue-50/90 sm:mt-5 sm:text-base sm:leading-7">
              Talk to a real advisor about your next move — no pressure, no
              pitch. We're here to help you find the right property.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0875d1] shadow-xl shadow-[#003d78]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#eaf6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0875d1] sm:mt-8 sm:h-14 sm:w-auto sm:gap-2.5 sm:px-8 sm:text-base"
            >
              <MessageCircle
                className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                aria-hidden="true"
              />
              Talk to Us on WhatsApp
              <ArrowUpRight
                className="h-4 w-4 sm:h-[17px] sm:w-[17px]"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Right: Contact details */}
          <ul className="relative z-10 grid gap-2.5 sm:gap-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;

              return (
                <motion.li key={contact.id} variants={item}>
                  <a
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    className="group flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/20 sm:gap-4 sm:rounded-2xl sm:p-5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#0875d1] shadow-sm transition duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                      <Icon
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium text-blue-100 sm:text-xs">
                        {contact.label}
                      </span>

                      <span
                        className={`mt-0.5 block break-words text-white sm:mt-1 ${
                          contact.small
                            ? "text-xs leading-5 text-blue-50 sm:text-sm sm:leading-6"
                            : "text-sm font-semibold sm:text-lg"
                        }`}
                      >
                        {contact.value}
                      </span>
                    </span>

                    {/* Hover-only arrow: hidden on touch-sized screens */}
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="mt-1 hidden shrink-0 -translate-x-1 text-white/70 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
