import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Building2,
  Wallet,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Search,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const AUTOPLAY_MS = 5500;

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=90",
    alt: "Luxury modern architectural residence",
    eyebrow: "FIND YOUR PERFECT ADDRESS",
    title: "A Better Way to",
    highlight: "Find Your Home.",
    description:
      "Explore handpicked properties across Mumbai with transparent pricing and exclusive deals.",
    buttonText: "Explore Properties",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=2000&q=90",
    alt: "Premium luxury living room",
    eyebrow: "LUXURY THAT SPEAKS FOR ITSELF",
    title: "Live Beyond",
    highlight: "Expectations.",
    description:
      "Discover premium residences designed around your lifestyle, comfort and aspirations.",
    buttonText: "Discover Luxury Homes",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&q=90",
    alt: "Modern residential property",
    eyebrow: "SMART PROPERTY INVESTMENTS",
    title: "Invest Better.",
    highlight: "Live Smarter.",
    description:
      "Find promising real estate opportunities with verified listings and straightforward pricing.",
    buttonText: "Explore Opportunities",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=90",
    alt: "Contemporary residential architecture",
    eyebrow: "YOUR DREAM HOME STARTS HERE",
    title: "The Right Home.",
    highlight: "The Right Deal.",
    description:
      "Compare projects, explore neighbourhoods and make your next property decision with confidence.",
    buttonText: "Find Your Property",
  },
];

const locations = [
  "All Locations",
  "Bandra West",
  "Andheri",
  "Powai",
  "Worli",
  "Juhu",
  "Lower Parel",
  "Thane",
  "Navi Mumbai",
];

const configurations = [
  "Any BHK",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5+ BHK",
];

const budgets = [
  "Any Budget",
  "Under ₹50 Lakhs",
  "₹50L - ₹1 Cr",
  "₹1 Cr - ₹2 Cr",
  "₹2 Cr - ₹5 Cr",
  "₹5 Cr - ₹10 Cr",
  "Above ₹10 Cr",
];

const possessions = [
  "Any Possession",
  "Ready to Move",
  "Under Construction",
  "New Launch",
];

const filterItems = [
  { key: "location", label: "Location", icon: MapPin, options: locations },
  {
    key: "configuration",
    label: "Configuration",
    icon: Building2,
    options: configurations,
  },
  { key: "budget", label: "Your Budget", icon: Wallet, options: budgets },
  {
    key: "possession",
    label: "Possession",
    icon: CalendarDays,
    options: possessions,
  },
];

const stats = [
  { number: "170+", label: "Verified listings" },
  { number: "1000+", label: "Properties ready" },
  { number: "10k+", label: "Happy customers" },
];

