// components/AnnualSummary.tsx
"use client";

import { AnnualDataType } from "@/utils/data";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

const AnnualSummary: React.FC<AnnualDataType> = ({
  year,
  title,
  description,
  achievements,
  imageUrls,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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
    <div className="flex flex-col md:flex-row justify-between items-start gap-6   mb-8">
      {imageUrls!.length > 0 && (
        <div className="w-full md:w-2/5 transition-all duration-500 ease-in-out">
          <Image
            src={imageUrls![currentIndex]}
            alt={`Image ${currentIndex + 1} pour l'année ${year}`}
            width={400}
            height={400}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>
      )}

      <div className="w-full md:w-1/2 flex flex-col  justify-between gap-4 h-full ">
        <div className="flex flex-col items-start">
          <h3 className="text-sm uppercase tracking-wider mb-1">{year}</h3>
          <span className="text-3xl md:text-4xl font-bold text-[#436896] hover:text-[#5182be] font-poppins">
            {title}
          </span>
          <p className="text-xl font-poppins leading-relaxed">{description}</p>
        </div>
        <div>
          {achievements?.length > 0 && (
            <div className="flex flex-col">
              <h5 className="text-lg font-semibold mb-2">
                Réalisations clés :
              </h5>
              <ul className="list-disc list-inside space-y-1 ">
                {achievements.map((item, index) => (
                  <li key={index} className="leading-snug">
                    {item}
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
