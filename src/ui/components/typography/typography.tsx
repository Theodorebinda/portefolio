import { clsx } from "clsx"

interface Props {children: React.ReactNode
  className?: string
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'
  variant?: 
    'display'     |
    'display-md'  |
    'title-lg'    | 
    'title-base'  | 
    'title-sm'    | 
    'title-xs'    | 
    'body-lg'     | 
    'body-base'   | 
    'body-sm'     
}


export const Typography = ({
  variant = 'body-base',
  children, 
  className,
  component : Component  = 'p'
}: Props) => {
  
  let variantStyles: string = ''
  
  switch (variant) {
    case "display":
      variantStyles = 'text-title md:text-display'
      break;
      case "display-md":
      variantStyles = 'text-title-lg md:text-display'
      break;
    case "title-lg":
      variantStyles = 'text-title-lg'
      break;
    case "title-base":
      variantStyles = 'text-title-base'
      break;
    case "title-sm":
      variantStyles = 'text-title-sm'
      break;
    case "title-xs":
      variantStyles = 'text-title-xs'
      break;
    case "body-lg":
      variantStyles = 'text-body-base md:text-body-lg'
      break;
    case "body-base": // Default
      variantStyles = 'text-body-base'
      break;
    case "body-sm":
      variantStyles = 'text-body-sm'
      break;
  }

  return (
    <Component 
      className={
        clsx(
          variantStyles,
          className
        )
      }
    >
      {children}
    </Component>
  )
}