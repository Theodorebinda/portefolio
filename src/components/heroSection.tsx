'use client'
import { Container } from "@/ui/components/container/container";
import Typewriter from "@/ui/components/typewriter/Typewriter";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image"
import imageHero  from "../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png";
import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import Link from "next/link";
// import { Button } from "./button";


export const Btn = styled.button`
background-color: ${(props) => props.theme.inBody};
color: ${(props) => props.theme.inText};
transition :0.10s;
&:hover {
    color:${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.intext};
    background-color:${(props) => props.theme.body} ;
}
;`
export const Typo = styled.h1`
  color: ${(props) => props.theme.inBody};


  `

export default function HeroSection() {

  return (
    <Container className="flex flex-col md:items-center md:justify-between md:flex-row   mx-4 md:mx-10  pt-16 ">
      <Container className="flex flex-col gap-5 lg:w-1/2 w-full">
        <Typo className="font-normal text-6xl " >
           Théodore Samba
        </Typo>
        <Typography component="h5" className="text-[#878483] " variant="body-lg" >
          Salut monde, je suis
        </Typography>
        <Container className=" " >
          <Typewriter
            texts={["Developpeur web et mobile", "UI/UX Designer","Ir Radio Transmission"]}
            speed={50}
            deleteDelay={1000}
         />
        </Container>
        <Typography   className="text-xl font-normal text-[#878483] flex flex-col leading-relaxed">
          <span>{" Créateur d'expériences digitales innovantes et passionnantes."}</span>
          <span>{"Transformant vos idées en réalités numériques."}</span>
          {/* <span>{"passioné par le développement social"} </span>  */}
        </Typography>
        <Container className=" mt-10 mb-4 flex justify-center p-2" >
          <Link href={"https://www.linkedin.com/in/theodore-samba-26b456282/"} target="_blank">
              <Btn className=" flex justify-center items-center gap-1 px-5 py-6">
                  {"Contactez Moi"}
              <FaChevronRight className=" w-5 h-5 font-light" />
            </Btn>
          </Link>

        </Container>
      </Container>
      <Container className="hidden lg:block w-1/2">
      <Image src={imageHero} height={600} width={600} alt='theodore' />
      </Container>
    </Container>
  );
}
// console.log(HeroSection);
