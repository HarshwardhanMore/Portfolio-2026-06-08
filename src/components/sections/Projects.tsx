import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-24 bg-panel/50 rounded-3xl mb-24"
    >
      <h2 className="text-xs font-mono uppercase tracking-widest text-portfolio-accent mb-12 text-center">
        Selected Systems
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="w-full aspect-video bg-zinc-900 outline-1 -outline-offset-1 outline-white/5 rounded-xl overflow-hidden mb-6 group-hover:outline-portfolio-accent/50 transition-all">
              <img
                src={p.cover}
                alt={`${p.name} — ${p.tag}`}
                width={1280}
                height={704}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              {p.tag}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
            <p className="text-zinc-400 mb-4 text-pretty">{p.description}</p>
            <div className="flex flex-wrap gap-3 text-[10px] font-mono">
              {p.stack.map((s) => (
                <span key={s} className="px-2 py-1 bg-white/5 rounded text-zinc-400">
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
