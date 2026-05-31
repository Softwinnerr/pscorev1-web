import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { TopNav } from "./top-nav";

interface AppShellProps {
  /** Center column — the main content of the page. */
  children: ReactNode;
  /** Left sidebar — typically a leagues / competitions list (desktop only). */
  leftSidebar?: ReactNode;
  /** Right rail — featured content / promo / news (desktop only). */
  rightSidebar?: ReactNode;
}

/**
 * Page chrome wrapper.
 *
 * - **Mobile** (`< md`): single-column, floating `<BottomNav />` at the
 *   bottom. Sidebars are NOT rendered.
 * - **Tablet / Desktop** (`md+`): sticky `<TopNav />` at the top, 3-column
 *   grid below (sidebar / main / rail). Inspired by the FotMob and
 *   Sofascore layouts so the desktop experience doesn't waste real
 *   estate with a 480px column.
 */
export function AppShell({
  children,
  leftSidebar,
  rightSidebar,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Mobile container — narrow column, full-width content. */}
      <div className="md:hidden">
        <main className="mx-auto w-full max-w-[480px] pb-28">{children}</main>
      </div>

      {/* Tablet / desktop container — 3-column grid. */}
      <div className="hidden md:block">
        <div
          className={`
            mx-auto grid max-w-[1400px] gap-6 px-6 py-6
            grid-cols-[260px_minmax(0,1fr)]
            xl:grid-cols-[260px_minmax(0,1fr)_320px]
          `}
        >
          {leftSidebar ? (
            <aside aria-label="Compétitions">{leftSidebar}</aside>
          ) : (
            <aside />
          )}

          <main className="min-w-0">{children}</main>

          {rightSidebar && (
            <aside
              className="hidden xl:block"
              aria-label="Contenu complémentaire"
            >
              {rightSidebar}
            </aside>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
