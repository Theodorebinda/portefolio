"use client";

import ProjectCard from "@/components/projet/ProjectCard";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { projectsData } from "@/lib/realisation/realisation";
import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";

export default function ProjectsPage() {
  useTrackPageView();
  return (
    <Container className="">
      <Container className=" lg:w-2/3 md:w-3/4 mb-8 ">
        <Typo className="font-poppins text-5xl ">Projets</Typo>
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
        <LinkToOtherPage texte={"Parlons de votre projet"} link={"/contact"} />
      </div>
    </Container>
  );
}
