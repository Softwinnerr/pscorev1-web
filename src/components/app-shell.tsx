import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

/**
 * Page chrome wrapper. Adds the floating bottom nav and reserves the
 * vertical space underneath so scrollable content can slide all the way
 * up to the nav without being hidden by it.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* pb leaves room for the floating nav (~88px tall with safe-area). */}
      <main className="mx-auto w-full max-w-[480px] px-0 pb-28">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
