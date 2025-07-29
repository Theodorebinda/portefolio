import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytique/Analytics";
import TrackPageView from "@/components/analytique/tracking-view";
import { GoogleAnalytics } from "@next/third-parties/google";

// Configuration optimisée de la police Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Meilleur affichage pendant le chargement
  variable: "--font-inter", // Permet d'utiliser la police via CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Toutes les variantes
});

export const metadata: Metadata = {
  title: "Theodore Samba",
  description:
    "Portefolio | Theodore Samba est un développeur web et mobile, développe des applications web et mobile.",
  metadataBase: new URL("https://theodore-samba.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://theodore-samba.vercel.app/",
    title: "Theodore Samba",
    description: "Portefolio | Développeur web et mobile",
    siteName: "Theodore Samba",
    images: [
      {
        url: "public/theodore - Copie.jpg",
        width: 1200,
        height: 630,
        alt: "Theodore Samba - Développeur web et mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theodore Samba",
    description: "Portefolio | Développeur web et mobile",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" translate="no" className={inter.variable}>
      <body className="font-sans  antialiased">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
