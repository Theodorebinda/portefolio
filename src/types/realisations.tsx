import { StaticImageData } from "next/image"

export interface Realisation {
    id : number | string
    image : string | StaticImageData ,
    nom : string
    description? : string | undefined
    responsable? : string
    link? : string
  }

