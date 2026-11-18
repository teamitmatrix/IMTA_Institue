import { ArrowRight } from "lucide-react";
import { hero } from "@/data/home";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroVisual } from "@/components/sections/hero-visual";

/**
 * Homepage hero (BRD §E-2). Renders the homepage's only <h1>.
 * Not animated on entry: it is the LCP element and must paint immediately.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface">
      {/* engineering grid + glow */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(46_91_255/0.14),transparent)]"
      />

      <Container className="grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]"
          >
            {hero.headingLead}
            <span className="bg-gradient-to-r from-brand to-brand-glow bg-clip-text text-transparent">
              {hero.headingAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed">
            {hero.subheading}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
