import { Metadata } from 'next';
import Link from 'next/link';
import { Accordion } from '@/components/Accordion';

export const metadata: Metadata = {
  title: "FAQ | People's Economy Hub",
  description:
    'Frequently asked questions about our economic metrics, data sources, and methodology.',
};

const generalFAQs = [
  {
    question: 'What is the People\'s Economy Hub?',
    answer:
      'The People\'s Economy Hub is a not-for-profit platform that helps everyday Americans understand how the economy affects their households. We focus on metrics that reflect real household experiences rather than abstract indicators like GDP or stock market indices.',
  },
  {
    question: 'Why do you focus on these specific metrics?',
    answer:
      'Traditional economic indicators often don\'t reflect what typical families experience. GDP can rise while most households struggle. We chose metrics that directly measure purchasing power, essential costs, and financial resilience—things that actually impact daily life.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'We update our data weekly when new information is released by our sources. Purchasing power and inflation data come from the Bureau of Labor Statistics monthly releases. Financial cushion data is updated annually when the Federal Reserve releases its Survey of Household Economics and Decisionmaking (SHED).',
  },
  {
    question: 'Is this site affiliated with any political party or organization?',
    answer:
      'No. The People\'s Economy Hub is an independent, not-for-profit project. We present data from official government sources without political commentary. Our goal is to help people understand economic data, not to advocate for any particular policy.',
  },
];

const metricsFAQs = [
  {
    question: 'What does "Purchasing Power of the Median Paycheck" mean?',
    answer:
      'This metric shows whether the typical worker\'s paycheck buys more or less than it did a year ago, after adjusting for inflation. We use median wages (the middle of the distribution) rather than averages, because averages can be skewed by very high earners.',
  },
  {
    question: 'How is "Essentials Cost Pressure" different from regular inflation?',
    answer:
      'The official Consumer Price Index (CPI) includes all goods and services, including things people can delay buying like electronics or vacations. Our essentials metric focuses only on unavoidable expenses: housing, food, energy, transportation, and healthcare. These often rise faster than overall inflation.',
  },
  {
    question: 'Why $400 for the financial cushion metric?',
    answer:
      'The $400 threshold comes from the Federal Reserve\'s annual survey, which has asked this question since 2013. It represents a common unexpected expense—like a car repair or medical bill—that can indicate whether a family has any financial buffer.',
  },
  {
    question: 'Why do you use median instead of mean (average)?',
    answer:
      'In a group where most people earn $50,000 but one person earns $5 million, the average income would be over $500,000—a number that describes nobody in the group. The median (middle value) better represents typical households because it isn\'t skewed by extreme values.',
  },
];

const dataFAQs = [
  {
    question: 'Where does your data come from?',
    answer:
      'Our primary sources are the Bureau of Labor Statistics (BLS) for wage and inflation data, and the Federal Reserve\'s Survey of Household Economics and Decisionmaking (SHED) for financial resilience data. These are official government sources used by economists and policymakers.',
  },
  {
    question: 'Can I download the raw data?',
    answer:
      'Yes. All our data comes from public sources. Visit our Resources page for direct links to the original data from BLS and the Federal Reserve. We also provide links to the specific data series we use.',
  },
  {
    question: 'How do you calculate the essentials inflation rate?',
    answer:
      'We weight different categories based on their share of typical household budgets: housing (33%), transportation (17%), food at home (13%), medical care (8%), and energy (7%). These weights reflect Bureau of Labor Statistics consumer expenditure data.',
  },
  {
    question: 'Why might your numbers differ from what I see in the news?',
    answer:
      'News reports often cite headline figures like overall CPI or average wages. We specifically use median wages and essentials-weighted inflation, which can tell a different story. Both are valid—they just measure different things.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-neutral mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-lg text-muted mb-12">
        Find answers to common questions about our metrics, data sources, and
        methodology.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-neutral mb-6">General</h2>
          <Accordion items={generalFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral mb-6">
            About the Metrics
          </h2>
          <Accordion items={metricsFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral mb-6">
            Data & Methodology
          </h2>
          <Accordion items={dataFAQs} />
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-muted mb-4">Still have questions?</p>
        <div className="flex gap-4">
          <Link
            href="/methodology"
            className="text-positive hover:underline font-medium"
          >
            Read our full methodology →
          </Link>
          <Link
            href="/resources"
            className="text-positive hover:underline font-medium"
          >
            Explore data sources →
          </Link>
        </div>
      </div>
    </div>
  );
}
