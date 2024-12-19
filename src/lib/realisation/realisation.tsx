import { Realisation } from "@/types/realisations";
import second from "/public/images/screencapture-opi-b.png";
import mentor from "/public/images/screencapture-chef-d-oeuvre-s.png";
import monyaya from "/public/images/Capture_monyaya.png";

export const realisationList: Realisation[] = [
  {
    id: 1,
    nom: "OPI-B",
    link: "https://opi-b.bprod.top/",
    description:
      "Créé dans le but de s'exercer, ce projet est une plateforme de découverte et de réservation de destinations touristiques en République Démocratique du Congo.",
    responsable: "Jonathan Smith",
    image: second,
  },
  {
    id: 2,
    nom: "mentor conect",
    link: "#",
    description:
      "Connect Mentor est une plateforme qui met en relation des personnes souhaitant apprendre avec des mentors qualifiés dans le domaine concerné.",
    responsable: "Jonathan Smith",
    image: mentor,
  },
  {
    id: 3,
    nom: "Monyaya",
    link: "https://monyaya.com",
    description:
      "Monyaya est une plateforme qui connecte les professionnels(yaya) aux apprenants pour des sessions de mentorat ou de formation pratique dans divers domaines.",
    responsable: "Gael ",
    image: monyaya,
  },
];
