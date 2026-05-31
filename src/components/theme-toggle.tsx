"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "system";

const OPTIONS: Array<{ value: Mode; label: string; icon: LucideIcon }> = [
  { value: "light", label: "Clair", icon: Sun },
  { value: "dark", label: "Sombre", icon: Moon },
  { value: "system", label: "Système", icon: Monitor },
];

/**
 * Three-way theme picker (Clair / Sombre / Système).
 *
 * Mirrors the Flutter `ThemeController` — same three modes, same
 * persistence story (here next-themes writes localStorage instead of
 * SharedPreferences). The active option fills with the brand green so
 * the current state reads instantly.
 *
 * Guards against the hydration mismatch next-themes warns about: until
 * the client has mounted the resolved theme, we skip the active styling
 * (renders all three as inactive). That one-frame flash is invisible to
 * the user.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
        Thème
      </p>
      <div className="flex flex-col gap-1">
        {OPTIONS.map(({ value, label, icon: Icon }) => {
          const active = mounted && theme === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center gap-3 rounded-pill px-3 py-2 text-[14px] font-medium",
                "transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-chip",
              )}
              aria-pressed={active}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
