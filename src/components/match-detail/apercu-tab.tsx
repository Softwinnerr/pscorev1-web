import {
  CircleDot,
  XOctagon,
  Square,
  ArrowDownUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormResult, MatchDetail, MatchEvent } from "@/types/match-detail";

/**
 * Aperçu tab — timeline of events ordered by minute, form vs form pills,
 * and the bookmaker odds box. Direct port of the Flutter `ApercuTab`.
 */
export function ApercuTab({ detail }: { detail: MatchDetail }) {
  return (
    <div className="flex flex-col gap-4 py-4">
      {detail.events.length > 0 && <EventsTimeline events={detail.events} />}
      <FormCard
        homeName={detail.match.homeTeam?.name ?? "Home"}
        awayName={detail.match.awayTeam?.name ?? "Away"}
        homeForm={detail.homeForm}
        awayForm={detail.awayForm}
      />
      {detail.odds && <OddsCard odds={detail.odds} />}
    </div>
  );
}

// ── Events timeline ───────────────────────────────────────────────────

function EventsTimeline({ events }: { events: MatchEvent[] }) {
  // Split at minute 45 to render the "Mi-temps" divider in the middle
  // and "Fin du match" at the top — same idiom as the Flutter version.
  const firstHalf = events.filter((e) => e.minute <= 45);
  const secondHalf = events.filter((e) => e.minute > 45);

  return (
    <section className="rounded-card bg-card p-4">
      <SectionLabel label="Fin du match" />
      <ul className="mt-2 flex flex-col gap-3">
        {[...secondHalf].reverse().map((e, i) => (
          <EventRow key={`s-${i}`} event={e} />
        ))}
      </ul>
      {firstHalf.length > 0 && (
        <>
          <div className="my-4">
            <SectionLabel label="Mi-temps" />
          </div>
          <ul className="flex flex-col gap-3">
            {[...firstHalf].reverse().map((e, i) => (
              <EventRow key={`f-${i}`} event={e} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-divider" />
      <span className="text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      <span className="h-px flex-1 bg-divider" />
    </div>
  );
}

function EventRow({ event }: { event: MatchEvent }) {
  const isHome = event.side === "home";
  return (
    <li
      className={cn(
        "grid grid-cols-[1fr_28px_1fr] items-center gap-3 text-[13px]",
      )}
    >
      {/* Left lane (home events) */}
      <div
        className={cn(
          "flex flex-col items-end",
          isHome ? "visible" : "invisible",
        )}
      >
        <EventBody event={event} alignRight />
      </div>

      {/* Center: minute */}
      <span className="text-center text-[12px] font-semibold text-text-secondary">
        {event.minute}&apos;
      </span>

      {/* Right lane (away events) */}
      <div
        className={cn(
          "flex flex-col items-start",
          isHome ? "invisible" : "visible",
        )}
      >
        <EventBody event={event} alignRight={false} />
      </div>
    </li>
  );
}

function EventBody({
  event,
  alignRight,
}: {
  event: MatchEvent;
  alignRight: boolean;
}) {
  return (
    <div
      className={cn(
        "flex max-w-full items-center gap-2",
        alignRight ? "flex-row-reverse" : "flex-row",
      )}
    >
      <EventIcon type={event.type} />
      <div
        className={cn(
          "min-w-0",
          alignRight ? "text-right" : "text-left",
        )}
      >
        <p className="line-clamp-1 font-semibold text-foreground">
          {event.playerName}
        </p>
        {event.secondaryPlayerName && (
          <p className="line-clamp-1 text-[12px] text-text-secondary">
            {event.secondaryPlayerName}
          </p>
        )}
      </div>
    </div>
  );
}

function EventIcon({ type }: { type: MatchEvent["type"] }) {
  switch (type) {
    case "goal":
    case "penaltyScored":
      return <CircleDot className="size-5 text-primary" />;
    case "ownGoal":
    case "penaltyMissed":
      return <XOctagon className="size-5 text-live-red" />;
    case "yellowCard":
      return (
        <Square
          className="size-4 fill-[#FACC15] text-[#FACC15]"
          strokeWidth={1}
        />
      );
    case "redCard":
      return (
        <Square
          className="size-4 fill-live-red text-live-red"
          strokeWidth={1}
        />
      );
    case "substitution":
      return <ArrowDownUp className="size-5 text-text-secondary" />;
  }
}

// ── Form ──────────────────────────────────────────────────────────────

function FormCard({
  homeName,
  awayName,
  homeForm,
  awayForm,
}: {
  homeName: string;
  awayName: string;
  homeForm: FormResult[];
  awayForm: FormResult[];
}) {
  return (
    <section className="rounded-card bg-card p-5">
      <h3 className="mb-4 text-[14px] font-bold uppercase tracking-wide text-text-secondary">
        Forme
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <TeamForm name={homeName} form={homeForm} />
        <TeamForm name={awayName} form={awayForm} />
      </div>
    </section>
  );
}

function TeamForm({ name, form }: { name: string; form: FormResult[] }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="line-clamp-1 text-[13px] font-semibold text-foreground">
        {name}
      </p>
      <div className="flex items-center gap-1.5">
        {form.map((r, i) => (
          <FormDot key={i} result={r} />
        ))}
      </div>
    </div>
  );
}

function FormDot({ result }: { result: FormResult }) {
  const color =
    result === "win"
      ? "bg-primary"
      : result === "draw"
        ? "bg-[#FFA502]"
        : "bg-live-red";
  return <span className={cn("size-3 rounded-full", color)} aria-hidden />;
}

// ── Odds ──────────────────────────────────────────────────────────────

function OddsCard({
  odds,
}: {
  odds: NonNullable<MatchDetail["odds"]>;
}) {
  return (
    <section className="rounded-card bg-card p-5">
      <h3 className="mb-4 text-[14px] font-bold uppercase tracking-wide text-text-secondary">
        Cotes · {odds.bookmaker}
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <OddsCell label="1" value={odds.home} highlight={odds.home <= odds.draw && odds.home <= odds.away} />
        <OddsCell label="N" value={odds.draw} highlight={odds.draw < odds.home && odds.draw < odds.away} />
        <OddsCell label="2" value={odds.away} highlight={odds.away < odds.home && odds.away < odds.draw} />
      </div>
    </section>
  );
}

function OddsCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-pill border border-chip-border bg-chip py-3",
        highlight && "border-primary bg-primary/10",
      )}
    >
      <p className="text-[12px] font-semibold text-text-secondary">{label}</p>
      <p className="mt-1 font-display text-[20px] text-foreground">
        {value.toFixed(2)}
      </p>
    </div>
  );
}
