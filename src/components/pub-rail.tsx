/**
 * Right-rail advertising slot — purely a visual placeholder for now.
 *
 * The label "PUB" sits above the box (Flutter app does the same with
 * the AkwaBet banner on the home feed). When a real ad provider lands
 * — AdSense, a direct deal, etc. — swap the inner `<div>` for the
 * provider's iframe / script and keep the chrome unchanged.
 */
export function PubRail() {
  return (
    <div className="sticky top-20 flex flex-col gap-2">
      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-text-secondary">
        Pub
      </p>
      <div
        aria-label="Emplacement publicitaire"
        className={`
          flex h-[600px] items-center justify-center rounded-card
          border border-dashed border-chip-border bg-chip/40
          text-[12px] uppercase tracking-wide text-text-muted
        `}
      >
        Espace réservé
      </div>
    </div>
  );
}
