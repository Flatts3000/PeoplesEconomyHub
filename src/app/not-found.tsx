import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-neutral mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral mb-4">
          Page not found
        </h2>
        <p className="text-muted mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-positive text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/learn"
            className="inline-block px-6 py-3 bg-gray-100 text-neutral rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Browse articles
          </Link>
        </div>
      </div>
    </div>
  );
}
