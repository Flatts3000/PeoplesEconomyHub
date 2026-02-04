'use client';

import { ErrorBoundary } from './ErrorBoundary';
import { MetricChart } from './MetricChart';
import { ChartFallback } from './ChartFallback';
import { Metric } from '@/lib/types';

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
