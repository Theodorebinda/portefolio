"use client";
import AnnualSummary from "@/components/annual-summary";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { AnnualDataType, fetchAnnualData } from "@/utils/data";
import { ChevronUpCircle } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

const ITEMS_PER_LOAD = 2;

const Carriere: React.FC = () => {
  const [annualData, setAnnualData] = useState<AnnualDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const loader = useRef<HTMLDivElement>(null);
  const initialized = useRef(false); // Nouvelle référence pour suivre l'initialisation

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data, hasMore: newHasMore } = await fetchAnnualData(
        offset,
        ITEMS_PER_LOAD
      );

      // Vérifier les doublons avant d'ajouter
      setAnnualData((prevData) => {
        const existingYears = new Set(prevData.map((item) => item.year));
        const newItems = data.filter((item) => !existingYears.has(item.year));
        return [...prevData, ...newItems];
      });

      setOffset(offset + data.length);
      setHasMore(newHasMore);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset]);

  useEffect(() => {
    if (!loader.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    const currentLoader = loader.current;
    observer.observe(currentLoader);

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreData, hasMore]);

  // Chargement initial - ne s'exécute qu'une fois
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadMoreData();
    }
  }, []); // Tableau de dépendances vide

  return (
    <main className="">
      <Container className="lg:w-2/3 md:w-3/4 mb-8">
        <Typo className="font-poppins text-5xl">Parcours</Typo>
      </Container>
      <Container className="space-y-10">
        {annualData.map((data) => (
          <AnnualSummary
            key={`${data.year}-${data.title}`} // Clé plus unique
            year={data.year}
            title={data.title}
            description={data.description}
            achievements={data.achievements}
            imageUrls={
              Array.isArray(data.imageUrls) ? data.imageUrls : [data.imageUrls]
            }
          />
        ))}
      </Container>

      {hasMore && (
        <div ref={loader} className="flex justify-center m-auto h-[45vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
              <p className="text-sm font-medium text-gray-600">Chargement...</p>
            </div>
          ) : (
            <p className="text-gray-500">
              {` Faites défiler pour voir plus d'activités.`}
            </p>
          )}
        </div>
      )}

      {!hasMore && annualData.length > 0 && (
        <LinkToOtherPage
          texte={"Veillez me contacter pour plus"}
          link={"/contact"}
        />
      )}

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 p-3 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          aria-label="Remonter en haut de la page"
        >
          <ChevronUpCircle size={40} className="text-white" />
        </button>
      )}
    </main>
  );
};

export default Carriere;
