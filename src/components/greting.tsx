// components/Greeting.tsx
"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const [visitTime, setVisitTime] = useState<Date | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const now = new Date();
    setVisitTime(now);
    const currentHour = now.getHours();
    let greetingKey = "hero.greeting";

    if (currentHour >= 5 && currentHour < 12) {
      greetingKey = "hero.morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingKey = "hero.afternoon";
    } else {
      greetingKey = "hero.evening";
    }

    setGreeting(t(greetingKey));
  }, [t]);

  return (
    <div className="">
      <span>{greeting} , </span>
    </div>
  );
};

export default Greeting;
