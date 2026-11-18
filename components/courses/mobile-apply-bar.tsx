"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

/**
 * Mobile-only bottom bar keeping the enrollment CTA in reach. Hides while
 * the application form (#apply) is on screen.
 */
export function MobileApplyBar({ courseName, meta }: { courseName: string; meta: string }) {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("apply");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(10_18_38/0.2)] backdrop-blur transition-transform duration-300 lg:hidden",
        formVisible && "translate-y-full",
      )}
      aria-hidden={formVisible || undefined}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{courseName}</p>
          <p className="truncate text-xs text-ink-subtle">{meta}</p>
        </div>
        <ButtonLink href="#apply" size="sm" tabIndex={formVisible ? -1 : undefined}>
          Apply
        </ButtonLink>
      </div>
    </div>
  );
}
