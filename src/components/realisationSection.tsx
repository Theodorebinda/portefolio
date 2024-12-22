"use client";
import { realisationList } from "@/lib/realisation/realisation";
import { Container } from "@/ui/components/container/container";
import RelisationDetail from "./realisationDetail";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typo } from "@/styles/globalStyle";

export default function RealisationSection() {
  return (
    <Container className="mx-4 md:mx-10  ">
      <Typo className="underline py-4 font-">Dernière Réalisation</Typo>
      <Container className="md:w-3/4 mb-4">
        {realisationList
          .slice()
          .reverse() // Inverser l'ordre de la liste
          .slice(0, 2) // Prendre les 2 premiers éléments de la liste inversée
          .map((realisation, index) => {
            return (
              <RelisationDetail
                key={index}
                className=""
                link={realisation.link!}
                nom={realisation.nom}
                description={realisation.description}
                image={realisation.image}
              />
            );
          })}
      </Container>
      <LinkToOtherPage
        className=""
        texte={"Toutes les réalisations"}
        link={"/realisation"}
      />
    </Container>
  );
}
