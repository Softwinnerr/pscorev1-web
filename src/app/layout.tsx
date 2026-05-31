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
    // Hard-coding `dark` for now — mirrors the Flutter default until we
    // wire a theme toggle. Drop the class to render the light palette.
    <html
      lang="fr"
      className={cn("dark", dmSans.variable, jockeyOne.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
