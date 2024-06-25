import { AppLinks } from "@/types/app-links"
import { Presentation, Home, Settings2 } from "lucide-react"
import Linkedin from '../../../public/icons/linkedin.png'
import Facebook from '../../../public/icons/facebook.png'
import Youtube from '../../../public/icons/youtube.png'
import X from '../../../public/icons/TwitterX.png'

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

export const SocialNetworks: AppLinks[] = [
  {
    title: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/company',
    CustomIcon: Linkedin,
  },
  {
    title: 'Facebook',
    baseUrl: 'https://www.facebook.com/company',
    CustomIcon: Facebook,
  },
  {
    title: 'X',
    baseUrl: 'https://www.x.com/company',
    CustomIcon: X,
  },
  {
    title: 'Youtube',
    baseUrl: 'https://www.youtube.com/company',
    CustomIcon: Youtube,
  }
]

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'acceuil",
    baseUrl: '/',
    Icon: Home 
  },
]
