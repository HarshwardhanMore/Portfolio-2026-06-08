"use client";

import { type ReactNode, useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps): ReactNode {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center bg-bg text-ptext">
      <h2 className="font-display text-2xl font-bold">Something went wrong</h2>
      <p className="text-ptext-sec max-w-md">
        An unexpected error occurred. Please try refreshing the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn-p"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorPage;
