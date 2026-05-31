"use client";

import { use } from "react";
import { Frown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AsyncStateView } from "@/components/async-state-view";
import { LeaguesSidebar } from "@/components/leagues-sidebar";
import { RightRail } from "@/components/right-rail";
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
      rightSidebar={<RightRail />}
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
          <div className="flex flex-col gap-4 px-4 py-4 md:px-0 md:py-0">
            <MatchHeader detail={data} />

            <Tabs defaultValue="apercu" className="gap-3">
              {/* Pill-style trigger row that mirrors the Flutter
                  tab bar — scrolls horizontally on narrow widths. */}
              <TabsList
                className={`
                  h-auto bg-transparent gap-2 overflow-x-auto flex w-full
                  justify-start rounded-none p-0
                `}
              >
                <PillTrigger value="apercu">Aperçu</PillTrigger>
                <PillTrigger value="compositions">Compositions</PillTrigger>
                <PillTrigger value="statistiques">Statistiques</PillTrigger>
                <PillTrigger value="classement">Classement</PillTrigger>
              </TabsList>

              <TabsContent value="apercu">
                <ApercuTab detail={data} />
              </TabsContent>
              <TabsContent value="compositions">
                <CompositionsTab detail={data} />
              </TabsContent>
              <TabsContent value="statistiques">
                <StatistiquesTab detail={data} />
              </TabsContent>
              <TabsContent value="classement">
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
