import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { AdminRecommendations } from "@/components/recommendations/AdminRecommendations";

export const metadata = {
  title: "Administration des recommandations",
};

export default async function AdminRecommendationsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const [recommendations, visitors] = await Promise.all([
    prisma.recommendation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        createdAt: true,
        _count: {
          select: {
            recommendations: true,
          },
        },
      },
    }),
  ]);

  return (
    <main className="min-h-screen">
      <AdminRecommendations
        initialRecommendations={recommendations.map((item) => ({
          id: item.id,
          userId: item.userId,
          message: item.message,
          rating: item.rating,
          headline: item.headline,
          status: item.status,
          createdAt: item.createdAt.toISOString(),
          approvedAt: item.approvedAt?.toISOString() ?? null,
          user: item.user,
        }))}
        initialVisitors={visitors.map((visitor) => ({
          id: visitor.id,
          name: visitor.name,
          email: visitor.email,
          image: visitor.image,
          headline: visitor.headline,
          createdAt: visitor.createdAt.toISOString(),
          recommendationsCount: visitor._count.recommendations,
        }))}
      />
    </main>
  );
}
