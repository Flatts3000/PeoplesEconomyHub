import { MetricSummary } from './MetricSummary';
import { Metric } from '@/lib/types';

interface HeroProps {
  metrics: Metric[];
}

export function Hero({ metrics }: HeroProps) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
            How are American households doing?
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Clear, household-centered metrics that show how the economy actually
            affects everyday families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <MetricSummary key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
