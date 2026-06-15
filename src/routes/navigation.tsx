"use client";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes";
import { Container } from "@/ui/components/container/container";
import clsx from "clsx";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import LinkMediaSocial from "@/components/linkSocialMedia";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface Props {
  className?: string;
  toggleTheme?: () => void;
  currentTheme?: string;
}

export const Navigation = ({ toggleTheme, currentTheme, className }: Props) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLoading] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  // Utiliser currentTheme pour déterminer la couleur du texte
  const textColor =
    currentTheme === "light" ? "text-gray-800" : "text-gray-200";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  };

  return (
    <header
      className={clsx("fixed top-0 left-0 right-0 z-50 w-full", className, {
        "shadow-sm": isScrolled,
      })}
    >
      <Container
        className={`w-full ${
          currentTheme === "light" ? "bg-white" : "bg-[#1c1917]"
        }`}
      >
        <Container
          className={`mx-auto flex flex-row px-4 md:px-0 py-6 max-w-5xl w-full justify-between ${
            isScrolled ? "items-center" : "items-end"
          } h-[7rem]`}
        >
          <Link href="/" className="flex justify-between items-center">
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s288-c-no"
              height={80}
              width={80}
              alt="theodore"
              className="object-cover rounded-full flex w-10 h-10 border-2 border-[#b2d2fa] hover:border-[#5182be]"
              loading="lazy"
              onLoad={() => setLoading(true)}
              onError={() => {
                setLoading(false);
                console.error("Image failed to load.");
              }}
            />
            <Typography
              component="p"
              className={`px-3 text-xl font-normal ${
                currentTheme === "light"
                  ? "hover:text-[#000]"
                  : "hover:text-white"
              }`}
            >
              T.Samba
            </Typography>
          </Link>

          <nav className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
            {MainRoutes.map((route) => (
              <Typography
                key={route.titleKey}
                variant="body-base"
                component="p"
                className=""
              >
                <Link
                  href={route.baseUrl!}
                  className={`flex ${
                    currentTheme === "light"
                      ? `hover:text-[#000] ${
                          isActive(route.baseUrl!)
                            ? "text-black font-bold "
                            : "text-gray-600"
                        }`
                      : `hover:text-[#fff] ${
                          isActive(route.baseUrl!)
                            ? "text-white font-bold "
                            : "text-gray-300"
                        }`
                  }`}
                >
                  {t(route.titleKey)}
                </Link>
              </Typography>
            ))}
          </nav>

          <Container className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8">
            <button
              onClick={toggleLanguage}
              className={` flex items-center gap-2 px-1 py-0.5 rounded-lg shadow-sm transition ${
                currentTheme === "light"
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <span className="text-sm">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
              <span className="hidden sm:inline text-sm font-medium">
                {language === "fr" ? "EN" : "FR"}
              </span>
            </button>

            <LinkMediaSocial currentTheme={currentTheme} />
            <button
              onClick={toggleTheme}
              aria-label="theme"
              className={`${textColor} cursor-pointer transition-all duration-250 ease-linear`}
            >
              {currentTheme === "light" ? (
                <FaMoon size={20} className="hover:fill-[#464646]" />
              ) : (
                <FaSun size={20} className="hover:fill-[#ffffff]" />
              )}
            </button>
          </Container>
        </Container>
      </Container>
    </header>
  );
};
