import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import logo from "../assets/logo.webp";


const PHONE_DISPLAY = "+91 98191 62911";
const PHONE_LINK = "+919819162911";
const EMAIL = "amit@valueproperties.homes";

const ADDRESS =
  "Satya House, 602, Sriram Tekdi Rd, Parel Village, Sindhu Nagar, Parel, Mumbai, Maharashtra 400015";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;

const quickLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Learning Centre", href: "/learning-centre" },
  { label: "Compare Projects", href: "/compare" },
  { label: "For Investors", href: "/investors" },
  { label: "Resale Properties", href: "/resale" },
  { label: "Reels", href: "/reels" },
  { label: "List a Property", href: "/list-property" },
  { label: "Saved", href: "/saved" },
  { label: "My Profile", href: "/profile" },
];

const legalLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

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
  },
];

export default function Footer({
  logoSrc = logo,
  logoAlt = "Value Properties",
}) {
  return (
    <footer className="border-t border-[#0875d1]/10 bg-[#f1f7fd] text-slate-600">
      <div className="mx-auto max-w-[1280px] px-4 pb-6 pt-10 sm:px-6 sm:pt-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-1">
          {/* LEFT: Logo */}
          <div>
            <a
              href="/"
              aria-label="Value Properties home"
              className="inline-flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1f7fd]"
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-10 w-auto sm:h-16"
              />
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Handpicked properties across Mumbai with transparent pricing and
              straight numbers.
            </p>
          </div>

          {/* RIGHT: Quick links + contact */}
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:gap-8">
            {/* Quick links */}
            <nav aria-label="Quick links">
              <h3 className="text-base font-semibold text-[#172d45] sm:text-lg">
                Quick Links
              </h3>

              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-[#0875d1] focus-visible:outline-none focus-visible:text-[#0875d1] sm:text-[15px]"
                    >
                      <ChevronRight
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-[#0875d1] transition-transform group-hover:translate-x-0.5"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact details */}
            <div>
              <h3 className="text-base font-semibold text-[#172d45] sm:text-lg">
                Contact
              </h3>

              <ul className="mt-4 grid gap-4 sm:mt-5">
                {contacts.map((contact) => {
                  const Icon = contact.icon;

                  return (
                    <li key={contact.id}>
                      <a
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noreferrer" : undefined}
                        className="group flex items-start gap-3 focus-visible:outline-none"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0875d1]/10 text-[#0875d1] transition-colors group-hover:bg-[#0875d1] group-hover:text-white group-focus-visible:bg-[#0875d1] group-focus-visible:text-white">
                          <Icon size={16} aria-hidden="true" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-slate-500">
                            {contact.label}
                          </span>
                          <span className="mt-0.5 block break-words text-sm leading-5 text-[#172d45] transition-colors group-hover:text-[#0875d1]">
                            {contact.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#0875d1]/15 pt-6 sm:mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 sm:gap-x-6 sm:text-sm">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-[#0875d1] focus-visible:outline-none focus-visible:text-[#0875d1]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Value Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
