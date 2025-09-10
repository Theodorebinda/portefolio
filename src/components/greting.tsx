// components/Greeting.tsx
"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useMemo } from "react";

const Greeting = () => {
  const { t } = useTranslation();

  const greeting = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    let greetingKey = "hero.greeting";

    if (currentHour >= 5 && currentHour < 12) {
      greetingKey = "hero.morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingKey = "hero.afternoon";
    } else {
      greetingKey = "hero.evening";
    }

    return t(greetingKey);
  }, [t]); // Maintenant 't' peut être dans les dépendances

  return (
    <div className="">
      <span>{greeting} , </span>
    </div>
  );
};

export default Greeting;
