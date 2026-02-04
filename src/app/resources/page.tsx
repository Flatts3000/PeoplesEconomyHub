import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faChartBar,
  faGraduationCap,
  faFileLines,
  faArrowUpRightFromSquare,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const metadata: Metadata = {
  title: "Resources | People's Economy Hub",
  description:
    'Curated tools, calculators, and data sources for exploring household economics.',
};

interface ResourceItem {
  title: string;
  url: string;
  description: string;
  source?: string;
}

interface ResourceSection {
  category: string;
  icon: IconDefinition;
  description: string;
  items: ResourceItem[];
}

const resources: ResourceSection[] = [
  {
    category: 'Calculators & Tools',
    icon: faCalculator,
    description: 'Interactive tools to understand your personal economic situation.',
    items: [
      {
        title: 'MIT Living Wage Calculator',
        url: 'https://livingwage.mit.edu/',
        description:
          'Calculate the living wage for your area based on typical expenses for housing, food, healthcare, and more.',
        source: 'MIT',
      },
      {
        title: 'BLS Inflation Calculator',
        url: 'https://www.bls.gov/data/inflation_calculator.htm',
        description:
          'See how purchasing power has changed over time using official CPI data.',
        source: 'Bureau of Labor Statistics',
      },
    ],
  },
  {
    category: 'Data Dashboards',
    icon: faChartBar,
    description: 'Explore economic data and trends with interactive visualizations.',
    items: [
      {
        title: 'Washington Center for Equitable Growth',
        url: 'https://equitablegrowth.org/',
        description:
          'Research and data on economic inequality and broadly shared growth.',
        source: 'Equitable Growth',
      },
      {
        title: 'FRED Economic Data',
        url: 'https://fred.stlouisfed.org/',
        description:
          'Comprehensive economic data from the Federal Reserve Bank of St. Louis with over 800,000 time series.',
        source: 'Federal Reserve',
      },
      {
        title: 'Census Bureau Income Data',
        url: 'https://www.census.gov/topics/income-poverty/income.html',
        description:
          'Official statistics on household income, poverty rates, and economic mobility.',
        source: 'U.S. Census Bureau',
      },
    ],
  },
  {
    category: 'Educational Resources',
    icon: faGraduationCap,
    description: 'Learn about economics and personal finance fundamentals.',
    items: [
      {
        title: 'Federal Reserve Education',
        url: 'https://www.federalreserveeducation.org/',
        description:
          'Free educational materials about the economy, monetary policy, and personal finance.',
        source: 'Federal Reserve',
      },
      {
        title: 'BLS Economy at a Glance',
        url: 'https://www.bls.gov/eag/',
        description:
          'Quick access to key economic indicators by state and metropolitan area.',
        source: 'Bureau of Labor Statistics',
      },
    ],
  },
  {
    category: 'Reports & Analysis',
    icon: faFileLines,
    description: 'In-depth research on household economic well-being.',
    items: [
      {
        title: 'Federal Reserve SHED Report',
        url: 'https://www.federalreserve.gov/consumerscommunities/shed.htm',
        description:
          'Annual Survey of Household Economics and Decisionmaking—our primary source for financial resilience data.',
        source: 'Federal Reserve',
      },
      {
        title: 'BLS Spotlight on Statistics',
        url: 'https://www.bls.gov/spotlight/',
        description:
          'In-depth analysis of labor statistics, wages, and economic trends.',
        source: 'Bureau of Labor Statistics',
      },
      {
        title: 'Center on Budget and Policy Priorities',
        url: 'https://www.cbpp.org/',
        description:
          'Nonpartisan analysis of federal and state budget, tax, and social policy.',
        source: 'CBPP',
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 pattern-grid opacity-30"
          aria-hidden="true"
        />
        <div
          className="absolute top-10 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              External Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4 tracking-tight">
              Resources
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              Curated tools, calculators, and data sources for exploring
              household economics from trusted institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Resources sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-16">
          {resources.map((section, sectionIndex) => (
            <section
              key={section.category}
              aria-labelledby={`section-${sectionIndex}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${sectionIndex * 0.1}s`, opacity: 0 }}
            >
              {/* Section header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary-subtle flex-shrink-0"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon
                    icon={section.icon}
                    className="text-lg text-secondary"
                  />
                </div>
                <div>
                  <h2
                    id={`section-${sectionIndex}`}
                    className="text-2xl font-bold text-neutral"
                  >
                    {section.category}
                  </h2>
                  <p className="text-muted mt-1">{section.description}</p>
                </div>
              </div>

              {/* Resource cards */}
              <div className="grid gap-4" role="list">
                {section.items.map((item, itemIndex) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white border border-border rounded-xl p-5 md:p-6 card-hover focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                    style={{
                      animationDelay: `${sectionIndex * 0.1 + itemIndex * 0.05}s`,
                    }}
                    role="listitem"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Source badge */}
                        {item.source && (
                          <span className="inline-block text-xs font-medium text-muted bg-surface px-2 py-0.5 rounded mb-2">
                            {item.source}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-neutral group-hover:text-primary transition-colors flex items-center gap-2">
                          {item.title}
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="text-xs text-muted group-hover:text-primary transition-colors"
                            aria-hidden="true"
                          />
                        </h3>

                        {/* Description */}
                        <p className="text-muted mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Suggest a resource section */}
        <section
          className="mt-16 relative overflow-hidden bg-gradient-to-br from-primary-subtle to-secondary-subtle rounded-2xl p-8 md:p-10"
          aria-labelledby="suggest-heading"
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
                icon={faLightbulb}
                className="text-xl text-primary"
              />
            </div>

            <div className="flex-1">
              <h2
                id="suggest-heading"
                className="text-xl md:text-2xl font-bold text-neutral mb-2"
              >
                Suggest a Resource
              </h2>
              <p className="text-muted leading-relaxed">
                Know of a valuable tool or data source that should be included
                here? We welcome suggestions for resources that help people
                understand household economics. Resources should be from
                reputable institutions and freely accessible.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="mt-8 text-sm text-subtle text-center">
          These external resources are provided for informational purposes.
          People&apos;s Economy Hub is not affiliated with these organizations.
        </p>
      </div>
    </div>
  );
}
