"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Persistent top navigation bar — shown on tablets and desktop (`md:flex`).
 * Mobile users keep the floating bottom nav (`<BottomNav />`) instead.
 * Inspired by FotMob: brand on the left, search in the middle, nav links
 * + a couple of utility icons on the right.
 */
const tabs = [
  { href: "/", label: "Matchs" },
  { href: "/competitions", label: "Compétitions" },
  { href: "/profil", label: "Profil" },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 hidden border-b border-divider bg-background/85 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
        <Link href="/" className="shrink-0" aria-label="Aller à l'accueil">
          <span className="font-display text-[26px] leading-none tracking-tight text-foreground">
            1<span className="text-live-red">er</span>
            <span>score</span>
          </span>
        </Link>

        {/* Search — non-functional for now, placeholder for the future
            global player/team/competition search. */}
        <div className="relative flex-1 max-w-[640px]">
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

        <nav className="flex items-center gap-1">
          {tabs.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-pill px-4 py-2 text-[14px] font-bold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-chip",
                )}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
