// components/Greeting.tsx
import { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("Bienvenue");
  const [visitTime, setVisitTime] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setVisitTime(now);
    const currentHour = now.getHours();
    let greetingMessage = "Bienvenue";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Bonjour";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = "Bon après-midi";
    } else {
      greetingMessage = "Bonsoir";
    }

    setGreeting(greetingMessage);
  }, []);

  return (
    <div className="">
      <span>{greeting} !, </span>
    </div>
  );
};

export default Greeting;
