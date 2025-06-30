import React from "react";
import ReviewCard from "./reviewCard";

const reviews = [
  {
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQGV-0WKhuKIcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729609426768?e=1756944000&v=beta&t=Rtd8ejHkmv1rgVxsjoi5aQ1edPz1znZNQX4p5zXDtIg",
    name: "Gaël Makelele",
    role: "Chercheur & Entrepreneur",
    review: "Une expérience incroyable, très satisfait des résultats!",
    origin: "LinkedIn",
  },
  {
    photo:
      "https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/460728981_1974582133009823_2311644627155562444_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEsO59Je_Tz-ou_d3kMNXLE-i8Qv8DvQ2D6LxC_wO9DYK09C1nJuAaJzDhOWb9Jnr1fPO8LROy-bG4kSC1jW4zx&_nc_ohc=Bk1D3B7JvpYQ7kNvwEmJs_2&_nc_oc=AdlpUBPs7CfjFIY0EwvcBZpE66jGECwAZ8fmfm97LRh5KXzMhApdLLnKHDhS4dJuJSk&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&_nc_gid=O-qEag8kKFXMaiogDnn-Cg&oh=00_AfNH8XDdvNCHULwKAZ_zXBwJerzK-gBvMkeUCd16fJOQYw&oe=686793B6",
    name: "Tresor Moziko",
    role: "Ingenieur Batiment Travaux Public",
    review: "Super service, je recommande vivement!",
    origin: "Facebook",
  },
  {
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQG6fASoGiVFWA/profile-displayphoto-shrink_400_400/B4EZXj8wU.GwAg-/0/1743286115742?e=1756944000&v=beta&t=7CyURoyqSCAAH4D8yaHhlhp3ieBBXCbnQdeQRsSaRfg",
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
