import { Skeleton } from '@/components/Skeleton';

export default function ResourcesLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Skeleton className="h-12 w-48 mb-4" />
      <Skeleton className="h-6 w-80 mb-12" />

      <div className="space-y-12">
        {[1, 2, 3].map((section) => (
          <section key={section}>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
