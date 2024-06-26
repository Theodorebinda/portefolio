'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import photo from "../../../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png"
import { TabsContent } from '@radix-ui/react-tabs'
import Image from "next/image"
import { ListOfHardCompetences, ListOfSoftCompetences } from "@/lib/competences/competences"
import SoftSkillsContent from "@/components/softSkills"
import HardSkillContent from "@/components/hardSkills"
import { Btn } from "@/components/heroSection"
import styled from "styled-components"
import { MoveRight } from "lucide-react"
import { P } from "@/components/realisationSection"
import Link from "next/link"

const Span = styled.a`
 color: ${(props) => props.theme.textLink};
  &:hover {
    color:${(props) => props.theme.inBody}; ;
  }
`

const About = () => {
  return(
    <Container   className="flex flex-col gap-8 px-4 lg:px-8 py-16 md:py-2 bg-secondary-950 select-none m-auto">
      <Container className="flex flex-col-reverse lg:flex-row-reverse lg:justify-center items-center mx-auto lg:m-auto gap-3 lg:w-3/4 md:w-5/6 md:py-4 lg:h-screen ">
        <Container  className="md:basis-1/3">
           <Image src={photo} width={400} height={400} alt={"Theodore"} className="" />
        </Container>
        <Container className="flex flex-col items-center justify-between gap-5 md:gap-20 md:basis-2/3">
             <Container   className="leading-relaxed text-start text-[#878483]">
                <Typography className="text-xl font-normal">
                  {"Théodore est un développeur web, ingénieur en radiotransmission et électricien,"}
                </Typography>
                <Typography   className="text-xl font-normal leading-relaxed" >
                  <span>{"diplômé de l'Institut Supérieur de Technique Appliquée et certifié par"}
                  <Span href="https://www.kadea.academy/">{" La Kadea Academy."}</Span>
                  </span>
                  <br/>
                  <span>{"Il conçoit et maintient des applications web et mobiles,"}</span>
                  <span>{"motivé par les projets stimulants qui permettent d'explorer et d'exploiter des technologies innovantes."}</span>
                </Typography>
            </Container>
            <Btn className="  px-6 py-5">
              Download CV
            </Btn>
        </Container>
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
      </Container>
            <Container className="text-[#878483] lg:w-1/3 md:w-1/2 w-1/2  md:ml-16">
                <P className="underline text-[#878483]">
                    <Link href={'/competences'} className="flex gap-2 justify-start items-center">
                        <span>Autre Competences et Experiences</span>
                        <MoveRight strokeWidth={1.75} size={20} />
                    </Link>
                </P>
            </Container>
    </Container>
  )
}

export default About
