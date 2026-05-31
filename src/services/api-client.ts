/**
 * Thin fetch wrapper used by the HTTP-backed [HttpMatchesService]. Reads
 * the API base URL from `NEXT_PUBLIC_API_BASE_URL` so dev/prod can switch
 * without touching code; falls back to `http://127.0.0.1:8080/api` to
 * match the Flutter default during local development.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8080/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiGet<T = unknown>(
  path: string,
  query?: Record<string, string | undefined>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null) url.searchParams.set(k, v);
    }
  }
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Always go fresh — the cache layer is TanStack Query, not Next's
      // built-in fetch cache.
      cache: "no-store",
    });
  } catch (e) {
    throw new ApiError(
      `Erreur de connexion au serveur (${(e as Error).message})`,
    );
  }
  if (!res.ok) {
    if (res.status === 401) throw new ApiError("Non autorisé", 401);
    if (res.status === 404) throw new ApiError("Ressource introuvable", 404);
    throw new ApiError("Erreur serveur", res.status);
  }
  return (await res.json()) as T;
}
