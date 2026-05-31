"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AsyncStateView } from "@/components/async-state-view";
import { SportFilter } from "@/components/sport-filter";
import { TournamentSection } from "@/components/tournament-section";
import { groupByTournament } from "@/lib/match-grouping";
import { useMatches, useSports } from "@/hooks/use-matches";

export default function HomePage() {
  const [sportCode, setSportCode] = useState<string | null>(null);

  // Sports list drives the filter chips; failure is non-blocking — the
  // matches list still renders with the "Tous" chip only.
  const sportsQuery = useSports();
  const matchesQuery = useMatches({
    sportCode: sportCode ?? undefined,
  });

  const groups = useMemo(
    () => (matchesQuery.data ? groupByTournament(matchesQuery.data) : []),
    [matchesQuery.data],
  );

  return (
    <AppShell>
      {/* Page header — title + filter chips. */}
      <header className="px-4 pt-6 pb-2">
        <h1 className="font-display text-[32px] leading-none text-foreground">
          1<span className="text-primary">er</span>score
        </h1>
        <p className="mt-1 text-[15px] text-text-secondary">
          Les matchs du jour
        </p>
      </header>

      <SportFilter
        sports={sportsQuery.data ?? []}
        selected={sportCode}
        onChange={setSportCode}
      />

      <AsyncStateView
        isLoading={matchesQuery.isLoading}
        error={matchesQuery.error as Error | null}
        isEmpty={groups.length === 0}
        onRetry={() => matchesQuery.refetch()}
        emptyMessage="Aucun match"
        emptyHint="Essaie un autre sport ou reviens plus tard"
        emptyIcon={Inbox}
      >
        <div className="flex flex-col gap-3 py-3">
          {groups.map((g, i) => (
            <TournamentSection
              key={g.tournament?.id ?? `featured-${i}`}
              tournament={g.tournament}
              matches={g.matches}
            />
          ))}
        </div>
      </AsyncStateView>
    </AppShell>
  );
}
