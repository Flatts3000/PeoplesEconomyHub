import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
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
    <footer className="bg-neutral text-white mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
              aria-label="People's Economy Hub - Home"
            >
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-hover transition-colors">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-white text-sm"
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-semibold">
                People&apos;s Economy Hub
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-4">
              A not-for-profit platform helping everyday Americans understand
              how the economy affects their households through clear,
              transparent metrics.
            </p>
            <p className="text-gray-500 text-xs">
              Data last updated:{' '}
              <time dateTime={new Date().toISOString()}>{lastUpdated}</time>
            </p>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-400">
              Navigation
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </nav>

          {/* Data sources column */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-400">
              Data Sources
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="https://www.bls.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                >
                  Bureau of Labor Statistics
                  <span className="sr-only">(opens in new tab)</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.federalreserve.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                >
                  Federal Reserve
                  <span className="sr-only">(opens in new tab)</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://fred.stlouisfed.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                >
                  FRED Economic Data
                  <span className="sr-only">(opens in new tab)</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              &copy; {currentYear} People&apos;s Economy Hub. Data provided for
              educational purposes.
            </p>
            <p>
              Site by{' '}
              <a
                href="https://mythicworks.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mythic Works LLC
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
