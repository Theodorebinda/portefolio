"use client";
import { Container } from "@/ui/components/container/container";
import HeroSectionAbout from "@/components/heroSectionAbout";
import ToolsAndSoftwareSection from "@/components/sectionToolsAndSoftward";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import AboutMe from "@/components/detailAbout";

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
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
          setShowScrollToTop(true);
        }, 500); //
      } else {
        setShowScrollToTop(false);
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
      <div className="flex flex-col  mt-4">
        {!showMore && (
          <button
            onClick={toggleShowMore}
            className="text-[#b2d2fa] hover:text-[#5182be] animate-bounce fixed bottom-10 right-10 z-50 flex items-center justify-center rounded-full bg-[#1a1a1a] p-2 shadow-lg transition-all duration-900 hover:bg-[#2c2c2c] disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled={isScrolled}
          >
            <ChevronDownCircle size={50} />
          </button>
        )}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-20"
          >
            <AboutMe />
          </motion.div>
        )}
        {showScrollToTop && (
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
