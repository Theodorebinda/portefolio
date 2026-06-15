// lib/pageRoutes/pageRoutes.ts
import { AppLinks } from "@/types/app-links";
import { Home } from "lucide-react";

export const MainRoutes: AppLinks[] = [
  {
    titleKey: "routes.about",
    baseUrl: "/about",
  },
  {
    titleKey: "routes.projects",
    baseUrl: "/realisation",
  },
  {
    titleKey: "routes.blog",
    baseUrl: "/blog",
  },
];

export const HomeRoute: AppLinks[] = [
  {
    titleKey: "routes.home",
    baseUrl: "/",
    Icon: Home,
  },
];
