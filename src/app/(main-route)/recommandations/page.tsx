import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  RecommendationPublicCard,
  type PublicRecommendation,
} from "@/components/recommendations/RecommendationPublicCard";
import { Container } from "@/ui/components/container/container";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const PAGE_SIZE = 6;

function normalizePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw ?? "1");

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export const metadata = {
  title: "Recommandations",
  description: "Recommandations publiques recues par Theodore Samba.",
};

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: { page?: string | string[] };
}) {
  const page = normalizePage(searchParams.page);
  const skip = (page - 1) * PAGE_SIZE;

  const [recommendations, total] = await Promise.all([
    prisma.recommendation.findMany({
      where: {
        status: "APPROVED",
        publicConsent: true,
        storageConsent: true,
      },
      orderBy: { approvedAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        user: {
          select: {
            name: true,
            image: true,
            headline: true,
          },
        },
      },
    }),
    prisma.recommendation.count({
      where: {
        status: "APPROVED",
        publicConsent: true,
        storageConsent: true,
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const items: PublicRecommendation[] = recommendations.map((item) => ({
    id: item.id,
    name: item.user.name,
    image: item.user.image,
    headline: item.headline ?? item.user.headline,
    message: item.message,
    rating: item.rating,
    createdAt: item.createdAt,
  }));

  return (
    <Container className="mt-28 flex flex-col gap-8 px-4 md:px-0">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold md:text-5xl">Recommandations</h1>
        <p className="max-w-2xl text-base leading-7 text-slate-400">
          Les retours publics des personnes qui ont collabore avec Theodore.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((recommendation) => (
            <RecommendationPublicCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      ) : (
        <Empty className="border-0 max-w-md mx-auto bg-current">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquareText />
            </EmptyMedia>
            <EmptyTitle>Aucune recommandation approuvee</EmptyTitle>
            <EmptyDescription>
              Les recommandations visibles publiquement apparaitront ici apres
              moderation.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-3">
          <Link
            href={`/recommandations?page=${Math.max(1, page - 1)}`}
            className={`inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-3 text-sm ${
              page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-white/10"
            }`}
          >
            <ChevronLeft size={16} />
            Precedent
          </Link>
          <span className="text-sm text-slate-400">
            Page {page} / {totalPages}
          </span>
          <Link
            href={`/recommandations?page=${Math.min(totalPages, page + 1)}`}
            className={`inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-3 text-sm ${
              page >= totalPages
                ? "pointer-events-none opacity-40"
                : "hover:bg-white/10"
            }`}
          >
            Suivant
            <ChevronRight size={16} />
          </Link>
        </nav>
      )}
    </Container>
  );
}
