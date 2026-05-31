import type {
  MatchResponse,
  SportResponse,
  TournamentDto,
} from "@/types/models";

/**
 * Contract every matches service must implement — both the [MockMatchesService]
 * used pre-backend and a future HTTP-backed implementation. Mirrors the
 * Flutter `IMatchesService` so the API surface stays consistent across
 * the two clients.
 */
export interface IMatchesService {
  getMatches(params?: {
    sportCode?: string;
    status?: string;
  }): Promise<MatchResponse[]>;

  getSports(): Promise<SportResponse[]>;

  getTournaments(params?: { sportCode?: string }): Promise<TournamentDto[]>;
}
