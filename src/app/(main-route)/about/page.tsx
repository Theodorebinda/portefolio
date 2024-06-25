'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import photo from "../../../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png"
import { TabsContent } from '@radix-ui/react-tabs'
import Image from "next/image"
import { Button } from "@/components/button"
import { ListOfHardCompetences, ListOfSoftCompetences } from "@/lib/competences/competences"
import SoftSkillsContent from "@/components/softSkills"
import HardSkillContent from "@/components/hardSkills"
import { ThemeContext, useTheme } from "styled-components"


const About = () => {
  return(
    <Container   className="flex flex-col gap-8 px-4 md:px-8 py-16 md:py-2 bg-secondary-950 select-none m-auto">
      <Container className="flex flex-col-reverse md:flex-row-reverse md:justify-center items-center mx-auto md:m-auto gap-3 md:w-3/4 md:py-4 md:h-screen ">
        <Container  className="md:basis-1/3">
           <Image src={photo} width={400} height={400} alt={"Theodore"} className="" />
        </Container>
        <Container className="flex flex-col items-center justify-between gap-5 md:gap-20 md:basis-2/3">
             <Container   className="leading-relaxed text-[#878483]">
                <Typography component="p" variant="body-lg">
                  {"Théodore est un développeur web, ingénieur en radiotransmission et électricien,"}
                </Typography>
                <Typography component="p" variant="body-lg" className="flex flex-col " >
                  {"diplômé de l'Institut Supérieur de Technique Appliquée et certifié par"}
                  <a href="https://www.kadea.academy/" className={`${  "light"? "text-black": "text-whith"}"text-[#343333]"`}>{" La Kadea Academy."}</a><br/>
                  <span>{"Il conçoit et maintient des applications web et mobiles,"}</span><br/>
                  <span>{"motivé par les projets stimulants qui permettent d'explorer et d'exploiter des technologies innovantes."}</span>
                </Typography>
                
            </Container>
            <Button className="bg-[#878483] text-white px-5 py-8" variant="default">
              Download CV
            </Button>
        </Container>
      </Container>
      <Container className="basis-2/3 m-auto">
        <Tabs defaultValue='suscribe-to-training' className='w-full flex flex-col gap-4  md:p-8 '>
          <TabsList className='w-full grid grid-cols-2 mb-4 md:m-auto text-[#878483]'>  
            <TabsTrigger value='suscribe-to-training' className='basis-1/3'>
              <Typography className="flex-wrap hidden md:block text-left e" variant="title-base">Competences Comportementale</Typography>
              <Typography className="flex-wrap md:hidden text-left" variant="title-sm">Competences<br/>Comportementale</Typography>
            </TabsTrigger>
            <TabsTrigger value='become-a-trainer' className='basis-1/3'>
              <Typography className="flex-wrap hidden md:block text-left " variant="title-base">Competences Technique</Typography>
              <Typography className="flex-wrap md:hidden text-left" variant="title-sm">Competences<br/>Techique</Typography>
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
    </Container>
  )
}

export default About
