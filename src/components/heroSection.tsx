"use client";
import { Container } from "@/ui/components/container/container";
import Typewriter from "@/ui/components/typewriter/Typewriter";
import { Typography } from "@/ui/components/typography/typography";
import Link from "next/link";
import { Btn, Typo } from "@/styles/globalStyle";
import { ChevronRight } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent";
import { useTranslation } from "@/lib/hooks/useTranslation";
export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <Container className="flex flex-col items-start justify-between flex-wrap  lg:flex-row  font-poppins ">
      <Container className="flex flex-col gap-4 ">
        <Typo className=" text-6xl md:text-8xl">Théodore Samba</Typo>

        <Container className="md:pl-4 pl-0">
          <Container>
            <Typewriter
              texts={[
                // Utilisez les clés de traduction
                t("roles.web_developer"),
                t("roles.ui_ux_designer"),
                t("roles.radio_engineer"),
              ]}
              speed={50}
              deleteDelay={1500}
            />
          </Container>
          <Container className="mt-4 md:max-w-lg w-full">
            <Typography className="text-2xl   leading-relaxed  ">
              <span>{t("hero.passionate")}</span>
              {"  "}
              <span>{t("hero.design_systems")},</span> {"  "}
              <span>{t("hero.accessibility")},</span> {"  "}
              <span>{t("hero.state_machines")},</span> {"  "}
              <span>{t("hero.user_experience")}.</span>
            </Typography>
          </Container>
        </Container>

        <Container className="mt-4 mb-4 flex justify-center p-2">
          <Link href={"/contact"}>
            <Btn
              className="flex justify-center items-center gap-1 px-5 py-6"
              onClick={() => trackEvent("click", "Download", "CV Download")}
            >
              {t("hero.contact_me")}
              <ChevronRight className="w-5 h-5 font-light" />
            </Btn>
          </Link>
        </Container>
      </Container>
    </Container>
  );
}
