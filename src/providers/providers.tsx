"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

/**
 * Root client-side provider wrapper. Sets up TanStack Query with a single
 * client per browser tab — Server Components stay fully RSC, only the
 * children that actually use queries opt in by being client components
 * themselves.
 */
export function Providers({ children }: { children: ReactNode }) {
  // Keep the QueryClient in state so it survives Fast Refresh and isn't
  // recreated on every render (the React Query docs' recommended pattern).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Match the rhythm of a sports app: data is fresh for 30s,
            // refetches in the background after that. Retry once on error
            // — the user can always pull-to-refresh if the network is dead.
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
