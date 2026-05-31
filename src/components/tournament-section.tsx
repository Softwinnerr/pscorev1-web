import { Trophy } from "lucide-react";
import type { MatchResponse, TournamentDto } from "@/types/models";
import { MatchCard } from "./match-card";
import { NetworkImage } from "./network-image";

/**
 * One per-tournament card on the home feed — sticky header (logo + name)
 * with matches stacked underneath, separated by dividers. Maps directly
 * onto the Flutter `TournamentGroup` rendered by `_buildTournamentGroup`.
 */
export function TournamentSection({
  tournament,
  matches,
}: {
  tournament?: TournamentDto;
  matches: MatchResponse[];
}) {
  return (
    <section className="overflow-hidden rounded-card bg-card shadow-[0_2px_6px_var(--decoration-shadow)]">
      <header className="flex items-center gap-3 px-4 py-3.5">
        <NetworkImage
          url={tournament?.logoPath}
          alt={tournament?.name ?? ""}
          width={32}
          height={32}
          fallback={<Trophy className="size-6 text-text-muted" />}
        />
        <h2 className="font-display text-[18px] text-foreground">
          {tournament?.name ?? "Autre"}
        </h2>
      </header>
      <ul>
        {matches.map((m, i) => (
          <li
            key={m.id ?? i}
            className={i > 0 ? "border-t border-divider" : undefined}
          >
            <MatchCard match={m} />
          </li>
        ))}
      </ul>
    </section>
  );
}
