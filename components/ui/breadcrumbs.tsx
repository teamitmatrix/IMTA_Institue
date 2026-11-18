import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";

type Crumb = { name: string; path: string };

/** Accessible breadcrumb trail + BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-ink">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
