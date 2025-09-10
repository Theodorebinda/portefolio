"use client";

import { ConstructionPage } from "@/app/construction/constructionPage";
import TrackPageView from "@/components/analytique/tracking-view";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";

const BlogPage = () => {
  TrackPageView();
  useTrackPageView();

  return <ConstructionPage pageName="blog" ctaLink="/contact" />;
};

export default BlogPage;
