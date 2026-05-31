import type { IMatchesService } from "./matches-service";
import { MockMatchesService } from "./mock-matches-service";
import { HttpMatchesService } from "./http-matches-service";

/**
 * Single switch between mock and HTTP. Drives the choice via
 * `NEXT_PUBLIC_USE_MOCK_API` (`true` by default — flip to `false` once
 * the backend is up).
 */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

/**
 * Lazily-instantiated singleton service used by TanStack Query hooks.
 * Swapping implementations only requires changing the env var above.
 */
let _service: IMatchesService | null = null;
export const getMatchesService = (): IMatchesService =>
  (_service ??= USE_MOCK ? new MockMatchesService() : new HttpMatchesService());

export type { IMatchesService };
