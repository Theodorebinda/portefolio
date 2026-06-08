"use client";

import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AdminRecommendation {
  id: string;
  message: string;
  rating: number | null;
  headline: string | null;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export function AdminRecommendations({
  initialItems,
}: {
  initialItems: AdminRecommendation[];
}) {
  const [items, setItems] = useState(initialItems);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function moderate(id: string, status: "APPROVED" | "REJECTED") {
    setLoadingId(id);

    try {
      const response = await fetch(`/api/admin/recommendations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Moderation impossible.");
      }

      setItems((current) => current.filter((item) => item.id !== id));
    } finally {
      setLoadingId(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-white/10 bg-white/5 p-6 text-slate-300">
        Aucune recommandation en attente.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => {
        const name = item.user.name ?? "Visiteur LinkedIn";
        const busy = loadingId === item.id;

        return (
          <article
            key={item.id}
            className="rounded-md border border-white/10 bg-white/5 p-4 text-slate-200"
          >
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-3">
                {item.user.image ? (
                  <Image
                    src={item.user.image}
                    alt={name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b2d2fa] font-bold text-black">
                    {name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-slate-400">{item.user.email}</p>
                  {item.headline && (
                    <p className="mt-1 text-xs text-slate-400">
                      {item.headline}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => moderate(item.id, "APPROVED")}
                  disabled={busy}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-500 px-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  Approuver
                </button>
                <button
                  onClick={() => moderate(item.id, "REJECTED")}
                  disabled={busy}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-red-500 px-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  <X size={15} />
                  Rejeter
                </button>
              </div>
            </div>
            <p className="text-sm leading-6">{item.message}</p>
          </article>
        );
      })}
    </div>
  );
}
