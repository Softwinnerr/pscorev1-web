import { cn } from "@/lib/utils";
import type { ScorerEvent } from "@/types/match-detail";
import { minutesLabel } from "@/types/match-detail";

/**
 * One row of the scorers list — name + minutes label. Aligned right for
 * the home side (so it abuts the score block) and left for the away
 * side, like the Flutter `_buildScorerRow`.
 */
export function ScorerLine({
  scorer,
  align,
}: {
  scorer: ScorerEvent;
  align: "left" | "right";
}) {
  return (
    <li
      className={cn(
        "flex items-baseline gap-2 text-[13px]",
        align === "right" ? "justify-end" : "justify-start",
      )}
    >
      <span className="font-semibold text-foreground">{scorer.playerName}</span>
      <span className="text-text-secondary">{minutesLabel(scorer.minutes)}</span>
    </li>
  );
}
