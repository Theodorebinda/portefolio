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
  display: "swap",
  variable: "--font-inter", // Permet d'u
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Tutes les variantes
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
        url: "https://theodorebinda.me/theodore%20-%20Copie.jpg",
        width: 1200,
        height: 630,
        alt: "Theodore Samba - Développeur web et mobile",
        type: "image/jpeg",
      },
      {
        url: "https://theodorebinda.me/theodore-removebg-preview.png",
        width: 800,
        height: 800,
        alt: "Theodore Samba - Photo de profil",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theodore Samba | Développeur web & mobile",
    description:
      "Portfolio de Theodore Samba, développeur web & mobile. Projets, compétences et contact.",
    images: [
      "https://theodorebinda.me/theodore%20-%20Copie.jpg",
      "https://theodorebinda.me/theodore-removebg-preview.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // URLs des images avec encodage correct pour les espaces
  // Les fichiers du dossier /public sont servis directement à la racine
  // Ces URLs sont stables et accessibles directement (pas via _next/image)
  const baseUrl = "https://theodorebinda.me";
  const image1Url = `${baseUrl}/theodore%20-%20Copie.jpg`; // Espace encodé en %20
  const image2Url = `${baseUrl}/theodore-removebg-preview.png`; // Accessible directement depuis /public

  // Métadonnées structurées pour les images (JSON-LD)
  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Theodore Samba",
    alternateName: ["Theodore Binda", "Samba Binda"],
    image: [image1Url, image2Url],
    jobTitle: "Développeur web & mobile",
    url: baseUrl,
    sameAs: [
      "https://github.com/Theodorebinda",
      "https://www.linkedin.com/in/theodore-samba-26b456282/",
    ],
  };

  return (
    <html lang="fr" translate="no" className={inter.variable}>
      <head>
        {/* Favicon - Next.js sert automatiquement /public/favicon.ico à /favicon.ico */}
        {/* Métadonnées structurées pour les images (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
        {/* Meta tags pour autoriser les crawlers d'IA */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        {/* Meta tags pour les images */}
        <meta name="image" content={image1Url} />
        <meta property="og:image:secure_url" content={image1Url} />
        <meta property="og:image:secure_url" content={image2Url} />
        {/* Permettre l'indexation des images par Google */}
        <link rel="canonical" href="https://theodorebinda.me" />
      </head>
      <body className="font-sans  antialiased">
        <LanguageProvider>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </LanguageProvider>
      </body>
    </html>
  );
}
