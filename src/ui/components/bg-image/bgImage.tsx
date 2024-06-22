import Image, { StaticImageData } from "next/image"
import { Container } from "../container/container"
import clsx from "clsx"

interface Props {
  children?: React.ReactNode
  className?: string
  src: StaticImageData | string
  alt: string
  classNameImg?: string
}

export const BgImg = ({
  children, 
  src,
  alt,
  className, 
  classNameImg
}: Props) => {
  return (
    <Container 
      className={
        clsx(
          className
        )
      }
    >
      <Container 
        className={clsx(
          "w-full h-full overflow-auto relative",
          classNameImg
        )}
      >
        <Image
          src={src} 
          alt={alt}
          fill={true}
          className="object-cover object-center z-[-1]"
          sizes="100%"
          priority
        />
        {children}
      </Container>
    </Container>
  )
}