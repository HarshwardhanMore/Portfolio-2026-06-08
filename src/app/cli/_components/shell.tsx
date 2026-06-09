"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  registry,
  commandNames,
  closest,
  type OutputLine,
} from "@/lib/cli/commands";
import { profile } from "@/lib/data/profile";

type Block =
  | { kind: "prompt"; input: string }
  | { kind: "out"; lines: OutputLine[] };

const HOST = "harshmore";
const USER = "visitor";

function nowStr(): string {
  return new Date().toUTCString().replace("GMT", "UTC");
}

export function Shell(): ReactNode {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [input, setInput] = useState("");
  const [cursorIdx, setCursorIdx] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [hint, setHint] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const bootedRef = useRef(false);

  const syncCursor = useCallback(() => {
    // Delay to ensure DOM has updated
    setTimeout(() => {
      if (inputRef.current) {
        setCursorIdx(inputRef.current.selectionStart || 0);
      }
    }, 0);
  }, []);

  const pushOut = useCallback((lines: OutputLine[]) => {
    setBlocks((b) => [...b, { kind: "out", lines }]);
  }, []);

  const clearScreen = useCallback(() => setBlocks([]), []);

  const exitShell = useCallback(() => {
    router.push("/");
  }, [router]);

  const run = useCallback(
    (raw: string) => {
      const line = raw.trim();
      setBlocks((b) => [...b, { kind: "prompt", input: raw }]);
      if (!line) return;

      const [name, ...args] = line.split(/\s+/);
      const cmd = registry[name.toLowerCase()];
      if (!cmd) {
        const suggestion = closest(name.toLowerCase());
        pushOut([
          {
            type: "html",
            content: `<span class="cli-err">command not found: ${escapeHtml(name)}</span>${
              suggestion
                ? `  <span class="cli-dim">— did you mean</span> <span class="cli-key">${suggestion}</span><span class="cli-dim">?</span>`
                : ""
            }`,
          },
        ]);
        return;
      }
      const out = cmd.run(args, {
        clear: clearScreen,
        exit: exitShell,
        print: pushOut,
      });
      if (out && out.length) pushOut(out);
    },
    [pushOut, clearScreen, exitShell],
  );

  // Boot sequence
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    pushOut([
      { type: "text", content: `Last login: ${nowStr()} from visitor`, cls: "cli-dim" },
      { type: "spacer" },
      {
        type: "html",
        content: `<span class="cli-acc">${profile.name}</span> <span class="cli-dim">·</span> ${profile.role} <span class="cli-dim">·</span> ${profile.location}`,
      },
      {
        type: "html",
        content: `<span class="cli-dim">Type</span> <span class="cli-key">help</span> <span class="cli-dim">to begin · Esc to exit · Ctrl+L to clear</span>`,
      },
      { type: "spacer" },
    ]);
  }, [pushOut]);

  // Autofocus input + refocus on click
  useEffect(() => {
    const f = () => inputRef.current?.focus();
    f();
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.tagName === "BUTTON") return;
      f();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Autoscroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks, input]);

  // Update inline ghost hint based on current input
  useEffect(() => {
    if (!input) {
      setHint("");
      return;
    }
    const m = commandNames.find((n) => n.startsWith(input.toLowerCase()) && n !== input.toLowerCase());
    setHint(m ? m.slice(input.length) : "");
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input;
      run(v);
      if (v.trim()) {
        setHistory((h) => [...h, v]);
      }
      setHistIdx(-1);
      setInput("");
      setCursorIdx(0);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      const val = history[next] ?? "";
      setInput(val);
      setCursorIdx(val.length);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
        setCursorIdx(0);
      } else {
        setHistIdx(next);
        const val = history[next];
        setInput(val);
        setCursorIdx(val.length);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;
      const matches = commandNames.filter((n) => n.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        const val = matches[0] + " ";
        setInput(val);
        setCursorIdx(val.length);
      } else if (matches.length > 1) {
        pushOut([{ type: "html", content: matches.map((m) => `<span class="cli-key">${m}</span>`).join("  ") }]);
      }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearScreen();
      return;
    }
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setBlocks((b) => [...b, { kind: "prompt", input: input + "^C" }]);
      setInput("");
      setCursorIdx(0);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      exitShell();
      return;
    }
    syncCursor();
  };

  const ps1 = useMemo(
    () => (
      <span className="cli-ps1">
        <span className="cli-user">{USER}</span>
        <span className="cli-dim">@</span>
        <span className="cli-host">{HOST}</span>
        <span className="cli-dim">:</span>
        <span className="cli-path">~</span>
        <span className="cli-dim">$&nbsp;</span>
      </span>
    ),
    [],
  );

  return (
    <div className="cli-shell">
      <div className="cli-bar">
        <div className="cli-dots">
          <span className="cli-dot" />
          <span className="cli-dot" />
          <span className="cli-dot" />
        </div>
        <span className="cli-bar-title">{USER}@{HOST}: ~ — zsh</span>
        <button className="cli-exit" onClick={exitShell} aria-label="Exit terminal">
          exit ↗
        </button>
      </div>
      <div className="cli-body" ref={scrollerRef}>
        {blocks.map((b, i) =>
          b.kind === "prompt" ? (
            <div className="cli-line" key={i}>
              {ps1}
              <span className="cli-input-echo">{b.input}</span>
            </div>
          ) : (
            <div className="cli-out" key={i}>
              {b.lines.map((l, j) => {
                if (l.type === "spacer") return <div className="cli-sp" key={j} />;
                if (l.type === "html")
                  return (
                    <div
                      className="cli-line"
                      key={j}
                      dangerouslySetInnerHTML={{ __html: l.content }}
                    />
                  );
                return (
                  <div className={`cli-line ${l.cls ?? ""}`} key={j}>
                    {l.content}
                  </div>
                );
              })}
            </div>
          ),
        )}
        <div className="cli-line cli-active">
          {ps1}
          <div className="cli-input-wrap">
            <span className="cli-input-echo">
              {input.slice(0, cursorIdx)}
              <span className="cli-caret" />
              {input.slice(cursorIdx)}
              {hint && <span className="cli-ghost">{hint}</span>}
            </span>
            <textarea
              ref={inputRef}
              className="cli-input"
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
                setCursorIdx(e.target.selectionStart || 0);
              }}
              onKeyDown={onKeyDown}
              onSelect={() => syncCursor()}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}
