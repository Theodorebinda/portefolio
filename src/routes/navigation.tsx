'use client'
import { Typography } from "@/ui/components/typography/typography"
import styled from 'styled-components';
import Link from "next/link"
import { ActiveLink } from "./activeLink"
import { MainRoutes } from "@/lib/pageRoutes/pageRoutes"
import { Container } from "@/ui/components/container/container"
import clsx from "clsx"
import { FaMoon } from "react-icons/fa6";
import { FaGithub, FaSun } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";



 const ThemeToggleButton = styled.button`
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size:40
  transition: all 0.25s linear;
`;

interface Props {
  className?: string
  toggleTheme?: () => void; 
  currentTheme?: string;
}

export const Navigation = ({ toggleTheme, currentTheme, className }: Props) => {

  const isActive = ()=>{
    if(toggleTheme){
      return 
    }
  }
  
  return(
    <header 
      className={
        clsx(
          //  'text-primary-Default',
          "fixed top-0 left-0 right-0 min-w-full   ",
          className
        )
      }
    >
      <Container className= {`${currentTheme === 'light' ? "bg-white": "bg-[#222020]" } flex flex-row items-center w-ful justify-between  px-20 pt-8 h-[7rem]`}>
        <Link href="/" className="flex justify-between items-center">
          <div className="bg-[#459999ee] w-6 rounded-full h-6"></div>
          {
            currentTheme === 'light'?
            <Typography component="p" className="px-3  text-xl font-normal hover:text-[#000]" >T.Samba</Typography>
            :
            <Typography component="p" className="px-3 ] text-xl font-normal hover:text-white" >T.Samba</Typography>
          }
          
        </Link>
        <nav className="flex items-center justify-between gap-10">
          {
            MainRoutes.map(route => 
              <Typography key={route.title} variant="body-base" component="p" className="">
                 {
                  currentTheme=== 'light' ?
                  <ActiveLink href={route.baseUrl!} className="flex hover:text-[#000] focus:text-black ">
                    {route.title}
                  </ActiveLink>
                  :  
                  <ActiveLink href={route.baseUrl!} className="flex hover:text-[#fff]  focus:text-white">
                    {route.title}
                  </ActiveLink>
                }

              </Typography>  
            )
          }
        </nav>
        <Container className="flex justify-between items-center gap-10">
          <Container className="flex items-center justify-end gap-10 px-4 animate">
            <Link href={"https://github.com/Theodorebinda"} target="_black" aria-label={'github'}> 
                {currentTheme === 'light' ? <FaGithub size={20} className=" hover:fill-[#464646]"/> : <FaGithub size={20} className=" hover:fill-[#ffffff]" />}
            </Link>
            <Link href={"https://www.linkedin.com/in/theodore-samba-26b456282/"} target="_black" aria-label={"LinkedIn"}> 
                {currentTheme === 'light' ? <IoLogoLinkedin size={20} className=" hover:fill-[#464646]"/> : <IoLogoLinkedin size={20} className=" hover:fill-[#ffffff]" />}
            </Link>
            <Link href={"#"} target="_black" aria-label={"X"}> 
                {currentTheme === 'light' ? <FaXTwitter size={20} className=" hover:fill-[#464646]"/> : <FaXTwitter size={20} className=" hover:fill-[#ffffff]" />}
            </Link>
          </Container>
          <ThemeToggleButton onClick={toggleTheme} aria-label={"theme"}>
              {currentTheme === 'light' ? <FaMoon size={20} className=" hover:fill-[#464646]"/> : <FaSun size={20} className=" hover:fill-[#ffffff]" />}
          </ThemeToggleButton>
        </Container>
      </Container>
    </header>
  )
}