"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/stats";

function animateCounter(el: HTMLElement, n: number, sfx: string) {
  const numEl = el.querySelector<HTMLElement>(".snum");
  if (!numEl) return;
  const dur = 1400;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    numEl.textContent = Math.floor(e * n) + (p >= 1 ? sfx : "");
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(".stat");
    items.forEach((el, i) => {
      el.style.transitionDelay = i * 0.08 + "s";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("vis");
          const n = Number(el.dataset.n);
          const sfx = el.dataset.sfx || "";
          if (!Number.isNaN(n)) animateCounter(el, n, sfx);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <div key={i} className="stat" data-n={s.n} data-sfx={s.sfx}>
          <div className="snum">0</div>
          <div className="slbl">
            {s.label.split("\n").map((line, idx, arr) => (
              <span key={idx}>
                {line}
                {idx < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
