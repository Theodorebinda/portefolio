"use client";

import { Container } from "@/ui/components/container/container";
import RelisationDetail from "./realisationDetail";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typo } from "@/styles/globalStyle";
import { projectsData } from "@/lib/realisation/realisation";

export default function RealisationSection() {
  return (
    <Container className=" ">
      <Typo className=" py-4 md:mt-8 font-normal  text-xl">Projet Recent</Typo>
      <Container className="md:w-3/4 mb-4">
        {projectsData
          .slice()
          .reverse() // Inverser l'ordre de la liste
          .slice(0, 2) // Prendre les 2 premiers éléments de la liste inversée
          .map((realisation, index) => {
            return (
              <RelisationDetail
                key={index}
                className=""
                // link={realisation.link!}
                nom={realisation.name}
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
