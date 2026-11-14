import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BedDouble,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";


const PAGE_SIZE = 3;
const PHONE = "+919999999999"; // TODO: your number
const WHATSAPP = "919999999999"; // TODO: your number, country code first, no "+"

const LOCATIONS = [
  { name: "Bandra West", count: 6 },
  { name: "Mahim", count: 5 },
  { name: "Dadar", count: 5 },
  { name: "Parel", count: 5 },
  { name: "LBS Marg, Vikhroli West", count: 4 },
  { name: "Worli", count: 3 },
];

const PROJECT_NAMES = [
  "DLH Signature",
  "Pantheion Palmera",
  "Sea Crest Residences",
  "Aurum Heights",
  "The Linking Towers",
  "Lotus Bayview",
  "Orchid Skyline",
  "Marina Court",
  "Regal Enclave",
  "Westbrook Park",
  "Harbour One",
  "Zenith Arcade",
  "Ivory Terraces",
  "Monsoon Greens",
  "Crestwood Manor",
  "Solitaire Grand",
  "Palm Meridian",
  "Opal Vista",
  "Kingsway Towers",
  "Azure Heights",
  "Silverleaf Residency",
  "Cascade Square",
  "Imperial Nest",
  "The Wellington",
  "Juhu Breeze",
  "Mirage One",
  "Ocean Pearl",
  "Elysian Tower",
];

const STATUSES = [
  { label: "Under Construction", dot: "bg-amber-500" },
  { label: "Ready to Move", dot: "bg-emerald-500" },
  { label: "New Launch", dot: "bg-blue-500" },
];

const CONFIGS = ["2 BHK", "2, 3 BHK", "3 BHK", "3, 4 BHK", "4 BHK"];
const PRICES = [
  "₹2.40 Cr",
  "₹3.85 Cr",
  "₹5.75 Cr",
  "₹8.20 Cr",
  "₹11.5 Cr",
  "₹15 Cr",
];
const AREAS = [
  "620+ sq.ft",
  "920+ sq.ft",
  "1240+ sq.ft",
  "1680+ sq.ft",
  "2090+ sq.ft",
];
const POSSESSION = ["Dec 2026", "Jun 2027", "Dec 2027", "Mar 2028", "Ready"];

// Deterministic "random" data so the cards don't reshuffle on every render
function buildProjects() {
  let n = 0;
  return LOCATIONS.flatMap(({ name: location, count }) =>
    Array.from({ length: count }, () => {
      const i = n++;
      const status = STATUSES[i % STATUSES.length];
      return {
        id: i,
        name: PROJECT_NAMES[i % PROJECT_NAMES.length],
        location,
        status,
        config: CONFIGS[(i * 2) % CONFIGS.length],
        price: PRICES[(i * 5) % PRICES.length],
        area: AREAS[(i * 3) % AREAS.length],
        possession:
          status.label === "Ready to Move"
            ? "Ready"
            : POSSESSION[i % (POSSESSION.length - 1)],
        // random placeholder image – swap with your real project photo
        image: `https://picsum.photos/seed/property-${i}/900/700`,
      };
    }),
  );
}


function PropertyCard({ project, saved, onToggleSave }) {
  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${project.name}, ${project.location}.`,
  );

  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_18px_40px_-18px_rgba(30,58,138,0.25)] ring-1 ring-slate-200/80">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-slate-100">
        <img
          src={project.image}
          alt={`${project.name} in ${project.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* Status */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${project.status.dot}`} />
          {project.status.label}
        </span>

        {/* Save */}
        <button
          type="button"
          onClick={() => onToggleSave(project.id)}
          aria-pressed={saved}
          aria-label={
            saved ? `Remove ${project.name} from saved` : `Save ${project.name}`
          }
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Heart
            className={`h-4 w-4 transition ${saved ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-xs text-white/75">Starting at</p>
          <p className="font-serif text-2xl font-semibold leading-none">
            {project.price}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="font-serif text-xl font-semibold text-[#14224f]">
          {project.name}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-blue-600" />
          {project.location}
        </p>

        {/* Specs */}
        <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-slate-50 py-3 text-center">
          <Spec icon={BedDouble} label="Config" value={project.config} />
          <Spec icon={Ruler} label="Area" value={project.area} />
          <Spec
            icon={CalendarClock}
            label="Possession"
            value={project.possession}
          />
        </dl>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <a
            href="#"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            View details
          </a>
          <a
            href={`tel:${PHONE}`}
            aria-label={`Call about ${project.name}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-blue-200 text-blue-600 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Chat on WhatsApp about ${project.name}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2">
      <Icon className="mb-0.5 h-4 w-4 text-blue-600" />
      <dt className="text-[11px] text-slate-400">{label}</dt>
      <dd className="text-[13px] font-semibold text-slate-800">{value}</dd>
    </div>
  );
}


export default function PropertiesByLocation() {
  const projects = useMemo(buildProjects, []);
  const reduceMotion = useReducedMotion();

  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0].name);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [saved, setSaved] = useState(() => new Set());

  const filtered = useMemo(
    () => projects.filter((p) => p.location === activeLocation),
    [projects, activeLocation],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const goToPage = (next) => {
    if (next < 0 || next >= totalPages || next === page) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const selectLocation = (name) => {
    if (name === activeLocation) return;
    setActiveLocation(name);
    setDirection(1);
    setPage(0);
  };

  const toggleSave = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const slide = reduceMotion ? 0 : 48;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#14224f] sm:text-4xl">
            Properties by Premium Locations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Explore top locations and find your dream property in the best
            areas.
          </p>
        </header>

        {/* Location tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Property locations"
            className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1.5 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {LOCATIONS.map(({ name, count }) => {
              const active = name === activeLocation;
              return (
                <button
                  key={name}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => selectLocation(name)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {name}
                  <span
                    className={`ml-1.5 text-xs ${active ? "text-blue-100" : "text-slate-400"}`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeLocation}-${page}`}
              role="tabpanel"
              initial={{ opacity: 0, x: direction * slide }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * slide }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((project) => (
                <PropertyCard
                  key={project.id}
                  project={project}
                  saved={saved.has(project.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToPage(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? "page" : undefined}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    i === page
                      ? "w-7 bg-blue-600"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="Next page"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
