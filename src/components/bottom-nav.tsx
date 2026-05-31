"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volleyball, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Persistent bottom navigation — port of the Flutter `MainScaffold` tab
 * bar. Three top-level tabs (Matchs / Compétitions / Profil), each
 * mapped to a route under the App Router.
 */
const tabs = [
  { href: "/", label: "Matchs", icon: Volleyball },
  { href: "/competitions", label: "Compétitions", icon: Trophy },
  { href: "/profil", label: "Profil", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    // Floating glass-ish pill — Flutter uses LiquidGlass; web fallback
    // is a frosted backdrop-blurred card with a subtle ring.
    <nav
      className={cn(
        "fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(420px,calc(100%-2rem))]",
        "rounded-pill border border-chip-border bg-card/85 backdrop-blur-xl",
        "shadow-[0_8px_24px_rgb(0_0_0/0.25)]",
      )}
      aria-label="Navigation principale"
    >
      <ul className="grid grid-cols-3">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="p-2">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-pill py-2 transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-chip",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-6" strokeWidth={active ? 2.2 : 1.8} />
                <span className="text-[13px] font-bold leading-none">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
