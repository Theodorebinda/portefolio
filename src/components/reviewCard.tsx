import { Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
interface Review {
  photo: string;
  name: string;
  role: string;
  origin: string;
  review: string;
}
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-[#292524] h-auto rounded-md p-4 shadow-xl drop-shadow-2xl flex flex-col items-start justify-start">
      <div className="flex justify-start items-center gap-5 w-full">
        <Image
          src={review.photo}
          height={40}
          width={40}
          alt={review.name}
          className="object-cover rounded-full"
        />
        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-lg font-bold">{review.name}</h3>
            <p className="text-sm text-gray-400">{review.role}</p>
          </div>
          <div>
            {/* Exemple d'icône selon la provenance */}
            {review.origin === "LinkedIn" && <Linkedin />}
            {review.origin === "Facebook" && <FaFacebook />}
          </div>
        </div>
      </div>
      <p className="text-sm text-center mt-2">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
