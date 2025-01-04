"use client";
import { Container } from "@/ui/components/container/container";
import Typewriter from "@/ui/components/typewriter/Typewriter";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import imageHero from "/public/theodore-removebg-preview.png";
import Link from "next/link";
import { Btn, Typo } from "@/styles/globalStyle";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <Container className="flex flex-col md:items-start md:justify-between md:gap-10 md:flex-row  lg:h-screen ">
      <Container className="flex flex-col gap-5  ">
        <Typo className="font-normal text-7xl md:text-7xl ">
          Théodore Samba
        </Typo>
        <Typography className="text-xl font-normal ">
          Salut monde, je suis
        </Typography>
        <Container className="">
          <Typewriter
            texts={[
              "Developpeur web/mobile",
              "UI/UX Designer",
              "Ir Radio Transmission",
            ]}
            speed={50}
            deleteDelay={1500}
          />
        </Container>
        <Typography className="text-xl font-normal flex flex-col leading-relaxed">
          <span>
            {" Créateur d'expériences digitales innovantes et passionnantes."}
          </span>
          <span>{"Transformant vos idées en réalités numériques."}</span>
          {/* <span>{"passioné par le développement social"} </span>  */}
        </Typography>
        <Container className="mt-10 md:mt-20 flex justify-center p-2">
          <Link href={"/contact"}>
            <Btn className=" flex justify-center items-center gap-1 px-5 py-6">
              {"Contactez Moi"}
              <ChevronRight className=" w-5 h-5 font-light" />
            </Btn>
          </Link>
        </Container>
      </Container>
      <Container className="hidden md:basis-1/3  lg:flex lg:justify-center items-start w-1/2">
        <Image
          src={imageHero}
          height={400}
          width={400}
          alt="theodore"
          className="object-cover"
          loading="lazy"
        />
      </Container>
    </Container>
  );
}
// console.log(HeroSection);
