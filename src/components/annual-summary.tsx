// components/AnnualSummary.tsx
import { AnnualDataType } from "@/utils/data";
import Image from "next/image";
import React from "react";

const AnnualSummary: React.FC<AnnualDataType> = ({
  year,
  title,
  description,
  achievements,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-2xl md:p-6 p-4 mb-8">
      {imageUrl && (
        <div className="w-full md:w-1/2">
          <Image
            src={imageUrl}
            alt={`Image pour l'année ${year}`}
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>
      )}

      <div className="w-full md:w-1/2">
        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
          {year}
        </h3>
        <h4 className="text-3xl font-bold text-blue-700 mb-4">{title}</h4>
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

        {achievements && achievements.length > 0 && (
          <div>
            <h5 className="text-lg font-semibold mb-2 text-gray-800">
              Réalisations clés :
            </h5>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
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
  );
};

export default AnnualSummary;
