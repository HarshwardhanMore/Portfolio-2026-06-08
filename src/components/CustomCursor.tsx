"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    document.body.classList.add("has-cursor");

    const cur = document.getElementById("cur");
    const curR = document.getElementById("curR");
    if (!cur || !curR) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      curR.style.left = rx + "px";
      curR.style.top = ry + "px";
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      cur.classList.add("hov");
      curR.classList.add("hov");
    };
    const onLeave = () => {
      cur.classList.remove("hov");
      curR.classList.remove("hov");
    };

    const targets = document.querySelectorAll<HTMLElement>(
      "a, button, .stat, .pcard, .stag, .ttag",
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
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
