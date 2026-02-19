"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong on the dashboard.</h2>
      <button onClick={reset} style={{ marginTop: 12 }}>
        Try again
      </button>
    </div>
  );
}
