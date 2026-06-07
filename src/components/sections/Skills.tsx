"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(".sgrp");
    items.forEach((el, i) => {
      el.style.transitionDelay = i * 0.07 + "s";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="psection">
      <p className="slabel">Technical Skills</p>
      <h2 className="stitle">
        Tools &amp;
        <br />
        Technologies
      </h2>
      <div className="sgrid" ref={ref}>
        {skillGroups.map((g) => (
          <div className="sgrp" key={g.name}>
            <div className="sgrpname">{g.name}</div>
            <div className="stags">
              {g.tags.map((t) => (
                <span key={t.name} className={`stag${t.core ? " core" : ""}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
