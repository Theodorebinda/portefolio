import { StaticImageData } from "next/image"

export interface Competences {
    id : number | string
    image : string | StaticImageData 
    name : string
    description? : string
    progression? : number
  }

