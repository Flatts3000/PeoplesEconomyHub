import Link from 'next/link';
import { Metric } from '@/lib/types';
import { formatValue, formatDate } from '@/lib/formatters';

interface MetricSummaryProps {
  metric: Metric;
}

export function MetricSummary({ metric }: MetricSummaryProps) {
  const isPositive =
    metric.trendDirection === 'up'
      ? metric.positiveDirection === 'up'
      : metric.positiveDirection === 'down';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl" role="img" aria-label={metric.title}>
          {metric.icon}
        </span>
        {metric.isFallback && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
            Cached
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-neutral mb-2">{metric.title}</h3>

      <div className="flex items-baseline gap-2 mb-2">
        <span
          className={`text-3xl font-bold ${
            isPositive ? 'text-positive' : 'text-negative'
          }`}
        >
          {formatValue(metric.value, metric.format)}
        </span>
        <span
          className={`text-sm ${isPositive ? 'text-positive' : 'text-negative'}`}
        >
          {metric.trendDirection === 'up' ? '↑' : metric.trendDirection === 'down' ? '↓' : '→'}
        </span>
      </div>

      <p className="text-sm text-muted mb-4">{metric.summary}</p>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>Updated {formatDate(metric.lastUpdated)}</span>
        <Link
          href={`#${metric.id}`}
          className="text-positive hover:underline font-medium"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
