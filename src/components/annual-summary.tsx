// components/AnnualSummary.tsx
"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { AnnualDataType } from "@/utils/data";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

const AnnualSummary: React.FC<AnnualDataType> = ({
  year,
  titleKey,
  descriptionKey,
  achievementsKeys,
  imageUrls,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (imageUrls.length === 0) return;

    const interval = setInterval(() => {
      setFade(false); // commence la disparition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
        setFade(true); // remet la visibilité après changement
      }, 300); // délai pour fade-out (à ajuster avec le CSS)
    }, 5000); // toutes les 5s

    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6   mb-8 ">
      {imageUrls!.length > 0 && (
        <div className="w-full md:w-2/5 transition-all duration-500 ease-in-out h-[300px]  relative overflow-hidden rounded-xl -z-50">
          <Image
            src={imageUrls![currentIndex]}
            alt={`${t("theodore")} ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={currentIndex === 0}
          />
        </div>
      )}

      <div className="w-full md:w-1/2 flex flex-col  justify-between gap-4 h-full ">
        <div className="flex flex-col items-start">
          <h3 className="text-sm uppercase tracking-wider mb-1">{year}</h3>
          <span className="text-3xl md:text-4xl font-bold text-[#436896] hover:text-[#5182be] font-poppins">
            {t(titleKey)} {/* Traduction */}
          </span>
          <p className="text-xl font-poppins leading-relaxed">
            {t(descriptionKey)} {/* Traduction */}
          </p>
        </div>
        <div>
          {achievementsKeys?.length > 0 && (
            <div className="flex flex-col">
              <h5 className="text-lg font-semibold mb-2">
                {t("career.achievements_title")} {/* Traduction */}
              </h5>
              <ul className="list-disc list-inside space-y-1 ">
                {achievementsKeys.map((achievementKey, index) => (
                  <li key={index} className="leading-snug">
                    {t(achievementKey)} {/* Traduction */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnualSummary;
