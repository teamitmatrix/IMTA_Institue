"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors in the root layout. It replaces the whole
 * document, so it cannot rely on globals.css or fonts — styles are inline.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-US">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#0b1220",
          background: "#ffffff",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <title>Something went wrong | IMTA AI Institute</title>
        <div>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Something went wrong.</h1>
          <p style={{ color: "#475467", marginTop: "0.75rem" }}>
            Please try again, or email institute@imta.io if the problem continues.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.25rem",
              border: 0,
              borderRadius: "0.5rem",
              background: "#2f5bea",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
