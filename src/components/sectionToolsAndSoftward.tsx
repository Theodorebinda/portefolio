import { ListOfHardCompetences } from "@/lib/competences/competences";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";

const ToolsAndSoftwareSection = () => {
  return (
    <Container className="mt-16">
      <Container className="flex flex-col gap-3">
        <Typography className="text-4xl lg:text-6xl font-bold">
          Outils & Logiciels
        </Typography>
        <Container>
          {" "}
          <Typography className="text-left">
            {
              "Dans mon parcours, j'ai eu l'occasion de travailler avec différents logiciels,"
            }
          </Typography>
          <span>outils et cadres en voici quelques-uns :</span>
        </Container>
      </Container>

      <Container className="flex md:flex-row mt-10 flex-wrap">
        <Container className="flex flex-wrap  items-center justify-start gap-3">
          {ListOfHardCompetences.map((competence) => (
            <div key={competence.id}>
              <Image
                src={competence.image}
                width={50}
                height={50}
                alt={competence.name}
              />
            </div>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default ToolsAndSoftwareSection;
