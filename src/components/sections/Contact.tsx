import { profile } from "@/data/profile";

export function Contact() {
  return (
    <footer id="contact" className="max-w-6xl mx-auto px-6 py-32 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6 underline decoration-portfolio-accent decoration-4 underline-offset-8">
            Let's scale something.
          </h2>
          <p className="text-zinc-400 mb-8 text-pretty">
            Interested in high-performance backends or observability pipelines? Drop a message
            for collaboration, or a referral for backend roles.
          </p>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex gap-4">
              <span className="text-zinc-500 w-16">Email:</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-white hover:text-portfolio-accent transition-colors"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-500 w-16">GitHub:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-portfolio-accent transition-colors"
              >
                {profile.githubHandle}
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-500 w-16">LinkedIn:</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-portfolio-accent transition-colors"
              >
                {profile.linkedinHandle}
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-zinc-500 w-16">Phone:</span>
              <span className="text-white">{profile.phone}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-96 p-8 bg-panel rounded-2xl border border-white/10">
          <div className="text-xs font-mono uppercase text-zinc-500 mb-4">System Status</div>
          <div className="flex items-center gap-2 text-success mb-6">
            <div className="size-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-mono">All signals operational</span>
          </div>
          <div className="text-xs font-mono text-zinc-500 mb-6 leading-relaxed">
            Based in {profile.location}. Open to remote and hybrid roles across distributed
            systems, platform engineering, and SRE-adjacent work.
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-portfolio-accent text-white font-bold rounded-lg hover:brightness-110 transition-all text-center"
          >
            Download CV.pdf
          </a>
        </div>
      </div>
    </footer>
  );
}
