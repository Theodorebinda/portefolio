"use client";

import {
  Clock,
  FolderKanban,
  Loader2,
  MessageSquare,
  Star,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type RecommendationStatus = "PENDING" | "APPROVED" | "REJECTED";
type ActiveTab = "recommendations" | "visitors";

interface AdminRecommendation {
  id: string;
  userId: string;
  message: string;
  rating: number | null;
  headline: string | null;
  status: RecommendationStatus;
  createdAt: string;
  approvedAt: string | null;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface AdminVisitor {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  headline: string | null;
  createdAt: string;
  recommendationsCount: number;
}

const STATUS_LABELS: Record<RecommendationStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvee",
  REJECTED: "Rejetee",
};

const STATUS_STYLES: Record<RecommendationStatus, string> = {
  PENDING: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  APPROVED: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  REJECTED: "border-red-300/30 bg-red-300/10 text-red-200",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "V";
}

function Avatar({
  image,
  name,
  size = "md",
}: {
  image: string | null;
  name: string;
  size?: "md" | "lg";
}) {
  const dimension = size === "lg" ? 52 : 44;
  const className =
    size === "lg"
      ? "h-[52px] w-[52px] rounded-full object-cover"
      : "h-11 w-11 rounded-full object-cover";

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={dimension}
        height={dimension}
        className={className}
      />
    );
  }

  return (
    <div
      className={
        size === "lg"
          ? "flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#b2d2fa] font-bold text-black"
          : "flex h-11 w-11 items-center justify-center rounded-full bg-[#b2d2fa] font-bold text-black"
      }
    >
      {getInitial(name)}
    </div>
  );
}

