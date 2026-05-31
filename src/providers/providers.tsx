"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";

/**
 * Root client-side providers.
 *
 * - `next-themes` manages the theme class on <html> + persists the
 *   preference to localStorage + injects a no-FOUC pre-hydration script.
 *   We use `attribute="class"` so it toggles `.dark` directly — matches
 *   the strategy already wired in `globals.css`.
 * - TanStack Query gets a single QueryClient per tab, kept in state so
 *   Fast Refresh doesn't recreate it.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Match the rhythm of a sports app: data is fresh for 30s,
            // refetches in the background after that. Retry once on
            // error — the user can always pull-to-refresh if the
            // network is dead.
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      // Avoid the brief flash before next-themes mounts — it inlines a
      // <script> that applies the saved theme before React hydrates.
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
