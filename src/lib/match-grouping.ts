import type { MatchResponse, TournamentDto } from "@/types/models";

export interface TournamentGroup {
  tournament?: TournamentDto;
  matches: MatchResponse[];
}

/**
 * Synthetic "À la Une" descriptor used as the [TournamentGroup.tournament]
 * of the featured section. Has no `id` (intentional — it's not a real
 * competition) and never escapes the home feed grouping.
 */
const FEATURED_SECTION: TournamentDto = {
  name: "À la Une",
  logoPath: "https://cdn-icons-png.flaticon.com/512/861/861512.png",
};

/**
 * Same algorithm as the Flutter `HomeViewModel.matchesByTournament`:
 * the curated "À la Une" section is prepended when at least one match
 * is flagged [MatchResponse.isFeatured]; those featured matches are then
 * skipped in the regular per-tournament grouping so they don't appear
 * twice on screen.
 */
export function groupByTournament(
  matches: MatchResponse[],
): TournamentGroup[] {
  const groups = new Map<number, TournamentGroup>();
  const order: number[] = [];

  const featured = matches.filter((m) => m.isFeatured);
  if (featured.length > 0) {
    const FEATURED_KEY = -100;
    groups.set(FEATURED_KEY, {
      tournament: FEATURED_SECTION,
      matches: featured,
    });
    order.push(FEATURED_KEY);
  }

  for (const match of matches) {
    if (match.isFeatured) continue;
    const key = match.tournament?.id ?? -1;
    if (!groups.has(key)) {
      groups.set(key, { tournament: match.tournament, matches: [] });
      order.push(key);
    }
    groups.get(key)!.matches.push(match);
  }

  return order.map((k) => groups.get(k)!);
}
