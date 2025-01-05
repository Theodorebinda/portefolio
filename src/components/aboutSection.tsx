import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Linkedin, Pin } from "lucide-react";
import ReviewsPage from "./reviewSection";

const AboutSection = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container>
      <Container className="flex-col flex md:flex-row justify-between mb-10 gap-10 md:gap-0">
        <Container className="flex  flex-col gap-2">
          <Container className=" flex items-start md:items-center justify-start gap-4">
            {loading && (
              <Skeleton className="w-[80px] h-[80px] bg-slate-500 rounded-full" />
            )}
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no"
              height={80}
              width={80}
              alt="theodore"
              className="object-cover rounded-full"
              loading="lazy"
              onLoad={() => setLoading(false)}
            />
            <Container className="flex-col gap-24">
              <Typo className="text-5xl md:text-7xl  font-normal ">
                Je concois
              </Typo>
              <Typography className="md:text-6xl text-3xl  font-bold md:hidden flex">
                des applications
              </Typography>
            </Container>
          </Container>

          <Typography className="md:text-6xl text-4xl  font-bold hidden md:flex">
            des applications
          </Typography>
          <Container className="flex items-center gap-8">
            <Typography className="md:text-6xl text-4xl  font-bold">
              web et mobile{" "}
            </Typography>
            <Pin className="md:hidden flex" color="#b2d2fa" fill="#b2d2fa" />
          </Container>
        </Container>
        <Container>
          <Typography className="text-xl font-normal  flex-col leading-relaxed text-left max-w-sm">
            {
              " Ingénieur en conception spécialisé dans les systèmes de design et l'accessibilité, je crée des interfaces intuitives pour des produits numériques, alliant esthétique et inclusivité."
            }
          </Typography>
        </Container>
      </Container>
      <ReviewsPage />
      {/* <Container className=" bg-[#292524] h-auto rounded-md p-4 shadow-xl drop-shadow-2xl flex flex-col items-start justify-start">
        <Container className="flex justify-start items-center gap-5 w-full">
          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no"
            height={40} // Ajusté pour correspondre à la taille de l'avatar
            width={40} // Ajusté pour correspondre à la taille de l'avatar
            alt="theodore"
            className="object-cover rounded-full" // Ajout d'une marge en bas
          />
          <Container className="flex justify-between w-full">
            <Container>
              <Typography className="text-lg font-bold">Theodore</Typography>
              <Typography className="text-sm text-gray-400">
                Développeur Frontend
              </Typography>
            </Container>
            <Linkedin />
          </Container>
        </Container>

        <Typography className="text-sm text-center mt-2">
          {"Une expérience incroyable, très satisfait des résultats!"}
        </Typography>
      </Container> */}
    </Container>
  );
};

export default AboutSection;
