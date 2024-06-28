import { Competences, CompetencesHard } from "@/types/competences";
import autonome from "/public/images/Programming-bro 1 (1).png";
import equipe from "/public/images/Collab-pana 1.png";
import resolProblem from "/public/images/resolutionProbleme.png";
import resilience from "/public/images/Light bulb-bro 1 (1).png";
import htmlIcone from "/public/images/htmlLogo.svg";
import cssIcone from "/public/images/cssLogo.svg";
import jsIcone from "/public/images/3d-javascript-logo-design-free-png 1.svg";
import reactIcone from "/public/images/react.svg";
import nodeIcone from "/public/images/nodeJs.svg";
import tailwind from "/public/images/tailwindCssLogo.svg";
import wordPressIcon from "/public/images/R-removebg-preview 1.svg";
import prismaIcon from "/public/images/prismaLogo.svg";
import typescriptIcon from "/public/png-transparent-typescript-language-javascript-static-type-typescript-logo-frontend-3d-icon-thumbnail-removebg-preview.png";
import figmaIcon from "/public/images/figmaLogo.svg";



export const ListOfSoftCompetences : Competences[] =[
    {
        id : 1,
        image : autonome,
        name : "Autonomie et prise d'initiatives",
        description : "Je suis reconnu pour mon autonomie et ma proactivité, n'hésitant pas à prendre des initiatives pour faire avancer les projets."
    },
    {
        id : 2,
        image : equipe,
        name : "Travaille en Equpipe",
        description : "Je suis un élément clé dans les projets collaboratifs, sachant écouter les autres et contribuer de manière constructive."
    },
    {
        id : 3,
        image :resolProblem,
        name : "Curiosité et soif d'apprendre",
        description : "Je fais preuve d'une grande curiosité intellectuelle et j'aime me tenir informé des dernières évolutions technologiques afin d'enrichir en permanence mes compétences."
    },
    {
        id : 4,
        image :resilience,
        name : "Resilience",
        description : "Je fais preuve de résilience face aux défis, sachant rebondir et surmonter les obstacles avec détermination."
    },
    {
        id : 5,
        image :autonome,
        name : "Adaptabilité et flexibilité",
        description : "Je sais m'adapter rapidement aux changements et aux nouvelles situations, ce qui me permet d'être réactif"
    },
    {
        id : 6,
        image : autonome,
        name : "Patience et pédagogie",
        description : "Je sais faire preuve de patience et de pédagogie pour expliquer des concepts techniques à des interlocuteurs non techniques."
    }

]

export const ListOfHardCompetences : CompetencesHard[] =[
    {
        id : 1,
        image : htmlIcone,
        name : "HTML5",
        progression :80
    },
    {
        id : 2,
        image : cssIcone,
        name : "CSS",
        progression :50
    },
    {
        id : 3,
        image :jsIcone,
        name : "Javascript",
        progression :50
    },
    {
        id : 4,
        image :reactIcone,
        name : "ReactJs",
        progression :70
    },
    {
        id : 5,
        image :nodeIcone,
        name : "NodeJs",
        progression :30
    },
    
    {
        id : 6,
        image : typescriptIcon,
        name : "Typscript",
        progression :40
    },
    {
        id : 7,
        image : tailwind,
        name : "Tailwind",
        progression :90
    },
    {
        id : 8,
        image : wordPressIcon,
        name : "Wordpress",
        progression :90
    },
    {
        id : 9,
        image : figmaIcon,
        name : "Figma",
        progression :70
    },
    {
        id : 10,
        image : prismaIcon,
        name : "Prisma",
        progression :50
    },

]