// HardSkillsContent.tsx

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";

interface Props {
  image: string;
  className?: string;
  name: string;
  description: string;
}

export default function SoftSkillsContent({ image, name, description,className }: Props) {
  return (
    <Container className="w-full py-2">
      <Container className={`${className} flex justify-start items-start md:flex-col md:justify-start `}>
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
          <Typography className="text-[#878483] md:w-full ">{description}</Typography>
        </Container>
      </Container>
    </Container>
  );
}
