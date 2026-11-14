import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Heart,
  BadgeCheck,
  Ruler,
} from "lucide-react";

const phoneNumber = "919876543210";

const properties = [
  {
    id: 1,
    name: "DLH Signature",
    location: "Bandra West",
    price: "₹5.75 Cr",
    area: "920 sq.ft.",
    status: "Under Construction",
    type: "Luxury Apartments",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
    ],
    tag: "Premium",
  },
  {
    id: 2,
    name: "Pantheon Palmera",
    location: "Bandra West",
    price: "₹15 Cr",
    area: "2090 sq.ft.",
    status: "Ready to Move",
    type: "Luxury Apartments",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900",
    ],

    tag: "Featured",
  },
  {
    id: 3,
    name: "The Grand Residences",
    location: "Bandra West",
    price: "₹8.25 Cr",
    area: "1450 sq.ft.",
    status: "Under Construction",
    type: "Premium Apartments",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
    ],
    tag: "New Launch",
  },
  {
    id: 4,
    name: "Ocean Heights",
    location: "Mahim",
    price: "₹4.50 Cr",
    area: "1100 sq.ft.",
    status: "Ready to Move",
    type: "Luxury Apartments",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
    tag: "Featured",
  },
  {
    id: 5,
    name: "The Imperial",
    location: "Mahim",
    price: "₹6.80 Cr",
    area: "1650 sq.ft.",
    status: "Under Construction",
    type: "Premium Apartments",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900",
    tag: "Premium",
  },
  {
    id: 6,
    name: "Skyline Towers",
    location: "Dadar",
    price: "₹3.90 Cr",
    area: "980 sq.ft.",
    status: "Ready to Move",
    type: "Apartments",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
    tag: "New Launch",
  },
  {
    id: 7,
    name: "Palm Springs",
    location: "Parel",
    price: "₹5.20 Cr",
    area: "1250 sq.ft.",
    status: "Under Construction",
    type: "Luxury Apartments",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900",
    tag: "Featured",
  },
  {
    id: 8,
    name: "Urban Crest",
    location: "Worli",
    price: "₹12 Cr",
    area: "1800 sq.ft.",
    status: "Ready to Move",
    type: "Luxury Apartments",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
    tag: "Premium",
  },
  {
    id: 9,
    name: "LBS Grand",
    location: "LBS Marg, Vikhroli West",
    price: "₹2.75 Cr",
    area: "850 sq.ft.",
    status: "Under Construction",
    type: "Apartments",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900",
    tag: "New Launch",
  },
];

