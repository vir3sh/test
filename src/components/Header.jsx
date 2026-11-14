import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bookmark,
  UserRound,
  Plus,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.webp";

const leftLinks = [
  { label: "Compare Projects", href: "/compare" },
  { label: "Learning Centre", href: "/learning-centre" },
  { label: "Blog", href: "/coming-soon" },
  { label: "Contact Us", href: "/contact" },
];

const rightLinks = [
  {
    label: "Reels",
    href: "/coming-soon",
    badge: "Coming Soon",
  },
  {
    label: "List a Property",
    href: "/addproperty",
    badge: "FREE",
    icon: Plus,
  },
  {
    label: "Saved",
    href: "/dashboard/saved-properties",
    icon: Bookmark,
  },
  {
    label: "Profile",
    href: "/dashboard",
    icon: UserRound,
  },
];

const allLinks = [...leftLinks, ...rightLinks];

const MotionLink = motion(Link);

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const mobileVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // CLOSE MOBILE MENU WHEN ROUTE CHANGES
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // HEADER SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ACTIVE ROUTE CHECK
  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <MotionLink
        to={item.href}
        variants={linkVariants}
        onClick={() => setMenuOpen(false)}
        aria-current={active ? "page" : undefined}
        className={`group relative flex items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-medium tracking-[0.1px] transition-colors duration-300 ${
          active ? "text-[#0875d1]" : "text-[#344256] hover:text-[#0875d1]"
        }`}
      >
        {Icon && (
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              active
                ? "bg-[#e5f2ff] text-[#0875d1]"
                : "bg-[#f3f7fb] group-hover:bg-[#e5f2ff]"
            }`}
          >
            <Icon size={15} strokeWidth={1.8} />
          </span>
        )}

        <span>{item.label}</span>

        {item.badge && (
          <span
            className={`ml-0.5 rounded-full px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide ${
              item.badge === "FREE"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-[#0875d1]"
            }`}
          >
            {item.badge}
          </span>
        )}

        {/* HOVER / ACTIVE UNDERLINE */}
        <span
          className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#0875d1] transition-all duration-300 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </MotionLink>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-100 bg-white/95 shadow-[0_5px_25px_rgba(20,45,70,0.07)] backdrop-blur-xl"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8 xl:px-12">
     
        <div className="hidden h-[86px] items-center lg:grid lg:grid-cols-[1fr_auto_1fr]">
        
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-end gap-5 xl:gap-7"
          >
            {leftLinks.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </motion.nav>

          {/* CENTER LOGO */}

          <Link
            to="/"
            className="group mx-8 flex shrink-0 items-center justify-center xl:mx-12"
          >
            <img
              src={logo}
              alt="Value Properties"
              className="h-[52px] w-auto max-w-[175px] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </Link>

        
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-start gap-5 xl:gap-7"
          >
            {rightLinks.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </motion.nav>
        </div>

      
        <div className="flex h-[72px] items-center justify-between lg:hidden">
          {/* MOBILE LOGO */}

          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Value Properties"
              className="h-12 w-auto max-w-[160px] object-contain"
            />
          </Link>

        
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#172d45] transition-all hover:border-[#0875d1] hover:text-[#0875d1]"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.8,
                }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

      
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              variants={mobileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden lg:hidden"
            >
              <nav className="border-t border-gray-100 py-3">
                {allLinks.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.035,
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-blue-50 text-[#0875d1]"
                            : "text-[#344256] hover:bg-blue-50 hover:text-[#0875d1]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f1f6fb] text-[#0875d1]">
                            {Icon ? (
                              <Icon size={17} />
                            ) : (
                              <ArrowUpRight size={17} />
                            )}
                          </span>

                          {item.label}
                        </span>

                        <span className="flex items-center gap-2">
                          {item.badge && (
                            <span
                              className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                                item.badge === "FREE"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-blue-50 text-[#0875d1]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}

                          <ChevronRight size={16} className="text-gray-400" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
