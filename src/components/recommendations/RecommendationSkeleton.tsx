import { Skeleton } from "@/components/ui/skeleton";

export function RecommendationSkeletonCard() {
  return (
    <article className="flex h-full flex-col gap-5 rounded-md bg-[#2f2d2d] p-4 shadow-xl">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full bg-white/10" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-2/5 bg-white/10" />
          <Skeleton className="h-3 w-3/4 bg-white/10" />
          <Skeleton className="h-3 w-24 bg-white/10" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full bg-white/10" />
        <Skeleton className="h-3 w-11/12 bg-white/10" />
        <Skeleton className="h-3 w-4/5 bg-white/10" />
      </div>
    </article>
  );
}

export function RecommendationSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid items-stretch gap-8 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <RecommendationSkeletonCard key={index} />
      ))}
    </div>
  );
}
