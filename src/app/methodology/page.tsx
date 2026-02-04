export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-neutral mb-4">
        Sources &amp; Methodology
      </h1>
      <p className="text-xl text-muted mb-12">
        We believe in complete transparency. Here&apos;s exactly how we
        calculate each metric and where the data comes from.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Purchasing Power of the Median Paycheck
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-neutral">Data Source</h3>
              <p className="text-muted">
                Bureau of Labor Statistics (BLS) Current Population Survey,
                median usual weekly earnings of full-time wage and salary
                workers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Calculation</h3>
              <p className="text-muted">
                Real (inflation-adjusted) median weekly earnings are calculated
                by dividing nominal earnings by the Consumer Price Index. We
                then compute the year-over-year percent change.
              </p>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-sm">
                Real Wage = Nominal Wage ÷ (CPI ÷ 100)
                <br />
                YoY Change = ((Current - Prior Year) ÷ Prior Year) × 100
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Update Frequency</h3>
              <p className="text-muted">
                Quarterly, typically within 7 days of BLS release.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Limitations</h3>
              <p className="text-muted">
                This measures cash wages only, not total compensation (benefits,
                retirement contributions). It also reflects full-time workers,
                not part-time or gig workers.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Essentials Cost Pressure
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-neutral">Data Source</h3>
              <p className="text-muted">
                BLS Consumer Price Index sub-indexes for shelter, food at home,
                energy, transportation services, and medical care.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Calculation</h3>
              <p className="text-muted">
                We calculate a weighted average of year-over-year price changes
                for essential categories. Weights are based on typical household
                budget allocations:
              </p>
              <ul className="list-disc list-inside text-muted mt-2">
                <li>Shelter: 33%</li>
                <li>Transportation: 17%</li>
                <li>Food at home: 13%</li>
                <li>Medical care: 8%</li>
                <li>Energy: 7%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Update Frequency</h3>
              <p className="text-muted">
                Monthly, typically within 7 days of CPI release (around the 10th
                of each month).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Limitations</h3>
              <p className="text-muted">
                Weights are approximate and may not match every household&apos;s
                spending. Regional variation is not captured in national data.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Household Financial Cushion
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-neutral">Data Source</h3>
              <p className="text-muted">
                Federal Reserve Survey of Household Economics and Decisionmaking
                (SHED), conducted annually.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Key Measures</h3>
              <ul className="list-disc list-inside text-muted">
                <li>
                  Share of adults who could cover a $400 emergency expense with
                  cash or cash equivalent
                </li>
                <li>
                  Share with emergency savings covering 3+ months of expenses
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Update Frequency</h3>
              <p className="text-muted">
                Annual, typically released in May following the survey year.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Limitations</h3>
              <p className="text-muted">
                Self-reported survey data. The $400 threshold is somewhat
                arbitrary but has been used consistently since 2013, allowing
                for comparison over time.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Data Pipeline &amp; Updates
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <p className="text-muted">
              Data is fetched automatically from official government APIs and
              stored in version-controlled JSON files. When live data is
              unavailable, we display the most recent cached values with a clear
              warning.
            </p>
            <p className="text-muted">
              All calculations are performed using open-source code. Our data
              pipeline runs automated tests to ensure accuracy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">How to Cite</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-muted mb-4">
              If you use data or visualizations from People&apos;s Economy Hub,
              please cite as:
            </p>
            <code className="block bg-gray-100 p-3 rounded text-sm">
              People&apos;s Economy Hub. [Metric Name]. Retrieved [Date] from
              https://peopleseconomyhub.org
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral mb-4">
            Primary Data Sources
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.bls.gov/cps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-positive hover:underline"
                >
                  BLS Current Population Survey
                </a>
                <span className="text-muted"> — Median weekly earnings</span>
              </li>
              <li>
                <a
                  href="https://www.bls.gov/cpi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-positive hover:underline"
                >
                  BLS Consumer Price Index
                </a>
                <span className="text-muted"> — Inflation data</span>
              </li>
              <li>
                <a
                  href="https://www.federalreserve.gov/consumerscommunities/shed.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-positive hover:underline"
                >
                  Federal Reserve SHED Survey
                </a>
                <span className="text-muted"> — Financial resilience</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
