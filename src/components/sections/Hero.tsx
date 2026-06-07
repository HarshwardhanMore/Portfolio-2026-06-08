import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 pt-24 pb-32">
      <div className="max-w-3xl">
        <div className="inline-block px-3 py-1 bg-portfolio-accent/10 border border-portfolio-accent/20 rounded-full text-portfolio-accent text-xs font-mono mb-6">
          {profile.status}
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight mb-8 text-balance">
          Harshwardhan <span className="text-zinc-600">More</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-10 text-pretty">
          Backend Engineer specializing in{" "}
          <span className="text-white font-semibold">Node.js</span>, distributed architecture, and
          high-precision observability systems.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-bg font-bold rounded-lg hover:bg-portfolio-accent hover:text-white transition-all"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="px-8 py-4 bg-panel border border-white/10 font-bold rounded-lg hover:border-white/30 transition-all text-white"
          >
            View systems
          </a>
        </div>
      </div>
    </section>
  );
}
