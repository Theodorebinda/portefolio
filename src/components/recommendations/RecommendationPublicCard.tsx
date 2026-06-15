import Image from "next/image";
import { Star } from "lucide-react";

export interface PublicRecommendation {
  id: string;
  name: string | null;
  image: string | null;
  headline: string | null;
  message: string;
  rating: number | null;
  createdAt: string | Date;
}

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function RecommendationPublicCard({
  recommendation,
}: {
  recommendation: PublicRecommendation;
}) {
  const name = recommendation.name ?? "Visiteur LinkedIn";
  const image = recommendation.image;

  return (
    <article className="flex flex-col rounded-lg bg-[#2f2d2d] p-4 text-slate-300 ring-1 ring-white/5 shadow-lg">
      <div>
        <div className="mb-4 flex items-start gap-4">
          {image ? (
            <Image
              src={image}
              height={48}
              width={48}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b2d2fa] text-base font-bold text-black">
              {name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-white">
                  {name}
                </p>
                {recommendation.headline && (
                  <p className="text-xs leading-5 text-slate-400">
                    {recommendation.headline}
                  </p>
                )}
              </div>
              {recommendation.rating && (
                <div className="flex shrink-0 items-center gap-0.5 text-[#d09e72]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={
                        index < recommendation.rating! ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {formatDate(recommendation.createdAt)}
            </p>
          </div>
        </div>
        <p className="text-left text-sm leading-6">{recommendation.message}</p>
      </div>
    </article>
  );
}
