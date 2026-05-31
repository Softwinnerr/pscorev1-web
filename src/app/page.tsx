"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AsyncStateView } from "@/components/async-state-view";
import { LeaguesSidebar } from "@/components/leagues-sidebar";
import { RightRail } from "@/components/right-rail";
import { SportFilter } from "@/components/sport-filter";
import { TournamentSection } from "@/components/tournament-section";
import { groupByTournament } from "@/lib/match-grouping";
import { useMatches, useSports } from "@/hooks/use-matches";

export default function HomePage() {
  const [sportCode, setSportCode] = useState<string | null>(null);

  const sportsQuery = useSports();
  const matchesQuery = useMatches({
    sportCode: sportCode ?? undefined,
  });

  const groups = useMemo(
    () => (matchesQuery.data ? groupByTournament(matchesQuery.data) : []),
    [matchesQuery.data],
  );

  return (
    <AppShell
      leftSidebar={<LeaguesSidebar />}
      rightSidebar={<RightRail />}
    >
      {/* Page header — title + filter chips. On desktop the brand title
          lives in the sticky TopNav, so we only need the section heading
          + tagline here. */}
      <div className="px-4 md:px-0">
        <header className="pt-6 pb-2 md:pt-0">
          <h1 className="font-display text-[32px] leading-none text-foreground md:hidden">
            1<span className="text-live-red">er</span>score
          </h1>
          <p className="mt-1 text-[15px] text-text-secondary md:text-[16px]">
            Les matchs du jour
          </p>
        </header>

        <SportFilter
          sports={sportsQuery.data ?? []}
          selected={sportCode}
          onChange={setSportCode}
        />
      </div>

      <AsyncStateView
        isLoading={matchesQuery.isLoading}
        error={matchesQuery.error as Error | null}
        isEmpty={groups.length === 0}
        onRetry={() => matchesQuery.refetch()}
        emptyMessage="Aucun match"
        emptyHint="Essaie un autre sport ou reviens plus tard"
        emptyIcon={Inbox}
      >
        <div className="flex flex-col gap-3 px-4 py-3 md:px-0">
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
