"use client";
import { Typography } from "@/ui/components/typography/typography";
import Link from "next/link";
import clsx from "clsx";
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes";
import { Container } from "@/ui/components/container/container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu2Line } from "react-icons/ri";
import LinkMediaSocial from "@/components/linkSocialMedia";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import Image from "next/image";
import { LanguagePopover, ThemeToggle } from "@/components/HeaderControls";

interface Props {
  className?: string;
  toggleTheme?: () => void;
  currentTheme?: string;
}

export const MobileNavigation = ({
  toggleTheme,
  currentTheme,
  className,
}: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour fermer le Sheet après un clic
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={clsx("fixed top-0 left-0 right-0 min-w-full z-50", className, {
        "shadow-md": isScrolled,
      })}
    >
      <Container
        className={`${
          currentTheme === "light" ? "bg-white" : "bg-[#1c1917]"
        } flex flex-row items-center w-full justify-between px-4 py-8 h-[10vh]`}
      >
        <Container className="flex justify-start items-center gap-3">
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

          <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
          <LanguagePopover currentTheme={currentTheme} align="start" />
        </Container>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            {/* Correction pour l'erreur de ref */}
            <button className="p-2">
              <RiMenu2Line size={32} aria-label={"menu"} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className={`${
              currentTheme === "light" ? "bg-white" : "bg-[#222020]"
            } w-full h-[85vh] rounded-t-2xl`}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="h-full flex justify-between flex-col">
              <nav className="h-full flex flex-col justify-between items-center">
                <Container className="w-full flex flex-col">
                  {MainRoutes.map((route, index) => (
                    <div
                      key={route.titleKey!}
                      className="pt-10 my-auto opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <Link
                        href={route.baseUrl!}
                        onClick={handleLinkClick}
                        className="block py-2 text-base font-normal"
                      >
                        {t(route.titleKey)}
                      </Link>
                    </div>
                  ))}
                </Container>
                <Container className="flex flex-col justify-start w-full gap-2 mb-8">
                  <span className="font-semibold">
                    <Link href={"/contact"} onClick={handleLinkClick}>
                      contact
                    </Link>
                  </span>
                  <span>
                    email :
                    <a
                      href="mailto:theodorebinda@gmail.com"
                      onClick={handleLinkClick}
                      className="ml-1"
                    >
                      theodorebinda@gmail.com
                    </a>
                  </span>
                  <span>
                    phone :
                    <a
                      href="tel:+243894594411"
                      onClick={handleLinkClick}
                      className="ml-1"
                    >
                      +243 89 459 4411
                    </a>
                  </span>
                </Container>
              </nav>
              <LinkMediaSocial
                className="gap-28 justify-start"
                currentTheme={currentTheme}
              />
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
