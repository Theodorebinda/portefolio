import { StaticImageData } from "next/image";
import { Url } from "url";

export interface Realisation {
  id: number | string;
  image: string | StaticImageData;
  nom: string;
  description?: string | undefined;
  responsable?: string;
  link?: string | Url | undefined;
}
