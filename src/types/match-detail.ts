/**
 * TS port of `lib/models/match_detail.dart`. Kept structurally identical
 * (same field names, same enum string values) so the backend payload
 * deserialises into either client without per-platform adapters.
 */

import type { MatchResponse } from "./models";

export type TeamSide = "home" | "away";

export interface ScorerEvent {
  playerName: string;
  /** Minutes the player scored at — e.g. [54, 56] for a brace. */
  minutes: number[];
  side: TeamSide;
}

/**
 * Score for one period of a multi-period sport — a *set* in volleyball,
 * a *quarter* in basketball. Football leaves the list empty.
 */
export interface PeriodScore {
  home: number;
  away: number;
}

export type MatchEventType =
  | "goal"
  | "ownGoal"
  | "penaltyScored"
  | "penaltyMissed"
  | "yellowCard"
  | "redCard"
  | "substitution";

export interface MatchEvent {
  minute: number;
  type: MatchEventType;
  side: TeamSide;
  playerName: string;
  /** Assist provider (goal) or player going out (substitution). Null for cards. */
  secondaryPlayerName?: string;
}

export interface BookmakerOdds {
  bookmaker: string;
  logoUrl?: string;
  home: number;
  draw: number;
  away: number;
}

export type FormResult = "win" | "draw" | "loss";

export interface LineupPlayer {
  number: number;
  name: string;
  position?: string;
}

export interface TeamLineup {
  starters: LineupPlayer[];
  substitutes: LineupPlayer[];
  coachName: string;
}

export interface MatchLineups {
  home: TeamLineup;
  away: TeamLineup;
}

export interface MatchStatistic {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
}

export type StatPeriod = "full" | "firstHalf" | "secondHalf";

export interface StandingRow {
  rank: number;
  teamName: string;
  logo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  /** Sets won/lost — volleyball only (0 elsewhere). */
  setsFor?: number;
  setsAgainst?: number;
}

export interface MotmCandidate {
  playerId: number;
  name: string;
  teamName: string;
  side: TeamSide;
  photo?: string;
  votes: number;
}

export interface MatchDetail {
  match: MatchResponse;
  scorers: ScorerEvent[];
  events: MatchEvent[];
  odds?: BookmakerOdds | null;
  homeForm: FormResult[];
  awayForm: FormResult[];
  competition: string;
  startsAt?: string;
  venue: string;
  lineups: MatchLineups;
  /** Keyed by enum string ("full" | "firstHalf" | "secondHalf"). */
  stats: Partial<Record<StatPeriod, MatchStatistic[]>>;
  standings: StandingRow[];
  motmCandidates?: MotmCandidate[];
  /** Per-period scores (sets for volleyball, quarters for basketball). */
  periodScores?: PeriodScore[];
}

// ── Helpers ────────────────────────────────────────────────────────────

/** Comma-separated minutes label, e.g. [54, 56] → "54', 56'". */
export const minutesLabel = (minutes: number[]) =>
  minutes.map((m) => `${m}'`).join(", ");

/** Ratio of a stat — homeValue / (homeValue + awayValue). */
export const statHomeRatio = (s: MatchStatistic): number => {
  const total = s.homeValue + s.awayValue;
  if (total === 0) return 0.5;
  return s.homeValue / total;
};

/** Goal difference for a standings row. */
export const goalDifference = (r: StandingRow): number =>
  r.goalsFor - r.goalsAgainst;
