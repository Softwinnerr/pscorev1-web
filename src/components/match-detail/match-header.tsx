import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NetworkImage } from "@/components/network-image";
import { cn } from "@/lib/utils";
import type { MatchDetail } from "@/types/match-detail";
import { isLive, isFinished } from "@/types/models";
import { ScorerLine } from "./scorer-line";

/**
 * Top brand surface for the match detail page — direct port of the
 * Flutter `MatchSummaryHeader`. Shows competition + venue at top, then
 * the home/away crests around the big score, and finally the scorers
 * list. No morph-on-scroll yet (will add `position: sticky` + an
 * IntersectionObserver in a follow-up).
 */
export function MatchHeader({ detail }: { detail: MatchDetail }) {
  const match = detail.match;
  const home = match.homeTeam;
  const away = match.awayTeam;
  const homeScorers = detail.scorers.filter((s) => s.side === "home");
  const awayScorers = detail.scorers.filter((s) => s.side === "away");

  return (
    <section className="relative overflow-hidden rounded-card bg-card">
      {/* Top bar: back button + competition label + date */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <Link
          href="/"
          aria-label="Retour"
          className={cn(
            "flex size-9 items-center justify-center rounded-full",
            "bg-chip text-foreground hover:bg-chip-border",
          )}
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-[14px] font-semibold text-text-secondary">
            {detail.competition}
          </p>
          {detail.venue && (
            <p className="line-clamp-1 text-[12px] text-text-muted">
              {detail.venue}
            </p>
          )}
        </div>
      </div>

      {/* Score row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-6">
        <TeamColumn name={home?.name ?? "TBD"} logoUrl={home?.logo} />
        <ScoreBlock detail={detail} />
        <TeamColumn name={away?.name ?? "TBD"} logoUrl={away?.logo} />
      </div>

      {/* Scorers list — football only and only when there are any. */}
      {detail.scorers.length > 0 && (
        <div className="grid grid-cols-2 gap-6 border-t border-divider px-5 py-4">
          <ul className="space-y-1.5">
            {homeScorers.map((s, i) => (
              <ScorerLine key={`h-${i}`} scorer={s} align="right" />
            ))}
            {homeScorers.length === 0 && <PlaceholderScorer align="right" />}
          </ul>
          <ul className="space-y-1.5">
            {awayScorers.map((s, i) => (
              <ScorerLine key={`a-${i}`} scorer={s} align="left" />
            ))}
            {awayScorers.length === 0 && <PlaceholderScorer align="left" />}
          </ul>
        </div>
      )}
    </section>
  );
}

function TeamColumn({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <NetworkImage url={logoUrl} alt={name} width={64} height={64} />
      <span className="line-clamp-2 text-center text-[15px] font-bold text-foreground">
        {name}
      </span>
    </div>
  );
}

function ScoreBlock({ detail }: { detail: MatchDetail }) {
  const match = detail.match;
  const home = match.scoreHomeTeam ?? 0;
  const away = match.scoreAwayTeam ?? 0;

  if (isLive(match)) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-display text-[44px] leading-none",
              home >= away ? "text-foreground" : "text-text-muted",
            )}
          >
            {home}
          </span>
          <span
            className={cn(
              "font-display text-[44px] leading-none",
              away >= home ? "text-foreground" : "text-text-muted",
            )}
          >
            {away}
          </span>
        </div>
        <span className="font-display text-[18px] font-bold text-live-red">
          {match.currentMinute ?? "LIVE"}
        </span>
      </div>
    );
  }

  if (isFinished(match)) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-display text-[44px] leading-none",
              home >= away ? "text-foreground" : "text-text-muted",
            )}
          >
            {home}
          </span>
          <span
            className={cn(
              "font-display text-[44px] leading-none",
              away >= home ? "text-foreground" : "text-text-muted",
            )}
          >
            {away}
          </span>
        </div>
        <span className="text-[13px] font-semibold text-text-secondary">
          Terminé
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-[14px] text-foreground">
        {match.scheduleTime ?? ""}
      </span>
    </div>
  );
}

function PlaceholderScorer({ align }: { align: "left" | "right" }) {
  return (
    <li
      className={cn(
        "text-[13px] text-text-muted",
        align === "right" ? "text-right" : "text-left",
      )}
    >
      —
    </li>
  );
}
