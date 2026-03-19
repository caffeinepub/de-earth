import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const navLinks = [
  { label: "Works", to: "/works" },
  { label: "Office", to: "/office" },
  { label: "Archives", to: "/archives" },
  { label: "Contact", to: "/contact" },
];

import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const prevPath = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== prevPath.current) {
    prevPath.current = pathname;
    setMenuOpen(false);
  }

  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-lg tracking-wide text-foreground hover:text-primary transition-colors"
            data-ocid="nav.link"
          >
            de earth
          </Link>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`font-sans text-sm tracking-widest uppercase transition-colors ${
                  pathname.startsWith(link.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.menu_button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-5"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  className="font-sans text-sm tracking-widest uppercase text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border mt-24 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <span className="font-serif text-lg text-foreground">de earth</span>
            <span className="font-sans text-sm text-muted-foreground italic">
              Nurture. Create. Belong.
            </span>
            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <p className="font-sans text-xs text-muted-foreground">
              © {year} de earth. Kerala, India. All rights reserved.
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              Built with <span aria-hidden="true">♥</span> using{" "}
              <a
                href={utm}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
