"use client";
import RelisationDetail from "@/components/realisationDetail";
import { realisationList } from "@/lib/realisation/realisation";
import { P } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";

export default function Realisation() {
  return (
    <Container className="mx-4 lg:w-2/3 md:w-3/4  ">
      <P>Realisation</P>
      <Container>
        {realisationList
          .slice()
          .reverse()
          .map((realisation, index) => {
            return (
              <RelisationDetail
                key={index}
                className=""
                link={realisation.link}
                nom={realisation.nom}
                description={realisation.description}
                image={realisation.image}
              />
            );
          })}
      </Container>
      <LinkToOtherPage texte={"Parlons de votre projet"} link={"/contact"} />
    </Container>
  );
}
