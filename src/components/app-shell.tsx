import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";
import { TopNav } from "./top-nav";

interface AppShellProps {
  /** Center column — the main content of the page. */
  children: ReactNode;
  /** Left sidebar — typically a leagues / competitions list (desktop only). */
  leftSidebar?: ReactNode;
  /** Right rail — featured content / promo / news / ads (desktop only). */
  rightSidebar?: ReactNode;
  /**
   * Optional row rendered between the TopNav and the 3-column grid on
   * desktop. Centered, full-width. Used by the Home page for the sport
   * filter chips. On mobile it renders inside the main content area at
   * the very top, before [children].
   */
  topRow?: ReactNode;
}

/**
 * Page chrome wrapper.
 *
 * - **Mobile** (`< md`): single column, floating `<BottomNav />`. Sidebars
 *   are NOT rendered. [topRow] (if any) sits above [children].
 * - **Tablet / Desktop** (`md+`): sticky `<TopNav />` at the top, then the
 *   optional [topRow] centered, then a 3-column grid (sidebar / main /
 *   rail). Inspired by FotMob and Sofascore so the desktop experience
 *   doesn't waste real estate with a 480 px column.
 */
export function AppShell({
  children,
  leftSidebar,
  rightSidebar,
  topRow,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Mobile container — narrow column, full-width content. */}
      <div className="md:hidden">
        <main className="mx-auto w-full max-w-[480px] pb-28">
          {topRow && <div className="px-4 pt-4">{topRow}</div>}
          {children}
        </main>
      </div>

      {/* Tablet / desktop container. */}
      <div className="hidden md:block">
        {topRow && (
          <div className="mx-auto max-w-[1400px] px-6 pt-5">
            <div className="flex justify-center">{topRow}</div>
          </div>
        )}

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

      {/* Hide the marketing footer on mobile — the floating bottom nav
          already covers the bottom of the viewport and the footer
          links are reachable via the dedicated pages anyway. */}
      <div className="hidden md:block">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}
