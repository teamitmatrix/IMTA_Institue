import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** Custom 404 with routes back to courses and the application (BRD FR-19). */
export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">We couldn&apos;t find that page.</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">
        The page may have moved. Browse our courses or apply for the next cohort.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/courses">Explore courses</ButtonLink>
        <ButtonLink href="/#apply" variant="outline">
          Apply now
        </ButtonLink>
      </div>
    </Container>
  );
}
