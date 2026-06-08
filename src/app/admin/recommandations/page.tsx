import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { AdminRecommendations } from "@/components/recommendations/AdminRecommendations";

export const metadata = {
  title: "Moderation des recommandations",
};

export default async function AdminRecommendationsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const recommendations = await prisma.recommendation.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#222020] px-4 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Moderation des recommandations</h1>
          <p className="mt-2 text-sm text-slate-400">
            Approuver ou rejeter les recommandations en attente.
          </p>
        </div>
        <AdminRecommendations
          initialItems={recommendations.map((item) => ({
            id: item.id,
            message: item.message,
            rating: item.rating,
            headline: item.headline,
            status: item.status,
            createdAt: item.createdAt.toISOString(),
            user: item.user,
          }))}
        />
      </div>
    </main>
  );
}
