import type {
  MatchResponse,
  SportResponse,
  TournamentDto,
} from "@/types/models";
import { apiGet } from "./api-client";
import type { IMatchesService } from "./matches-service";

/**
 * HTTP-backed implementation — flipped on Sunday once the backend ships.
 * Each method honours the same `{ "data": ... }` envelope as the Flutter
 * client (`MatchesService` in `lib/features/home/services/matches_service.dart`).
 */
export class HttpMatchesService implements IMatchesService {
  async getMatches(params?: {
    sportCode?: string;
    status?: string;
  }): Promise<MatchResponse[]> {
    const res = await apiGet<{ data: MatchResponse[] }>("/matches", params);
    return res.data ?? [];
  }

  async getSports(): Promise<SportResponse[]> {
    const res = await apiGet<{ data: SportResponse[] }>("/sports");
    return res.data ?? [];
  }

  async getTournaments(params?: {
    sportCode?: string;
  }): Promise<TournamentDto[]> {
    const res = await apiGet<{ data: TournamentDto[] }>(
      "/tournaments",
      params,
    );
    return res.data ?? [];
  }
}
