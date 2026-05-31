"use client";

import { use } from "react";
import { Frown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AsyncStateView } from "@/components/async-state-view";
import { LeaguesSidebar } from "@/components/leagues-sidebar";
import { PubRail } from "@/components/pub-rail";
import { MatchHeader } from "@/components/match-detail/match-header";
import { ApercuTab } from "@/components/match-detail/apercu-tab";
import { CompositionsTab } from "@/components/match-detail/compositions-tab";
import { StatistiquesTab } from "@/components/match-detail/statistiques-tab";
import { ClassementTab } from "@/components/match-detail/classement-tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useMatchDetail } from "@/hooks/use-matches";

/**
 * Match detail page — `/matches/[id]`. 4 tabs:
 *  • Aperçu — timeline + form + odds.
 *  • Compositions — starting XI + subs per side.
 *  • Statistiques — bars with home/away values.
 *  • Classement — standings table for the competition.
 *
 * The id is parsed from the route param; non-numeric ids resolve to an
 * empty state immediately (the hook skips the network call too).
 */
export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const matchId = Number.parseInt(id, 10);
  const { data, isLoading, error, refetch } = useMatchDetail(matchId);

  return (
    <AppShell
      leftSidebar={<LeaguesSidebar />}
      rightSidebar={<PubRail />}
    >
      <AsyncStateView
        isLoading={isLoading}
        error={error as Error | null}
        isEmpty={!data}
        onRetry={() => refetch()}
        emptyMessage="Match introuvable"
        emptyHint="Le match a peut-être été retiré du calendrier."
        emptyIcon={Frown}
      >
        {data && (
          <div className="flex flex-col gap-6 px-4 py-4 md:px-0 md:py-0">
            {/* 1. Match summary card (score + teams + competition). */}
            <MatchHeader detail={data} />

            {/* 2. Tabs row — centred between the header card and the
                   active tab's content. Scrolls horizontally on narrow
                   widths so all four pills stay reachable. `flex-col` is
                   set explicitly because shadcn's `data-horizontal:flex-col`
                   variant relies on a custom Tailwind variant declared in
                   globals.css ; we keep this override as a safety belt. */}
            <Tabs defaultValue="apercu" className="flex-col gap-6">
              {/* `flex-wrap` lets the pills break to a second row on
                  very narrow screens instead of clipping. We deliberately
                  avoid `overflow-x-auto` here — it would also promote
                  `overflow-y` to auto, which surfaced a phantom vertical
                  scrollbar whenever the active focus ring nudged a pixel
                  past the row's bounds. */}
              <TabsList
                className={`
                  h-auto w-full bg-transparent rounded-none p-0
                  flex flex-wrap justify-center gap-2
                `}
              >
                <PillTrigger value="apercu">Aperçu</PillTrigger>
                <PillTrigger value="compositions">Compositions</PillTrigger>
                <PillTrigger value="statistiques">Statistiques</PillTrigger>
                <PillTrigger value="classement">Classement</PillTrigger>
              </TabsList>

              {/* 3. Active tab content. Each tab body returns its own
                     cards, so we don't wrap them in an extra container. */}
              <TabsContent value="apercu" className="mt-0">
                <ApercuTab detail={data} />
              </TabsContent>
              <TabsContent value="compositions" className="mt-0">
                <CompositionsTab detail={data} />
              </TabsContent>
              <TabsContent value="statistiques" className="mt-0">
                <StatistiquesTab detail={data} />
              </TabsContent>
              <TabsContent value="classement" className="mt-0">
                <ClassementTab detail={data} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </AsyncStateView>
    </AppShell>
  );
}

function PillTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className={`
        rounded-pill bg-chip px-4 py-2 text-[14px] font-bold text-foreground
        data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
        whitespace-nowrap shadow-none
      `}
    >
      {children}
    </TabsTrigger>
  );
}
