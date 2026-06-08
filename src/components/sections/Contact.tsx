import { type ReactNode } from "react";
import { profile } from "@/lib/data/profile";

export function Contact(): ReactNode {
  return (
    <section id="contact" className="psection">
      <div className="cinner">
        <h2 className="ctitle">
          Let&apos;s Build <em>Something</em>
          <br />
          Exceptional
        </h2>
        <p className="cbody">
          Currently open to <b>Senior Backend</b> or <b>Staff Engineer</b> roles where I
          can lead architecture and mentor high-performing teams.
        </p>
        <a href={`mailto:${profile.email}`} className="cemail">
          {profile.email}
        </a>
        <div className="clinks">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="clink"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="clink"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
