import { skillGroups, skillsExtended } from "@/data/skills";

const dotClass = {
  accent: "bg-portfolio-accent",
  success: "bg-success",
  muted: "bg-zinc-400",
} as const;

export function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-xs font-mono uppercase tracking-widest text-portfolio-accent mb-12">
        Technical Stack
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {skillGroups.map((group) => (
          <div key={group.heading}>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className={`size-2 rounded-full ${dotClass[group.dot]}`} />
              {group.heading}
            </h3>
            <div className="space-y-3 font-mono text-sm">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between border-b border-white/5 pb-2"
                >
                  <span className="text-zinc-300">{item.name}</span>
                  <span className="text-zinc-500">{item.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
        {skillsExtended.map((group) => (
          <div key={group.heading}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
              {group.heading}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-white/5 rounded text-[11px] font-mono text-zinc-400"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
