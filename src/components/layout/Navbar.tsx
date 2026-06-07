const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm font-bold tracking-tighter text-white">
          HM_SYSTEMS
        </a>
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-portfolio-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
