import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Stats } from "@/components/sections/stats";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { CustomCursor } from "@/components/custom-cursor";

export const metadata: Metadata = {
  title: "Harshwardhan More — Backend Software Engineer",
  description: "Portfolio of Harshwardhan More, a backend engineer specializing in Node.js microservices and distributed systems.",
};

export function IndexPage(): ReactNode {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}

export default IndexPage;
