// hooks/useTranslation.ts
"use client";

import { useContext } from "react";
import fr from "@/lib/locales/languages/fr.json";
import en from "@/lib/locales/languages/en.json";
import { LanguageContext } from "@/contexts/language/LanguageContext";

const translations: { [key: string]: any } = {
  fr,
  en,
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }

  const { language } = context;

  const t = (key: string): string => {
    // Gestion des clés nested comme "routes.about"
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Retourne la clé si la traduction n'existe pas
      }
    }

    return value || key;
  };

  return { t, language };
};
