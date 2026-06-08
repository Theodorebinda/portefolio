// components/reviewSection.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useSession } from "next-auth/react";
import {
  RecommendationPublicCard,
  type PublicRecommendation,
} from "@/components/recommendations/RecommendationPublicCard";
import { RecommendationModal } from "@/components/recommendations/RecommendationModal";
import { RecommendationSkeletonGrid } from "@/components/recommendations/RecommendationSkeleton";
import { LoginButton } from "@/components/auth/LoginButton";

interface RecommendationsResponse {
  items: PublicRecommendation[];
}

const ReviewsPage = () => {
  const { t } = useTranslation();
  const { data: session, status, update } = useSession();
  const [recommendations, setRecommendations] = useState<PublicRecommendation[]>(
    []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const reviews = [
    {
      photo: "https://avatars.githubusercontent.com/u/141269644?s=100&v=4",
      name: "Sacre Mbiku",
      role: "Developer|| Designer UI/UX",
      review: t("reviews.review1"),
      origin: "LinkedIn",
    },
    {
      photo:
        "https://media.licdn.com/dms/image/v2/D4D03AQGV-0WKhuKIcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729609426768?e=1756944000&v=beta&t=Rtd8ejHkmv1rgVxsjoi5aQ1edPz1znZNQX4p5zXDtIg",
      name: "Gaël Makelele",
      role: "Chercheur & Entrepreneur",
      review: t("reviews.review2"),
      origin: "LinkedIn",
    },
    {
      photo:
        "https://media.licdn.com/dms/image/v2/D4E03AQG6fASoGiVFWA/profile-displayphoto-shrink_400_400/B4EZXj8wU.GwAg-/0/1743286115742?e=1756944000&v=beta&t=7CyURoyqSCAAH4D8yaHhlhp3ieBBXCbnQdeQRsSaRfg",
      name: "Felicien Fercus",
      role: "Développement commercial et des projets",
      review: t("reviews.review3"),
      origin: "LinkedIn",
    },
    {
      photo:
        "https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/460728981_1974582133009823_2311644627155562444_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEsO59Je_Tz-ou_d3kMNXLE-i8Qv8DvQ2D6LxC_wO9DYK09C1nJuAaJzDhOWb9Jnr1fPO8LROy-bG4kSC1jW4zx&_nc_ohc=Bk1D3B7JvpYQ7kNvwEmJs_2&_nc_oc=AdlpUBPs7CfjFIY0EwvcBZpE66jGECwAZ8fmfm97LRh5KXzMhApdLLnKHDhS4dJuJSk&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&_nc_gid=O-qEag8kKFXMaiogDnn-Cg&oh=00_AfNH8XDdvNCHULwKAZ_zXBwJerzK-gBvMkeUCd16fJOQYw&oe=686793B6",
      name: "Tresor Moziko",
      role: "Ingenieur Batiment Travaux Public",
      review: t("reviews.review4"),
      origin: "Facebook",
    },
  ];

  const loadRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recommendations?page=1");

      if (!response.ok) return;

      const payload = (await response.json()) as RecommendationsResponse;
      setRecommendations(payload.items ?? []);
    } catch {
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecommendations();
  }, [loadRecommendations]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("recommendation") !== "1") return;

    setModalOpen(true);
    url.searchParams.delete("recommendation");
    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, [status]);

  const handleRecommend = useCallback(() => {
    if (status === "authenticated") {
      setModalOpen(true);
    }
  }, [status]);

  const handleLinkedInSuccess = useCallback(async () => {
    await update();
    setModalOpen(true);
  }, [update]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#b2d2fa]">
            {t("recommendations.section_label")}
          </p>
          <h2 className="text-2xl font-bold">
            {t("recommendations.section_title")}
          </h2>
        </div>
        {status === "authenticated" ? (
          <button
            type="button"
            onClick={handleRecommend}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#b2d2fa] px-4 text-sm font-semibold text-black transition hover:bg-[#5182be] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("recommendations.cta")}
          </button>
        ) : (
          <LoginButton
            label={t("recommendations.cta")}
            disabled={status === "loading"}
            onSuccess={handleLinkedInSuccess}
          />
        )}
      </div>

      {loading ? (
        <RecommendationSkeletonGrid />
      ) : recommendations.length > 0 ? (
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {recommendations.map((recommendation) => (
            <RecommendationPublicCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      ) : (
        <div className="grid items-start gap-8 md:grid-cols-2">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <a
          href="/recommandations"
          className="text-sm font-semibold text-[#b2d2fa] underline-offset-4 hover:text-[#5182be] hover:underline"
        >
          {t("recommendations.view_all")}
        </a>
      )}

      {session?.user && (
        <RecommendationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          user={session.user}
          onSubmitted={loadRecommendations}
        />
      )}
    </section>
  );
};

export default ReviewsPage;
