"use client";

import { Radio, Sparkles, Newspaper } from "lucide-react";
import { useMatches } from "@/hooks/use-matches";
import { isLive } from "@/types/models";

/**
 * Right rail (desktop only). Three contextual cards inspired by FotMob:
 *
 *  • "En direct" — live match count.
 *  • "À la Une" — short pitch for the featured section.
 *  • News placeholder — wire to a feed later.
 *
 * Pure visual + a tiny data hook for the live count; no logic the home
 * page depends on, so failures here don't break the main feed.
 */
export function RightRail() {
  const { data } = useMatches();
  const liveCount = data?.filter(isLive).length ?? 0;

  return (
    <div className="sticky top-20 flex flex-col gap-4">
      <Card
        icon={<Radio className="size-5 text-live-red" />}
        title="En direct"
        subtitle={
          liveCount === 0
            ? "Aucun match en cours"
            : `${liveCount} match${liveCount > 1 ? "s" : ""} en cours`
        }
      />
      <Card
        icon={<Sparkles className="size-5 text-primary" />}
        title="À la Une"
        subtitle="Les rencontres incontournables du jour, sélectionnées par la rédaction."
      />
      <Card
        icon={<Newspaper className="size-5 text-text-secondary" />}
        title="Actualité"
        subtitle="Le flux info arrive prochainement."
      />
    </div>
  );
}

function Card({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <article className="rounded-card bg-card p-5">
      <header className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-[14px] font-bold text-foreground">{title}</h3>
      </header>
      <p className="text-[13px] leading-relaxed text-text-secondary">
        {subtitle}
      </p>
    </article>
  );
}
