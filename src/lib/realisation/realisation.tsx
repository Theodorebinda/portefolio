import { Project } from "@/types/projet-type";
import second from "/public/images/screencapture-opi-b.png";
import mentor from "/public/images/screencapture-chef-d-oeuvre-s.png";
import monyaya from "/public/images/Capture_monyaya.png";
import Lukatout from "/public/images/Design sans titre (1).png";
import esmicom from "/public/images/Design_Esmicom-removebg-preview.png";
import { FaAppStore, FaGithub, FaGlobe, FaMobile } from "react-icons/fa";

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
    logo: "/images/opi-b-logo.svg",
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
        label: "WebApp",
        url: "https://monyaya.com",
      },
      // {
      //   icon: <FaGithub />,
      //   label: "GitHub",
      //   url: "https://github.com/username/opi-b",
      // },
    ],
    stats: [
      { label: "PROFESSIONNELS", value: "200+" },
      { label: "FORMATIONS", value: "30+" },
    ],
    image: monyaya,
    logo: "/images/monyaya-logo.svg",
    responsable: "Gael",
  },
  {
    id: "Lukatout_app",
    name: "Lukatout",
    description:
      "Market-Place App Permettant aux marchants de vendre leurs produit, et aux utilisateurs d'en achetter.",
    type: "Plateforme SaaS",
    links: [
      {
        icon: <FaAppStore />,
        label: "AppStore",
        url: "#",
      },
      {
        icon: <FaMobile />,
        label: "PlayStore",
        url: "#",
      },
    ],
    stats: [
      { label: "Utilisateurs", value: "200+" },
      { label: "Marchant", value: "30+" },
    ],
    image: Lukatout,
    logo: "/images/monyaya-logo.svg",
    responsable: "Felicien",
  },
  {
    id: "esmicom_app",
    name: "Esmicom E-learning",
    description:
      "Plateforme E-learning permettant aux apprenant de suivre les cours de leurs fac aux professeurs de suivre la progression de leurs etudiant l'administration de tout gerer.",
    type: "Plateforme SaaS",
    links: [
      {
        icon: <FaGlobe />,
        label: "WebApp",
        url: "https://elearning.esmicom.org",
      },
      // {
      //   icon: <FaGithub />,
      //   label: "GitHub",
      //   url: "https://github.com/username/opi-b",
      // },
    ],
    stats: [
      { label: "Etudiants", value: "700+" },
      { label: "Professeurs", value: "10+" },
      { label: "Admin", value: "5+" },
    ],
    image: esmicom,
    logo: "/images/monyaya-logo.svg",
    responsable: "Felicien",
  },
];
