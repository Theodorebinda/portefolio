import { AppLinks } from "@/types/app-links"
import { Presentation, Home, Settings2 } from "lucide-react"
import Linkedin from '/public/icons/linkedin.png'
import Facebook from '/public/icons/facebook.png'
import Youtube from '/public/icons/youtube.png'
import X from '/public/icons/TwitterX.png'

export const MainRoutes: AppLinks[] = [
  {
    title: 'Acceuil',
    baseUrl: '/'
  },
  {
    title: 'A propos',
    baseUrl: '/about'
  },
  {
    title: 'Competences',
    baseUrl: '/competences'
  },
  {
    title: 'Realisation',
    baseUrl: '/realisation'
  },
]

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'acceuil",
    baseUrl: '/',
    Icon: Home 
  },
]
