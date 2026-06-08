import { type ReactNode } from "react";
import { profile } from "@/lib/data/profile";
import { Terminal } from "./terminal";

export function Hero(): ReactNode {
  return (
    <section id="hero">
      <div>
        <p className="eyebrow">{profile.status}</p>
        <h1 className="hero-name">
          Harshwardhan<span>More.</span>
        </h1>
        <p className="hero-role">
          <b>Backend Software Engineer</b> &nbsp;·&nbsp; {profile.location}
        </p>
        <p className="hero-desc">
          2+ years crafting <em>event-driven microservices</em> and{" "}
          <em>distributed systems</em> in production. I obsess over{" "}
          <em>observability</em>, <em>reliability</em>, and the kind of architecture that
          scales without keeping you up at night.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-p">
            View Work →
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-s">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-s">
            LinkedIn ↗
          </a>
        </div>
      </div>
      <Terminal />
    </section>
  );
}
