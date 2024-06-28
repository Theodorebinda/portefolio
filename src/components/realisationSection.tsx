'use client'
import { realisationList } from "@/lib/realisation/realisation";
import { Container } from "@/ui/components/container/container";
import RelisationDetail from "./realisationDetail";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typo } from "@/styles/globalStyle";




export default function RealisationSection(){
    return(
        <Container className="mx-4 md:mx-10  ">
            <Typo className="underline py-4 ">
                Derniere Realisation
            </Typo>
            <Container className=" md:w-3/4 mb-4">
                {
                    realisationList.slice(0,2).map((realisation,index) => {
                        return(
                            <RelisationDetail
                             key={index} 
                             className=""
                            //  link={realisation.link}
                             nom={realisation.nom}
                             description={realisation.description}
                             image={realisation.image}
                             />

                        )
                    })
                }
            </Container>
            <LinkToOtherPage className="" texte={"Toute Les realisations"} link={"/realisation"} />
        </Container>
        
    )
}