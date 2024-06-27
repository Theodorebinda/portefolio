'use client'
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Construction } from "lucide-react";

export default function Competences(){
    return(
        <Container className="h-screen m-auto pt-16 flex flex-col items-center justify-center text-center gap-8">
            <Construction size={80} />
            <Typo className="text-3xl">Cette page est en Construction</Typo>

        </Container>
    )
}