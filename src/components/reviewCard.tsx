import { Linkedin, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaX } from "react-icons/fa6";
interface Review {
  photo: string;
  name: string;
  role: string;
  origin: string;
  review: string;
}
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-[#292524] h-auto rounded-md p-4 shadow-xl drop-shadow-2xl flex flex-col items-start justify-start z-[-20]">
      <div className="flex justify-start items-center gap-5 w-full mb-4">
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
            <p className="text-xs text-gray-300">{review.role}</p>
          </div>
          <div>
            {/* Exemple d'icône selon la provenance */}
            {review.origin === "LinkedIn" && (
              <div className="flex items-center gap-1 justify-center text-[#d09e72] font-bold text-sm">
                <span>LinkedIn</span>{" "}
                <FaLinkedin size={16} fill="#d09e72" color="#d09e72" />
              </div>
            )}
            {review.origin === "Facebook" && (
              <div className="flex items-center gap-1 justify-center text-[#71a5e9ee] font-bold text-sm">
                <span>FaceBook</span>
                <FaFacebook size={16} fill="#71a5e9ee" color="#71a5e9ee" />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-left mt-2">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
