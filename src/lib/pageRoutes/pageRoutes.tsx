import { AppLinks } from "@/types/app-links";
import { Presentation, Home, Settings2 } from "lucide-react";

export const MainRoutes: AppLinks[] = [
  {
    title: "A propos",
    baseUrl: "/about",
  },
  {
    title: "Carrière",
    baseUrl: "/competences",
  },
  {
    title: "Projets",
    baseUrl: "/realisation",
  },
  {
    title: "Blog",
    baseUrl: "/blog",
  },
];

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'acceuil",
    baseUrl: "/",
    Icon: Home,
  },
];
