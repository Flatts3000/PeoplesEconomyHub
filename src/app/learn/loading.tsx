import { ArticleCardSkeleton, Skeleton } from '@/components/Skeleton';

export default function LearnLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Skeleton className="h-12 w-32 mb-4" />
      <Skeleton className="h-6 w-96 mb-12" />

      <div className="grid gap-6">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    </div>
  );
}
