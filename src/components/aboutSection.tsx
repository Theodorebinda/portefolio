import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import ReviewsPage from "./reviewSection";
import { Pin } from "lucide-react";

const AboutSection = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container>
      <Container className="flex-col flex md:flex-row justify-between mb-10 gap-10 md:gap-0 md:mb-8">
        <Container className="flex  flex-col gap-2">
          <Container className=" flex items-start md:items-center justify-start gap-4">
            {!loading ? (
              <Skeleton className="w-[80px] h-[80px] bg-slate-300 rounded-full lg:flex z-[-10] hidden " />
            ) : (
              <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no"
                height={80}
                width={80}
                alt="theodore"
                className="object-cover rounded-full hidden lg:flex"
                loading="lazy"
                onLoad={() => setLoading(true)}
                onError={() => {
                  setLoading(false);
                  console.error("Image failed to load.");
                }}
              />
            )}
            <Typography className="  text-5xl lg:text-7xl">
              Je concois
            </Typography>
          </Container>

          <Typography className="lg:text-6xl text-3xl  font-bold  ">
            des applications
          </Typography>
          <Container className="flex items-center gap-8">
            <Typography className="lg:text-6xl text-3xl font-bold">
              web et mobile{" "}
            </Typography>
            <Pin className="md:hidden flex" color="#b2d2fa" fill="#b2d2fa" />
          </Container>
        </Container>
        <Container>
          <Typography className="text-xl font-normal  flex-col leading-relaxed text-left max-w-sm">
            {
              " Ingénieur en conception spécialisé dans les systèmes de design et l'accessibilité, je crée des interfaces intuitives pour des produits numériques, alliant esthétique et inclusivité."
            }
          </Typography>
        </Container>
      </Container>
      <ReviewsPage />
    </Container>
  );
};

export default AboutSection;
