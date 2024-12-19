"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import photo from "/public/theodore-removebg-preview.png";
import { TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import {
  ListOfHardCompetences,
  ListOfSoftCompetences,
} from "@/lib/competences/competences";
import SoftSkillsContent from "@/components/softSkills";
import HardSkillContent from "@/components/hardSkills";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Btn } from "@/styles/globalStyle";
import { Span } from "@/styles/globalStyle";

const About = () => {
  return (
    <Container className="flex flex-col gap-3 px-4 lg:px-8 pt-14 lg:pt-3 lg:basis-4/5 select-none lg:mx-12 mx-auto">
      <Container className="flex flex-col-reverse lg:flex-row-reverse lg:justify-between  items-center m-auto  gap-3 lg:h-screen ">
        <Container className="md:basis-1/3 lg:flex lg:justify-center items-start">
          <Image
            src={photo}
            width={400}
            height={400}
            alt={"Theodore"}
            className="object-cover"
            loading="lazy"
          />
        </Container>
        <Container className="flex flex-col items-center justify-between gap-10 md:gap-10 md:basis-1/2">
          <Container className="leading-relaxed text-start">
            <Typography className="text-xl font-normal">
              {
                "Développeur web et mobile, ingénieur en radio-transmission et électricien,"
              }
            </Typography>
            <Typography className="text-xl font-normal leading-relaxed">
              {"diplômé de "}
              <Span
                href="https://ista-kin.org/ista-kin/ista/index.html"
                target="_blank"
              >
                {"l'Institut Supérieur de Technique Appliquée"}
              </Span>
              {" et certifié par "}
              <Span href="https://www.kadea.academy/" target="_blank">
                {"La Kadea Academy"}
              </Span>
              .
              <br />
              <span>
                {"je conçois et maintiens des applications web et mobile,"}
              </span>
              <span>
                {
                  "motivé par des projets stimulants qui permettent d'explorer et d'exploiter des technologies innovantes."
                }
              </span>
            </Typography>
          </Container>
          <Container>
            <a
              href="/Mon CV.pdf"
              download="CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Btn className="  px-6 py-5">Download CV</Btn>
            </a>
          </Container>
        </Container>
      </Container>
      <Container className="basis-4/5 m-auto">
        <Tabs
          defaultValue="suscribe-to-training"
          className="w-full flex flex-col gap-4  md:p-8 "
        >
          <TabsList className="w-full grid grid-cols-2 mb-4 md:m-auto">
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
