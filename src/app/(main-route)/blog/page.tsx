"use client";

import TrackPageView from "@/components/analytique/tracking-view";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typography } from "@/ui/components/typography/typography";

const BlogPage = () => {
  TrackPageView();
  useTrackPageView();
  return (
    <Container className="flex flex-col h-[calc(70vh-100px)]">
      <Container className="flex flex-col items-center justify-center h-full">
        <Typography className="text-4xl font-bold mb-4">
          Page en construction
        </Typography>
        <Typography className="text-lg">
          {"  Cette page sera bientôt disponible. Restez à l'écoute !"}
        </Typography>
      </Container>
      <LinkToOtherPage
        className="md:ml-2"
        texte={"Tu veux discuter un peu? 😊"}
        link={"/contact"}
      />
    </Container>
  );
};

export default BlogPage;
