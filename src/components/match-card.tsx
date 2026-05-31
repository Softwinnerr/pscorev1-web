import { cn } from "@/lib/utils";
import type { MatchResponse } from "@/types/models";
import { isLive, isFinished } from "@/types/models";
import { NetworkImage } from "./network-image";

/**
 * Port of the Flutter `MatchCard` (lib/features/home/views/widgets/match_card.dart).
 * Renders one row of "[home team] [score / clock] [away team]" with the
 * same display-font treatment for the score and red live time chip.
 */
export function MatchCard({ match }: { match: MatchResponse }) {
  const home = match.homeTeam;
  const away = match.awayTeam;
  const live = isLive(match);
  const finished = isFinished(match);
  const homeScore = match.scoreHomeTeam ?? 0;
  const awayScore = match.scoreAwayTeam ?? 0;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2">
      {/* Home team */}
      <TeamColumn name={home?.name ?? "TBD"} logoUrl={home?.logo} />

      {/* Center: score + status. Layout differs per state, same rules as
          the Flutter version. */}
      <div className="flex min-w-[120px] items-center justify-center">
        {live ? (
          <ScoreLive
            home={homeScore}
            away={awayScore}
            clock={match.currentMinute}
          />
        ) : finished ? (
          <ScoreFinished home={homeScore} away={awayScore} />
        ) : (
          <Scheduled
            date={match.scheduleDate}
            time={match.scheduleTime}
          />
        )}
      </div>

      {/* Away team */}
      <TeamColumn name={away?.name ?? "TBD"} logoUrl={away?.logo} />
    </div>
  );
}

function TeamColumn({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <NetworkImage url={logoUrl} alt={name} width={40} height={40} />
      <span className="line-clamp-2 text-center text-[14px] font-bold text-foreground">
        {name}
      </span>
    </div>
  );
}

function ScoreLive({
  home,
  away,
  clock,
}: {
  home: number;
  away: number;
  clock?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "font-display text-[34px] leading-none",
          home >= away ? "text-foreground" : "text-text-muted",
        )}
      >
        {home}
      </span>
      <span className="font-display text-[18px] font-bold leading-none text-live-red">
        {clock ?? "LIVE"}
      </span>
      <span
        className={cn(
          "font-display text-[34px] leading-none",
          away >= home ? "text-foreground" : "text-text-muted",
        )}
      >
        {away}
      </span>
    </div>
  );
}

function ScoreFinished({ home, away }: { home: number; away: number }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "font-display text-[34px] leading-none",
          home >= away ? "text-foreground" : "text-text-muted",
        )}
      >
        {home}
      </span>
      <span className="text-[15px] font-semibold text-text-secondary">
        Terminé
      </span>
      <span
        className={cn(
          "font-display text-[34px] leading-none",
          away >= home ? "text-foreground" : "text-text-muted",
        )}
      >
        {away}
      </span>
    </div>
  );
}

function Scheduled({ date, time }: { date?: string; time?: string }) {
  const formattedDate = (() => {
    if (!date) return "--";
    const d = new Date(date);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}-${mm}-${d.getFullYear()}`;
  })();
  return (
    <div className="flex flex-col items-center text-[15px]">
      <span className="text-foreground">{formattedDate}</span>
      <span className="font-bold text-foreground">{time ?? ""}</span>
    </div>
  );
}
