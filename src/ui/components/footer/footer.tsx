import { Copyright, Dot } from "lucide-react";
import { Container } from "../container/container";
import { Typography } from "../typography/typography";

export default function Footer (){
    return(
        <Container className=" md:min-w-full my-8 ">
            <Container className="border-t border-[#545454] flex md:m-auto pt-4 md:w-1/2 mx-8">
                
                <Container className="flex flex-row justify-between md:m-auto  items-center gap-1">
                    <Copyright strokeWidth={2} size={20} />
                    <Typography className="text-xs ">theodorebinda@gmail.com</Typography>
                    <Dot strokeWidth={1.75} />
                    <Typography className="text-xs ">Kinshasa - RDC 2024</Typography>

                </Container>
            </Container>
            
        </Container>
    )
}