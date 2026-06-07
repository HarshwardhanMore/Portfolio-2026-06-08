import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact">
      <div className="cinner">
        <h2 className="ctitle">
          Let's Build
          <br />
          <em>Something Great</em>
        </h2>
        <p className="cbody">
          I'm actively exploring backend engineering roles with genuine ownership, rigorous
          engineering culture, and real distributed-systems challenges. If that sounds like your
          team, let's talk.
        </p>
        <a href={`mailto:${profile.email}`} className="cemail">
          {profile.email}
        </a>
        <div className="clinks">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="clink">
            ↗ LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="clink">
            ↗ GitHub
          </a>
          <a href={`tel:${profile.phone}`} className="clink">
            ↗ {profile.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
