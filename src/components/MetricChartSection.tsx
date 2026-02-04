'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Metric } from '@/lib/types';
import { ErrorBoundary } from './ErrorBoundary';
import { ChartFallback } from './ChartFallback';
import { Skeleton } from './Skeleton';
import { ChartHelp } from './ChartHelp';

const MetricChart = dynamic(
  () => import('./MetricChart').then((mod) => mod.MetricChart),
  {
    loading: () => (
      <div className="w-full max-w-md">
        <Skeleton className="h-64 w-full" />
      </div>
    ),
    ssr: false,
  }
);

interface MetricChartSectionProps {
  metric: Metric;
}

type ChartView = 'yoy' | 'cumulative';

export function MetricChartSection({ metric }: MetricChartSectionProps) {
  const [activeView, setActiveView] = useState<ChartView>('yoy');

  const isPurchasingPower = metric.id === 'purchasing-power';
  const hasCumulativeData = isPurchasingPower && metric.cumulativeData;

  const howToReadText: Record<ChartView, string> = {
    yoy: metric.howToRead,
    cumulative: `This chart shows cumulative change in real purchasing power since ${metric.cumulativeData?.baselineDate ?? 'the baseline'}. ` +
      'A value of +5% means paychecks buy 5% more than they did at the baseline. ' +
      'A value of -3% means purchasing power has fallen 3% overall, even if recent years showed gains.',
  };

  // Create a modified metric for cumulative view
  const cumulativeMetric: Metric = hasCumulativeData ? {
    ...metric,
    chartData: metric.cumulativeData!.data,
    value: metric.cumulativeData!.value,
  } : metric;

  return (
    <div>
      {hasCumulativeData && (
        <div className="flex justify-center mb-4">
          <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50" role="tablist">
            <button
              role="tab"
              aria-selected={activeView === 'yoy'}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeView === 'yoy'
                  ? 'bg-white text-neutral shadow-sm'
                  : 'text-muted hover:text-neutral'
              }`}
              onClick={() => setActiveView('yoy')}
            >
              Year-over-Year
            </button>
            <button
              role="tab"
              aria-selected={activeView === 'cumulative'}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeView === 'cumulative'
                  ? 'bg-white text-neutral shadow-sm'
                  : 'text-muted hover:text-neutral'
              }`}
              onClick={() => setActiveView('cumulative')}
            >
              Cumulative
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <ErrorBoundary fallback={<ChartFallback metric={metric} error="Chart failed to load" />}>
          {activeView === 'cumulative' && hasCumulativeData ? (
            <MetricChart metric={cumulativeMetric} />
          ) : (
            <MetricChart metric={metric} />
          )}
        </ErrorBoundary>
      </div>

      <ChartHelp howToRead={howToReadText[activeView]} />
    </div>
  );
}
