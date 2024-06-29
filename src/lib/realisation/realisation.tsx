import { Realisation } from '@/types/realisations'
import second from '/public/images/screencapture-opi-b.png'
import mentor from "/public/images/screencapture-chef-d-oeuvre-s.png"


export const realisationList :Realisation[]= [
    {
        id : 1,
        nom : "OPI-B",
        // link: "https://opi-b.bprod.top/",
        description: "Créé dans le but de s'exercer, ce projet est une plateforme de découverte et de réservation de destinations touristiques en République Démocratique du Congo.",
        responsable: "Jonathan Smith",
        image:second
    },
    {
        id: 2,
        nom : "mentor conect",
        // link: "https://chef-d-oeuvre-syxg-git-develop-theodorebindas-projects.vercel.app/",
        description: "Connect Mentor est une plateforme qui met en relation des personnes souhaitant apprendre avec des mentors qualifiés dans le domaine concerné.",
        responsable: "Jonathan Smith",
        image:mentor
    }
    // ,
    // {
    //     id: 3,
    //     nom : "OPI-B",
    //     // link: "ttps://chef-d-oeuvre-syxg-git-develop-theodorebindas-projects.vercel.app/",
    //     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui libero expedita nobis soluta impedit, voluptatum provident ipsum minus consequuntur officia!",
    //     responsable: "Jonathan Smith",
    //     image:second
    // }
    // ,
    // {
    //     id: 4,
    //     nom : "OPI-B",
    //     // link: "ttps://chef-d-oeuvre-syxg-git-develop-theodorebindas-projects.vercel.app/",
    //     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui libero expedita nobis soluta impedit, voluptatum provident ipsum minus consequuntur officia!",
    //     responsable: "Jonathan Smith",
    //     image:second
    // }
]