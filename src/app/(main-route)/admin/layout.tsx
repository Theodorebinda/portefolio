import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-20 min-h-screen py-2 text-neutral-950 dark:text-white">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