function StatusBadge({ status }: { status: RecommendationStatus }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function RatingStars({ rating }: { rating: number | null }) {
  if (!rating) {
    return <span className="text-xs text-slate-500">Sans note</span>;
  }

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const active = index < rating;

        return (
          <Star
            key={index}
            size={14}
            className={active ? "text-amber-300" : "text-slate-600"}
            fill={active ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}

export function AdminRecommendations({
  initialRecommendations,
  initialVisitors,
}: {
  initialRecommendations: AdminRecommendation[];
  initialVisitors: AdminVisitor[];
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("recommendations");
  const [recommendations, setRecommendations] = useState(
    initialRecommendations,
  );
  const [visitors, setVisitors] = useState(initialVisitors);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      recommendations: recommendations.length,
      visitors: visitors.length,
      pending: recommendations.filter((item) => item.status === "PENDING")
        .length,
    }),
    [recommendations, visitors.length],
  );

  async function updateStatus(id: string, status: RecommendationStatus) {
    setLoadingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/recommendations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Changement de statut impossible.");
      }

      const payload = (await response.json()) as {
        status: RecommendationStatus;
        approvedAt: string | null;
      };

      setRecommendations((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: payload.status,
                approvedAt: payload.approvedAt,
              }
            : item,
        ),
      );
    } catch {
      setError("Impossible de mettre a jour cette recommandation.");
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteRecommendation(id: string) {
    const confirmed = window.confirm(
      "Supprimer cette recommandation definitivement ?",
    );

    if (!confirmed) return;

    setLoadingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/recommendations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Suppression impossible.");
      }

      const deletedItem = recommendations.find((item) => item.id === id);

      setRecommendations((current) => current.filter((item) => item.id !== id));

      if (deletedItem) {
        setVisitors((current) =>
          current.map((visitor) =>
            visitor.id === deletedItem.userId
              ? {
                  ...visitor,
                  recommendationsCount: Math.max(
                    visitor.recommendationsCount - 1,
                    0,
                  ),
                }
              : visitor,
          ),
        );
      }
    } catch {
      setError("Impossible de supprimer cette recommandation.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className=" p-2">
          <nav className="flex gap-4 overflow-x-auto lg:flex-col lg:overflow-visible">
            <button
              type="button"
              onClick={() => setActiveTab("recommendations")}
              className={`inline-flex h-11 min-w-max items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                activeTab === "recommendations"
                  ? "bg-[#b2d2fa] text-black"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MessageSquare size={17} />
              Recommandation
              <span className="rounded bg-black/10 px-1.5 text-xs">
                {counts.recommendations}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("visitors")}
              className={`inline-flex h-11 min-w-max items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                activeTab === "visitors"
                  ? "bg-[#b2d2fa] text-black"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Users size={17} />
              Visiteur
              <span className="rounded bg-black/10 px-1.5 text-xs">
                {counts.visitors}
              </span>
            </button>
            <button
              type="button"
              disabled
              className="inline-flex h-11 min-w-max cursor-not-allowed items-center gap-2 rounded-md px-3 text-sm font-semibold text-slate-500"
            >
              <FolderKanban size={17} />
              Projet
              <span className="rounded border border-white/10 px-1.5 text-[11px]">
                A faire plus tard
              </span>
            </button>
          </nav>
        </div>
      </aside>

      <section className="min-w-0">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b2d2fa]">Me</p>
            <h1 className="text-3xl font-bold">
              {activeTab === "recommendations"
                ? "Recommandations"
                : "Visiteurs"}
            </h1>
          </div>
          {activeTab === "recommendations" && (
            <div className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-sm text-slate-300">
              <Clock size={15} />
              {counts.pending} en attente
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {activeTab === "recommendations" ? (
          <RecommendationsView
            items={recommendations}
            loadingId={loadingId}
            onDelete={deleteRecommendation}
            onStatusChange={updateStatus}
          />
        ) : (
          <VisitorsView visitors={visitors} />
        )}
      </section>
    </div>
  );
}

function RecommendationsView({
  items,
  loadingId,
  onDelete,
  onStatusChange,
}: {
  items: AdminRecommendation[];
  loadingId: string | null;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: RecommendationStatus) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border border-white/10 bg-white/5 p-6 text-slate-300">
        Aucune recommandation.
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
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <Avatar image={item.user.image} name={name} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{name}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-1 break-all text-xs text-slate-400">
                    {item.user.email ?? "Email indisponible"}
                  </p>
                  {item.headline && (
                    <p className="mt-1 text-xs text-slate-400">
                      {item.headline}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{formatDate(item.createdAt)}</span>
                    <RatingStars rating={item.rating} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <label className="sr-only" htmlFor={`status-${item.id}`}>
                  Statut
                </label>
                <select
                  id={`status-${item.id}`}
                  value={item.status}
                  disabled={busy}
                  onChange={(event) =>
                    onStatusChange(
                      item.id,
                      event.target.value as RecommendationStatus,
                    )
                  }
                  className="h-9 rounded-md border border-white/10 bg-[#222020] px-3 text-sm font-semibold text-white outline-none transition focus:border-[#b2d2fa] disabled:opacity-60"
                >
                  <option value="PENDING">En attente</option>
                  <option value="APPROVED">Approuvee</option>
                  <option value="REJECTED">Rejetee</option>
                </select>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  disabled={busy}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-red-500 px-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                  Supprimer
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

function VisitorsView({ visitors }: { visitors: AdminVisitor[] }) {
  if (visitors.length === 0) {
    return (
      <div className="rounded-md border border-white/10 bg-white/5 p-6 text-slate-300">
        Aucun visiteur.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {visitors.map((visitor) => {
        const name = visitor.name ?? "Visiteur LinkedIn";

        return (
          <article
            key={visitor.id}
            className="flex flex-col gap-4 rounded-md border border-white/10 bg-white/5 p-4 text-slate-200 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar image={visitor.image} name={name} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold">{name}</p>
                <p className="mt-1 break-all text-xs text-slate-400">
                  {visitor.email ?? "Email indisponible"}
                </p>
                {visitor.headline && (
                  <p className="mt-1 text-xs text-slate-400">
                    {visitor.headline}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 md:justify-end">
              <span className="inline-flex h-8 items-center gap-1 rounded-md border border-white/10 px-2.5">
                <UserRound size={14} />
                {formatDate(visitor.createdAt)}
              </span>
              <span className="inline-flex h-8 items-center gap-1 rounded-md border border-white/10 px-2.5">
                <MessageSquare size={14} />
                {visitor.recommendationsCount} recommandation
                {visitor.recommendationsCount > 1 ? "s" : ""}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
