"use client";

import AboutSection from "@/components/aboutSection";
import HeroSection from "@/components/heroSection";
import RealisationSection from "@/components/realisationSection";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";

export default function Home() {
  useTrackPageView();
  return (
    <main className=" flex flex-col gap-8 select-none ">
      <HeroSection />
      <AboutSection />
      <RealisationSection />
    </main>
  );
}
