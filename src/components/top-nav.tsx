"use client";

import Link from "next/link";
import { Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Persistent top navigation bar — shown on tablets and desktop (`md:flex`).
 * Mobile users keep the floating bottom nav (`<BottomNav />`) instead.
 *
 * Layout matches the wireframe : logo (left), wide search input (centre),
 * "Sign in" CTA + settings cog (right). Section navigation (Matchs /
 * Compétitions / Profil) lives in the mobile bottom nav and in the
 * page-level cross-links, not here.
 */
export function TopNav() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-divider bg-background/85 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
        <Link href="/" className="shrink-0" aria-label="Aller à l'accueil">
          <span className="font-display text-[26px] leading-none tracking-tight text-foreground">
            1<span className="text-live-red">er</span>
            <span>score</span>
          </span>
        </Link>

        {/* Search — disabled for now; placeholder for the future global
            player/team/competition search. */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            disabled
            placeholder="Rechercher une équipe, un joueur, une compétition…"
            className={cn(
              "h-10 w-full rounded-pill bg-card pl-10 pr-4 text-[14px]",
              "text-foreground placeholder:text-text-secondary",
              "border border-chip-border focus:border-primary focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cn(
              "rounded-pill bg-primary px-5 py-2 text-[14px] font-bold",
              "text-primary-foreground transition-colors hover:bg-primary-dark",
            )}
          >
            Sign in
          </button>
          <button
            type="button"
            aria-label="Réglages"
            className={cn(
              "flex size-9 items-center justify-center rounded-full",
              "text-foreground hover:bg-chip",
            )}
          >
            <Settings className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
