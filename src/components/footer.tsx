import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Persistent site footer. Sticks to the bottom of every page (rendered
 * inside `AppShell`). Three sections :
 *
 *   1. Brand + short pitch + app-store badges
 *   2. Three columns of links (Navigation / Compétitions / Légal)
 *   3. Bottom bar with copyright and social icons
 *
 * Brand icons (Apple / Google Play / X / Instagram / Facebook) are inlined
 * as SVG rather than pulled from `lucide-react` — Lucide 1.x dropped those
 * marks for trademark reasons, and inline keeps the paths under our
 * control without an extra dependency.
 *
 * Link targets are placeholders (`#`) for routes that don't exist yet ;
 * swap in real `href`s as each page lands.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-divider bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <BrandColumn />
          <LinkColumn
            title="Navigation"
            links={[
              { label: "Matchs", href: "/" },
              { label: "Compétitions", href: "/competitions" },
              { label: "Profil", href: "/profil" },
              { label: "Rechercher", href: "#" },
            ]}
          />
          <LinkColumn
            title="Compétitions"
            links={[
              { label: "Ligue 2 Ivoirienne", href: "#" },
              { label: "Championnat FENU", href: "#" },
              { label: "Coupe Excellence Lycéenne", href: "#" },
              { label: "Interclasses ESATIC", href: "#" },
            ]}
          />
          <LinkColumn
            title="Légal"
            links={[
              { label: "Mentions légales", href: "#" },
              { label: "Politique de confidentialité", href: "#" },
              { label: "Conditions d'utilisation", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />
        </div>
      </div>

      <BottomBar year={year} />
    </footer>
  );
}

// ── Brand column ────────────────────────────────────────────────────────

function BrandColumn() {
  return (
    <div className="flex flex-col gap-5">
      <Link href="/" aria-label="Aller à l'accueil">
        <span className="font-display text-[28px] leading-none tracking-tight text-foreground">
          1<span className="text-live-red">er</span>
          <span>score</span>
        </span>
      </Link>

      <p className="max-w-[360px] text-[14px] leading-relaxed text-text-secondary">
        Suivez les compétitions amateurs, scolaires, universitaires et
        semi‑pro en Côte d&apos;Ivoire : football, basket, volley,
        handball — résultats, classements, statistiques.
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        <AppBadge icon={<AppleMark />} top="Télécharger sur" bottom="App Store" />
        <AppBadge icon={<GooglePlayMark />} top="Disponible sur" bottom="Google Play" />
      </div>
    </div>
  );
}

function AppBadge({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-2 rounded-pill border border-chip-border bg-background",
        "px-4 py-2 text-foreground transition-colors hover:bg-chip",
      )}
    >
      <span className="text-foreground">{icon}</span>
      <div className="text-left leading-tight">
        <p className="text-[10px] uppercase tracking-wide text-text-secondary">
          {top}
        </p>
        <p className="text-[13px] font-bold">{bottom}</p>
      </div>
    </a>
  );
}

// ── Link column ─────────────────────────────────────────────────────────

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-[14px] text-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Bottom bar ──────────────────────────────────────────────────────────

function BottomBar({ year }: { year: number }) {
  return (
    <div className="border-t border-divider">
      <div className="mx-auto flex max-w-[1400px] flex-col-reverse items-center justify-between gap-4 px-6 py-5 md:flex-row">
        <p className="text-[13px] text-text-secondary">
          © {year} 1erscore · Tous droits réservés
        </p>
        <div className="flex items-center gap-1">
          <SocialIcon label="X (Twitter)" icon={<XMark />} />
          <SocialIcon label="Instagram" icon={<InstagramMark />} />
          <SocialIcon label="Facebook" icon={<FacebookMark />} />
        </div>
      </div>
    </div>
  );
}

function SocialIcon({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        "text-foreground transition-colors hover:bg-chip",
      )}
    >
      {icon}
    </a>
  );
}

// ── Brand SVG marks (inline) ────────────────────────────────────────────

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current">
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zM21.69 17.04c-.524 1.15-.78 1.66-1.45 2.68-.96 1.46-2.3 3.27-3.97 3.28-1.48.02-1.86-.96-3.86-.94-2 .01-2.42.96-3.9.94-1.67-.02-2.94-1.65-3.9-3.1-2.68-4.04-2.96-8.79-1.31-11.31 1.18-1.8 3.04-2.85 4.79-2.85 1.78 0 2.9.97 4.37.97 1.43 0 2.3-.97 4.36-.97 1.56 0 3.21.85 4.39 2.32-3.86 2.12-3.24 7.65 0 8.99z" />
    </svg>
  );
}

function GooglePlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <path
        fill="#34A853"
        d="M3 20.5V3.5c0-.4.2-.7.5-.9l10.9 9.4-10.9 9.4c-.3-.2-.5-.5-.5-.9z"
      />
      <path
        fill="#FBBC04"
        d="m17.8 14.3-3.4-2.3 3.4-2.3 3.5 2c.8.5.8 1.7 0 2.2l-3.5 2.4z"
      />
      <path
        fill="#EA4335"
        d="M3.5 2.6 14.4 12 17.8 9.7 4.8 2.2c-.4-.2-.9-.1-1.3.4z"
      />
      <path
        fill="#4285F4"
        d="M14.4 12 3.5 21.4c.4.5.9.6 1.3.4l13-7.5z"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.396 3.635 1.363 2.668 2.33 2.402 3.503 2.344 4.78 2.286 6.06 2.272 6.469 2.272 9.728s.014 3.668.072 4.948c.058 1.277.324 2.45 1.291 3.417.967.967 2.14 1.233 3.417 1.291 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.277-.058 2.45-.324 3.417-1.291.967-.967 1.233-2.14 1.291-3.417.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.324-2.45-1.291-3.417C19.398.396 18.225.13 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}
