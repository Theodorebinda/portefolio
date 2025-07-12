import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

const photos = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dhdaxlymt/image/upload/v1752206216/Portefolio/Design_sans_titre_1_annqgb.png",
    title: "Palme D'or",
    description: "Photo prise lors du festival de Cannes 2023",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    title: "Sycamore",
    description: "Paysage automnal en Californie",
  },
  // Ajoutez plus de photos ici
];

const PhotoGallery = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Container className="mt-16 w-full flex flex-col  justify-start">
      <Typography className="text-4xl lg:text-6xl font-bold mb-8">
        Gallerie
      </Typography>

      <Container className="flex flex-wrap gap-6 justify-start items-start">
        {photos.map((photo) => (
          <Container
            key={photo.id}
            className="relative w-full sm:w-[500px] h-[400px] group overflow-hidden rounded-lg shadow-lg"
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

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent bg-opacity-95 group-hover:opacity-90 transition-opacity" />

            {/* Texte superposé */}
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