const locations = [
  "All",
  "Bandra West",
  "Mahim",
  "Dadar",
  "Parel",
  "LBS Marg, Vikhroli West",
  "Worli",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

// Add an `images: [...]` array to a property to use real gallery photos.
// Until then the card gets two random placeholders after the main image.
const getGallery = (property) =>
  property.images?.length
    ? property.images
    : [
        property.image,
        `https://picsum.photos/seed/vp-${property.id}-b/900/700`,
        `https://picsum.photos/seed/vp-${property.id}-c/900/700`,
      ];

const statusDot = (status) =>
  status === "Ready to Move"
    ? "bg-emerald-500"
    : status === "Under Construction"
      ? "bg-amber-500"
      : "bg-[#0875d1]";

function PropertyCard({ property }) {
  const gallery = useMemo(() => getGallery(property), [property]);
  const [slide, setSlide] = useState(0);
  const [saved, setSaved] = useState(false);

  const go = (step) =>
    setSlide((current) => (current + step + gallery.length) % gallery.length);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group rounded-[28px] bg-white p-2.5 shadow-[0_8px_30px_rgba(23,45,69,0.06)] ring-1 ring-slate-200/70 transition-shadow duration-300 hover:shadow-[0_24px_50px_-12px_rgba(8,117,209,0.28)]"
    >
      {/* Image */}
      <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-slate-100">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <AnimatePresence initial={false}>
            <motion.img
              key={slide}
              src={gallery[slide]}
              alt={`${property.name}, photo ${slide + 1} of ${gallery.length}`}
              loading="lazy"
              draggable={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b2540]/70 via-transparent to-black/10" />

        {/* Price */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-bold text-[#172d45] shadow-sm backdrop-blur">
          {property.price}
          <span className="ml-1 text-xs font-medium text-slate-500">
            onwards
          </span>
        </span>

        {/* Save */}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${property.name} from saved`
              : `Save ${property.name}`
          }
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#172d45] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
        >
          <Heart
            size={18}
            className={`transition ${saved ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </button>

        {/* Photo arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#172d45] opacity-0 shadow-sm transition hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#172d45] opacity-0 shadow-sm transition hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots + title */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="pointer-events-auto mb-2 flex items-center gap-1">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === slide ? "true" : undefined}
                className="flex h-4 items-center focus-visible:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === slide ? "w-5 bg-white" : "w-1.5 bg-white/55"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-end justify-between gap-3">
            <h3 className="font-serif text-xl font-semibold leading-tight">
              {property.name}
            </h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium backdrop-blur-md">
              <BadgeCheck size={14} />
              {property.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-3 pb-3 pt-4">
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="shrink-0 text-[#0875d1]" />
          <span className="truncate">
            {property.location}
            <span className="text-slate-300"> · </span>
            {/* {property.type} */}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <Ruler size={16} className="text-[#0875d1]" />
            <span className="sr-only">Carpet area:</span>
            {property.area}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${statusDot(property.status)}`}
            />
            {property.status}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => console.log("Property details:", property.id)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0875d1] px-4 text-sm font-semibold text-white shadow-md shadow-[#0875d1]/20 transition-colors hover:bg-[#075eae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2"
          >
            View Details
            <ArrowUpRight size={16} />
          </button>

          <a
            href={`tel:+${phoneNumber}`}
            aria-label={`Call about ${property.name}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-200 text-[#172d45] transition-colors hover:border-[#172d45] hover:bg-[#172d45] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#172d45]"
          >
            <Phone size={17} />
          </a>

          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              `Hi, I'm interested in ${property.name}`,
            )}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Chat on WhatsApp about ${property.name}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e9f8ef] text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function PremiumProperties() {
  const [activeLocation, setActiveLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const filteredProperties =
    activeLocation === "All"
      ? properties
      : properties.filter((property) => property.location === activeLocation);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getCount = (location) => {
    if (location === "All") return properties.length;

    return properties.filter((property) => property.location === location)
      .length;
  };

  const changeLocation = (location) => {
    setActiveLocation(location);
    setCurrentPage(1);
  };

  return (
    <section className="relative overflow-hidden bg-white py-2 md:py-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#0875d1]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-[#172d45]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[3px] text-[#0875d1]">
            Find Your Dream Home
          </span>

          <h2 className="font-serif text-3xl font-medium text-[#172d45] md:text-4xl lg:text-5xl">
            Properties by{" "}
            <span className="text-[#0875d1]">Premium Locations</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
            Explore exceptional properties in Mumbai's most desirable
            neighbourhoods.
          </p>
        </motion.div>

        {/* Location Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-start gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center"
        >
          {locations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => changeLocation(location)}
              aria-pressed={activeLocation === location}
              className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] ${
                activeLocation === location
                  ? "border-[#172d45] bg-[#172d45] text-white shadow-lg shadow-[#172d45]/15"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0875d1] hover:text-[#0875d1]"
              }`}
            >
              {location === "All" ? (
                <Building2 size={14} />
              ) : (
                <MapPin size={13} />
              )}

              {location}

              <span className="opacity-70">({getCount(location)})</span>
            </button>
          ))}
        </motion.div>

        {/* Property Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeLocation}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {visibleProperties.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            No properties found.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex items-center justify-center gap-5"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#172d45] transition-all hover:bg-[#172d45] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#172d45]"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-slate-400">
              <span className="font-bold text-[#172d45]">{currentPage}</span>
              {" / "}
              {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#172d45] transition-all hover:bg-[#172d45] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#172d45]"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
