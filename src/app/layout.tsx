import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HotkeyProvider } from "@/components/providers/HotkeyProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Harshwardhan More — Backend Software Engineer",
  description: "Backend engineer building event-driven Node.js microservices, distributed systems, and production observability.",
  authors: [{ name: "Harshwardhan More" }],
  openGraph: {
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <HotkeyProvider>{children}</HotkeyProvider>
      </body>
    </html>
  );
}
