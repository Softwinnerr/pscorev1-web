import type { ReactNode } from "react";
import { CloudOff, Inbox, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AsyncStateViewProps {
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  /** Only rendered on the success path — safe to dereference non-null
   *  fields inside (mirrors the Flutter `builder` contract). */
  children: ReactNode;
  onRetry?: () => void;
  emptyMessage?: string;
  emptyHint?: string;
  emptyIcon?: LucideIcon;
}

/**
 * Loading / error / empty / content selector — direct port of the
 * Flutter `AsyncStateView`. Centralises the three "non-success" states
 * so every screen has the same retry copy + icons.
 */
export function AsyncStateView({
  isLoading,
  error,
  isEmpty,
  children,
  onRetry,
  emptyMessage = "Aucune donnée",
  emptyHint,
  emptyIcon: EmptyIcon = Inbox,
}: AsyncStateViewProps) {
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        />
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
        <CloudOff className="size-14 text-live-red" />
        <p className="text-lg font-semibold text-foreground">
          Erreur de chargement
        </p>
        <p className="text-center text-sm text-text-secondary">
          {error.message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="mt-2 rounded-xl">
            Réessayer
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-12">
        <EmptyIcon className="size-14 text-text-secondary" />
        <p className="text-lg font-semibold text-foreground">{emptyMessage}</p>
        {emptyHint && (
          <p className="text-sm text-text-secondary">{emptyHint}</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
