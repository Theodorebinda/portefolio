"use client";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { P, Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typography } from "@/ui/components/typography/typography";

export default function Competences() {
  useTrackPageView();
  return (
    <Container className="md:h-screen  flex flex-col justify-between text-start text-xl font-normal leading-relaxed  lg:w-2/3 md:w-3/4">
      <Container className="flex flex-col justify-between text-start gap-10">
        <P className="font-normal md:text-5xl text-4xl">Autre Competences</P>
        <Container className="flex flex-col gap-4">
          <P>Electricien</P>
          <Typography className="text-xl font-normal leading-relaxed">
            {" Diplomé en Electricité,"}
            <br />
            {
              "J'ai travaillé dans le domaine de l'électricité depuis 2014, spécialisé dans les installations electrique de batiment et maintenance d'equipement electrique"
            }
          </Typography>
        </Container>
        <Container className="flex flex-col gap-4">
          <P>Instructeur</P>
          <Typography className="text-xl font-normal leading-relaxed">
            {
              "Au paravant j'ai travaillé comme enseignant et responsable des ateliers ou je supervisais les travaux pratique et assurais la securité des eleves"
            }
            <br />
          </Typography>
        </Container>
      </Container>
      <LinkToOtherPage
        className=" text-lg"
        texte={"Parlons de vous maintenant"}
        link={"/contact"}
      />
    </Container>
  );
}
