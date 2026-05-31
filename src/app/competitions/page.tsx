import { AppShell } from "@/components/app-shell";

export default function CompetitionsPage() {
  return (
    <AppShell>
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-[28px] text-foreground">
          Compétitions
        </h1>
        <p className="text-text-secondary">À venir.</p>
      </div>
    </AppShell>
  );
}
