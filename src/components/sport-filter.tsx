"use client";

import { cn } from "@/lib/utils";
import type { SportResponse } from "@/types/models";

/**
 * Horizontal sport filter chips — port of the Flutter home-page filter
 * row. `null` is the implicit "Tous" option, prepended at the start.
 */
export function SportFilter({
  sports,
  selected,
  onChange,
}: {
  sports: SportResponse[];
  selected: string | null;
  onChange: (sportCode: string | null) => void;
}) {
  const options: Array<{ label: string; code: string | null }> = [
    { label: "Tous", code: null },
    ...sports.map((s) => ({ label: s.name ?? s.code ?? "?", code: s.code ?? null })),
  ];

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto pb-3 pt-1">
      {options.map(({ label, code }) => {
        const active = selected === code;
        return (
          <button
            key={code ?? "all"}
            onClick={() => onChange(code)}
            className={cn(
              "rounded-pill px-4 py-2 text-[15px] font-bold transition-colors",
              "whitespace-nowrap",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-chip text-foreground hover:bg-chip-border/70",
            )}
            aria-pressed={active}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
