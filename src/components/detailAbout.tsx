import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

const photos = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753789718/Portefolio/WhatsApp_Image_2025-07-29_at_12.47.40_ztgdjo.jpg",
    title: "Sycamore",
    description: "Photo prise lors du seance de travail a sycamore 2024",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788860/Portefolio/WhatsApp_Image_2025-07-29_at_12.32.56_psozxo.jpg",
    title: "Kadea",
    description:
      "Photo prise lors la certification et cloture  de formation a la Kadea 2023 ",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788860/Portefolio/WhatsApp_Image_2025-07-29_at_12.32.55_mtv4if.jpg",
    title: "Kadea",
    description: "Photo prise lors d'une seance de formation a la Kadea 2023 ",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788866/Portefolio/IMG_20240716_162737_8_ipapu2.jpg",
    title: "Palme D'or",
    description:
      "Photo prise a Palme D'or, Web Master gestion de certain site web et renforcement de performance 2023",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753788862/Portefolio/IMG_20231005_113100_985_ejn6if.jpg",
    title: "Palme D'or",
    description:
      "Preparation des outils et materiels electrique pour une seance de travail 2022",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1753789719/Portefolio/20180210_105949_rundcs.jpg",
    title: "ISTA 2019-2020",
    description:
      "Photo prise lors d'une seance d'etude avec collegues en  2019",
  },
];

const PhotoGallery = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Container className="mt-16 w-full flex flex-col  justify-start ">
      <Typography className="text-4xl lg:text-6xl font-bold mb-8">
        Gallerie
      </Typography>

      <Container className="flex flex-wrap gap-6 justify-start items-start">
        {photos.map((photo) => (
          <Container
            key={photo.id}
            className="relative w-full sm:w-[500px] h-[400px] group overflow-hidden rounded-lg shadow-lg -z-20"
          >
            {loading ? (
              <Skeleton className="w-full h-full bg-slate-300" />
            ) : null}

            <Image
              src={photo.image}
              fill
              alt={photo.title}
              className={`object-cover transition-opacity duration-500 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                console.error("Image failed to load.");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent bg-opacity-95 group-hover:opacity-90 transition-opacity" />
            <Container className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Typography className="text-2xl font-bold mb-2">
                {photo.title}
              </Typography>
              <Typography className="text-lg">{photo.description}</Typography>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default PhotoGallery;
