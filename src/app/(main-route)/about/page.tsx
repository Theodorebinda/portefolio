"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import {
  ListOfHardCompetences,
  ListOfSoftCompetences,
} from "@/lib/competences/competences";
import SoftSkillsContent from "@/components/softSkills";
import HardSkillContent from "@/components/hardSkills";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Btn } from "@/styles/globalStyle";
import HeroSectionAbout from "@/components/heroSectionAbout";

const About = () => {
  return (
    <Container className="flex flex-col  ">
      <HeroSectionAbout />
      <Container className="mt-32">
        <Tabs
          defaultValue="suscribe-to-training"
          className="w-full flex flex-col gap-4 "
        >
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="suscribe-to-training" className="basis-1/3">
              <Typography
                className="flex-wrap hidden lg:block text-left "
                variant="title-base"
              >
                Competences Comportementale
              </Typography>
              <Typography
                className="flex-wrap lg:hidden text-left"
                variant="title-sm"
              >
                Competences
                <br />
                Comportementale
              </Typography>
            </TabsTrigger>
            <TabsTrigger value="become-a-trainer" className="basis-1/3">
              <Typography
                className="flex-wrap hidden lg:block text-left "
                variant="title-base"
              >
                Competences Technique
              </Typography>
              <Typography
                className="flex-wrap lg:hidden text-left"
                variant="title-sm"
              >
                Competences
                <br />
                Techique
              </Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="suscribe-to-training"
            className="md:basis-full mx-auto"
          >
            <Container className="flex md:flex-row flex-wrap justify-between md:justify-center items-center gap-4 md:basis-1/2">
              {ListOfSoftCompetences.slice(0, 6).map((skill, index) => (
                <Container
                  key={index}
                  className="flex flex-row justify-center items-center basis-full md:basis-1/4 m-auto"
                >
                  <SoftSkillsContent
                    className=""
                    key={index}
                    image={skill.image}
                    name={skill.name}
                    description={skill.description}
                  />
                </Container>
              ))}
            </Container>
          </TabsContent>
          <TabsContent value="become-a-trainer" className="basis-1/5 m-auto">
            <Container className=" flex  items-center flex-wrap w-full gap-10 mt-10 ">
              {ListOfHardCompetences.map((hardSkill, index) => (
                <Container
                  key={index}
                  className="flex justify-center items-center  basis-1/4 md:basis-1/5 m-auto"
                >
                  <HardSkillContent
                    className="flex z-[-10]"
                    key={index}
                    percentage={hardSkill.progression}
                    image={hardSkill.image}
                    name={hardSkill.name}
                  />
                </Container>
              ))}
            </Container>
          </TabsContent>
        </Tabs>
        <LinkToOtherPage
          className="md:ml-2"
          texte={"Autres Compétences"}
          link={"/competences"}
        />
      </Container>
    </Container>
  );
};

export default About;
