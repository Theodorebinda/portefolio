import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

const AboutSection = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container className="flex-col md:flex justify-between mb-10 ">
      <Container className="flex flex-col gap-2">
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
          <Container className="flex-col">
            <Typo className="text-5xl md:text-7xl  font-normal ">
              Je concois
            </Typo>
            <Typography className="md:text-6xl text-3xl  font-bold">
              des applications
            </Typography>
          </Container>
        </Container>

        <Typography className="md:text-6xl text-4xl  font-bold hidden">
          des applications
        </Typography>
        <Typography className="md:text-6xl font-bold">web et mobile</Typography>
      </Container>
      <Container>
        <Typography className="text-xl font-normal  flex-col leading-relaxed text-left max-w-sm">
          {
            " Ingénieur en conception spécialisé dans les systèmes de design et l'accessibilité, je crée des interfaces intuitives pour des produits numériques, alliant esthétique et inclusivité."
          }
        </Typography>
      </Container>
    </Container>
  );
};

export default AboutSection;
