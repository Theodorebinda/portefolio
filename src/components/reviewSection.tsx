import React from "react";
import ReviewCard from "./reviewCard";

const reviews = [
  {
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    name: "Theodore",
    role: "Développeur Frontend",
    review: "Une expérience incroyable, très satisfait des résultats!",
    origin: "LinkedIn",
  },
  {
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    name: "Jean Dupont",
    role: "Chef de projet",
    review: "Super service, je recommande vivement!",
    origin: "Facebook",
  },
  {
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no",
    name: "Marie Curie",
    role: "Designer UI/UX",
    review: "Très bonne collaboration, travail de qualité.",
    origin: "Twitter",
  },
];

const ReviewsPage = () => {
  return (
    <div className="py-8 grid grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewsPage;
