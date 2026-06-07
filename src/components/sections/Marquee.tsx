import { marqueeItems } from "@/data/marquee";

export function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mtrack">
        {doubled.map((m, i) => (
          <span key={i} className={`mitem${m.accent ? " accent" : ""}`}>
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
