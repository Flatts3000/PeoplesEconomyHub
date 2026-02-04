import {
  HeroSkeleton,
  MetricCardSkeleton,
} from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <HeroSkeleton />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-8 animate-pulse" />

        <div className="space-y-8">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>
      </section>
    </>
  );
}
