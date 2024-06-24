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


const About = () => {
 
  return(
    <Container   className="flex flex-col gap-8 px-4 md:px-8 py-16 md:py-2 bg-secondary-950 select-none m-auto">
      <Container className="flex flex-col-reverse md:flex-row-reverse md:justify-center items-center m-auto gap-3 md:w-3/4 py-4 md:h-screen ">
        <Container>
           <Image src={photo} width={400} height={400} alt={"Theodore"} className="" />
        </Container>
       
        <Container className="flex flex-col items-center justify-between gap-5 md:gap-20">
             <Typography variant="body-base" component="p" className="md:leading-loose leading-relaxed text-[#878483]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Optio totam quod vitae eos 
                sequi consequuntur, amet perferendis
                quaerat veniam iure.
            </Typography>
            <Button className="py-8 px-10 ">Obtenir  CV</Button>
        </Container>
      </Container>
      <Container className="basis-2/3 m-auto">
        <Tabs defaultValue='suscribe-to-training' className='w-full flex flex-col gap-4  md:p-8 '>
          <TabsList className='w-full grid grid-cols-2 mb-4 md:m-auto text-[#878483]'>  
            <TabsTrigger value='suscribe-to-training' className='basis-1/3'>
              <Typography className="flex-wrap hidden md:block text-left" variant="title-base">Competences Comportementale</Typography>
              <Typography className="flex-wrap md:hidden text-left" variant="title-sm">Competences<br/>Comportementale</Typography>
            </TabsTrigger>
            <TabsTrigger value='become-a-trainer' className='basis-1/3'>
              <Typography className="flex-wrap hidden md:block text-left" variant="title-base">Competences Technique</Typography>
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
              <Container className="z-[-10] flex  items-center flex-wrap w-full gap-10 mt-10 ">
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
