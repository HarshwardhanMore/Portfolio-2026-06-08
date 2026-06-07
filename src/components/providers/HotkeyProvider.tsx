"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function HotkeyProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.key === "~" || (e.key === "`" && e.shiftKey)) {
        e.preventDefault();
        if (pathname === "/cli") {
          router.push("/");
        } else {
          router.push("/cli");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, pathname]);

  return <>{children}</>;
}
