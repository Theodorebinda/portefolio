import { realisationList } from "@/lib/realisation/realisation";
import { lightTheme } from "@/styles/theme";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const P = styled.p`
&:hover {
    color:${(props) => props.theme.text}; ;
}
;`


export default function RealisationSection(){
    return(
        <Container className="mx-10 ">
            <Typography>
                Derniere Realisation
            </Typography>
            <Container className="text-[#878483] md:w-3/4">
                {
                    realisationList.slice(0,2).map((realisation,index) => {
                        return(
                            <Container key={index}>
                                <a href={realisation.link} >
                                    <Typography>
                                        {realisation.nom}
                                    </Typography>
                                    <Typography>
                                        {realisation.description}
                                    </Typography>
                                </a>
                                <Link href={realisation.link}>
                                    <Image src={realisation.image} width={100} height={80} alt={realisation.nom} />
                                </Link>
                            </Container>
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