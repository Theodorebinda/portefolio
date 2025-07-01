"use client";
import { Container } from "@/ui/components/container/container";
import Typewriter from "@/ui/components/typewriter/Typewriter";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import imageHero from "/public/theodore-removebg-preview.png";
import Link from "next/link";
import { Btn, Typo } from "@/styles/globalStyle";
import { ChevronRight } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent";
import Greeting from "./greting";

// src/components/heroSection.tsx
export default function HeroSection() {
  return (
    <Container className="flex flex-col items-start justify-between flex-wrap  lg:flex-row mb-8 font-poppins ">
      <Container className="flex flex-col gap-3 md:basis-1/2">
        <Typo className=" text-6xl md:text-6xl">Théodore Samba</Typo>
        <Container className="text-xl flex justify-start gap-3  items-center">
          <Greeting />
          <Typography>je suis</Typography>
        </Container>

        <Container>
          <Container>
            {" "}
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
          <Typography className="text-xl  flex flex-col leading-8 font-semibold">
            <span>
              {" Je suis passionné par 🎨 les systèmes de conception,"}
            </span>
            <span>{"♿️ l'accessibilité, ⚙️ les machines d'état,"}</span>
            <span>{" et 😍 l'expérience utilisateur."}</span>
          </Typography>
        </Container>

        <Container className="mt-4 mb-4 flex justify-center p-2">
          <Link href={"/contact"}>
            <Btn
              className="flex justify-center items-center gap-1 px-5 py-6"
              onClick={() => trackEvent("click", "Download", "CV Download")}
            >
              {"Contactez Moi"}
              <ChevronRight className="w-5 h-5 font-light" />
            </Btn>
          </Link>
        </Container>
      </Container>
      <Container className="hidden lg:flex lg:justify-end items-start w-1/2">
        <Image
          src={imageHero}
          height={400}
          width={400}
          alt="theodore"
          className="object-contain"
          loading="lazy"
        />
      </Container>
    </Container>
  );
}
