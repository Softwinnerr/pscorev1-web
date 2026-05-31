"use client";

import { Trophy } from "lucide-react";
import { NetworkImage } from "./network-image";
import { useTournaments } from "@/hooks/use-matches";

/**
 * Left-rail competitions list — mirrors FotMob's "Meilleures ligues"
 * widget. Pulls every distinct tournament known to the service and
 * renders each as a row (logo + name). Click handlers are stubbed for
 * now; will navigate to /competitions/[id] in the next iteration.
 */
export function LeaguesSidebar() {
  const { data, isLoading } = useTournaments();

  return (
    <section className="sticky top-20 overflow-hidden rounded-card bg-card">
      <header className="px-5 py-4">
        <h2 className="text-[15px] font-bold text-foreground">
          Top compétitions
        </h2>
      </header>

      {isLoading ? (
        <ul className="space-y-3 px-5 pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center gap-3"
              aria-hidden
            >
              <span className="size-6 animate-pulse rounded bg-chip" />
              <span className="h-3 w-32 animate-pulse rounded bg-chip" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="pb-2">
          {data?.map((t) => (
            <li key={t.id ?? t.name}>
              <button
                type="button"
                className={`
                  flex w-full items-center gap-3 px-5 py-2.5 text-left
                  transition-colors hover:bg-chip
                `}
              >
                <NetworkImage
                  url={t.logoPath}
                  alt={t.name ?? ""}
                  width={24}
                  height={24}
                  fallback={
                    <Trophy className="size-5 text-text-muted" />
                  }
                />
                <span className="line-clamp-1 text-[14px] font-medium text-foreground">
                  {t.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
