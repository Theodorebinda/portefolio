import { StaticImageData } from "next/image";

export interface AppLinks {
  titleKey: string;
  baseUrl?: string;
  Icon?: React.ElementType;
  CustomIcon?: StaticImageData;
  action?: Function;
  children?: {
    title?: string;
    baseUrl?: string;
    Icon?: React.ElementType | React.ComponentType;
    action?: Function;
    description?: string;
    color?: string;
    background?: string;
  }[];
}
