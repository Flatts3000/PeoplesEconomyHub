'use client';

import Link from 'next/link';
import { Metric } from '@/lib/types';
import { MetricIcon } from './MetricIcon';
import { formatValue, formatDate } from '@/lib/formatters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faMinus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

interface MetricSummaryProps {
  metric: Metric;
}

export function MetricSummary({ metric }: MetricSummaryProps) {
  const trendIcon =
    metric.trendDirection === 'up'
      ? faArrowUp
      : metric.trendDirection === 'down'
        ? faArrowDown
        : faMinus;

  const trendLabel =
    metric.trendDirection === 'up'
      ? 'Trending up'
      : metric.trendDirection === 'down'
        ? 'Trending down'
        : 'Stable';

  return (
    <article className="group relative bg-white rounded-2xl border border-border p-6 card-hover focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2">
      {/* Top row: Icon and cached badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary-subtle transition-transform group-hover:scale-105"
          aria-hidden="true"
        >
          <MetricIcon icon={metric.icon} className="text-xl text-secondary" />
        </div>
        {metric.isFallback && (
          <span
            className="text-xs bg-warning-bg text-warning px-2.5 py-1 rounded-full font-medium"
            role="status"
          >
            Cached data
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-neutral mb-3 leading-tight group-hover:text-primary transition-colors">
        {metric.title}
      </h3>

      {/* Value and trend */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl font-bold tracking-tight text-data">
          {formatValue(metric.value, metric.format)}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center bg-data-bg"
          role="img"
          aria-label={trendLabel}
        >
          <FontAwesomeIcon
            icon={trendIcon}
            className="text-sm text-data"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Summary text */}
      <p className="text-sm text-muted mb-5 leading-relaxed line-clamp-2">
        {metric.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <time
          dateTime={metric.lastUpdated}
          className="text-xs text-subtle"
        >
          {formatDate(metric.lastUpdated)}
        </time>
        <Link
          href={`#${metric.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover font-medium transition-all group-hover:gap-2"
          aria-label={`View details for ${metric.title}`}
        >
          Details
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
