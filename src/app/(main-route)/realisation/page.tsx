"use client";

import ProjectCard from "@/components/projet/ProjectCard";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { projectsData } from "@/lib/realisation/realisation";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";

export default function ProjectsPage() {
  useTrackPageView();
  const { t } = useTranslation();

  return (
    <Container className="">
      <Container className=" lg:w-2/3 md:w-3/4 mb-8 ">
        <Typo className="font-poppins text-5xl ">
          {t("projects.all_projects")} {/* Traduction */}
        </Typo>
      </Container>

      <Container className="grid gap-10 space-y-12">
        {projectsData
          .slice()
          .reverse()
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Container>
      <div className="my-8">
        <LinkToOtherPage
          // texte={t("redirection.contact.me")}
          texte={t("redirection.contact_lets_talk")}
          link={"/contact"}
        />
      </div>
    </Container>
  );
}
//  texte={t("projects.all_projects")}
