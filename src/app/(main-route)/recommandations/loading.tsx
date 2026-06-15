import { Container } from "@/ui/components/container/container";
import { RecommendationSkeletonGrid } from "@/components/recommendations/RecommendationSkeleton";

export default function RecommendationsLoading() {
  return (
    <Container className="mt-28 flex flex-col gap-8 px-4 md:px-0">
      <div className="flex flex-col gap-3">
        <div className="h-10 w-72 animate-pulse rounded-md bg-white/10 md:h-12" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded-md bg-white/10" />
        <div className="h-4 w-2/3 max-w-xl animate-pulse rounded-md bg-white/10" />
      </div>
      <RecommendationSkeletonGrid count={6} />
    </Container>
  );
}
