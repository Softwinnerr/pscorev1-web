/**
 * TypeScript ports of the Flutter models — kept in lockstep so a backend
 * response shaped for one client deserialises cleanly into the other.
 *
 * Naming + casing matches the Flutter `*.toJson()` output (camelCase) so
 * the API contract stays single-source.
 */

export type MatchStatus = "LIVE" | "SCHEDULED" | "FINISHED";

export interface SportResponse {
  id?: number;
  name?: string;
  code?: string; // "FOOTBALL" | "BASKETBALL" | "VOLLEYBALL" | "HANDBALL"
  illustrativePicture?: string;
}

export interface TournamentDto {
  id?: number;
  name?: string;
  code?: string;
  logoPath?: string;
  country?: string;
  sport?: SportResponse;
}

export interface TeamResponse {
  id?: number;
  name?: string;
  logo?: string;
  code?: string;
  memberCount?: number;
}

export interface MatchResponse {
  id?: number;
  status?: MatchStatus | string;
  scoreHomeTeam?: number;
  scoreAwayTeam?: number;
  /** ISO 8601 date string. */
  scheduleDate?: string;
  scheduleTime?: string;
  currentMinute?: string;
  homeTeamForm?: string;
  awayTeamForm?: string;
  homeTeam?: TeamResponse;
  awayTeam?: TeamResponse;
  tournament?: TournamentDto;

  /**
   * Curated "match of the day" marker — drives the home page's À la Une
   * section without affecting [tournament] (always the real competition).
   * Anywhere outside the home feed, this flag should be ignored.
   */
  isFeatured?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────

export const isLive = (m: MatchResponse) => m.status === "LIVE";
export const isScheduled = (m: MatchResponse) => m.status === "SCHEDULED";
export const isFinished = (m: MatchResponse) => m.status === "FINISHED";

/**
 * Whether the match is football. Football-specific UI (scorers list with
 * its soccer-ball icon) is only shown for football; other sports hide it.
 * Unknown/missing sport defaults to true (same Flutter heuristic).
 */
export const isFootball = (m: MatchResponse): boolean => {
  const code = (m.tournament?.sport?.code ?? "FOOTBALL").toUpperCase();
  return code === "FOOTBALL";
};

export const formatScore = (m: MatchResponse): string => {
  if (m.scoreHomeTeam == null || m.scoreAwayTeam == null) return "- : -";
  return `${m.scoreHomeTeam} : ${m.scoreAwayTeam}`;
};

/**
 * "dd-MM-yyyy" date format used by match cards.
 * Returns an empty string when [iso] is missing or unparseable.
 */
export const formatShortDate = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
};
