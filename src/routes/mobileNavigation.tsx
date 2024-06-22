import { Typography } from "@/ui/components/typography/typography"
import next from '../../public/next.svg'
import styled from 'styled-components';
import Link from "next/link"
import { ActiveLink } from "./activeLink"
import clsx from 'clsx'
import Image from "next/image"
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes"
import { Container } from '@/ui/components/container/container'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";



export const ThemeToggleButton = styled.button`
  color: ${(props) => props.theme.text};
  cursor: pointer;
  transition: all 0.25s linear;
`;


interface Props {
  className?: string
  toggleTheme?: () => void; 
  currentTheme?: string;
}

export const MobileNavigation =  ({ toggleTheme, currentTheme, className }: Props) => {
  return(
    <header
      className={
        clsx(
          "z-40 fixed top-0 left-0 right-0 border-b-[1px]  ",
          className
        )
      }
    >
      <Container className="flex flex-row items-center justify-between px-4 py-2 gap-4 h-[8vh]">
        <Container className="flex justify-start items-center gap-4 ">
          <Link href="/">
            <Image src={next} alt='Logo MonYaya' priority width={100} height={100}/>
          </Link>
          <ThemeToggleButton onClick={toggleTheme}>
              {currentTheme === 'light' ? <FaMoon size={32} className="text-[#7e7a7a] hover:fill-[#464646]"/> : <FaSun size={32} className="text-[#b2b2b2] hover:fill-[#ffffff]" />}
          </ThemeToggleButton>
        </Container>
        
          
        <Sheet>
          <SheetTrigger>
            <Menu/>
          </SheetTrigger>
          <SheetContent className="w-[90vw] bg-[#f7f2f2]">
            <SheetDescription className="h-full">
              <nav className=" flex flex-col justify-between items-center">
                <Container className='w-full flex flex-col'>
                {
                  MainRoutes.map(route => 
                    <Typography key={route.title!}variant="body-base" component="p" className="text-white pt-10 my-auto ">
                      <ActiveLink href={route.baseUrl!}>
                        {route.title}
                      </ActiveLink>
                    </Typography>  
                  )
                }
                </Container>
              </nav>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}