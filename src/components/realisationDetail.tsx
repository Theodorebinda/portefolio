import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  link?: string ;
    className?: string;
    image :StaticImageData | string;
    description?: string;
    nom: string 
    children?: string | undefined;
  }
export default function RealisationDetail(
{  link,
  nom,
  description,
  image,
  className="string"}:Props
) {
  return (
    <Container className={`${className} w-full my-4 flex flex-col gap-3`}>
      <a href={link} className="flex flex-col gap-1">
        <Typography variant="title-sm">{nom}</Typography>
        <Typography className="lg:w-full">{description}</Typography>
      </a>
      <Link href={link}>
        <Image src={image} width={250} height={200} alt={nom} loading="lazy" />
      </Link>
    </Container>
  );
}
