"use client";
import AnnualSummary from "@/components/annual-summary";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { AnnualDataType, fetchAnnualData } from "@/utils/data";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";

const ITEMS_PER_LOAD = 2; // Nombre d'éléments à charger à chaque fois

const Carriere: React.FC = () => {
  const [annualData, setAnnualData] = useState<AnnualDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  // Ref pour l'élément qui déclenchera le chargement (le "loader" en bas de page)
  const loader = useRef<HTMLDivElement>(null);

  // Fonction pour charger plus de données
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return; // Empêche le chargement si déjà en cours ou s'il n'y a plus de données

    setIsLoading(true);
    try {
      const { data, hasMore: newHasMore } = await fetchAnnualData(
        offset,
        ITEMS_PER_LOAD
      );
      setAnnualData((prevData) => [...prevData, ...data]);
      setOffset((prevOffset) => prevOffset + data.length); // Met à jour l'offset pour la prochaine requête
      setHasMore(newHasMore);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset]);

  // Utilisation de l'Intersection Observer
  useEffect(() => {
    // Si nous n'avons pas d'élément de chargement ou s'il n'y a plus de données, on ne fait rien
    if (!loader.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // Si l'élément de chargement est visible (intersecte la fenêtre d'affichage)
        if (target.isIntersecting) {
          loadMoreData(); // Charge plus de données
        }
      },
      {
        root: null, // Par rapport au viewport
        rootMargin: "200px", // Déclenche le chargement 200px avant d'atteindre le bas
        threshold: 0.1, // Déclenche quand 10% de l'élément est visible
      }
    );

    observer.observe(loader.current);

    // Fonction de nettoyage quand le composant est démonté ou que les dépendances changent
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMoreData, hasMore]); // Déclenche l'effet quand loadMoreData ou hasMore changent

  // Charge les données initiales au premier rendu
  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage

  return (
    <div className=" ">
      <main className="">
        <Container className=" lg:w-2/3 md:w-3/4 mb-8 ">
          <Typo className="font-poppins text-5xl ">Mon Parcours</Typo>
        </Container>
        <Container className="space-y-10 ">
          {annualData.map((data, index) => (
            <AnnualSummary
              key={data.year}
              year={data.year}
              title={data.title}
              description={data.description}
              achievements={data.achievements}
              imageUrls={
                Array.isArray(data.imageUrls)
                  ? data.imageUrls
                  : [data.imageUrls]
              }
            />
          ))}
        </Container>

        {/* L'élément qui sera observé par l'Intersection Observer */}
        {hasMore && ( // N'affiche le loader que s'il y a plus de données à charger
          <div ref={loader} className="flex justify-center m-auto h-[45vh]">
            {isLoading ? (
              <div className="flex items-center text-blue-600 font-semibold">
                Chargement...
              </div>
            ) : (
              <p className="text-gray-500">
                {"Faites défiler pour voir plus d'activités."}
              </p>
            )}
          </div>
        )}

        {!hasMore &&
          annualData.length > 0 && ( // Message quand il n'y a plus de données, et si des données ont été chargées
            <LinkToOtherPage
              className=""
              texte={"Veillez me contacter pour plus"}
              link={"/contact"}
            />
          )}
      </main>
    </div>
  );
};

export default Carriere;
