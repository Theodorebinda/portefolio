import React from "react";
import ReviewCard from "./reviewCard";

const reviews = [
  {
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQGV-0WKhuKIcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729609426768?e=1741824000&v=beta&t=syhQyOFWGKayoLjxGueh4QNzPjLHulJx9znTKdMQ8Fs",
    name: "Gaël Makelele",
    role: "Chercheur & Entrepreneur",
    review: "Une expérience incroyable, très satisfait des résultats!",
    origin: "LinkedIn",
  },
  {
    photo:
      "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-1/460728981_1974582133009823_2311644627155562444_n.jpg?stp=c0.0.810.810a_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEsO59Je_Tz-ou_d3kMNXLE-i8Qv8DvQ2D6LxC_wO9DYK09C1nJuAaJzDhOWb9Jnr1fPO8LROy-bG4kSC1jW4zx&_nc_ohc=o023ZE7eii8Q7kNvgEZWfvv&_nc_zt=24&_nc_ht=scontent-jnb2-1.xx&_nc_gid=A5LOdZkzceV60fBukeUMcnX&oh=00_AYBUj-XaK02Tnl-cxdV9-4Hq9q18eaCiHXAxnZsk3OQT2A&oe=67806738",
    name: "Tresor Moziko",
    role: "Ingenieur Batiment Travaux Public",
    review: "Super service, je recommande vivement!",
    origin: "Facebook",
  },
  {
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQHxELeYegivDQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731347846852?e=1741824000&v=beta&t=20PWbxbLYJjTIAsWBSz2_9pFE941pEGWxiJZAgbpyDk",
    name: "Felicien Fercus",
    role: "Développement commercial et des projets",
    review: "Très bonne collaboration, travail de qualité.",
    origin: "LinkedIn",
  },
  {
    photo: "https://avatars.githubusercontent.com/u/141269644?s=100&v=4",
    name: "Sacre Mbiku",
    role: "Developer|| Designer UI/UX",
    review:
      "C'est surtout sa capacité à s'adapter à tout type de projet qui est impressionnante. J'ai de très bons souvenirs de notre collaboration et je le recommande vivement !",
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
