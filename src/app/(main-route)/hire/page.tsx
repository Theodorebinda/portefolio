import { HirePageContent } from "@/components/hire/HirePageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embauchez-moi",
  description:
    "Travaillez avec Theodore Samba sur vos applications web, mobile, interfaces produit et automatisations.",
  alternates: {
    canonical: "/hire",
  },
};

export default function HirePage() {
  return <HirePageContent />;
}
