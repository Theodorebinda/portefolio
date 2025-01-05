import { Btn, Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import photo from "/public/theodore-removebg-preview.png";
import { Span } from "@/styles/globalStyle";

const HeroSectionAbout = () => {
  return (
    <Container className="flex flex-col lg:flex-row lg:justify-between  items-start">
      <Container className="md:basis-1/2 flex flex-col items-center justify-between gap-10  ">
        <Container className="leading-relaxed text-start">
          <Typography className="text-xl font-normal">
            <Typo className="font-normal text-6xl md:text-7xl">Je suis </Typo>
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
      <Container className="lg:flex lg:justify-end items-start md:w-1/2 pt-4 md:pt-0">
        <Image
          src={photo}
          width={400}
          height={400}
          alt={"Theodore"}
          className="object-contain"
          loading="lazy"
        />
      </Container>
    </Container>
  );
};

export default HeroSectionAbout;
