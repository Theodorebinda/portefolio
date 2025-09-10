"use client";

import { Btn, Typo } from "@/styles/globalStyle";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import photo from "/public/theodore-removebg-preview.png";
import { Span } from "@/styles/globalStyle";
import { useTranslation } from "@/lib/hooks/useTranslation";

const HeroSectionAbout = () => {
  const { t } = useTranslation();

  return (
    <Container className="flex flex-col lg:flex-row lg:justify-between  items-start">
      <Container className="md:basis-1/2 flex flex-col items-center justify-between gap-10  ">
        <Container className="leading-relaxed text-start">
          <Typography className="text-xl font-normal">
            <Typo className="font-normal text-6xl md:text-7xl">
              {t("aboutPage.hero.iam")} {/* Traduction */}
            </Typo>
            {t("aboutPage.hero.title")} {/* Traduction */}
          </Typography>
          <Typography className="text-xl font-normal leading-relaxed">
            {t("aboutPage.hero.graduated")} {/* Traduction */}
            <Span
              href="https://ista-kin.org/ista-kin/ista/index.html"
              target="_blank"
            >
              {t("aboutPage.hero.ista")} {/* Traduction */}
            </Span>
            {" " + t("aboutPage.hero.certified") + " "} {/* Traduction */}
            <Span href="https://www.kadea.academy/" target="_blank">
              {t("aboutPage.hero.kadea")} {/* Traduction */}
            </Span>
            .
            <br />
            <span>
              {t("aboutPage.hero.description1")} {/* Traduction */}
            </span>
            <span>
              {" " + t("aboutPage.hero.description2")} {/* Traduction */}
            </span>
          </Typography>
        </Container>
        <Container>
          <a
            href="/CV Theodore.pdf"
            download="CV_Theodore.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Btn className="px-6 py-5">{t("aboutPage.hero.download_cv")}</Btn>
          </a>
        </Container>
      </Container>
      <Container className="lg:flex lg:justify-end items-start md:w-1/2 pt-4 md:pt-0">
        <Image
          src={photo}
          width={400}
          height={400}
          alt={"Theodore"}
          className="object-contain"
          loading="lazy"
        />
      </Container>
    </Container>
  );
};

export default HeroSectionAbout;
