"use client";

import HeroSection from "@/components/heroSection";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/aboutSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});

const RealisationSection = dynamic(
  () => import("@/components/realisationSection"),
  {
    ssr: true,
    loading: () => <div className="min-h-[300px]" />,
  },
);
// hmfnhsndgjslkmd.adgnm,sfjgnldhjnmflg,.vldkmgjrmls.,dngkjlretjlrgklgmrnetjklnfmds,v nbtkjl

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
