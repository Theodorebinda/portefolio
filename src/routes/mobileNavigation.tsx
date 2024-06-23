import { Typography } from "@/ui/components/typography/typography"
import logo from '../../public/png-transparent-typescript-language-javascript-static-type-typescript-logo-frontend-3d-icon-thumbnail-removebg-preview.png'
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
          "fixed top-0 left-0 right-0 min-w-full ",
          className
        )
      }
    >
      <Container className= {`${currentTheme === 'light' ? "bg-white": "bg-[#222020]"}  flex flex-row items-center w-ful justify-between px-4 py-8 h-[10vh]`}>
        <Container className="flex justify-start items-center ">
          <Link href="/" className="flex justify-start items-center">
            <Image src={logo} alt='Logo MonYaya' priority width={35} height={35}/>
            {
            currentTheme === 'light'?
            <Typography component="p" className="px-3 text-[#7e7a7a] text-xl font-normal hover:text-[#464646]" >TBSamba</Typography>
            :
            <Typography component="p" className="px-3 text-[#7e7a7a] text-xl font-normal hover:text-white" >TBSamba</Typography>
           }
          </Link>
          <ThemeToggleButton onClick={toggleTheme}>
              {currentTheme === 'light' ? <FaMoon size={28} className="text-[#7e7a7a] hover:fill-[#464646]"/> : <FaSun size={28} className="text-[#b2b2b2] hover:fill-[#ffffff]" />}
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