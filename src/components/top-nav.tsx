"use client";

import Link from "next/link";
import { Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "./theme-toggle";

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
      {/* 3-column grid : logo (start) · search (centred to the *page*,
          not to the leftover space) · right actions (end). Using a
          grid rather than a single flex row guarantees the search box
          stays at the exact horizontal centre regardless of the left
          and right sections' widths. */}
      <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-3 items-center px-6">
        <Link href="/" className="justify-self-start" aria-label="Aller à l'accueil">
          <span className="font-display text-[26px] leading-none tracking-tight text-foreground">
            1<span className="text-live-red">er</span>
            <span>score</span>
          </span>
        </Link>

        {/* Search — disabled for now; placeholder for the future global
            player/team/competition search. Compact width, kept centred. */}
        <div className="relative w-full max-w-[380px] justify-self-center">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            disabled
            placeholder="Rechercher…"
            className={cn(
              "h-10 w-full rounded-pill bg-card pl-10 pr-4 text-[14px]",
              "text-foreground placeholder:text-text-secondary",
              "border border-chip-border focus:border-primary focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          />
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <button
            type="button"
            className={cn(
              "rounded-pill bg-primary px-5 py-2 text-[14px] font-bold",
              "text-primary-foreground transition-colors hover:bg-primary-dark",
            )}
          >
            Sign in
          </button>
          <Popover>
            <PopoverTrigger
              aria-label="Réglages"
              className={cn(
                "flex size-9 items-center justify-center rounded-full",
                "text-foreground hover:bg-chip",
              )}
            >
              <Settings className="size-5" />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className={cn(
                "w-56 rounded-card border border-chip-border bg-card p-4",
                "shadow-[0_8px_24px_rgb(0_0_0/0.18)]",
              )}
            >
              <ThemeToggle />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
