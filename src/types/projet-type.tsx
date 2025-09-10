import { StaticImageData } from "next/image";

// export type ProjectLink = {
//   icon: React.ReactNode | Element; // ou string si vous voulez utiliser des noms d'icônes
//   label: string;
//   url: string;
// };

// export interface Project {
//   id: string;
//   name: string;

//   description: string;
//   type: string; // e.g., "Open Source", "Commercial"
//   links: ProjectLink[];
//   stats: {
//     label: string;
//     value: string;
//   }[];
//   image: string | StaticImageData; // Path to the project image
//   logo?: string; // Path to a logo if applicable (e.g., Chakra UI logo)
//   techStack?: string[]; // Optional: Array of technologies used
//   responsable?: string;
// }
// types/projet-type.ts
export interface Project {
  id: string;
  nameKey: string; // Changé de 'name' à 'nameKey'
  descriptionKey: string; // Changé de 'description' à 'descriptionKey'
  typeKey: string; // Changé de 'type' à 'typeKey'
  links: {
    icon: React.ReactNode;
    labelKey: string;
    url: string;
  }[];
  stats: {
    labelKey: string;
    value: string;
  }[];
  image: string | StaticImageData; // Path to the project image
  logo?: string;
  techStack?: string[];
  responsable?: string;
}
