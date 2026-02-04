import { Hero } from '@/components/Hero';
import { MetricCard } from '@/components/MetricCard';
import { DataFreshness } from '@/components/DataFreshness';
import { getMetrics } from '@/lib/metrics';

export default function Home() {
  const metrics = getMetrics();

  return (
    <>
      <Hero metrics={metrics} />

      {/* Main metrics section */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        aria-labelledby="metrics-heading"
      >
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2
              id="metrics-heading"
              className="text-3xl md:text-4xl font-bold text-neutral mb-3"
            >
              Understanding the Numbers
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Dive deeper into each metric to see the full picture of household
              economic health.
            </p>
          </div>
          <DataFreshness />
        </header>

        <div className="space-y-12" role="feed" aria-label="Economic metrics">
          {metrics.map((metric, index) => (
            <article
              key={metric.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              aria-posinset={index + 1}
              aria-setsize={metrics.length}
            >
              <MetricCard metric={metric} />
            </article>
          ))}
        </div>
      </section>

      {/* Why these metrics section */}
      <section
        className="gradient-section py-20 md:py-28"
        aria-labelledby="methodology-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Illustration */}
            <div className="order-2 lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/illustrations/methodology.svg"
                alt="Diagram showing how People's Economy Hub translates economic data into household-relevant metrics"
                className="w-full max-w-lg mx-auto h-auto"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
                Our Approach
              </span>
              <h2
                id="methodology-heading"
                className="text-3xl md:text-4xl font-bold text-neutral mb-6"
              >
                Why These Metrics?
              </h2>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                Traditional economic indicators like GDP and stock market
                indices can rise while typical households struggle.
              </p>
              <p className="text-lg text-muted mb-10 leading-relaxed">
                We focus on metrics that reflect what families actually
                experience: whether paychecks buy more or less, how much
                essential costs are rising, and whether people have a financial
                safety net.
              </p>
              <a href="/methodology" className="btn-primary">
                Learn About Our Methodology
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="bg-white py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-3">
              Trusted Data Sources
            </h2>
            <p className="text-muted">
              All metrics are derived from official government statistics
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <a
              href="https://www.bls.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Bureau of Labor Statistics</span>
            </a>
            <a
              href="https://www.federalreserve.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Federal Reserve</span>
            </a>
            <a
              href="https://fred.stlouisfed.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">FRED Economic Data</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
