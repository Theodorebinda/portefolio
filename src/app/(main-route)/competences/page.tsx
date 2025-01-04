"use client";
import { P, Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typography } from "@/ui/components/typography/typography";

export default function Competences() {
  return (
    <Container className="  lg:h-screen flex flex-col items-start justify-start text-start gap-8 text-xl font-normal leading-relaxed">
      <P>Autre Competences</P>
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
      <LinkToOtherPage
        className=" text-lg"
        texte={"Parlons de vous maintenant"}
        link={"/contact"}
      />
    </Container>
  );
}
