import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image, { StaticImageData } from "next/image";

interface Props {
    // link: string |Url |undefined ;
    className?: string;
    image :StaticImageData | string;
    description?: string;
    nom: string 
    children?: string | undefined;
  }
export default function RealisationDetail(
{ 
  nom,
  description,
  image,
  className="string"}:Props
) {
  return (
    <Container className={`${className} w-full my-4 flex flex-col gap-3`}>
      <span  className="flex flex-col gap-1 w-[10rem]">
        <Typography variant="title-sm">{nom}</Typography>
      </span>
      <Typography className="lg:w-full">{description}</Typography>
      <Container className="md:w-1/3">
        <Image src={image}  alt={nom}  className="object-cover " />
      </Container>
    </Container>
  );
}
