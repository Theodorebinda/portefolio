// HardSkillsContent.tsx

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image, { StaticImageData } from "next/image";

interface Props {
  image: StaticImageData| string;
  className?: string;
  name: string;
  description: string | undefined;
}


export default function SoftSkillsContent({ image, name, description,className = "string" }: Props) {
  return (
    <Container className="w-full py-2">
      <Container className={`${className} flex justify-center items-center md:flex-col md:justify-center `}>
        <Container className="hidden md:flex">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className={`${className}rounded-full`}
          />
        </Container>
        <Container className="flex flex-col justify-start items-start gap-1 ">
          <Typography className="">{name}</Typography>
          {
            description? <Typography className="text-[#878483] md:w-full ">{description}</Typography> : null
          }
        </Container>
      </Container>
    </Container>
  );
}
