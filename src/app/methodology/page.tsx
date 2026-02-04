import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faCartShopping,
  faPiggyBank,
  faFaceSmile,
  faTriangleExclamation,
  faCreditCard,
  faDatabase,
  faQuoteLeft,
  faArrowUpRightFromSquare,
  faBookOpen,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const metadata: Metadata = {
  title: "Sources & Methodology | People's Economy Hub",
  description:
    'Learn how we calculate our household economic metrics and where the data comes from.',
};

interface MetricMethodology {
  id: string;
  title: string;
  icon: IconDefinition;
  dataSource: React.ReactNode;
  calculation: React.ReactNode;
  updateFrequency: string;
  limitations: string;
}

const metrics: MetricMethodology[] = [
  {
    id: 'purchasing-power',
    title: 'Purchasing Power of the Median Paycheck',
    icon: faWallet,
    dataSource: (
      <p>
        Bureau of Labor Statistics (BLS) Current Population Survey, median usual
        weekly earnings of full-time wage and salary workers.
      </p>
    ),
    calculation: (
      <>
        <p>
          Real (inflation-adjusted) median weekly earnings are calculated by
          dividing nominal earnings by the Consumer Price Index. We then compute
          the year-over-year percent change.
        </p>
        <code className="block bg-surface p-4 rounded-lg mt-3 text-sm font-mono">
          Real Wage = Nominal Wage ÷ (CPI ÷ 100)
          <br />
          YoY Change = ((Current - Prior Year) ÷ Prior Year) × 100
        </code>
      </>
    ),
    updateFrequency: 'Quarterly, typically within 7 days of BLS release.',
    limitations:
      'This measures cash wages only, not total compensation (benefits, retirement contributions). It also reflects full-time workers, not part-time or gig workers.',
  },
  {
    id: 'essentials-inflation',
    title: 'Essentials Cost Pressure',
    icon: faCartShopping,
    dataSource: (
      <p>
        BLS Consumer Price Index sub-indexes for shelter, food at home, energy,
        transportation services, and medical care.
      </p>
    ),
    calculation: (
      <>
        <p>
          We calculate a weighted average of year-over-year price changes for
          essential categories. Weights are based on typical household budget
          allocations:
        </p>
        <ul className="list-none mt-3 space-y-2">
          <li className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>Shelter: 33%</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>Transportation: 17%</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>Food at home: 13%</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>Medical care: 8%</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span>Energy: 7%</span>
          </li>
        </ul>
      </>
    ),
    updateFrequency:
      'Monthly, typically within 7 days of CPI release (around the 10th of each month).',
    limitations:
      "Weights are approximate and may not match every household's spending. Regional variation is not captured in national data.",
  },
  {
    id: 'financial-cushion',
    title: 'Household Financial Cushion',
    icon: faPiggyBank,
    dataSource: (
      <p>
        Federal Reserve Survey of Household Economics and Decisionmaking (SHED),
        conducted annually.
      </p>
    ),
    calculation: (
      <ul className="list-none space-y-2">
        <li className="flex items-start gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"
            aria-hidden="true"
          />
          <span>
            Share of adults who could cover a $400 emergency expense with cash
            or cash equivalent
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"
            aria-hidden="true"
          />
          <span>
            Share with emergency savings covering 3+ months of expenses
          </span>
        </li>
      </ul>
    ),
    updateFrequency: 'Annual, typically released in May following the survey year.',
    limitations:
      'Self-reported survey data. The $400 threshold is somewhat arbitrary but has been used consistently since 2013, allowing for comparison over time.',
  },
  {
    id: 'consumer-sentiment',
    title: 'Consumer Sentiment',
    icon: faFaceSmile,
    dataSource: (
      <p>
        University of Michigan Survey of Consumers, accessed via FRED (Federal
        Reserve Economic Data). Series: UMCSENT.
      </p>
    ),
    calculation: (
      <p>
        The Index of Consumer Sentiment is based on five core questions about
        personal finances and business conditions. The index is calibrated so
        that 100 represents the 1966 baseline.
      </p>
    ),
    updateFrequency:
      'Monthly, with preliminary reading mid-month and final reading at month end.',
    limitations:
      'Measures subjective feelings, not objective conditions. Can be influenced by media coverage and political views.',
  },
  {
    id: 'recession-risk',
    title: 'Recession Risk Indicator (Sahm Rule)',
    icon: faTriangleExclamation,
    dataSource: (
      <p>
        FRED (Federal Reserve Economic Data). Series: SAHMREALTIME. Based on BLS
        unemployment data.
      </p>
    ),
    calculation: (
      <>
        <p>
          The Sahm Rule indicator is the difference between the 3-month moving
          average of the unemployment rate and its lowest point in the prior 12
          months. A value of 0.50 or higher has historically signaled the start
          of a recession.
        </p>
        <code className="block bg-surface p-4 rounded-lg mt-3 text-sm font-mono">
          Sahm = 3-month avg unemployment - 12-month low unemployment
        </code>
      </>
    ),
    updateFrequency: 'Monthly, following BLS employment situation release.',
    limitations:
      'Created by economist Claudia Sahm as an early warning signal. The 2024 breach of 0.50 was unusual in that it did not lead to a declared recession, possibly due to unique post-pandemic labor market conditions.',
  },
  {
    id: 'debt-burden',
    title: 'Household Debt Burden',
    icon: faCreditCard,
    dataSource: (
      <p>
        Federal Reserve Board. Household Debt Service Ratio (DSR). Series: TDSP
        via FRED.
      </p>
    ),
    calculation: (
      <p>
        The debt service ratio is an estimate of the ratio of debt payments
        (mortgage and consumer debt) to disposable personal income. It
        represents the share of after-tax income required for debt payments.
      </p>
    ),
    updateFrequency: 'Quarterly, released with a one-quarter lag.',
    limitations:
      'Does not include rent payments, which are a major expense for non-homeowners. Low interest rates can reduce debt service even as total debt rises.',
  },
];

