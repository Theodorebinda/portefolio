import { P } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { Url } from "next/dist/shared/lib/router/router";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  link?: string | Url | undefined;
  className?: string;
  image: StaticImageData | string;
  description?: string;
  nom: string;
  children?: string | undefined;
}
export default function RealisationDetail({
  nom,
  description,
  image,
  link,
  className = "string",
}: Props) {
  return (
    <Container className={`${className} w-full mt-4 mb-10 flex flex-col gap-3`}>
      {/* <Link href={link!} passHref legacyBehavior> */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-1 w-[10rem]"
      >
        <P>{nom}</P>
      </a>
      {/* </Link> */}
      <Typography className="lg:w-full">{description}</Typography>
      <Container className="md:w-1/3">
        <Image src={image} alt={nom} width={380} className="object-cover" />
      </Container>
    </Container>
  );
}
