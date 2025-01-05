"use client";
import { Container } from "@/ui/components/container/container";
import HeroSectionAbout from "@/components/heroSectionAbout";
import ToolsAndSoftwareSection from "@/components/sectionToolsAndSoftward";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";

const About = () => {
  return (
    <Container className="flex flex-col  ">
      <HeroSectionAbout />
      <ToolsAndSoftwareSection />
      <LinkToOtherPage
        className="md:ml-2"
        texte={"Autres Compétences"}
        link={"/competences"}
      />
    </Container>
  );
};

export default About;
