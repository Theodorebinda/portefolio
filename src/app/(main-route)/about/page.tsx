'use client'
import Typewriter from "@/ui/components/typewriter/Typewriter";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
     <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
             <Typewriter
                 texts={[
                  "Premier texte à afficher.",
                  "Deuxième texte à afficher.",
                  "Troisième texte à afficher."
                ]}
                speed={40}
                deleteDelay={1000}
              />
    </main>
  );
}
