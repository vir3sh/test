import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X, BadgeCheck } from "lucide-react";
import bgImage from "../assets/hero-bg.jpg";
/* ----------------------------- content ----------------------------- */

const NAV_LINKS = [
  { label: "Compare Projects", href: "/compare" },
  { label: "Learning Centre", href: "/learning-centre" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const FIELDS = [
  {
    name: "location",
    label: "Location",
    placeholder: "Select location",
    options: ["Bandra", "Powai", "Worli", "Parel", "Andheri", "Thane"],
  },
  {
    name: "config",
    label: "Configuration",
    placeholder: "Select BHK",
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"],
  },
  {
    name: "budget",
    label: "Budget",
    placeholder: "Select budget",
    options: ["₹1 – 3 Cr", "₹3 – 5 Cr", "₹5 – 10 Cr", "₹10 – 20 Cr", "₹20 Cr+"],
  },
  {
    name: "possession",
    label: "Possession",
    placeholder: "Select possession",
    options: ["Ready to move", "Within 1 year", "Within 2 years", "3+ years"],
  },
];

const GRADIENT_FALLBACK =
  "linear-gradient(180deg,#8DB8E3 0%,#C5DBEE 55%,#EAF0F6 100%)";


function HouseGlyph() {
  return (
    <svg viewBox="0 0 80 64" className="h-full w-full" aria-hidden="true">
      <rect width="80" height="64" fill="#EAF0FF" />
      <rect x="0" y="48" width="80" height="16" fill="#C9D8FB" />
      <path d="M14 48V28L40 12l26 16v20z" fill="#0F1F4B" />
      <rect x="22" y="30" width="14" height="10" rx="1.5" fill="#FFD27A" />
      <rect x="44" y="30" width="14" height="10" rx="1.5" fill="#FFD27A" />
      <rect x="35" y="38" width="10" height="10" rx="1.5" fill="#F97316" />
    </svg>
  );
}

function InlineThumb({ src }) {
  return (
    <span className="mx-1 inline-block h-[0.8em] w-[1.3em] overflow-hidden rounded-[0.28em] align-middle shadow-lg ring-2 ring-white/70 md:mx-2">
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <HouseGlyph />
      )}
    </span>
  );
}

/* Floating pill with a dot, like "Buy Property" in the reference */
function Tag({ label, href = "#", dot = "left", className = "" }) {
  const dotEl = (
    <span className="h-2.5 w-2.5 rounded-full bg-[#0F1F4B] ring-4 ring-white/50" />
  );
  return (
    <a
      href={href}
      className={`absolute hidden items-center gap-1.5 transition-transform hover:-translate-y-0.5 md:flex ${className}`}
    >
      {dot === "left" && dotEl}
      <span className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-900 shadow-md">
        {label}
      </span>
      {dot === "right" && dotEl}
    </a>
  );
}

function Field({ label, name, value, onChange, options, placeholder }) {
  return (
    <label className="relative block cursor-pointer rounded-2xl px-4 py-3 transition-colors focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-[#2563EB]/40 hover:bg-slate-50">
      <span className="block text-xs text-slate-500">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-medium outline-none ${
          value ? "text-slate-900" : "text-slate-400"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-slate-900">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </label>
  );
}


export default function HeroSearch({
  brand = "Value Properties",
  bgPosition = "center 40%", // focal point: "left center", "center 70%", etc.
  inlineImage = "", // optional small house photo shown inside the headline
  onSearch, // (payload) => void   e.g. navigate(`/properties?${new URLSearchParams(payload)}`)
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("buy");
  const [filters, setFilters] = useState({
    location: "",
    config: "",
    budget: "",
    possession: "",
  });

  const update = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(
      Object.entries({ mode, ...filters }).filter(([, v]) => v),
    );
    onSearch?.(payload);
  };

  return (
    <section className="p-3 md:p-4">
      <div
        className="relative flex min-h-[780px] flex-col overflow-hidden rounded-[28px]"
        style={{ background: GRADIENT_FALLBACK }} // shows if the photo is missing
      >
        {/* landscape background photo */}
        <img
          src={bgImage}
          alt=""
          decoding="async"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: bgPosition }}
        />

        {/* contrast overlay so white text stays readable on a bright sky */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0F1F4B]/35 via-[#0F1F4B]/5 to-[#0F1F4B]/40"
          aria-hidden="true"
        />

      
        <header className="relative z-30 flex items-center justify-between px-5 py-5 md:px-10">
          <a href="/" className="text-lg font-bold tracking-tight text-white">
            {brand}
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/90 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-white hover:underline underline-offset-4"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/addproperty"
              className="hidden rounded-full border border-white/70 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-[#0F1F4B] md:inline-flex"
            >
              List a Property
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {menuOpen && (
            <div className="absolute inset-x-4 top-[76px] rounded-2xl bg-white p-3 shadow-xl md:hidden">
              {[
                ...NAV_LINKS,
                { label: "List a Property", href: "/addproperty" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </header>

     
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-6 text-center">
          <h1 className="text-[44px] font-semibold leading-[1.08] tracking-tight drop-shadow-[0_2px_14px_rgba(15,31,75,0.25)] sm:text-6xl md:text-7xl lg:text-[84px]">
            <span className="block">
              <span className="text-white/70">Feel the </span>
              <span className="text-white">Value</span>
            </span>
            <span className="block">
              <span className="text-white/70">In Every</span>
              <InlineThumb src={inlineImage} />
              <span className="text-white">Deal.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            Bulk-buying rates and straight numbers on 170+ verified listings
            across Mumbai.
          </p>
        </div>

       
        <Tag
          label="Buy Property"
          href="/properties?mode=buy"
          dot="left"
          className="right-[24%] top-[30%]"
        />
        <Tag
          label="Sell Property"
          href="/addproperty"
          dot="right"
          className="left-[10%] top-[55%]"
        />
        <Tag
          label="Rent Property"
          href="/properties?mode=rent"
          dot="left"
          className="right-[9%] top-[64%]"
        />

       
        <div className="relative z-20 px-3 pb-3 md:px-6 md:pb-6">
          <div className="mb-3 flex justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-800 backdrop-blur">
              <BadgeCheck
                className="h-4 w-4 text-[#2563EB]"
                aria-hidden="true"
              />
              1000+ families served
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-3 shadow-2xl md:p-4"
          >
            {/* Buy / Rent toggle */}
            <div
              role="radiogroup"
              aria-label="Search type"
              className="mb-3 inline-flex rounded-full bg-slate-100 p-1"
            >
              {["buy", "rent"].map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-5 py-1.5 text-sm font-medium capitalize transition-colors ${
                    mode === m
                      ? "bg-[#0F1F4B] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
              <div className="grid flex-1 grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x">
                {FIELDS.map((f) => (
                  <Field
                    key={f.name}
                    {...f}
                    value={filters[f.name]}
                    onChange={update}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F1F4B] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                Search
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
