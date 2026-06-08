import { type ReactNode } from "react";

export function LoadingPage(): ReactNode {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg" aria-busy="true" aria-label="Loading">
      <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl px-8">
        <div className="h-12 w-48 rounded bg-surface" />
        <div className="h-8 w-full rounded bg-surface" />
        <div className="h-8 w-3/4 rounded bg-surface" />
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-64 rounded bg-surface" />
          <div className="h-64 rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
