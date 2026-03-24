import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Entscheiden ohne Druck – Madeleine Maßmann | Coaching Kinderfrage",
  description:
    "10-wöchige 1:1-Begleitung für Frauen, die sich bei der Kinderfrage im Kreis drehen. Zertifiziertes Coaching mit Madeleine Maßmann – ohne Bewertung, ohne Druck.",
  keywords: [
    "Kinderfrage Coaching",
    "Kinder oder keine Kinder",
    "Entscheidungshilfe Kinderwunsch",
    "Life Coaching Frauen",
    "Madeleine Maßmann",
  ],
  openGraph: {
    title: "Entscheiden ohne Druck – Coaching zur Kinderfrage",
    description:
      "Finde Klarheit bei der größten Lebensfrage – ohne Druck, ohne Bewertung.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID || ""} />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
