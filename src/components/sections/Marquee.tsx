import { marqueeKeywords } from "@/data/marquee";

export function Marquee() {
  const doubled = [...marqueeKeywords, ...marqueeKeywords];
  return (
    <div className="border-y border-white/5 py-4 overflow-hidden">
      <div className="animate-marquee gap-12 text-sm font-mono uppercase tracking-[0.3em] text-zinc-600">
        {doubled.map((w, i) => (
          <span key={i} className="px-6 whitespace-nowrap">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
