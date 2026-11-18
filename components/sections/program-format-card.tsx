import { CalendarClock, CalendarDays, Clock, MonitorPlay, Tag, Timer, type LucideIcon } from "lucide-react";
import { flagship, getFlagshipFormat } from "@/data/flagship";
import { applyHref } from "@/data/navigation";
import { getFlagshipCohort } from "@/lib/data/cohort";
import { ButtonLink } from "@/components/ui/button";

const rowIcons: Record<string, LucideIcon> = {
  Duration: CalendarDays,
  Sessions: Timer,
  Schedule: Clock,
  Mode: MonitorPlay,
  "Next cohort": CalendarClock,
  Fee: Tag,
};

/** Dark "Program format" card (BRD §G). Placeholders resolve via data/site.ts. */
export async function ProgramFormatCard({ titleAs: Title = "h3" }: { titleAs?: "h2" | "h3" }) {
  const rows = getFlagshipFormat(await getFlagshipCohort());

  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy p-7 text-on-navy shadow-lift sm:p-8">
      <div aria-hidden className="bg-grid-navy mask-fade-b absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(46_91_255/0.45),transparent)]"
      />

      <div className="relative">
        <Title className="text-lg font-semibold">{flagship.formatTitle}</Title>
        <dl className="mt-5 divide-y divide-navy-line">
          {rows.map((row) => {
            const Icon = rowIcons[row.label] ?? CalendarDays;
            return (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3.5">
                <dt className="flex items-center gap-2.5 text-sm text-on-navy-muted">
                  <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  {row.label}
                </dt>
                <dd className="text-right text-sm font-semibold">{row.value}</dd>
              </div>
            );
          })}
        </dl>
        <ButtonLink href={applyHref} variant="light" size="lg" fullWidth className="mt-6">
          {flagship.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
