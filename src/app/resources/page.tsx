export default function ResourcesPage() {
  const resources = [
    {
      category: 'Calculators & Tools',
      items: [
        {
          title: 'MIT Living Wage Calculator',
          url: 'https://livingwage.mit.edu/',
          description:
            'Calculate the living wage for your area based on typical expenses.',
        },
        {
          title: 'BLS Inflation Calculator',
          url: 'https://www.bls.gov/data/inflation_calculator.htm',
          description:
            'See how purchasing power has changed over time using official CPI data.',
        },
      ],
    },
    {
      category: 'Data Dashboards',
      items: [
        {
          title: 'Washington Center for Equitable Growth',
          url: 'https://equitablegrowth.org/',
          description:
            'Research and data on economic inequality and broadly shared growth.',
        },
        {
          title: 'FRED Economic Data',
          url: 'https://fred.stlouisfed.org/',
          description:
            'Comprehensive economic data from the Federal Reserve Bank of St. Louis.',
        },
        {
          title: 'Census Bureau Income Data',
          url: 'https://www.census.gov/topics/income-poverty/income.html',
          description: 'Official statistics on household income and poverty.',
        },
      ],
    },
    {
      category: 'Educational Resources',
      items: [
        {
          title: 'Federal Reserve Education',
          url: 'https://www.federalreserveeducation.org/',
          description:
            'Free educational materials about the economy and personal finance.',
        },
        {
          title: 'BLS Economy at a Glance',
          url: 'https://www.bls.gov/eag/',
          description: 'Quick access to key economic indicators by region.',
        },
      ],
    },
    {
      category: 'Reports & Analysis',
      items: [
        {
          title: 'Federal Reserve SHED Report',
          url: 'https://www.federalreserve.gov/consumerscommunities/shed.htm',
          description:
            'Annual report on the economic well-being of U.S. households.',
        },
        {
          title: 'BLS Spotlight on Statistics',
          url: 'https://www.bls.gov/spotlight/',
          description:
            'In-depth analysis of labor statistics and economic trends.',
        },
        {
          title: 'Center on Budget and Policy Priorities',
          url: 'https://www.cbpp.org/',
          description:
            'Analysis of federal and state budget and tax policies.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-neutral mb-4">Resources</h1>
      <p className="text-xl text-muted mb-12">
        Curated tools, calculators, and data sources for exploring household
        economics.
      </p>

      <div className="space-y-12">
        {resources.map((section) => (
          <section key={section.category}>
            <h2 className="text-2xl font-bold text-neutral mb-6">
              {section.category}
            </h2>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-positive mb-2">
                    {item.title} ↗
                  </h3>
                  <p className="text-muted">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 bg-surface rounded-lg p-8">
        <h2 className="text-2xl font-bold text-neutral mb-4">
          Suggest a Resource
        </h2>
        <p className="text-muted">
          Know of a valuable tool or data source that should be included here?
          We welcome suggestions for resources that help people understand
          household economics.
        </p>
      </section>
    </div>
  );
}
