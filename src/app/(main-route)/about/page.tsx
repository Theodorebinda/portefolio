"use client";
import { Container } from "@/ui/components/container/container";
import HeroSectionAbout from "@/components/heroSectionAbout";
import ToolsAndSoftwareSection from "@/components/sectionToolsAndSoftward";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (window.scrollY === 0) {
        // Vérifie si on est en haut de la page
        setShowMore(false); // Ferme la section si on est en haut
        setShowScrollToTop(false); // Cache le bouton de remontée
      }
    };

    window.addEventListener("scroll", handleScroll); //  l'écouteur d'événements

    return () => {
      window.removeEventListener("scroll", handleScroll); // Nettoie l'écouteur d'événements
    };
  }, []);
  const toggleShowMore = () => {
    setShowMore((prev) => {
      if (!prev) {
        // Si on ouvre la section, faire défiler vers le bas
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
          setShowScrollToTop(true);
        }, 500); //
      } else {
        setShowScrollToTop(false); // Cacher le bouton si la section est fermée
      }
      return !prev;
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowMore(false);
    setShowScrollToTop(false);
  };

  return (
    <Container className="flex flex-col  ">
      <HeroSectionAbout />
      <ToolsAndSoftwareSection />
      <LinkToOtherPage
        className="md:ml-2"
        texte={"Détails Carrières ? Ici 😊"}
        link={"/competences"}
      />
      <div className="flex flex-col items-center mt-4">
        {!showMore && ( // Cacher le bouton si le contenu est ouvert
          <button
            onClick={toggleShowMore}
            className="text-[#b2d2fa] hover:text-[#5182be] animate-bounce "
          >
            <ChevronDownCircle size={50} />
          </button>
        )}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} // État initial
            animate={{ opacity: 1, height: "auto" }} // État animé
            exit={{ opacity: 0, height: 0 }} // État de sortie
            transition={{ duration: 0.3 }} // Durée de l'animation
            className="mt-20"
          >
            <HeroSectionAbout />
          </motion.div>
        )}
        {showScrollToTop && ( // Afficher le bouton de remontée
          <button
            onClick={scrollToTop}
            className="text-[#b2d2fa] hover:text-[#5182be] animate-bounce fixed bottom-10 right-10"
          >
            <ChevronUpCircle size={50} />
          </button>
        )}
      </div>
    </Container>
  );
};

export default About;
