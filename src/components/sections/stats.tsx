"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { stats } from "@/lib/data/stats";

function animateCounter(el: HTMLElement, n: number, sfx: string): void {
  let count = 0;
  const dur = 1000;
  const start = performance.now();
  const step = (now: number) => {
    const prog = Math.min((now - start) / dur, 1);
    count = Math.floor(prog * n);
    el.textContent = count + sfx;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Stats(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".stat");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            const num = e.target.querySelector(".snum") as HTMLElement;
            if (num) {
              const n = parseInt(num.dataset.val || "0");
              const sfx = num.dataset.sfx || "";
              animateCounter(num, n, sfx);
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="snum" data-val={s.n} data-sfx={s.sfx}>
            0{s.sfx}
          </div>
          <div className="slbl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
