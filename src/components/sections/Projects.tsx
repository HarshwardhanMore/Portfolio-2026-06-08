import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(".pcard");
    items.forEach((el, i) => {
      el.style.transitionDelay = i * 0.14 + "s";
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
    <section id="projects" className="psection">
      <p className="slabel">Projects</p>
      <h2 className="stitle">
        Things I've
        <br />
        Built &amp; Shipped
      </h2>
      <div className="pgrid" ref={ref}>
        {projects.map((p) => (
          <div className="pcard" key={p.name}>
            <div className="pnum">
              {p.number} / {p.kind}
            </div>
            <div className="pname">{p.name}</div>
            <div className="psub">{p.subtitle}</div>
            <p className="pdesc">{p.description}</p>
            <ul className="phigs">
              {p.highlights.map((h, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: h.html }} />
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
              <a href={p.href} target="_blank" rel="noreferrer" className="plink">
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
