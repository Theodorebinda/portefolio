import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytique/Analytics";
import TrackPageView from "@/components/analytique/tracking-view";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/contexts/language/LanguageContext";

// Configuration optimisée de la police Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Meilleur affichage pendant le chargement
  variable: "--font-inter", // Permet d'utiliser la police via CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Toutes les variantes
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theodorebinda.me"),
  title: {
    default: "Theodore Samba | Développeur web & mobile",
    template: "%s | Theodore Samba",
  },
  description:
    "Portfolio de Theodore Samba (aussi Theodore Binda / Samba Binda), développeur web & mobile. Projets, compétences, contact et services.",
  applicationName: "Portfolio Theodore Samba",
  authors: [{ name: "Theodore Samba", url: "https://theodorebinda.me" }],
  creator: "Theodore Samba",
  publisher: "Theodore Samba",
  category: "Portfolio",
  keywords: [
    "Theodore",
    "Theodore Samba",
    "Theodore Binda",
    "Samba Binda",
    "Développeur web",
    "Développeur mobile",
    "Développeur full stack",
    "Next.js",
    "React",
    "Portfolio",
    "Freelance",
    "Kinshasa",
    "RDC",
    "Congo",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      fr: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Theodore Samba | Développeur web & mobile",
    description:
      "Portfolio de Theodore Samba, développeur web & mobile. Projets, compétences et contact.",
    siteName: "Theodore Samba",
    images: [
      {
        url: "/theodore - Copie.jpg",
        width: 1200,
        height: 630,
        alt: "Theodore Samba - Développeur web et mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theodore Samba | Développeur web & mobile",
    description:
      "Portfolio de Theodore Samba, développeur web & mobile. Projets, compétences et contact.",
    images: ["/theodore - Copie.jpg"],
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
        <LanguageProvider>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </LanguageProvider>
      </body>
    </html>
  );
}
