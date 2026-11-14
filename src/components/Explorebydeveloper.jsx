import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import lodha from "../assets/lodha.webp";
import godrej from "../assets/godrej.webp";
import kalpa from "../assets/kalpa.webp";
import palkoji from "../assets/palkoji.webp";
import rustomjee from "../assets/rustomjees.jpg";
import runwal from "../assets/runwal.webp";

const developers = [
  { id: "lodha", name: "Lodha Group", years: "45+", projects: 70, logo: lodha },
  {
    id: "godrej",
    name: "Godrej Properties",
    years: "35+",
    projects: 90,
    logo: godrej,
  },
  {
    id: "rustomjee",
    name: "Rustomjee Builders",
    years: "28+",
    projects: 41,
    logo: rustomjee,
  },
  {
    id: "kalpataru",
    name: "Kalpataru Group",
    years: "50+",
    projects: 100,
    logo: kalpa,
  },
  {
    id: "runwal",
    name: "Runwal Developers",
    years: "45+",
    projects: 50,
    logo: runwal,
  },
  {
    id: "shapoorji",
    name: "Shapoorji Pallonji",
    years: "170+",
    projects: 50,
    logo: palkoji,
  },
];

const resolveSrc = (img) => (typeof img === "string" ? img : img?.src);

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

function LogoPlate({ developer }) {
  const [failed, setFailed] = useState(false);
  const src = resolveSrc(developer.logo);

  return (
    <div className="grid h-24 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#f7fafd] to-[#e8f0f8]">
      {src && !failed ? (
        <img
          src={src}
          alt={`${developer.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          // multiply blends a white logo background into the plate
          className="max-h-12 w-auto max-w-[75%] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-serif text-2xl font-semibold text-[#0875d1]/70"
        >
          {initials(developer.name)}
        </span>
      )}
    </div>
  );
}


export default function ExploreByDeveloper({ onSelect }) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };
  const card = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#172d45] md:text-4xl lg:text-5xl">
            Explore by Developer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
            Track record first — who's actually building it.
          </p>
        </div>

        {/* Developer cards: 2 → 3 → 6 across */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6"
        >
          {developers.map((developer) => (
            <motion.li key={developer.id} variants={card}>
              <a
                href={developer.href ?? `/developers/${developer.id}`}
                onClick={(event) => {
                  if (onSelect) {
                    event.preventDefault();
                    onSelect(developer);
                  }
                }}
                className="group block h-full rounded-3xl bg-white p-2 ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:ring-[#0875d1]/40 hover:shadow-[0_18px_40px_-16px_rgba(8,117,209,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
              >
                <LogoPlate developer={developer} />

                <div className="px-1.5 pb-1 pt-3">
                  <h3
                    title={developer.name}
                    className="flex items-center gap-1 text-sm font-semibold text-[#172d45] transition-colors group-hover:text-[#0875d1]"
                  >
                    <span className="truncate">{developer.name}</span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </h3>

                  <dl className="mt-2.5 grid grid-cols-2 divide-x divide-slate-200 rounded-xl bg-[#f6f9fc] py-2 text-center">
                    <div className="flex flex-col-reverse">
                      <dt className="text-[11px] text-slate-500">Projects</dt>
                      <dd className="text-lg font-bold tabular-nums leading-tight text-[#172d45]">
                        {developer.projects}
                      </dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-[11px] text-slate-500">Years</dt>
                      <dd className="text-lg font-bold tabular-nums leading-tight text-[#172d45]">
                        {developer.years}
                      </dd>
                    </div>
                  </dl>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
