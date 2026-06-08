"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { skillGroups } from "@/lib/data/skills";

export function Skills(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const groups = ref.current.querySelectorAll(".sgrp");
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
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="psection">
      <p className="slabel">Stack</p>
      <h2 className="stitle">
        Core Technologies
        <br />
        & Domain Expertise
      </h2>
      <div className="sgrid" ref={ref}>
        {skillGroups.map((g, i) => (
          <div className="sgrp" key={i}>
            <h3 className="sgrpname">{g.name}</h3>
            <div className="stags">
              {g.tags.map((s) => (
                <span
                  key={s.name}
                  className={`stag ${s.core ? "core" : ""}`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
