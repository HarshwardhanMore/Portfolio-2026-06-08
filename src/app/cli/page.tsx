import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Shell } from "./_components/shell";

export const metadata: Metadata = {
  title: "CLI Mode — Harshwardhan More",
  description: "An interactive terminal interface to explore Harshwardhan More's backend engineering portfolio.",
};

export function CliPage(): ReactNode {
  return (
    <main className="cli-page">
      <Shell />
    </main>
  );
}

export default CliPage;
