import Image from 'next/image';
import { MetricSummary } from './MetricSummary';
import { Metric } from '@/lib/types';

interface HeroProps {
  metrics: Metric[];
}

export function Hero({ metrics }: HeroProps) {
  return (
    <section
      className="relative gradient-hero overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pattern-grid opacity-40"
        aria-hidden="true"
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute top-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Hero content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-16 md:mb-20">
          <div className="text-center lg:text-left lg:flex-1 animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              Household Economics
            </span>
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral mb-6 tracking-tight leading-[1.1]"
            >
              How is the economy{' '}
              <span className="gradient-text">really</span>{' '}
              affecting you?
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Clear, household-centered metrics that cut through the noise to
              show what matters for everyday American families.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a href="#purchasing-power" className="btn-primary">
                View Metrics
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href="/methodology"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-neutral font-semibold hover:text-primary transition-colors"
              >
                Learn More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="hidden lg:block lg:flex-1 max-w-md animate-fade-in stagger-2">
            <Image
              src="/images/illustrations/hero-household.svg"
              alt="Illustration of a family reviewing their household finances"
              width={400}
              height={300}
              className="w-full h-auto drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* All metrics summary - responsive grid for 6 items */}
        <div className="relative">
          <h2 className="sr-only">Key Economic Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`animate-fade-in-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <MetricSummary metric={metric} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
