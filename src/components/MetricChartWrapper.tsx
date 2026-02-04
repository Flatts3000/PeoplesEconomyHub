'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from './ErrorBoundary';
import { ChartFallback } from './ChartFallback';
import { Skeleton } from './Skeleton';
import { Metric } from '@/lib/types';

// Lazy load MetricChart to reduce initial bundle size (Chart.js is ~200KB)
const MetricChart = dynamic(
  () => import('./MetricChart').then((mod) => mod.MetricChart),
  {
    loading: () => (
      <div className="w-full max-w-md">
        <Skeleton className="h-64 w-full" />
      </div>
    ),
    ssr: false, // Chart.js doesn't support SSR
  }
);

interface MetricChartWrapperProps {
  metric: Metric;
}

export function MetricChartWrapper({ metric }: MetricChartWrapperProps) {
  return (
    <ErrorBoundary fallback={<ChartFallback metric={metric} error="Chart failed to load" />}>
      <MetricChart metric={metric} />
    </ErrorBoundary>
  );
}
