import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s) => (
        <div key={s.label} className="p-6 bg-panel rounded-2xl border border-white/5">
          <div
            className={`text-3xl font-bold mb-1 ${
              s.highlight ? "text-success" : "text-white"
            }`}
          >
            {s.value}
          </div>
          <div className="text-xs font-mono uppercase text-zinc-500">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
