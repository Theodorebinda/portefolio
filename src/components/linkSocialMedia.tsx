import { Container } from "@/ui/components/container/container";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

export default function LinkMediaSocial({
  currentTheme = "string",
  className = "string",
}) {
  return (
    <Container
      className={`${className} flex items-center justify-between gap-10  animate`}
    >
      <Link
        href={"https://github.com/Theodorebinda"}
        target="_black"
        aria-label={"github"}
      >
        {currentTheme === "light" ? (
          <FaGithub size={20} className=" hover:fill-[#464646]" />
        ) : (
          <FaGithub size={20} className=" hover:fill-[#ffffff]" />
        )}
      </Link>
      <Link
        href={"https://www.linkedin.com/in/theodore-samba-26b456282/"}
        target="_black"
        aria-label={"LinkedIn"}
      >
        {currentTheme === "light" ? (
          <IoLogoLinkedin size={20} className=" hover:fill-[#464646]" />
        ) : (
          <IoLogoLinkedin size={20} className=" hover:fill-[#ffffff]" />
        )}
      </Link>
      <Link href={"#"} target="_black" aria-label={"X"}>
        {currentTheme === "light" ? (
          <FaXTwitter size={20} className=" hover:fill-[#464646]" />
        ) : (
          <FaXTwitter size={20} className=" hover:fill-[#ffffff]" />
        )}
      </Link>
    </Container>
  );
}