interface DataSource {
  name: string;
  url: string;
  description: string;
}

const dataSources: DataSource[] = [
  {
    name: 'BLS Current Population Survey',
    url: 'https://www.bls.gov/cps/',
    description: 'Median weekly earnings data',
  },
  {
    name: 'BLS Consumer Price Index',
    url: 'https://www.bls.gov/cpi/',
    description: 'Inflation and price index data',
  },
  {
    name: 'Federal Reserve SHED Survey',
    url: 'https://www.federalreserve.gov/consumerscommunities/shed.htm',
    description: 'Financial resilience survey data',
  },
  {
    name: 'FRED Economic Data',
    url: 'https://fred.stlouisfed.org/',
    description: 'Consumer sentiment, Sahm Rule, debt service ratio',
  },
  {
    name: 'University of Michigan Survey of Consumers',
    url: 'https://data.sca.isr.umich.edu/',
    description: 'Consumer sentiment index methodology',
  },
];

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-semibold text-neutral mb-2 text-sm uppercase tracking-wide">
        {label}
      </h4>
      <div className="text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 pattern-grid opacity-30"
          aria-hidden="true"
        />
        <div
          className="absolute top-10 -right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              Transparency
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4 tracking-tight">
              Sources &amp; Methodology
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              We believe in complete transparency. Here&apos;s exactly how we
              calculate each metric and where the data comes from.
            </p>
          </div>

          {/* Quick navigation */}
          <nav
            className="mt-10 animate-fade-in-up stagger-2"
            style={{ opacity: 0 }}
            aria-label="Jump to metric methodology"
          >
            <h2 className="sr-only">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <a
                  key={metric.id}
                  href={`#${metric.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-border rounded-full text-sm text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  <FontAwesomeIcon
                    icon={metric.icon}
                    className="text-xs"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">
                    {metric.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="sm:hidden">
                    {metric.title.split(' ')[0]}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-10">
          {/* Metric methodology cards */}
          {metrics.map((metric, index) => (
            <section
              key={metric.id}
              id={metric.id}
              aria-labelledby={`${metric.id}-heading`}
              className="scroll-mt-24 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
            >
              {/* Card header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary-subtle flex-shrink-0"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon
                    icon={metric.icon}
                    className="text-lg text-secondary"
                  />
                </div>
                <h2
                  id={`${metric.id}-heading`}
                  className="text-xl md:text-2xl font-bold text-neutral pt-2"
                >
                  {metric.title}
                </h2>
              </div>

              {/* Card content */}
              <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-6 ml-0 md:ml-16">
                <InfoBlock label="Data Source">{metric.dataSource}</InfoBlock>
                <InfoBlock label="Calculation">{metric.calculation}</InfoBlock>
                <InfoBlock label="Update Frequency">
                  <p>{metric.updateFrequency}</p>
                </InfoBlock>
                <InfoBlock label="Limitations">
                  <p>{metric.limitations}</p>
                </InfoBlock>
              </div>
            </section>
          ))}

          {/* Data Pipeline section */}
          <section
            aria-labelledby="data-pipeline-heading"
            className="animate-fade-in-up"
            style={{ animationDelay: '0.35s', opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-subtle flex-shrink-0"
                aria-hidden="true"
              >
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="text-lg text-primary"
                />
              </div>
              <h2
                id="data-pipeline-heading"
                className="text-xl md:text-2xl font-bold text-neutral pt-2"
              >
                Data Pipeline &amp; Updates
              </h2>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 ml-0 md:ml-16">
              <p className="text-muted leading-relaxed">
                Data is fetched automatically from official government APIs
                (BLS, FRED) and stored in version-controlled JSON files. When
                live data is unavailable, we display the most recent cached
                values with a clear warning.
              </p>
              <p className="text-muted leading-relaxed">
                All calculations are performed using open-source code. Our data
                pipeline runs automated tests to ensure accuracy and data
                integrity.
              </p>
            </div>
          </section>

          {/* How to Cite section */}
          <section
            aria-labelledby="citation-heading"
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary-subtle flex-shrink-0"
                aria-hidden="true"
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-lg text-secondary"
                />
              </div>
              <h2
                id="citation-heading"
                className="text-xl md:text-2xl font-bold text-neutral pt-2"
              >
                How to Cite
              </h2>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 ml-0 md:ml-16">
              <p className="text-muted mb-4">
                If you use data or visualizations from People&apos;s Economy
                Hub, please cite as:
              </p>
              <code className="block bg-surface p-4 rounded-lg text-sm font-mono text-neutral">
                People&apos;s Economy Hub. [Metric Name]. Retrieved [Date] from
                https://peopleseconomyhub.github.io
              </code>
            </div>
          </section>

          {/* Primary Data Sources section */}
          <section
            aria-labelledby="sources-heading"
            className="animate-fade-in-up"
            style={{ animationDelay: '0.45s', opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-subtle flex-shrink-0"
                aria-hidden="true"
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-lg text-primary"
                />
              </div>
              <h2
                id="sources-heading"
                className="text-xl md:text-2xl font-bold text-neutral pt-2"
              >
                Primary Data Sources
              </h2>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 ml-0 md:ml-16">
              <ul className="space-y-4" role="list">
                {dataSources.map((source) => (
                  <li key={source.name} role="listitem">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 hover:bg-surface -mx-3 px-3 py-2 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-xs text-muted group-hover:text-primary mt-1.5 transition-colors"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="text-primary font-medium group-hover:underline">
                          {source.name}
                        </span>
                        <span className="text-muted block text-sm mt-0.5">
                          {source.description}
                        </span>
                      </div>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Commitment section */}
        <section
          className="mt-16 relative overflow-hidden bg-gradient-to-br from-primary-subtle to-secondary-subtle rounded-2xl p-8 md:p-10"
          aria-labelledby="commitment-heading"
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            aria-hidden="true"
          />

          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/80 flex-shrink-0"
              aria-hidden="true"
            >
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="text-xl text-primary"
              />
            </div>

            <div className="flex-1">
              <h2
                id="commitment-heading"
                className="text-xl md:text-2xl font-bold text-neutral mb-2"
              >
                Our Commitment to Accuracy
              </h2>
              <p className="text-muted leading-relaxed">
                We regularly review our methodology and data sources to ensure
                accuracy. If you identify any errors or have questions about our
                calculations, please{' '}
                <a
                  href="https://github.com/PeoplesEconomyHub/peopleseconomyhub.github.io/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  open an issue on GitHub
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
