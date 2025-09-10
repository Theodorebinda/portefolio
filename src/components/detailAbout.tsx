"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { photos } from "@/lib/galleriesData/gallerie";

const PhotoGallery = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  return (
    <Container className="mt-16 w-full flex flex-col justify-start">
      <Typography className="text-4xl lg:text-6xl font-bold mb-8">
        {t("gallery.title")}
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
              alt={t(photo.titleKey)}
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
                {t(photo.titleKey)} {/* Traduction */}
              </Typography>
              <Typography className="text-lg">
                {t(photo.descriptionKey)} {/* Traduction */}
              </Typography>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default PhotoGallery;
