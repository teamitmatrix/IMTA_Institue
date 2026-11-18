import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

/** Top band for interior pages; renders the page's single <h1>. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <Section tone="muted" className="py-14 sm:py-16 lg:py-20">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl" />
      {children ? <div className="mt-8">{children}</div> : null}
    </Section>
  );
}
