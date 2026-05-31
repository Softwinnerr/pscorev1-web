import type { MatchDetail, TeamLineup } from "@/types/match-detail";

/**
 * Compositions tab — starting XI + substitutes + coach for each side.
 * Renders side-by-side on desktop, stacked on mobile.
 */
export function CompositionsTab({ detail }: { detail: MatchDetail }) {
  return (
    <div className="flex flex-col gap-4 py-4 md:grid md:grid-cols-2">
      <LineupCard
        title={detail.match.homeTeam?.name ?? "Home"}
        lineup={detail.lineups.home}
      />
      <LineupCard
        title={detail.match.awayTeam?.name ?? "Away"}
        lineup={detail.lineups.away}
      />
    </div>
  );
}

function LineupCard({
  title,
  lineup,
}: {
  title: string;
  lineup: TeamLineup;
}) {
  return (
    <section className="overflow-hidden rounded-card bg-card">
      <header className="px-5 py-4">
        <h3 className="line-clamp-1 text-[15px] font-bold text-foreground">
          {title}
        </h3>
        {lineup.coachName && (
          <p className="mt-0.5 text-[12px] text-text-secondary">
            Coach · {lineup.coachName}
          </p>
        )}
      </header>

      <Section title="Titulaires">
        {lineup.starters.map((p) => (
          <Row
            key={p.number}
            number={p.number}
            name={p.name}
            position={p.position}
          />
        ))}
      </Section>

      {lineup.substitutes.length > 0 && (
        <Section title="Remplaçants">
          {lineup.substitutes.map((p) => (
            <Row
              key={p.number}
              number={p.number}
              name={p.name}
              position={p.position}
            />
          ))}
        </Section>
      )}
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-divider px-5 py-3">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </p>
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

function Row({
  number,
  name,
  position,
}: {
  number: number;
  name: string;
  position?: string;
}) {
  return (
    <li className="grid grid-cols-[24px_1fr_auto] items-center gap-3 py-1.5">
      <span className="text-center text-[13px] font-bold text-text-secondary">
        {number}
      </span>
      <span className="line-clamp-1 text-[14px] text-foreground">{name}</span>
      {position && (
        <span className="text-[12px] text-text-muted">{position}</span>
      )}
    </li>
  );
}
