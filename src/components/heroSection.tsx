'use client'
import { Container } from "@/ui/components/container/container";
import Typewriter from "@/ui/components/typewriter/Typewriter";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image"
import imageHero  from "../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png";
import { FaChevronRight } from "react-icons/fa";
import { darkTheme, lightTheme } from "@/styles/theme";
import { useTheme } from "styled-components";
import { Button } from "./button";




export default function HeroSection() {
  const { theme } = useTheme();

  const buttonClass = theme === darkTheme ? 
    'bg-black text-white'
  : 'bg-white text-black';


  return (
    <Container className="flex flex-col md:items-center md:justify-between md:flex-row  mx-4 md:mx-10  pt-16 ">
      <Container className="flex flex-col gap-5 lg:w-1/2 w-full">
        <Typography component="h1" className="font-medium " variant="display-md" >
           Théodore Samba
        </Typography>
        <Typography component="h5" className="text-[#878483] " variant="body-lg" >
          Salut Monde je suis
        </Typography>
        <Container className=" " >
          <Typewriter
            texts={["Developpeur web et mobile", "UI/UX Designer","Ir Radio Transmission"]}
            speed={50}
            deleteDelay={1000}
         />
        </Container>
        <Typography component="p"  className="text-2xl font-medium text-[#878483] flex flex-col leading-relaxed">
          <span>{" Créateur d'expériences digitales innovantes et passionnantes."}</span>
          <span>{"Transformant vos idées en réalités numériques."}</span>
          <span>{"passioné par le développement social"} </span> 
        </Typography>
        <Container className=" mt-10 flex justify-center" >
             <Button className={`${buttonClass} px-5 py-8`} variant="secondary">
              {"Contactez Moi"}
              <FaChevronRight className=" w-5 h-5 font-light" />
            </Button>
        </Container>
      </Container>
      <Container className="hidden lg:block w-1/2">
      <Image src={imageHero} height={600} width={600} alt='theodore' />
      </Container>
    </Container>
  );
}
console.log(HeroSection);
