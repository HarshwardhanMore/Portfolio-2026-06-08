"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/data/experience";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(".titem");
    items.forEach((el, i) => {
      el.style.transitionDelay = i * 0.1 + "s";
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
    <section id="experience" className="psection">
      <p className="slabel">Experience</p>
      <h2 className="stitle">
        Where I've
        <br />
        Built Systems
      </h2>
      <div className="timeline" ref={ref}>
        {experience.map((item, i) => (
          <div className="titem" key={i}>
            <div className="tleft">
              <div className="tco">
                {item.company.split("\n").map((line, idx, arr) => (
                  <span key={idx}>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="tdate">{item.date}</div>
              {item.badge && <span className="tbadge">{item.badge}</span>}
            </div>
            <div className="tright">
              <div className="trole">{item.role}</div>
              {item.education?.note && (
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--color-ptext-sec)",
                    fontWeight: 300,
                    marginBottom: 18,
                  }}
                >
                  {item.education.note}
                </p>
              )}
              {item.points && (
                <ul className="tpoints">
                  {item.points.map((p, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: p.html }} />
                  ))}
                </ul>
              )}
              {item.education?.gpa && (
                <div className="edu-row">
                  <div>
                    <span className="edu-gpa">
                      {item.education.gpa}
                      <span>{item.education.gpaScale}</span>
                    </span>
                  </div>
                  {item.education.location && (
                    <div style={{ fontSize: 13, color: "var(--color-ptext-sec)" }}>
                      {item.education.location}
                    </div>
                  )}
                </div>
              )}
              {item.stack && (
                <div className="tstack">
                  {item.stack.map((s) => (
                    <span key={s} className="ttag">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
