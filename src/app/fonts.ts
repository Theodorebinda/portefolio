import localFont from "next/font/local";

export const graphik = localFont({
  src: [
    {
      path: "../assets/fonts/GraphikRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/GraphikSemibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/GraphikBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/GraphikBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-graphik",
  display: "swap",
});

export const acumin = localFont({
  src: [
    {
      path: "../assets/fonts/AcuminVariableConcept.otf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-acumin",
  display: "swap",
});
