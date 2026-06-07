import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-xs font-mono uppercase tracking-widest text-portfolio-accent mb-12">
        Execution History
      </h2>
      <div className="space-y-16">
        {experience.map((role) => (
          <div key={role.title + role.period} className="relative pl-8 border-l border-white/10">
            <div
              className={`absolute -left-1.5 top-1 size-3 rounded-full ${
                role.accent ? "bg-portfolio-accent" : "bg-white/20"
              }`}
            />
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
              <h3 className="text-xl font-bold text-white">{role.title}</h3>
              <span className="font-mono text-sm text-zinc-500">{role.period}</span>
            </div>
            <p className="font-mono text-xs text-zinc-400 mb-5">{role.company}</p>
            <ul className="space-y-3 text-zinc-400 text-pretty max-w-3xl">
              {role.bullets.map((b, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="text-portfolio-accent mr-3">›</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {role.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
