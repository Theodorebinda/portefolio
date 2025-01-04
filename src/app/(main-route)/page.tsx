"use client";

import HeroSection from "@/components/heroSection";
import RealisationSection from "@/components/realisationSection";

export default function Home() {
  return (
    <main className=" flex flex-col gap-5 select-none ">
      <HeroSection />
      <RealisationSection />
    </main>
  );
}
