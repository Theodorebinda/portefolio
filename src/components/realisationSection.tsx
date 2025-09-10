// components/RealisationSection.tsx
"use client";

import { Container } from "@/ui/components/container/container";
import RelisationDetail from "./realisationDetail";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typo } from "@/styles/globalStyle";
import { projectsData } from "@/lib/realisation/realisation";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function RealisationSection() {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <Typo className=" py-4 md:mt-8 font-normal  text-xl">
        {t("projects.recent")} {/* Traduction */}
      </Typo>
      <Container className="md:w-3/4 mb-4">
        {projectsData
          .slice()
          .reverse()
          .slice(0, 2)
          .map((realisation, index) => {
            return (
              <RelisationDetail
                key={index}
                className=""
                nom={t(realisation.nameKey)} // Traduction du nom
                description={t(realisation.descriptionKey)} // Traduction de la description
                image={realisation.image}
              />
            );
          })}
      </Container>
      <LinkToOtherPage
        className=""
        texte={t("projects.all_projects")}
        link={"/realisation"}
      />
    </Container>
  );
}
