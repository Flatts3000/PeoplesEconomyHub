import Link from 'next/link';
import purchasingPowerData from '@/data/metrics/purchasing-power.json';
import essentialsInflationData from '@/data/metrics/essentials-inflation.json';
import financialCushionData from '@/data/metrics/financial-cushion.json';

function formatLastUpdated(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getLatestUpdate(): string {
  const dates = [
    purchasingPowerData.lastUpdated,
    essentialsInflationData.lastUpdated,
    financialCushionData.lastUpdated,
  ].map((d) => new Date(d).getTime());

  const mostRecent = new Date(Math.max(...dates));
  return formatLastUpdated(mostRecent.toISOString());
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = getLatestUpdate();

  return (
    <footer className="bg-surface border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-neutral mb-4">
              People&apos;s Economy Hub
            </h3>
            <p className="text-muted text-sm max-w-md">
              A not-for-profit platform helping everyday Americans understand
              how the economy affects their households through clear,
              transparent metrics.
            </p>
            <p className="text-muted text-xs mt-4">
              Data last updated: {lastUpdated}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral mb-4">
              Data Sources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.bls.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Bureau of Labor Statistics
                </a>
              </li>
              <li>
                <a
                  href="https://www.federalreserve.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-positive transition-colors"
                >
                  Federal Reserve
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-muted text-sm text-center">
            &copy; {currentYear} People&apos;s Economy Hub. Data provided for
            educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
