// components/reviewSection.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useSession } from "next-auth/react";
import {
  RecommendationPublicCard,
  type PublicRecommendation,
} from "@/components/recommendations/RecommendationPublicCard";
import { RecommendationModal } from "@/components/recommendations/RecommendationModal";
import { RecommendationSkeletonGrid } from "@/components/recommendations/RecommendationSkeleton";
import { LoginButton } from "@/components/auth/LoginButton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessageSquareText } from "lucide-react";

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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquareText />
            </EmptyMedia>
            <EmptyTitle>Aucune recommandation pour le moment</EmptyTitle>
            <EmptyDescription>
              Les recommandations approuvees apparaitront ici. Vous pouvez etre
              le premier a laisser un mot sur Theodore.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={handleRecommend}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#b2d2fa] px-4 text-sm font-semibold text-black transition hover:bg-[#5182be]"
              >
                Ajouter une recommandation
              </button>
            ) : (
              <LoginButton
                label="Ajouter une recommandation"
                disabled={status === "loading"}
                onSuccess={handleLinkedInSuccess}
              />
            )}
          </EmptyContent>
        </Empty>
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
