'use client'
import RelisationDetail from "@/components/realisationDetail";
import { realisationList } from "@/lib/realisation/realisation";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
// import  LinkToOtherPage  from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typography } from "@/ui/components/typography/typography";

export default function Realisation(){
    return(
        <Container className="mx-4 lg:w-2/3 md:w-3/4 pt-10 md:pt-20 md:m-auto">
            <Typography>Realisation</Typography>
            <Container>
            {
                    realisationList.map((realisation,index) => {
                        return(
                            <RelisationDetail
                             key={index} 
                             className=""
                             link={realisation.link}
                             nom={realisation.nom}
                             description={realisation.description}
                             image={realisation.image}
                             />

                        )
                    })
                }
            </Container>
            <LinkToOtherPage texte={"Parlons de votre projet"} link={"/contact"} />
        </Container>
    )
}