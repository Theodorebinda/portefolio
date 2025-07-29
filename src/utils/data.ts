// utils/data.ts
// Nous simulons ici une base de données avec des années d'expérience.
// En production, ces données viendraient d'une API (backend, CMS, etc.).
import { StaticImageData } from "next/image";
import Lukatout from "../../public/images/Design sans titre (1).png";

export interface AnnualDataType {
  year: string;
  title: string;
  description: string;
  achievements: string[];
  imageUrls: (string | StaticImageData)[];
}

// Toutes les données disponibles
const allAnnualData: AnnualDataType[] = [
  {
    year: "2025",
    title: "Freelance",
    description:
      "Début 2025 : consolidation de mes compétences techniques et soft skills, lancement de mon activité freelance.",
    achievements: [
      "Renforcement des compétences en gestion de projet grâce à diverses formations.",
      "Lead technique sur deux projets majeurs, du concept au déploiement.",
      "Contributions actives à des projets open-source importants.",
    ],
    imageUrls: [Lukatout, Lukatout],
  },
  {
    year: "2024",
    title: "Croissance et Innovation",
    description:
      "2024 : approfondissement des technologies web modernes et développement de projets à forte valeur ajoutée.",
    achievements: [
      "Développement d'applications sur mesure pour une entreprise privée.",
      "Collaboration avec une équipe multidisciplinaire pour déployer de nouvelles fonctionnalités.",
      "Perfectionnement continu en UX/UI pour optimiser l'expérience utilisateur.",
    ],
    imageUrls: [Lukatout, Lukatout, Lukatout],
  },
  {
    year: "2023",
    title: "Acquisition des Fondamentaux",
    description:
      "2023 : apprentissage intensif des bases du développement web et exploration des principaux frameworks.",
    achievements: [
      "Maîtrise des fondamentaux JavaScript, HTML et CSS.",
      "Réalisation de plusieurs projets personnels pour appliquer les connaissances.",
      "Premières contributions à des projets open-source.",
      "Initiation aux frameworks front-end comme React.",
    ],
    imageUrls: [Lukatout, Lukatout],
  },
  {
    year: "2021-2022",
    title: "Découverte du Développement",
    description:
      "2021-2022 : premiers pas dans l'univers du développement logiciel et de la programmation.",
    achievements: [
      "Apprentissage des concepts de base de la programmation.",
      "Découverte de JavaScript et création de scripts simples.",
      "Participation à des ateliers d'introduction au développement.",
    ],
    imageUrls: [Lukatout, Lukatout],
  },
  {
    year: "2015-2019",
    title: "Ingénieur en Électronique et Transmission Radio",
    description:
      "Formation spécialisée en systèmes électroniques et transmission radio, combinant théorie et pratique.",
    achievements: [
      "Maîtrise de l'électronique analogique et numérique.",
      "Conception et implémentation de circuits électroniques.",
      "Initiation à la programmation embarquée.",
    ],
    imageUrls: [
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1752206216/Portefolio/Design_sans_titre_1_annqgb.png",
    ],
  },
];

// Fonction pour simuler la récupération de données paginées
export const fetchAnnualData = async (
  offset: number,
  limit: number
): Promise<{ data: AnnualDataType[]; hasMore: boolean }> => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const startIndex = offset;
  const endIndex = offset + limit;
  const data = allAnnualData.slice(startIndex, endIndex);

  // Vérifier s'il y a plus de données à charger
  const hasMore = endIndex < allAnnualData.length;

  return { data, hasMore };
};