const trustPoints = [
  "Carefully selected properties",
  "Transparent pricing",
  "Better deals",
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function PropertySearchHero({ onSearch }) {
  const reduceMotion = useReducedMotion();

  /* ---- Search filters ---- */
  const [filters, setFilters] = useState({
    location: locations[0],
    configuration: configurations[0],
    budget: budgets[0],
    possession: possessions[0],
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
    else console.log("Property Search:", filters);
  };

  /* ---- Slider ---- */
  const total = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const paused = !playing || hovered;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // Preload images
  useEffect(() => {
    HERO_SLIDES.slice(1).forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* ---- Entrance animations ---- */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.05,
      },
    },
  };

  const item = reduceMotion
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section className="bg-white pb-4 pt-4 sm:pb-6 sm:pt-8 md:pb-8 md:pt-12">
      <style>{`
        @keyframes hero-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-[1280px] px-3 sm:px-4 md:px-8"
      >
        {/* HERO SLIDER */}
        <motion.div
          variants={item}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured properties"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="relative h-[400px] overflow-hidden rounded-2xl bg-[#0b2540] sm:h-[480px] sm:rounded-[28px] lg:h-[470px]"
        >
          {/* Background image slider */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -60) next();
              else if (offset.x > 60) prev();
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={HERO_SLIDES[index].src}
                alt={HERO_SLIDES[index].alt}
                draggable={false}
                fetchPriority={index === 0 ? "high" : undefined}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.07 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.9, ease: "easeOut" },
                  scale: {
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="absolute inset-0 h-full w-full select-none object-cover object-center"
              />
            </AnimatePresence>
          </motion.div>

          {/* Image overlays (stronger on mobile for text legibility) */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#071d35]/90 via-[#071d35]/60 to-[#071d35]/20 sm:from-[#071d35]/85 sm:via-[#071d35]/45 sm:to-transparent" />

          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#071d35]/60 via-transparent to-[#071d35]/10 sm:from-[#071d35]/50" />

          {/* SLIDE TEXT CONTENT */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
            <div className="w-full max-w-[750px] px-5 pb-14 sm:px-10 sm:pb-10 md:px-14 lg:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                  }}
                >
                  {/* Eyebrow */}
                  <div className="mb-3 flex items-center gap-2 sm:mb-5 sm:gap-3">
                    <span className="h-[2px] w-6 shrink-0 bg-[#55b6ff] sm:w-8" />

                    <span className="text-[9px] font-bold uppercase tracking-[1.8px] text-white/90 sm:text-xs sm:tracking-[3px]">
                      {HERO_SLIDES[index].eyebrow}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="max-w-[650px] text-[28px] font-extrabold leading-[1.1] tracking-tight text-white min-[400px]:text-[32px] sm:text-5xl md:text-6xl lg:text-[72px]">
                    {HERO_SLIDES[index].title}

                    <span className="block text-[#75c5ff]">
                      {HERO_SLIDES[index].highlight}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 max-w-[300px] text-[13px] leading-5 text-white/85 sm:mt-5 sm:max-w-[480px] sm:text-base sm:leading-7 md:text-lg">
                    {HERO_SLIDES[index].description}
                  </p>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#0875d1] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#0875d1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0875d1] sm:mt-7 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    {HERO_SLIDES[index].buttonText}
                    <ArrowUpRight className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* SLIDER CONTROLS */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-3 sm:gap-4 sm:p-5 md:p-8">
            {/* Progress indicators */}
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
              {HERO_SLIDES.map((slide, i) => {
                const active = i === index;

                return (
                  <button
                    key={slide.src + i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show slide ${i + 1} of ${total}`}
                    aria-current={active ? "true" : undefined}
                    className="group/seg flex h-6 w-7 items-center focus-visible:outline-none sm:w-14"
                  >
                    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-white/35 transition-all group-hover/seg:bg-white/55 group-focus-visible/seg:ring-2 group-focus-visible/seg:ring-white">
                      <span
                        className="block h-full origin-left rounded-full bg-white"
                        style={
                          !active
                            ? { transform: "scaleX(0)" }
                            : reduceMotion
                              ? { transform: "scaleX(1)" }
                              : {
                                  animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                                  animationPlayState: paused
                                    ? "paused"
                                    : "running",
                                }
                        }
                        onAnimationEnd={active ? next : undefined}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Previous / Play / Next */}
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:w-11"
                >
                  {playing ? <Pause size={15} /> : <Play size={15} />}
                </button>
              )}

              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#172d45] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:w-11"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#172d45] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:w-11"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Screen reader announcement */}
          <p className="sr-only" aria-live={paused ? "polite" : "off"}>
            Slide {index + 1} of {total}: {HERO_SLIDES[index].alt}
          </p>
        </motion.div>

        {/* HEADING + SUPPORT */}
        <motion.div
          variants={item}
          className="grid items-center gap-5 py-6 sm:gap-8 md:py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
        >
          <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#172d45] min-[400px]:text-[36px] sm:text-5xl lg:text-[72px] lg:leading-[1.04]">
            Feel the Value
            <br />
            <span className="text-[#0875d1]">In Every Deal.</span>
          </h1>

          <div>
            <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
              Bulk-buying rates and straight numbers on 170+ verified listings
              across Mumbai. Find your next property at the right price.
            </p>

            <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-200 sm:mt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col px-3 first:pl-0 sm:px-6"
                >
                  <dt className="order-2 mt-0.5 text-[11px] leading-4 text-slate-500 sm:mt-1 sm:text-[13px] sm:leading-5">
                    {stat.label}
                  </dt>

                  <dd className="text-xl font-bold tabular-nums tracking-tight text-[#172d45] sm:text-2xl">
                    {stat.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>

        {/* SEARCH PANEL */}
        <motion.div
          variants={item}
          className="relative z-10 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(11,37,64,0.3)] sm:rounded-3xl sm:p-3"
        >
          {/* 2 x 2 on mobile, 4 + button in one row on desktop */}
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-center lg:gap-0">
            {filterItems.map((field, fieldIndex) => {
              const Icon = field.icon;
              const value = filters[field.key];
              const isDefault = value === field.options[0];

              return (
                <label
                  key={field.key}
                  className={`group relative flex min-w-0 cursor-pointer flex-col items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 transition-colors hover:bg-slate-50 focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-[#0875d1]/40 sm:flex-row sm:items-center sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 lg:border-transparent lg:bg-transparent ${
                    fieldIndex !== filterItems.length - 1
                      ? "lg:after:absolute lg:after:right-0 lg:after:top-1/4 lg:after:h-1/2 lg:after:w-px lg:after:bg-slate-200"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-2 sm:contents">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0875d1]/10 text-[#0875d1] transition-colors group-hover:bg-[#0875d1] group-hover:text-white sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 sm:h-[19px] sm:w-[19px]" />
                    </span>

                    {/* Label sits beside the icon on mobile */}
                    <span className="text-[11px] font-medium text-slate-500 sm:hidden">
                      {field.label}
                    </span>
                  </span>

                  <span className="min-w-0 w-full flex-1">
                    <span className="hidden text-xs font-medium text-slate-500 sm:block">
                      {field.label}
                    </span>

                    <span className="flex items-center justify-between gap-1.5 sm:mt-0.5 sm:gap-2">
                      <span
                        className={`truncate text-[13px] sm:text-[15px] ${
                          isDefault
                            ? "font-medium text-slate-500"
                            : "font-semibold text-[#172d45]"
                        }`}
                      >
                        {value}
                      </span>

                      <ChevronDown
                        size={14}
                        className="shrink-0 text-slate-400 transition-transform group-focus-within:rotate-180 sm:h-4 sm:w-4"
                      />
                    </span>
                  </span>

                  {/* Native select */}
                  <select
                    aria-label={field.label}
                    value={value}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}

            <button
              type="button"
              onClick={handleSearch}
              className="col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0875d1] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0875d1]/25 transition hover:bg-[#075eae] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2 sm:h-14 sm:rounded-2xl sm:px-8 sm:text-base lg:col-span-1 lg:ml-2"
            >
              <Search size={17} />
              Search properties
            </button>
          </div>
        </motion.div>

        {/* TRUST ROW */}
        <motion.ul
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-600 sm:mt-16 sm:flex-row sm:text-sm"
        >
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-[#0875d1]" />
              {point}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
