interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-8 w-64" />
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />

          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6 mt-1" />
            </div>

            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5 mt-1" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Skeleton className="w-full max-w-md h-64" />
        </div>
      </div>
    </div>
  );
}

export function MetricSummarySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <Skeleton className="h-6 w-48 mb-2" />

      <div className="flex items-baseline gap-2 mb-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-4 w-4" />
      </div>

      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-4/5 mb-4" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricSummarySkeleton />
          <MetricSummarySkeleton />
          <MetricSummarySkeleton />
        </div>
      </div>
    </section>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
