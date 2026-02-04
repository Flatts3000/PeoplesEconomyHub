import { Hero } from '@/components/Hero';
import { MetricCard } from '@/components/MetricCard';
import { getMetrics } from '@/lib/metrics';

export default function Home() {
  const metrics = getMetrics();

  return (
    <>
      <Hero metrics={metrics} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-neutral mb-8 text-center">
          Understanding the Numbers
        </h2>

        <div className="space-y-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Why These Metrics?
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Traditional economic indicators like GDP and stock market indices
            can rise while typical households struggle. We focus on metrics that
            reflect what families actually experience: whether paychecks buy
            more or less, how much essential costs are rising, and whether
            people have a financial safety net.
          </p>
          <a
            href="/methodology"
            className="inline-block bg-positive text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            Learn About Our Methodology
          </a>
        </div>
      </section>
    </>
  );
}
