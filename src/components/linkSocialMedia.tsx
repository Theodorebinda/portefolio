import { Container } from "@/ui/components/container/container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

type LinkMediaSocialProps = {
  currentTheme?: string | null;
  className?: string;
};

export default function LinkMediaSocial({
  currentTheme,
  className,
}: LinkMediaSocialProps) {
  const iconClassName =
    currentTheme === "light"
      ? "transition hover:fill-[#464646]"
      : "fill-[#b2d2fa] transition hover:fill-white";

  return (
    <Container
      className={cn("flex items-center justify-between gap-10", className)}
    >
      <Link
        href={"https://github.com/Theodorebinda"}
        target="_blank"
        rel="noreferrer"
        aria-label={"GitHub"}
      >
        <FaGithub size={20} className={iconClassName} />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/theodore-samba-26b456282/"}
        target="_blank"
        rel="noreferrer"
        aria-label={"LinkedIn"}
      >
        <IoLogoLinkedin size={20} className={iconClassName} />
      </Link>
    </Container>
  );
}
