import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/cli/Shell";

const TITLE = "CLI Mode — Harshwardhan More";
const DESC = "An interactive terminal interface to explore Harshwardhan More's backend engineering portfolio.";

export const Route = createFileRoute("/cli")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CliPage,
});

function CliPage() {
  return (
    <main className="cli-page">
      <Shell />
    </main>
  );
}
