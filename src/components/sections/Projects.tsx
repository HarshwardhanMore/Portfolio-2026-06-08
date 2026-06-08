"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { projects } from "@/lib/data/projects";

export function Projects(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".pcard");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" className="psection">
      <p className="slabel">Portfolio</p>
      <h2 className="stitle">
        Scalable Solutions
        <br />
        Engineered for Production
      </h2>
      <div className="pgrid" ref={ref}>
        {projects.map((p, i) => (
          <div className="pcard" key={i}>
            <div className="pnum">Project // 0{i + 1}</div>
            <h3 className="pname">{p.name}</h3>
            <p className="psub">{p.subtitle}</p>
            <p className="pdesc">{p.description}</p>
            <ul className="phigs">
              {p.highlights.map((h, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </ul>
            <div className="pfooter">
              <div className="ptags">
                {p.stack.map((s) => (
                  <span key={s} className="ttag">
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="plink"
              >
                Repo ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
