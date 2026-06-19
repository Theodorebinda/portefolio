// lib/realisation/realisation.ts
import { Project } from "@/types/projet-type";
import second from "../../../public/images/screencapture-opi-b.png";
import mentor from "../../../public/images/screencapture-chef-d-oeuvre-s.png";
import monyaya from "../../../public/images/Capture_monyaya.png";
import Lukatout from "../../../public/images/Design sans titre (1).png";
import esmicom from "../../../public/images/Design_Esmicom-removebg-preview.png";
import resurection from "../../../public/images/resurection_design.png";
import digiPublic from "../../../public/images/digi_public.png";
import dapioil from "../../../public/images/dapioil.png";
import { FaAppStore, FaGithub, FaGlobe, FaMobile } from "react-icons/fa";

export const projectsData: Project[] = [

  {
    id: "monyaya",
    nameKey: "projects.monyaya.name",
    descriptionKey: "projects.monyaya.description",
    typeKey: "projects.monyaya.type",
    links: [
      {
        icon: <FaGlobe />,
        labelKey: "links.webapp",
        url: "https://monyaya.com",
      },
    ],
    stats: [
      { labelKey: "projects.monyaya.stats.professionals", value: "200+" },
      { labelKey: "projects.monyaya.stats.trainings", value: "30+" },
    ],
    image: monyaya,
    logo: "/images/monyaya-logo.svg",
    responsable: "Gael",
  },
  // {
  //   id: "Lukatout_app",
  //   nameKey: "projects.lukatout.name",
  //   descriptionKey: "projects.lukatout.description",
  //   typeKey: "projects.lukatout.type",
  //   links: [
  //     {
  //       icon: <FaAppStore />,
  //       labelKey: "links.appstore",
  //       url: "#",
  //     },
  //     {
  //       icon: <FaMobile />,
  //       labelKey: "links.playstore",
  //       url: "#",
  //     },
  //   ],
  //   stats: [
  //     { labelKey: "projects.lukatout.stats.users", value: "200+" },
  //     { labelKey: "projects.lukatout.stats.merchants", value: "30+" },
  //   ],
  //   image: Lukatout,
  //   logo: "/images/monyaya-logo.svg",
  //   responsable: "Felicien",
  // },
  {
    id: "esmicom_app",
    nameKey: "projects.esmicom.name",
    descriptionKey: "projects.esmicom.description",
    typeKey: "projects.esmicom.type",
    links: [
      {
        icon: <FaGlobe />,
        labelKey: "links.webapp",
        url: "https://elearning.esmicom.org",
      },
    ],
    stats: [
      { labelKey: "projects.esmicom.stats.students", value: "700+" },
      { labelKey: "projects.esmicom.stats.teachers", value: "10+" },
      { labelKey: "projects.esmicom.stats.admins", value: "5+" },
    ],
    image: esmicom,
    logo: "/images/monyaya-logo.svg",
    responsable: "Felicien",
  },
  {
    id: "resurection_app",
    nameKey: "projects.resurection.name",
    descriptionKey: "projects.resurection.description",
    typeKey: "projects.resurection.type",
    links: [
      {
        icon: <FaGlobe />,
        labelKey: "links.webapp",
        url: "https://resurrection-repport-teste.vercel.app",
      },
    ],
    stats: [
      { labelKey: "projects.resurection.stats.departements", value: "8+" },
      { labelKey: "projects.resurection.stats.activites", value: "200+" },
      { labelKey: "projects.resurection.stats.extensions", value: "10+" },
    ],
    image: resurection,
    logo: "#",
    responsable: "La Resurection",
  },
  {
    id: "digi_public",
    nameKey: "projects.digi_public.name",
    descriptionKey: "projects.digi_public.description",
    typeKey: "projects.digi_public.type",
    links: [
      {
        icon: <FaGlobe />,
        labelKey: "links.webapp",
        url: "https://www.client-dev.digipublic.app/",
      },
    ],
    stats: [
      { labelKey: "projects.digi_public.stats.auto_declarations", value: "" },
      { labelKey: "projects.digi_public.stats.suivre_ses_dossiers", value: "" },
      { labelKey: "projects.digi_public.stats.gérer_ses_biens", value: "" },
    ],
    image: digiPublic,
    logo: "#",
    responsable: "Digi Public",
  },
  
  {
    id: "dapioil_app",
    nameKey: "projects.dapioil.name",
    descriptionKey: "projects.dapioil.description",
    typeKey: "projects.dapioil.type",
    links: [
      {
        icon: <FaGlobe />,
        labelKey: "links.website",
        url: "https://www.dapioil.com/",
      },
    ],
    stats: [
      { labelKey: "projects.dapioil.stats.clients_gérés", value: "50+" },
      { labelKey: "projects.dapioil.stats.referencement", value: "100%" },
    ],
    image: dapioil,
    logo: "#",
    responsable: "Dapi Oil SARL",
  }
];
