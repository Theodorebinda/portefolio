"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { Linkedin, Mail, Pen } from "lucide-react";
import Link from "next/link";

const serviceKeys = ["consultant", "contract", "workshops", "advisory"];

export function HirePageContent() {
  const { t } = useTranslation();

  return (
    <main className="relative z-0 isolate flex w-full flex-col gap-12  text-neutral-800 dark:text-slate-200">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
        <div className="max-w-3xl flex flex-col gap-6 lg:gap-12">
          <div >
              <h1 className="text-3xl font-bold leading-tight text-neutral-800 dark:text-slate-200">
            {t("hirePage.title")}
          </h1>
          <p className="mt-5 max-w-2xl whitespace-pre-line text-base leading-8 text-neutral-800 font-medium dark:text-slate-300 md:text-xl">
            {t("hirePage.subtitle")}
          </p>
          </div>
      
        
          <div className=" flex flex-col gap-3">
            <Link
              href="contact"
              className="inline-flex underline w-fit items-center gap-3  font-semibold text-neutral-800 transition hover:text-[#436896] dark:text-slate-100 dark:hover:text-[#b2d2fa]"
            >
              <Pen size={20} color="#436896" />
             Laissez-moi un message
            </Link>
            <Link
              href="mailto:theodorebinda@gmail.com"
              className="inline-flex underline w-fit items-center gap-3  font-semibold text-neutral-800 transition hover:text-[#436896] dark:text-slate-200 dark:hover:text-[#b2d2fa]"
            >
              <Mail size={20} color="#436896" />
              theodorebinda@gmail.com
            </Link>
            <Link
              href="https://www.linkedin.com/in/theodore-samba-26b456282/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex underline w-fit items-center gap-3  font-semibold text-neutral-800 transition hover:text-[#436896] dark:text-slate-200 dark:hover:text-[#b2d2fa]"
            >
              <Linkedin size={20} color="#436896" />
              linkedin.com/in/theodore-samba
            </Link>
          </div>
        </div>
      </section>

 

      <section className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {serviceKeys.map((key) => (
            <div
              key={key}
              className="rounded-md border border-neutral-200 p-4 dark:border-white/10"
            >
              <h2 className="text-base font-bold text-[#436896] dark:text-[#b2d2fa]">
                {t(`hirePage.services.${key}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-slate-300">
                {t(`hirePage.services.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
