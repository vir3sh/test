import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Compass, Scale, PiggyBank } from "lucide-react";


const unsplash = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const values = [
  {
    id: "rera",
    title: ["RERA", "Verified"],
    text: "Every project checked and registration confirmed before it ever reaches you.",
    icon: ShieldCheck,
    image: {
      src: unsplash("photo-1450101499163-c8848c66ca85"),
      alt: "Property documents being reviewed and signed at a desk",
    },
  },
  {
    id: "expert",
    title: ["Expert", "Advice"],
    text: "Real advisors who know Mumbai real estate — not just a listings database.",
    icon: Compass,
    image: {
      src: unsplash("photo-1573496359142-b8d87734a5a2"),
      alt: "Confident property advisor in a blazer",
    },
  },
  {
    id: "neutral",
    title: ["Neutral", "Opinion"],
    text: "Honest pros and cons on every project. We're not paid to only show the good parts.",
    icon: Scale,
    image: {
      src: unsplash("photo-1556761175-5973dc0f32e7"),
      alt: "Team discussing options openly around a table",
    },
  },
  {
    id: "bulk",
    title: ["Bulk Buying", "Rates"],
    text: "Group buying power gets our clients better deals than going it alone.",
    icon: PiggyBank,
    image: {
      src: unsplash("photo-1545324418-cc1a3fa10c00"),
      alt: "Residential towers in a large apartment complex",
    },
  },
];


function TextTile({ value, variants }) {
  const Icon = value.icon;

  return (
    <motion.div
      variants={variants}
      className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-[#edf6ff] via-[#e5f1fc] to-[#dcecff] p-6 ring-1 ring-[#0875d1]/10 sm:min-h-[320px] sm:p-8"
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#0875d1]/[0.06]"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <span className="mb-4 inline-block h-1 w-10 rounded-full bg-[#0875d1]" />

          <h3 className="font-serif text-[28px] font-semibold leading-[1.15] tracking-tight text-[#172d45] sm:text-[32px]">
            {value.title[0]}
            <br />
            <span className="text-[#0875d1]">{value.title[1]}</span>
          </h3>
        </div>

        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#0875d1] shadow-sm ring-1 ring-[#0875d1]/10">
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>

      <div className="relative z-10">
        <p className="max-w-[30ch] text-sm leading-7 text-slate-600 sm:text-base">
          {value.text}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0875d1]" />
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#0875d1]">
            Value Properties
          </span>
        </div>
      </div>
    </motion.div>
  );
}


function ImageTile({ value, variants }) {
  const [failed, setFailed] = useState(false);
  const Icon = value.icon;

  return (
    <motion.div
      variants={variants}
      className="group relative min-h-[280px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#dcecff] to-[#a9c9e9] ring-1 ring-[#0875d1]/10 sm:min-h-[320px]"
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-[#0875d1]/50">
          <Icon size={64} strokeWidth={1.25} aria-hidden="true" />
        </div>
      ) : (
        <img
          src={value.image.src}
          alt={value.image.alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Image overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102d4b]/25 via-transparent to-transparent opacity-70" />

      {/* Image hover accent */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
    </motion.div>
  );
}


export default function WhyValueProperties() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const tile = reduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section className="bg-[#f5f9fd] py-6 md:py-10">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2.5px] text-[#0875d1]">
            <span className="h-px w-7 bg-[#0875d1]" />
            The Value Difference
            <span className="h-px w-7 bg-[#0875d1]" />
          </span>

          <h2 className="font-serif text-3xl font-bold text-[#172d45] md:text-4xl lg:text-5xl">
            Why Value Properties
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
            Discover the key advantages of investing with us.
          </p>
        </div>

        {/* Tiles */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {values.map((value) => (
            <div
              key={value.id}
              className="grid gap-3 rounded-[26px] bg-[#eaf3fc] p-3 shadow-[0_12px_40px_-25px_rgba(23,45,69,0.3)] ring-1 ring-[#0875d1]/10 sm:grid-cols-2 sm:gap-3 sm:p-3"
            >
              <ImageTile value={value} variants={tile} />
              <TextTile value={value} variants={tile} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
