import Link from 'next/link';
import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faScaleBalanced,
  faShoppingBasket,
  faBriefcase,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const metadata: Metadata = {
  title: "Learn | People's Economy Hub",
  description:
    'Plain-language explanations of economic concepts that matter for understanding household finances.',
};

interface Article {
  slug: string;
  title: string;
  description: string;
  icon: IconDefinition;
  readTime: string;
  category: string;
}

const articles: Article[] = [
  {
    slug: 'gdp-vs-wellbeing',
    title: 'Why GDP ≠ Household Well-being',
    description:
      'Understanding why a growing economy does not always mean families are better off.',
    icon: faChartLine,
    readTime: '4 min read',
    category: 'Fundamentals',
  },
  {
    slug: 'mean-vs-median',
    title: 'Mean vs. Median: Why It Matters',
    description:
      'How averages can be misleading and why we focus on the median household.',
    icon: faScaleBalanced,
    readTime: '3 min read',
    category: 'Statistics',
  },
  {
    slug: 'inflation-baskets',
    title: 'Understanding Inflation Baskets',
    description:
      'Why official inflation may not match what you experience at the grocery store.',
    icon: faShoppingBasket,
    readTime: '5 min read',
    category: 'Inflation',
  },
  {
    slug: 'labor-market-indicators',
    title: 'Labor Market Indicators Explained',
    description:
      'Beyond the unemployment rate: what prime-age participation tells us.',
    icon: faBriefcase,
    readTime: '4 min read',
    category: 'Employment',
  },
  {
    slug: 'alternative-economic-indicators',
    title: 'Alternative Economic Indicators',
    description:
      'Broader measures that account for environmental costs, health, education, and inequality.',
    icon: faGlobe,
    readTime: '6 min read',
    category: 'Beyond GDP',
  },
];

export default function LearnPage() {
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              Education
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4 tracking-tight">
              Learn
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              Plain-language explanations of economic concepts that matter for
              understanding household finances.
            </p>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        aria-labelledby="articles-heading"
      >
        <h2 id="articles-heading" className="sr-only">
          Articles
        </h2>

        <div className="grid gap-6" role="list">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              role="listitem"
            >
              <Link
                href={`/learn/${article.slug}`}
                className="group block bg-white border border-border rounded-2xl p-6 md:p-8 card-hover focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-subtle flex-shrink-0 transition-transform group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon
                      icon={article.icon}
                      className="text-xl text-secondary"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category and read time */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span
                        className="text-xs text-subtle"
                        aria-label={`Reading time: ${article.readTime}`}
                      >
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-neutral mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted leading-relaxed mb-4">
                      {article.description}
                    </p>

                    {/* Read more link */}
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read article
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="gradient-section py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
            Want to understand how we calculate our metrics?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Explore our detailed methodology documentation to see exactly where
            our data comes from and how we process it.
          </p>
          <Link href="/methodology" className="btn-primary">
            View Methodology
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
