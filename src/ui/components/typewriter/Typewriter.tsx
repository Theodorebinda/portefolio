import React, { useState, useEffect } from "react";
import "../styles/App.css";

interface TypewriterProps {
  texts: string[];      // Tableau des textes à afficher
  speed: number;        // Vitesse de frappe en millisecondes
  deleteDelay: number;  // Délai avant la suppression après l'écriture complète
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed, deleteDelay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (index < texts[currentIndex].length && !isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => texts[currentIndex].substring(0, index + 1));
        setIndex((prev) => index + 1);
      }, speed);
    } else if (index === texts[currentIndex].length && !isDeleting) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, deleteDelay);
    } else if (index > 0 && isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => texts[currentIndex].substring(0, index - 1));
        setIndex((prev) => index - 1);
      }, speed);
    } else if (index === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [displayedText, index, texts, speed, deleteDelay, isDeleting, currentIndex]);

  return (
    <div className="typewriter">
      {displayedText}
      <span className="cursor">|</span>
    </div>
  );
};

export default Typewriter;
