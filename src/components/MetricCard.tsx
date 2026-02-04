import Link from 'next/link';
import { Metric } from '@/lib/types';
import { MetricChartSection } from './MetricChartSection';
import { CiteButton } from './CiteButton';
import { ShareButtons } from './ShareButtons';
import { MetricIcon } from './MetricIcon';
import { formatValue, formatDate } from '@/lib/formatters';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <section
      id={metric.id}
      aria-labelledby={`${metric.id}-title`}
      className="bg-white rounded-2xl shadow-md border border-border overflow-hidden scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content side */}
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header */}
          <header className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-subtle flex-shrink-0"
              aria-hidden="true"
            >
              <MetricIcon icon={metric.icon} className="text-2xl text-secondary" />
            </div>
            <div>
              <h2
                id={`${metric.id}-title`}
                className="text-xl md:text-2xl font-bold text-neutral leading-tight"
              >
                {metric.title}
              </h2>
              <p className="text-sm text-muted mt-1">Year-over-year change</p>
            </div>
          </header>

          {/* Current value */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold tracking-tight text-data">
                {formatValue(metric.value, metric.format)}
              </span>
            </div>
          </div>

          {/* Fallback warning */}
          {metric.isFallback && (
            <div
              className="bg-warning-bg border border-warning/30 rounded-xl p-4 mb-6"
              role="alert"
            >
              <p className="text-sm text-warning font-medium">
                Live data temporarily unavailable. Showing data as of{' '}
                <time dateTime={metric.fallbackDate}>{metric.fallbackDate}</time>.
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-neutral leading-relaxed mb-8">{metric.description}</p>

          {/* Info cards */}
          <div className="space-y-4">
            <div className="bg-surface rounded-xl p-5 border border-border/50">
              <h3 className="text-sm font-semibold text-neutral mb-2 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
                Why it matters
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {metric.whyItMatters}
              </p>
            </div>

            <div className="bg-surface rounded-xl p-5 border border-border/50">
              <h3 className="text-sm font-semibold text-neutral mb-2 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary"
                  aria-hidden="true"
                />
                Common misinterpretation
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {metric.commonMisinterpretation}
              </p>
            </div>
          </div>

          {/* Footer actions */}
          <footer className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <time dateTime={metric.lastUpdated} className="text-muted">
                Updated {formatDate(metric.lastUpdated)}
              </time>
              <span className="text-border" aria-hidden="true">|</span>
              <Link
                href="/methodology"
                className="text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
              >
                Methodology
              </Link>
              <CiteButton metric={metric} />
              <ShareButtons
                title={metric.title}
                description={metric.summary}
                url={`https://peopleseconomyhub.github.io/#${metric.id}`}
              />
            </div>
          </footer>
        </div>

        {/* Chart side */}
        <div className="bg-surface p-6 md:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border">
          <MetricChartSection metric={metric} />
        </div>
      </div>
    </section>
  );
}
