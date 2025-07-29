"use client";

import { Container } from "@/ui/components/container/container";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { Typography } from "@/ui/components/typography/typography";

const BlogPage = () => {
  // TrackPageView();
  return (
    <Container>
      <Container className="flex flex-col items-center justify-center h-[50vh]">
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
