"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types/content";
import { ButtonLink } from "@/components/ui/button";

type MobileNavProps = { items: NavItem[]; applyHref: string };

/** Mobile menu (BRD FR-02): keyboard accessible, closes on link click and Escape. */
export function MobileNav({ items, applyHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="-mr-2 grid size-10 place-items-center rounded-control text-ink hover:bg-surface-muted"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-control px-3 py-3 text-base font-medium text-ink hover:bg-surface-muted"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={applyHref} variant="dark" fullWidth className="mt-2" onClick={close}>
            Apply now
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
