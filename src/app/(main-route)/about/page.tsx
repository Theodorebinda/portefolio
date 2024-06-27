'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import photo from "../../../../public/exempleImagePresent-removebg-preview.png"
import { TabsContent } from '@radix-ui/react-tabs'
import Image from "next/image"
import { ListOfHardCompetences, ListOfSoftCompetences } from "@/lib/competences/competences"
import SoftSkillsContent from "@/components/softSkills"
import HardSkillContent from "@/components/hardSkills"
import { motion } from "framer-motion";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage"
import { Btn } from "@/styles/globalStyle"
import {Span} from "@/styles/globalStyle"

const About = () => {
  return(
    <Container   className="flex flex-col gap-8 px-4 lg:px-8 pt-16 md:py-2  select-none m-auto">
      <Container className="flex flex-col-reverse lg:flex-row-reverse lg:justify-center items-center mx-auto lg:m-auto gap-3 lg:w-3/4 md:w-5/6 md:py-1 lg:h-screen ">
        <Container  className="md:basis-1/3">
          <div className="w-full">
            <Image src={photo} width={400} height={400} alt={"Theodore"} className="object-fill" loading="lazy"/>
          </div>
        </Container>
        <div className="box flex flex-col items-center justify-between gap-5 md:gap-20 md:basis-2/3">
             <Container   className="leading-relaxed text-start text-[#878483]">
                <Typography className="text-xl font-normal">
                  {"Théodore est un développeur web, ingénieur en radiotransmission et électricien,"}
                </Typography>
                <Typography   className="text-xl font-normal leading-relaxed" >
                  {"diplômé de "}<Span href="https://ista-kin.org/ista-kin/ista/index.html" target="_blank">{"l'Institut Supérieur de Technique Appliquée"}</Span>{" et certifié par "}
                  <Span href="https://www.kadea.academy/" target="_blank">{"La Kadea Academy"}</Span>.
                  <br/>
                  <span>{"Il conçoit et maintient des applications web et mobiles,"}</span>
                  <span>{"motivé par les projets stimulants qui permettent d'explorer et d'exploiter des technologies innovantes."}</span>
                </Typography>
            </Container>
            <Btn className="  px-6 py-5">
              Download CV
            </Btn>
        </div>
      </Container>
      <Container className="basis-2/3 m-auto">
        <Tabs defaultValue='suscribe-to-training' className='w-full flex flex-col gap-4  md:p-8 '>
          <TabsList className='w-full grid grid-cols-2 mb-4 md:m-auto text-[#878483]'>  
            <TabsTrigger value='suscribe-to-training' className='basis-1/3'>
              <Typography className="flex-wrap hidden lg:block text-left e" variant="title-base">Competences Comportementale</Typography>
              <Typography className="flex-wrap lg:hidden text-left" variant="title-sm">Competences<br/>Comportementale</Typography>
            </TabsTrigger>
            <TabsTrigger value='become-a-trainer' className='basis-1/3'>
              <Typography className="flex-wrap hidden lg:block text-left " variant="title-base">Competences Technique</Typography>
              <Typography className="flex-wrap lg:hidden text-left" variant="title-sm">Competences<br/>Techique</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='suscribe-to-training' className="md:basis-full mx-auto">
          <Container className='flex md:flex-row flex-wrap justify-between md:justify-center items-center gap-4 md:basis-1/2'>
                {ListOfSoftCompetences.slice(0,6).map((skill,index) => (
                  <Container key={index} className="flex flex-row justify-center items-center basis-full md:basis-1/4 m-auto">
                     <SoftSkillsContent
                      className = ""
                      key={index}
                      image={skill.image}
                      name={skill.name}
                      description={skill.description}
                    />
                  </Container>
              ))}
            </Container>
          </TabsContent>
          <TabsContent value='become-a-trainer' className="basis-1/5 m-auto">
              <Container className=" flex  items-center flex-wrap w-full gap-10 mt-10 ">
                {
                  ListOfHardCompetences.map((hardSkill,index) =>(
                    <Container key={index} className="flex justify-center items-center  basis-1/4 md:basis-1/5 m-auto">
                      <HardSkillContent
                        className = "flex z-[-10]"
                        key={index}
                        percentage={hardSkill.progression}
                        image={hardSkill.image}
                        name={hardSkill.name}
                      />
                    </Container>
                  ))
                }
              </Container>
          </TabsContent>
        </Tabs>
          <LinkToOtherPage className="" texte={"Autres Compétences"} link={"/competences"} />
      </Container>
    </Container>
  )
}

export default About
