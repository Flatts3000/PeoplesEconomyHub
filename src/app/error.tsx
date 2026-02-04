'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-neutral mb-4">
          Something went wrong
        </h1>
        <p className="text-muted mb-6">
          We apologize for the inconvenience. An error occurred while loading
          this page.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-positive text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-100 text-neutral rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Go home
          </a>
        </div>
        {error.digest && (
          <p className="text-xs text-muted mt-8">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
