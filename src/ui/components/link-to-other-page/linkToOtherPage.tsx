import Link from "next/link"
import { Container } from "@/ui/components/container/container"
import { P } from "@/components/realisationSection";
import { MoveRight } from "lucide-react";

interface Propos {
    texte: string;
    link: string;
    className?: string;
}
const LinkToOtherPage = ({texte,link, className = "string"}: Propos) => {
    return(
        <Container className={`${className}text-[#878483] mt-10`}>
                <P className="underline text-[#878483]">
                    <Link href={link} className="flex gap-2 justify-start items-center">
                        <span>{texte}</span>
                        <MoveRight strokeWidth={1.75} size={20} />
                    </Link>
                </P>
        </Container>
    )

};

export default LinkToOtherPage;