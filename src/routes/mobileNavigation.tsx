"use client";
import { Typography } from "@/ui/components/typography/typography";
import styled from "styled-components";
import Link from "next/link";
import { ActiveLink } from "./activeLink";
import clsx from "clsx";
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes";
import { Container } from "@/ui/components/container/container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import LinkMediaSocial from "@/components/linkSocialMedia";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import pour les animations

export const ThemeToggleButton = styled.button`
  color: ${(props) => props.theme.text};
  cursor: pointer;
  transition: all 0.25s linear;
`;

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx("fixed top-0 left-0 right-0 min-w-full ", className, {
        "shadow-md": isScrolled,
      })}
    >
      <Container
        className={`${
          currentTheme === "light" ? "bg-white" : "bg-[#1c1917]"
        }  flex flex-row items-center w-full justify-between px-4 py-8 h-[10vh]`}
      >
        <Container className="flex justify-start items-center gap-3">
          <Link
            href="/"
            className="flex justify-start items-center"
            aria-label={"logo"}
          >
            <div className="bg-[#b2d2fa] hover:bg-[#5182be] w-6 rounded-full h-6"></div>
            {currentTheme === "light" ? (
              <Typography
                component="p"
                className="px-1 text-xl font-normal hover:text-[#464646]"
              >
                T.Samba
              </Typography>
            ) : (
              <Typography
                component="p"
                className="px-1 text-xl font-normal hover:text-white"
              >
                T.Samba
              </Typography>
            )}
          </Link>
          <ThemeToggleButton onClick={toggleTheme} aria-label={"theme"}>
            {currentTheme === "light" ? (
              <FaMoon size={20} className=" hover:fill-[#464646]" />
            ) : (
              <FaSun size={20} className=" hover:fill-[#ffffff]" />
            )}
          </ThemeToggleButton>
        </Container>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <RiMenu2Line size={32} aria-label={"menu"} />
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className={`${
              currentTheme === "light" ? "bg-white" : "bg-[#222020]"
            } w-full h-[85vh] rounded-t-2xl`}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="h-full"
            >
              <SheetDescription className="h-full flex justify-between flex-col">
                <nav className=" flex flex-col justify-between items-center">
                  <Container className="w-full flex flex-col">
                    {MainRoutes.map((route) => (
                      <motion.div // Animation pour chaque élément
                        key={route.title!}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="pt-10 my-auto"
                      >
                        <Typography variant="body-base" component="p">
                          <Link
                            href={route.baseUrl!}
                            onClick={() => setOpen(false)}
                            className="block py-2"
                          >
                            {route.title}
                          </Link>
                        </Typography>
                      </motion.div>
                    ))}
                  </Container>
                </nav>
                <Container className="flex flex-col justify-start gap-2">
                  <Typography className="font-semibold" variant="body-base">
                    <Link href={"/contact"} onClick={() => setOpen(false)}>
                      Contact
                    </Link>
                  </Typography>
                  <span>
                    Email :
                    <a href="mailto:theodorebinda@gmail.com">
                      {" "}
                      theodorebinda@gmail.com
                    </a>
                  </span>
                  <span>
                    Tel :<a href="tel:+243894594411"> +243 89 459 4411</a>
                  </span>
                </Container>

                <LinkMediaSocial
                  className="gap-28 justify-start"
                  currentTheme={currentTheme}
                />
              </SheetDescription>
            </motion.div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
