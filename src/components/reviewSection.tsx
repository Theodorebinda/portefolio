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
    origin: "LinkedIn",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/141269644?s=100&v=4",
    name: "Sacre Mbiku",
    role: "Developer|| Designer UI/UX",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora iste adipisci, officiis atque perferendis ",
    origin: "LinkedIn",
  },
];

const ReviewsPage = () => {
  return (
    <div className=" grid md:grid-cols-2 gap-8 ">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewsPage;
