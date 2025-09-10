"use client";

import { Container } from "@/ui/components/container/container";
import { ContactForm } from "../../../components/contactForm";
import { P } from "@/styles/globalStyle";
import imageHero from "../../../../public/icons/fleche1.png";
import Image from "next/image";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { useTranslation } from "@/lib/hooks/useTranslation";

const ContactPage = () => {
  useTrackPageView();
  const { t } = useTranslation();

  return (
    <div className="h-[70vh] flex items-center justify-between basis-full mb-20">
      <Container className="hidden md:block">
        <Image
          src={imageHero}
          height={400}
          width={400}
          alt="theodore"
          className="object-cover"
          loading="lazy"
        />
      </Container>
      <Container className="flex flex-col gap-10 md:basis-1/2">
        <Container className="flex flex-col justify-center items-center gap-2 lg:text-center">
          <P className="text-2xl">{t("contact.title")}</P>
          <span className="text-xl">{t("contact.subtitle")}</span>
        </Container>
        <ContactForm />
      </Container>
    </div>
  );
};

export default ContactPage;
