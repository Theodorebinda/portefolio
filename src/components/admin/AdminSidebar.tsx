"use client";

import { cn } from "@/lib/utils";
import { FileText, FolderKanban, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  {
    label: "Recommandations",
    href: "/admin/recommandations",
    icon: MessageSquare,
    match: "/admin/recommandations",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    match: "/admin/blog",
  },
];

export function AdminSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav
        aria-label="Navigation admin"
        className="flex gap-3 overflow-x-auto  p-2  lg:flex-col lg:overflow-visible"
      >
        {adminLinks.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.match);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-11 min-w-max items-center gap-2 rounded-md px-3 text-sm font-semibold transition",
                active
                  ? "bg-[#436896] text-white dark:bg-[#b2d2fa] dark:text-black"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
              )}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          disabled
          className="inline-flex h-11 min-w-max cursor-not-allowed items-center gap-2 rounded-md px-3 text-sm font-semibold text-neutral-400 dark:text-slate-500"
        >
          <FolderKanban size={17} />
          Projet
          <span className="rounded border border-neutral-200 px-1.5 text-[11px] dark:border-white/10">
            A faire plus tard
          </span>
        </button>
      </nav>
    </aside>
  );
}
