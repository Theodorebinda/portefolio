'use client'
import { realisationList } from "@/lib/realisation/realisation";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import RelisationDetail from "./realisationDetail";

export const P = styled.p`
&:hover {
    color:${(props) => props.theme.text}; ;
}
;`


export default function RealisationSection(){
    return(
        <Container className="mx-4 md:mx-10  ">
            <Typography>
                Derniere Realisation
            </Typography>
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
            <Container className="text-[#878483] lg:w-1/5 md:w-1/3 w-3/4">
                <P className="underline text-[#878483]">
                    <Link href={'/realisation'} className="flex gap-1 justify-start items-center">
                        <span>Toute Les realisations</span>
                        <MoveRight strokeWidth={1.75} size={20} />
                    </Link>
                </P>
            </Container>
           
        </Container>
        
    )
}