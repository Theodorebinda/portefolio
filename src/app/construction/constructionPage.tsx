// components/ConstructionPage.tsx
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import LinkToOtherPage from "@/ui/components/link-to-other-page/linkToOtherPage";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface ConstructionPageProps {
  pageName?: string;
  ctaLink?: string;
  ctaText?: string;
}

export const ConstructionPage: React.FC<ConstructionPageProps> = ({
  pageName = "blog",
  ctaLink = "/contact",
  ctaText,
}) => {
  const { t } = useTranslation();

  return (
    <Container className="flex flex-col h-[calc(70vh-100px)]">
      <Container className="flex flex-col items-center justify-center h-full">
        <Typography className="text-4xl font-bold mb-4">
          {t("common.construction_title")}
        </Typography>
        <Typography className="text-lg">
          {t("common.construction_message")}
        </Typography>
      </Container>
      <LinkToOtherPage
        className="md:ml-2"
        texte={ctaText || t("common.cta_message")}
        link={ctaLink}
      />
    </Container>
  );
};
