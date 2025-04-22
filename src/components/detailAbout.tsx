import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

const details = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    title: "Palme D'or",
    description:
      "Je suis un développeur passionné avec une expérience dans le développement web et mobile, spécialisé dans la création d'applications intuitives et performantes.",
    fistDate: "Fevrier 2023",
    lastDate: "Aout 2024",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    title: "Sycamore",
    description:
      "Je maîtrise diverses technologies comme React, Flutter, Node.js, et bien d'autres, ce qui me permet de créer des solutions complètes.",
  },
];

const AboutMe = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Container className="mt-16">
      <Typography className="text-4xl lg:text-6xl font-bold">
        Gallerie
      </Typography>
      <Container className="flex flex-col gap-5 mt-5 md:h-auto]">
        {details.map((detail) => (
          <Container
            key={detail.id}
            className="flex flex-col md:flex-row items-center gap-5"
          >
            {loading ? (
              <Skeleton className="w-[180px] h-[100px] bg-slate-300 flex z-[-10]  " />
            ) : (
              <Image
                src={detail.image}
                height={100}
                width={100}
                alt="theodore"
                className="object-cover  flex"
                loading="lazy"
                onLoad={() => setLoading(false)} // Changer à false ici
                onError={() => {
                  setLoading(false);
                  console.error("Image failed to load.");
                }}
              />
            )}

            <Container className="flex flex-col">
              <Typography className="text-2xl font-semibold">
                {detail.title}
              </Typography>
              <Typography className="text-lg">{detail.description}</Typography>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default AboutMe;
