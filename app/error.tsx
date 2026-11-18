"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { site } from "@/data/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Route-level error boundary for uncaught exceptions. Server errors arrive
 * with a generic message + digest (no sensitive details leak to users).
 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Replace with an error-reporting service (e.g. Sentry) when chosen.
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;

  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">Something went wrong</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">We couldn&apos;t load this page.</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">
        Please try again. If the problem continues, email{" "}
        <a href={`mailto:${site.contactEmail}`} className="text-brand underline underline-offset-2">
          {site.contactEmail}
        </a>
        .
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={() => retry()}>
          <RotateCcw aria-hidden className="size-4" />
          Try again
        </Button>
        <ButtonLink href="/" variant="outline">
          Go home
        </ButtonLink>
      </div>
      {digest ? <p className="mt-6 text-xs text-ink-subtle">Reference: {digest}</p> : null}
    </Container>
  );
}
