// import { Realisation } from "@/types/realisations";
// import second from "/public/images/screencapture-opi-b.png";
// import mentor from "/public/images/screencapture-chef-d-oeuvre-s.png";
// import monyaya from "/public/images/Capture_monyaya.png";

// export const realisationList: Realisation[] = [
//   {
//     id: 1,
//     nom: "OPI-B",
//     link: "https://opi-b.bprod.top/",
//     description:
//       "Créé dans le but de s'exercer, ce projet est une plateforme de découverte et de réservation de destinations touristiques en République Démocratique du Congo.",
//     responsable: "Jonathan Smith",
//     image: second,
//   },
//   {
//     id: 2,
//     nom: "mentor conect",
//     link: "#",
//     description:
//       "Connect Mentor est une plateforme qui met en relation des personnes souhaitant apprendre avec des mentors qualifiés dans le domaine concerné.",
//     responsable: "Jonathan Smith",
//     image: mentor,
//   },
//   {
//     id: 3,
//     nom: "Monyaya",
//     link: "https://monyaya.com",
//     description:
//       "Monyaya est une plateforme qui connecte les professionnels(yaya) aux apprenants pour des sessions de mentorat ou de formation pratique dans divers domaines.",
//     responsable: "Gael ",
//     image: monyaya,
//   },
// ];
import { Project } from "@/types/projet-type";
import second from "/public/images/screencapture-opi-b.png";
import mentor from "/public/images/screencapture-chef-d-oeuvre-s.png";
import monyaya from "/public/images/Capture_monyaya.png";
import { FaGithub, FaGlobe } from "react-icons/fa";

export const projectsData: Project[] = [
  {
    id: "opi-b",
    name: "OPI-B",
    description:
      "Plateforme de découverte et de réservation de destinations touristiques en République Démocratique du Congo.",
    type: "Application Web",
    links: [
      {
        icon: <FaGlobe />,
        label: "Website",
        url: "https://opi-b.bprod.top/",
      },
      {
        icon: <FaGithub />,
        label: "GitHub",
        url: "https://github.com/username/opi-b",
      },
    ],
    stats: [
      { label: "UTILISATEURS", value: "500+" },
      { label: "DESTINATIONS", value: "50+" },
    ],
    image: second,
    logo: "/images/opi-b-logo.svg", // À remplacer par votre logo si disponible
    responsable: "Jonathan Smith",
  },
  {
    id: "mentor-conect",
    name: "Mentor Conect",
    description:
      "Plateforme qui met en relation des apprenants avec des mentors qualifiés dans divers domaines.",
    type: "Application Web",
    links: [
      {
        icon: <FaGlobe />,
        label: "Website",
        url: "https://opi-b.bprod.top/",
      },
      {
        icon: <FaGithub />,
        label: "GitHub",
        url: "https://github.com/username/opi-b",
      },
    ],
    stats: [
      { label: "MENTORS", value: "100+" },
      { label: "ÉTUDIANTS", value: "1K+" },
    ],
    image: mentor,
    responsable: "Jonathan Smith",
  },
  {
    id: "monyaya",
    name: "Monyaya",
    description:
      "Plateforme connectant des professionnels (yaya) à des apprenants pour des sessions de mentorat ou formation pratique.",
    type: "Plateforme SaaS",
    links: [
      {
        icon: <FaGlobe />,
        label: "Website",
        url: "https://monyaya.com",
      },
      {
        icon: <FaGithub />,
        label: "GitHub",
        url: "https://github.com/username/opi-b",
      },
    ],
    stats: [
      { label: "PROFESSIONNELS", value: "200+" },
      { label: "FORMATIONS", value: "30+" },
    ],
    image: monyaya,
    logo: "/images/monyaya-logo.svg", // À remplacer par votre logo si disponible
    responsable: "Gael",
  },
];
