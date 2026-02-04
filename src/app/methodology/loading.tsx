import { Skeleton } from '@/components/Skeleton';

export default function MethodologyLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Skeleton className="h-12 w-64 mb-4" />
      <Skeleton className="h-6 w-96 mb-12" />

      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <section key={i}>
            <Skeleton className="h-8 w-80 mb-4" />
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
