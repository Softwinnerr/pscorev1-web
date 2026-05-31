"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatchesService } from "@/services";
import type { MatchResponse, SportResponse } from "@/types/models";

/**
 * Query keys live in one place so invalidation stays consistent across
 * the app (mirrors the Riverpod providers in the Flutter version).
 */
export const queryKeys = {
  matches: (params?: { sportCode?: string; status?: string }) =>
    ["matches", params ?? {}] as const,
  sports: () => ["sports"] as const,
  tournaments: (params?: { sportCode?: string }) =>
    ["tournaments", params ?? {}] as const,
};

export function useMatches(params?: { sportCode?: string; status?: string }) {
  return useQuery<MatchResponse[]>({
    queryKey: queryKeys.matches(params),
    queryFn: () => getMatchesService().getMatches(params),
  });
}

export function useSports() {
  return useQuery<SportResponse[]>({
    queryKey: queryKeys.sports(),
    queryFn: () => getMatchesService().getSports(),
  });
}
