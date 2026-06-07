import { Shell } from "@/features/cli/Shell";

export const metadata = {
  title: "CLI Mode — Harshwardhan More",
  description: "An interactive terminal interface to explore Harshwardhan More's backend engineering portfolio.",
};

export default function CliPage() {
  return (
    <main className="cli-page">
      <Shell />
    </main>
  );
}
