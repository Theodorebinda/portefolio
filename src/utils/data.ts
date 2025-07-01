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
  imageUrl?: string | StaticImageData;
}

// Toutes les données disponibles
const allAnnualData: AnnualDataType[] = [
  {
    year: "2025",
    title: "Consolidation et Leadership Technique",
    description:
      "En 2025, j'ai consolidé mes compétences techniques et pris davantage de responsabilités, notamment dans l'architecture de solutions et le mentorat de nouveaux membres de l'équipe.",
    achievements: [
      "Conception et implémentation d'une nouvelle architecture de microservices.",
      "Lead technique sur deux projets majeurs, du concept au déploiement.",
      "Mise en œuvre de pratiques DevOps pour automatiser les déploiements.",
      "Participation active à la communauté open-source, contribuant à un projet majeur.",
    ],
    imageUrl: Lukatout,
  },
  {
    year: "2024",
    title: "Année de Croissance et d'Innovation",
    description:
      "L'année 2024 a été marquée par une immersion profonde dans les technologies web modernes et le développement de projets significatifs. J'ai eu l'opportunité de travailler sur des applications à forte valeur ajoutée.",
    achievements: [
      "Développement d'une application de gestion de projets avec Next.js et une API RESTful.",
      "Mise en place de tests unitaires et d'intégration pour assurer la qualité du code.",
      "Collaboration avec une équipe multidisciplinaire pour le déploiement de nouvelles fonctionnalités.",
      "Formation continue sur les principes de l'UX/UI pour améliorer l'expérience utilisateur.",
    ],
    imageUrl: "/images/2024-achievements.jpg",
  },
  {
    year: "2023",
    title: "Immersion et Acquisition de Compétences Fondamentales",
    description:
      "L'année 2023 fut une période d'apprentissage intense, où j'ai jeté les bases de ma carrière en développement web, explorant divers langages et frameworks.",
    achievements: [
      "Maîtrise des fondamentaux de JavaScript, HTML et CSS.",
      "Développement de plusieurs projets personnels pour appliquer les concepts appris.",
      "Contribution à des projets open-source simples pour comprendre les flux de travail collaboratifs.",
      "Premières expériences avec des frameworks front-end comme React.",
    ],
    imageUrl: "/images/2023-foundations.jpg", // Assure-toi que cette image existe
  },
  {
    year: "2022",
    title: "Découverte et Premiers Pas",
    description:
      "L'année 2022 a marqué le début de mon intérêt pour le développement logiciel. J'ai commencé à explorer le monde de la programmation et ses vastes possibilités.",
    achievements: [
      "Initiation aux concepts de la programmation et de la logique algorithmique.",
      "Apprentissage des bases de Python et des scripts simples.",
      "Exploration de différentes carrières dans le domaine technologique.",
      "Participation à des ateliers et des bootcamps d'introduction.",
    ],
    imageUrl: "/images/2022-discovery.jpg", // Assure-toi que cette image existe
  },
  // Tu peux ajouter d'autres années plus anciennes ici
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
