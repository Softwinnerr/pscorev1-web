import { cn } from "@/lib/utils";
import type { MatchDetail, StandingRow } from "@/types/match-detail";
import { goalDifference } from "@/types/match-detail";

/**
 * Classement tab — full standings table for the competition the match
 * belongs to. Highlights either team if its name is in the row, like
 * the Flutter `_StandingsTab._isOurTeam` heuristic.
 *
 * Columns: # · Équipe · J · G · N · P · +/- · Diff · Pts
 * (matches the football shape from `standingsColumnsFor(FOOTBALL)`.)
 */
export function ClassementTab({ detail }: { detail: MatchDetail }) {
  if (detail.standings.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[14px] text-text-secondary">
        Pas encore de classement.
      </p>
    );
  }

  const ourNames = new Set(
    [detail.match.homeTeam?.name, detail.match.awayTeam?.name].filter(
      (n): n is string => !!n,
    ),
  );

  return (
    <section className="overflow-hidden rounded-card bg-card">
      <Header />
      <ul>
        {detail.standings.map((r, i) => (
          <li
            key={r.teamName + r.rank}
            className={i > 0 ? "border-t border-divider" : undefined}
          >
            <Row row={r} highlight={ourNames.has(r.teamName)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Header() {
  return (
    <div
      className={cn(
        "grid grid-cols-[24px_minmax(0,1fr)_24px_24px_24px_24px_48px_40px_28px]",
        "gap-2 border-b border-divider px-4 py-2.5 text-[11px] font-semibold uppercase text-text-secondary",
      )}
    >
      <span>#</span>
      <span>Équipe</span>
      <span className="text-center">J</span>
      <span className="text-center">G</span>
      <span className="text-center">N</span>
      <span className="text-center">P</span>
      <span className="text-center">+/-</span>
      <span className="text-center">Diff</span>
      <span className="text-center">Pts</span>
    </div>
  );
}

function Row({ row, highlight }: { row: StandingRow; highlight: boolean }) {
  const diff = goalDifference(row);
  return (
    <div
      className={cn(
        "grid grid-cols-[24px_minmax(0,1fr)_24px_24px_24px_24px_48px_40px_28px]",
        "items-center gap-2 px-4 py-3 text-[13px] text-foreground",
        highlight && "bg-primary/10",
      )}
    >
      <span
        className={cn(
          "text-center font-bold",
          highlight ? "text-primary" : "text-foreground",
        )}
      >
        {row.rank}
      </span>
      <span className="line-clamp-1 font-medium">{row.teamName}</span>
      <span className="text-center text-text-secondary">{row.played}</span>
      <span className="text-center text-text-secondary">{row.won}</span>
      <span className="text-center text-text-secondary">{row.drawn}</span>
      <span className="text-center text-text-secondary">{row.lost}</span>
      <span className="text-center text-text-secondary">
        {row.goalsFor}/{row.goalsAgainst}
      </span>
      <span className="text-center text-text-secondary">
        {diff >= 0 ? `+${diff}` : diff}
      </span>
      <span className="text-center font-bold">{row.points}</span>
    </div>
  );
}
