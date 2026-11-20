import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delta, coffee with heart | Delta Cafés — The coffee of your life",
  description:
    "Discover the official world of Delta Cafés. Since 1961 in Campo Maior, Portugal, roasting coffee with human warmth, artisanal excellence, and positive impact.",
  keywords: [
    "Delta Cafés",
    "Portuguese coffee",
    "Lote Chávena",
    "Roast Portugal",
    "Rui Nabeiro",
    "Coffee Culture",
    "Campo Maior",
    "Espresso",
  ],
  authors: [{ name: "Delta Cafés" }],
  openGraph: {
    title: "Delta, coffee with heart | Delta Cafés",
    description: "The coffee of your life. Born from a dream in Campo Maior, Portugal.",
    images: [
      {
        url: "https://cdn.sanity.io/images/pcdkofnf/production/f0f69aff81fd15fba09ca70bcdf43e5e9fca029c-1280x720.jpg",
        width: 1280,
        height: 720,
        alt: "Delta Cafés",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#181818",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-oak-1000 text-creme-100 antialiased selection:bg-delta-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
