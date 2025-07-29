"use client";
import { Typography } from "@/ui/components/typography/typography";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importez usePathname
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes";
import { Container } from "@/ui/components/container/container";
import clsx from "clsx";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import LinkMediaSocial from "@/components/linkSocialMedia";
import { useEffect, useState } from "react";

const ThemeToggleButton = styled.button`
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 40;
  transition: all 0.25s linear;
`;

interface Props {
  className?: string;
  toggleTheme?: () => void;
  currentTheme?: string;
}

export const Navigation = ({ toggleTheme, currentTheme, className }: Props) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={clsx(
        "fixed top-0 left-0 right-0 max-w-full md:mx-48 ",
        className,
        { "shadow-md": isScrolled }
      )}
    >
      <Container
        className={`${
          currentTheme === "light"
            ? "bg-white px-10"
            : "bg-[#1c1917] px-10 max-w-screen-xl"
        }`}
      >
        <Container
          className={`mx-4 flex flex-row md:mx-auto py-8 max-w-screen-xl ${
            isScrolled ? "items-center" : "items-end"
          } max-w-full justify-between h-[7rem]`}
        >
          <Link href="/" className="flex justify-between items-center">
            <div className="bg-[#b2d2fa] hover:bg-[#5182be] w-6 rounded-full h-6"></div>
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
                key={route.title}
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
                            : "text-gray-400"
                        }`
                  }`}
                >
                  {route.title}
                </Link>
              </Typography>
            ))}
          </nav>

          <Container className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10">
            <LinkMediaSocial currentTheme={currentTheme} />
            <ThemeToggleButton onClick={toggleTheme} aria-label="theme">
              {currentTheme === "light" ? (
                <FaMoon size={20} className="hover:fill-[#464646]" />
              ) : (
                <FaSun size={20} className="hover:fill-[#ffffff]" />
              )}
            </ThemeToggleButton>
          </Container>
        </Container>
      </Container>
    </header>
  );
};
