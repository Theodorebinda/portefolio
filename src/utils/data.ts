// utils/data.ts
import { StaticImageData } from "next/image";
import Lukatout from "../../public/images/Design sans titre (1).png";

export interface AnnualDataType {
  year: string;
  titleKey: string; // Clé de traduction pour le titre
  descriptionKey: string; // Clé de traduction pour la description
  achievementsKeys: string[]; // Clés de traduction pour les réalisations
  imageUrls: (string | StaticImageData)[];
}

// Toutes les données disponibles avec des clés de traduction
const allAnnualData: AnnualDataType[] = [
  {
    year: "2025",
    titleKey: "career.years.2025.title",
    descriptionKey: "career.years.2025.description",
    achievementsKeys: [
      "career.years.2025.achievements.0",
      "career.years.2025.achievements.1",
      "career.years.2025.achievements.2",
    ],
    imageUrls: [Lukatout, Lukatout],
  },
  {
    year: "2024",
    titleKey: "career.years.2024.title",
    descriptionKey: "career.years.2024.description",
    achievementsKeys: [
      "career.years.2024.achievements.0",
      "career.years.2024.achievements.1",
      "career.years.2024.achievements.2",
    ],
    imageUrls: [Lukatout, Lukatout, Lukatout],
  },
  {
    year: "2023",
    titleKey: "career.years.2023.title",
    descriptionKey: "career.years.2023.description",
    achievementsKeys: [
      "career.years.2023.achievements.0",
      "career.years.2023.achievements.1",
      "career.years.2023.achievements.2",
      "career.years.2023.achievements.3",
    ],
    imageUrls: [
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753792903/Portefolio/WhatsApp_Image_2025-07-29_at_13.40.43_urqgmq.jpg",
    ],
  },
  {
    year: "2021-2022",
    titleKey: "career.years.2021-2022.title",
    descriptionKey: "career.years.2021-2022.description",
    achievementsKeys: [
      "career.years.2021-2022.achievements.0",
      "career.years.2021-2022.achievements.1",
      "career.years.2021-2022.achievements.2",
    ],
    imageUrls: [Lukatout, Lukatout],
  },
  {
    year: "2015-2019",
    titleKey: "career.years.2015-2019.title",
    descriptionKey: "career.years.2015-2019.description",
    achievementsKeys: [
      "career.years.2015-2019.achievements.0",
      "career.years.2015-2019.achievements.1",
      "career.years.2015-2019.achievements.2",
    ],
    imageUrls: [
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753789719/Portefolio/20180210_105949_rundcs.jpg",
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
