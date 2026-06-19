"use client";

import {
  Check,
  ChevronDown,
  Globe2,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  type Language,
  useLanguage,
} from "@/contexts/language/LanguageContext";
import { cn } from "@/lib/utils";

const languageOptions: Array<{
  value: Language;
  flag: string;
  short: string;
  label: string;
  description: string;
}> = [
  {
    value: "fr",
    flag: "🇫🇷",
    short: "FR",
    label: "Francais",
    description: "Version francaise",
  },
  {
    value: "en",
    flag: "🇬🇧",
    short: "EN",
    label: "English",
    description: "English version",
  },
];

type HeaderControlProps = {
  currentTheme?: string | null;
  className?: string;
};

type LanguagePopoverProps = HeaderControlProps & {
  align?: "start" | "end";
};

export function LanguagePopover({
  currentTheme,
  className,
  align = "end",
}: LanguagePopoverProps) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isLight = currentTheme === "light";
  const activeLanguage = languageOptions.find(
    (option) => option.value === language
  )!;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={popoverRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Changer la langue"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "group inline-flex h-10 items-center gap-2  px-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
          isLight
            ? "  text-neutral-900  hover:text-[#436896]"
            : "  text-white  hover:text-[#b2d2fa]"
        )}
      >
        {/* <Globe2 size={15} className="transition group-hover:rotate-12" /> */}
        <span aria-hidden="true">{activeLanguage.flag}</span>
        <span>{activeLanguage.short}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute top-[calc(100%+0.5rem)] z-[60] w-36 rounded-md  p-1",
            align === "end" ? "right-0" : "left-0",
            isLight
              ? "border-neutral-200 bg-white text-neutral-900"
              : "border-white/10 bg-[#1c1917] text-white"
          )}
        >
          {languageOptions.map((option) => {
            const active = option.value === language;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setLanguage(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition",
                  active
                    ? isLight
                      ? "bg-[#436896] text-white"
                      : "bg-[#b2d2fa] text-black"
                    : isLight
                    ? "hover:bg-neutral-100"
                    : "hover:bg-white/10"
                )}
              >
                <span
                  className={cn(
                    "flex  items-center justify-center rounded-full text-base",
                    active
                      ? "bg-white/20"
                      : isLight
                      ? "bg-neutral-100 text-neutral-700"
                      : "bg-white/10 text-slate-200"
                  )}
                  aria-hidden="true"
                >
                  {option.flag}
                </span>
                  <span className="text-sm font-semibold">{option.label}</span>
                <Check
                  size={15}
                  className={cn(
                    "transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type ThemeToggleProps = HeaderControlProps & {
  toggleTheme?: () => void;
};

export function ThemeToggle({
  currentTheme,
  toggleTheme,
  className,
}: ThemeToggleProps) {
  const isLight = currentTheme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!toggleTheme}
      aria-label={isLight ? "Activer le theme sombre" : "Activer le theme clair"}
      className={cn(
        "group relative inline-flex h-9 w-[4.25rem] items-center rounded-full border p-1 shadow-sm transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
        isLight
          ? "border-neutral-200 bg-neutral-100 text-neutral-700 hover:border-[#436896]"
          : "border-white/10 bg-white/5 text-slate-200 hover:border-[#b2d2fa]",
        className
      )}
    >
      <span className="flex w-full items-center justify-between px-1.5">
        <Sun size={14} className={cn(isLight ? "opacity-70" : "opacity-35")} />
        <Moon size={14} className={cn(isLight ? "opacity-35" : "opacity-70")} />
      </span>
      <span
        className={cn(
          "absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300",
          isLight
            ? "translate-x-0 bg-[#436896] text-white"
            : "translate-x-8 bg-[#b2d2fa] text-black"
        )}
      >
        {isLight ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
}
