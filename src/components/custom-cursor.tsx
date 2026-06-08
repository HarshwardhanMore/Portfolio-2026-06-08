"use client";

import { type ReactNode, useEffect } from "react";

export function CustomCursor(): ReactNode {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    document.body.classList.add("has-cursor");
    const cur = document.getElementById("cur");
    const curR = document.getElementById("curR");

    const onMove = (e: MouseEvent) => {
      if (cur) cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (curR)
        curR.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onEnter = () => {
      cur?.classList.add("hov");
      curR?.classList.add("hov");
    };
    const onLeave = () => {
      cur?.classList.remove("hov");
      curR?.classList.remove("hov");
    };

    window.addEventListener("mousemove", onMove);
    const links = document.querySelectorAll("a, button, .plink");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="curR" />
    </>
  );
}
