import { type ReactNode } from "react";
import { marqueeItems } from "@/lib/data/marquee";

export function Marquee(): ReactNode {
  const items = [...marqueeItems, ...marqueeItems]; // Duplicate for infinite scroll
  return (
    <div className="marquee">
      <div className="mtrack">
        {items.map((it, i) => (
          <span key={i} className={`mitem ${it.accent ? "accent" : ""}`}>
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
