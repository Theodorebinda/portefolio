'use client'
import { realisationList } from "@/lib/realisation/realisation";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import RelisationDetail from "./realisationDetail";
import { Typo } from "./heroSection";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";

export const P = styled.p`
&:hover {
    color:${(props) => props.theme.inBody}; ;
}
;`


export default function RealisationSection(){
    return(
        <Container className="mx-4 md:mx-10  ">
            <Typo className="underline py-4 ">
                Derniere Realisation
            </Typo>
            <Container className="text-[#878483] md:w-3/4 mb-4">
                {
                    realisationList.slice(0,2).map((realisation,index) => {
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
            <LinkToOtherPage className="" texte={"Toute Les realisations"} link={"/realisation"} />
        </Container>
        
    )
}