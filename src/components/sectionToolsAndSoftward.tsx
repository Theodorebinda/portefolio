import { ListOfHardCompetences } from "@/lib/competences/competences";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";

const ToolsAndSoftwareSection = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-16">
      <Container className="flex flex-col gap-3">
        <Typography className="text-4xl lg:text-6xl font-bold">
          {t("aboutPage.toolsAndSoftware.title")}
        </Typography>
        <Container>
          <Typography className="text-left">
            {t("aboutPage.toolsAndSoftware.description")}
          </Typography>{" "}
          <span>{t("aboutPage.toolsAndSoftware.description_continued")}</span>
        </Container>
      </Container>

      <Container className="flex md:flex-row mt-10 flex-wrap">
        <Container className="flex flex-wrap items-center justify-start gap-3">
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
