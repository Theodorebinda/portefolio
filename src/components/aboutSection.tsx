import { Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import ReviewsPage from "./reviewSection";
import { DockIcon, Mail, Pin } from "lucide-react";
import Link from "next/link";
import { IoDocument } from "react-icons/io5";

const AboutSection = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container className="flex flex-col gap-8 font-poppins">
      <Container className="flex-col flex md:flex-row justify-between mb-10 gap-10 md:gap-0 md:my-32">
        <Container className="flex  flex-col gap-1">
          <Container className=" flex items-start md:items-center justify-start gap-4">
            <div className="hidden md:block">
              {!loading ? (
                <Skeleton className="w-[80px] h-[80px] bg-slate-300 rounded-full flex z-[-10]  " />
              ) : (
                <Image
                  src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no"
                  height={80}
                  width={80}
                  alt="theodore"
                  className="object-cover rounded-full flex"
                  loading="lazy"
                  onLoad={() => setLoading(true)}
                  onError={() => {
                    setLoading(false);
                    console.error("Image failed to load.");
                  }}
                />
              )}
            </div>

            <Typography className="text-5xl  sm:text-5xl md:text-7xl font-bold ">
              Je concois
            </Typography>
          </Container>

          <Typography className="md:text-6xl text-4xl  font-bold  ">
            des applications
          </Typography>
          <Container className="flex items-center gap-8">
            <Typography className="md:text-6xl text-4xl font-bold">
              web et mobile{" "}
            </Typography>
            <Pin className="md:hidden flex" color="#b2d2fa" fill="#b2d2fa" />
          </Container>
        </Container>
        <Container className="basis-1/3 flex flex-col gap-2">
          <Typography className="md:text-2xl text-xl font-poppins  flex-col leading-relaxed text-left max-w-sm">
            {
              " Ingénieur en conception spécialisé dans les systèmes de design et l'accessibilité, je crée des interfaces intuitives alliant esthétique et inclusivité."
            }
          </Typography>
          <Container className="flex justify-start items-center gap-20">
            <div className="flex items-center justify-start gap-8">
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start items-center gap-2 transition-colors hover:text-[#5182be] underline font-bold"
              >
                <Mail size={20} className="text-[#4474ae]" />
                <span className="">{"Email"}</span>
              </Link>
            </div>
            <div className="flex items-center justify-start gap-8">
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start items-center gap-2 hover:text-[#5182be] underline transition-colors"
              >
                <IoDocument size={20} className="text-[#4474ae]" />
                <a
                  href="/CV Theodore.pdf"
                  download="CV_Theodore.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-bold">{"Resumé"}</span>
                </a>
              </Link>
            </div>
          </Container>
        </Container>
      </Container>
      <ReviewsPage />
    </Container>
  );
};

export default AboutSection;
