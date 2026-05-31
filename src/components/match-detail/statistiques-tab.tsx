import type { MatchDetail, MatchStatistic } from "@/types/match-detail";
import { statHomeRatio } from "@/types/match-detail";

/**
 * Statistiques tab — for each stat, render two side-by-side bars with the
 * raw numbers at each end. Bars are width-proportional to each side's
 * share of the total, with home growing rightward and away leftward
 * (Flutter `_StatBar` shape).
 */
export function StatistiquesTab({ detail }: { detail: MatchDetail }) {
  const stats = detail.stats.full ?? [];
  if (stats.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[14px] text-text-secondary">
        Pas encore de statistiques.
      </p>
    );
  }

  return (
    <section className="rounded-card bg-card px-5 py-4">
      <ul className="flex flex-col gap-5">
        {stats.map((s, i) => (
          <li key={i}>
            <StatRow stat={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatRow({ stat }: { stat: MatchStatistic }) {
  const homeRatio = statHomeRatio(stat);
  const fmt = (v: number) => (stat.isPercentage ? `${v}%` : `${v}`);
  return (
    <div>
      <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[13px]">
        <span className="text-left font-display text-[18px] text-foreground">
          {fmt(stat.homeValue)}
        </span>
        <span className="text-center font-semibold uppercase tracking-wide text-text-secondary">
          {stat.label}
        </span>
        <span className="text-right font-display text-[18px] text-foreground">
          {fmt(stat.awayValue)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Home bar grows rightward to the centre. */}
        <div className="flex h-1.5 justify-end overflow-hidden rounded-full bg-chip">
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${(homeRatio * 100).toFixed(2)}%` }}
          />
        </div>
        {/* Away bar grows leftward from the centre. */}
        <div className="flex h-1.5 overflow-hidden rounded-full bg-chip">
          <span
            className="block h-full rounded-full bg-live-red"
            style={{ width: `${((1 - homeRatio) * 100).toFixed(2)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
