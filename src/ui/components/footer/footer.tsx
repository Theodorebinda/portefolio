import { Copyright, Dot } from "lucide-react";
import { Container } from "../container/container";
import { Typography } from "../typography/typography";

export default function Footer (){
    return(
        <Container className=" md:min-w-full my-8 ">
            <Container className="border-t border-[#545454] flex md:m-auto pt-4 md:w-1/2 mx-10">
                
                <Container className="flex flex-row justify-between items-center gap-2">
                    <Copyright strokeWidth={2} size={20} />
                    <Typography className="text-xs md:text-base">Theodore Samba Binda </Typography>
                    <Dot strokeWidth={1.75} />
                    <Typography className="text-xs md:text-base">Kinshasa - RDC</Typography>

                </Container>
            </Container>
            
        </Container>
    )
}