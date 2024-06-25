import CircularProgressBar from "@/ui/components/circularProgressBar/circularProgressBar";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image, { StaticImageData } from "next/image";


interface Props {
    percentage?: number;
    className?: string;
    image :StaticImageData | string;
    name: string 
    children?: string | undefined;
  }
export default function HardSkillContent({percentage,name, image, className = "string"}: Props){
    return (
        <Container className={`${className} mt-4 flex justify-center items-center`} >
            <Container className="flex flex-col justify-center items-center gap-2">
                <Container>
                    <CircularProgressBar percentage={percentage} image={image} name={name} />
                </Container>
                <Typography>
                    {name}
                </Typography>
            </Container>

        </Container>
    )
}