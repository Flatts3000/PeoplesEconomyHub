import Link from 'next/link';
import { Metric } from '@/lib/types';
import { MetricChartWrapper } from './MetricChartWrapper';
import { ChartHelp } from './ChartHelp';
import { CiteButton } from './CiteButton';
import { ShareButtons } from './ShareButtons';
import { formatValue, formatDate } from '@/lib/formatters';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isPositive =
    metric.trendDirection === 'up'
      ? metric.positiveDirection === 'up'
      : metric.positiveDirection === 'down';

  return (
    <section
      id={metric.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl" role="img" aria-label={metric.title}>
              {metric.icon}
            </span>
            <h2 className="text-2xl font-bold text-neutral">{metric.title}</h2>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span
              className={`text-4xl font-bold ${
                isPositive ? 'text-positive' : 'text-negative'
              }`}
            >
              {formatValue(metric.value, metric.format)}
            </span>
            <span className="text-muted">year-over-year</span>
          </div>

          {metric.isFallback && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <p className="text-sm text-amber-800">
                Live data temporarily unavailable. Showing data as of{' '}
                {metric.fallbackDate}.
              </p>
            </div>
          )}

          <p className="text-neutral mb-4">{metric.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral mb-1">
                Why it matters
              </h3>
              <p className="text-sm text-muted">{metric.whyItMatters}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral mb-1">
                Common misinterpretation
              </h3>
              <p className="text-sm text-muted">
                {metric.commonMisinterpretation}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-muted">
              Last updated: {formatDate(metric.lastUpdated)}
            </span>
            <Link
              href="/methodology"
              className="text-positive hover:underline font-medium"
            >
              View methodology →
            </Link>
            <CiteButton metric={metric} />
            <ShareButtons
              title={metric.title}
              description={metric.summary}
              url={`https://peopleseconomyhub.github.io/#${metric.id}`}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center">
            <MetricChartWrapper metric={metric} />
          </div>
          <ChartHelp howToRead={metric.howToRead} />
        </div>
      </div>
    </section>
  );
}
