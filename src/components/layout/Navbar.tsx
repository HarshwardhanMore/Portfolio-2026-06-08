"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { href: "#experience", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav id="nav" className={`pnav${scrolled ? " scrolled" : ""}`}>
      <a href="#" className="nav-logo">
        hm.dev
      </a>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <a
              ref={(el) => {
                linkRefs.current[l.href] = el;
              }}
              href={l.href}
              style={active === l.href ? { color: "var(--color-paccent)" } : undefined}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-cta-group">
        <Link href="/cli" className="nav-cli" aria-label="Open CLI mode">
          <span>cli</span>
          <kbd>~</kbd>
        </Link>
        <a href={`mailto:${profile.email}`} className="nav-cta">
          Say Hello →
        </a>
      </div>
    </nav>
  );
}
