import type { Metadata } from "next";
import { DM_Sans, Jockey_One } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { cn } from "@/lib/utils";

/** DM Sans — body font (matches Flutter `GoogleFonts.dmSans`). */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Jockey One — display font for big titles, scores, live time. */
const jockeyOne = Jockey_One({
  variable: "--font-jockey-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "1erscore",
  description:
    "Suivez les compétitions amateurs, scolaires, universitaires et semi-pro ivoiriennes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Light palette by default (matches the design wireframe). To opt in
    // to the dark palette, add the `dark` class on this element or wire
    // a runtime theme controller later.
    <html
      lang="fr"
      // next-themes mutates this className at runtime (adds/removes
      // `dark`) — suppress the React hydration mismatch warning for
      // the html element only.
      suppressHydrationWarning
      className={cn(dmSans.variable, jockeyOne.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
