'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'

const About = () => {
  return(
    <Container className="flex flex-col gap-8 px-4 md:px-8 py-16 bg-secondary-950">
      <Container className="basis-2/3">
        <Tabs defaultValue='suscribe-to-training' className='w-full rounded p-4 md:p-8 '>
          <TabsList className='w-full grid grid-cols-2'>  
            <TabsTrigger value='suscribe-to-training' className='basis-1/2'>
              <Typography className="flex-wrap hidden md:block">Soft-Skills</Typography>
              <Typography className="flex-wrap md:hidden">Soft<br/>Skills</Typography>
            </TabsTrigger>
            <TabsTrigger value='become-a-trainer' className='basis-1/2 rounded'>
              <Typography className="flex-wrap hidden md:block">Hard-Skills</Typography>
              <Typography className="flex-wrap md:hidden">Hard<br/>Skills</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='suscribe-to-training'>
            <Container className='flex flex-col items-center gap-4 py-8 m-auto lg:w-2/3'>
              <span>Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ullam earum labore iste consectetur tempore, quod sint cum minus totam sunt in magnam. Ducimus ratione distinctio cupiditate facere facilis reprehenderit nemo, assumenda asperiores veritatis suscipit magni voluptatibus fuga amet at adipisci dolor? Distinctio architecto illum reprehenderit perferendis ut asperiores exercitationem molestias impedit corrupti et, beatae sint consequuntur? Aperiam, laboriosam sit. Cumque sunt voluptatum commodi quibusdam laborum porro animi ipsum quasi provident voluptas, iste, odio sequi ipsam. Ab maiores laboriosam accusantium veritatis, quis non doloribus error, quo ipsum, officia voluptatibus? Commodi inventore voluptates rem consequatur repellat delectus provident sapiente illum non!</span>
            </Container>
          </TabsContent>
          <TabsContent value='become-a-trainer'>
            <Container className='flex flex-col gap-4 py-8 items-center m-auto'>
              <span>Oui Hello</span>
            </Container>
          </TabsContent>

        </Tabs>
      </Container>
    </Container>
  )
}

export default About
