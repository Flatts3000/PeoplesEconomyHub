import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ArticleData {
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: React.ReactNode;
}

const articles: Record<string, ArticleData> = {
  'gdp-vs-wellbeing': {
    title: 'Why GDP ≠ Household Well-being',
    description:
      'Learn why GDP growth does not automatically mean families are better off, and why median measures matter more than averages.',
    category: 'Fundamentals',
    readTime: '4 min read',
    content: (
      <>
        <p className="lead">
          Gross Domestic Product (GDP) measures the total value of goods and
          services produced in an economy. When GDP grows, it&apos;s often
          reported as good news. But GDP growth does not automatically mean that
          typical families are better off.
        </p>

        <h2>The Problem with Averages</h2>
        <p>
          GDP per capita—the average economic output per person—can rise even
          when most households see no improvement. This happens because GDP
          includes corporate profits, investment gains, and income that flows
          disproportionately to the highest earners.
        </p>
        <p>
          Economist Joseph Stiglitz has documented cases where median household
          income fell even as GDP per capita rose. The gains went to the top,
          while typical families stagnated.
        </p>

        <h2>What We Measure Instead</h2>
        <p>
          The People&apos;s Economy Hub focuses on <strong>median</strong>{' '}
          measures—the middle of the distribution—rather than averages. The
          median household represents the typical American family, not a
          statistical average skewed by billionaires.
        </p>

        <h2>Why This Matters</h2>
        <p>
          When policymakers and media report &quot;the economy is strong&quot;
          based on GDP, it can conflict with what families actually experience.
          Our metrics aim to bridge that gap by focusing on purchasing power,
          essential costs, and financial resilience—things that affect everyday
          life.
        </p>
      </>
    ),
  },
  'mean-vs-median': {
    title: 'Mean vs. Median: Why It Matters',
    description:
      'Understand the difference between mean and median, and why median income better represents typical American households.',
    category: 'Statistics',
    readTime: '3 min read',
    content: (
      <>
        <p className="lead">
          The <strong>mean</strong> (average) and <strong>median</strong>{' '}
          (middle value) are both ways to describe a &quot;typical&quot; value,
          but they can tell very different stories.
        </p>

        <h2>A Simple Example</h2>
        <p>
          Imagine a room with 10 people. Nine earn $50,000 per year, and one
          earns $5,000,000. The mean income is $545,000—but that describes no
          one in the room. The median income is $50,000, which describes 9 out
          of 10 people.
        </p>

        <h2>Why We Use Median</h2>
        <p>
          Income and wealth in America are highly skewed. A small number of very
          high earners pull the average up, making it unrepresentative of
          typical households. The median gives a more accurate picture of what
          ordinary families experience.
        </p>

        <h2>In Our Metrics</h2>
        <p>
          When we track &quot;Purchasing Power of the Median Paycheck,&quot;
          we&apos;re looking at the worker in the middle of the income
          distribution. This person is more representative of the typical
          American worker than any average would be.
        </p>
      </>
    ),
  },
  'inflation-baskets': {
    title: 'Understanding Inflation Baskets',
    description:
      'Learn how the CPI basket works and why essentials inflation affects lower-income families more than headline numbers suggest.',
    category: 'Inflation',
    readTime: '5 min read',
    content: (
      <>
        <p className="lead">
          The Consumer Price Index (CPI) measures inflation by tracking prices
          for a &quot;basket&quot; of goods and services. But the official
          basket may not match what your family actually buys.
        </p>

        <h2>What&apos;s in the Basket?</h2>
        <p>
          The CPI basket includes hundreds of items: housing, food, energy,
          transportation, medical care, clothing, entertainment, and more. Each
          category is weighted based on average consumer spending patterns.
        </p>

        <h2>The Problem with Averages</h2>
        <p>
          A family spending 40% of their income on rent experiences housing
          inflation very differently than someone who owns their home outright.
          The official CPI uses average weights, which may not reflect your
          situation.
        </p>

        <h2>Essentials vs. Discretionary</h2>
        <p>
          Bureau of Labor Statistics data shows that prices for
          &quot;essentials&quot;—housing, food, energy, healthcare—have
          historically risen faster than non-essential items like electronics or
          entertainment. Since lower-income households spend a larger share on
          essentials, they often experience higher effective inflation.
        </p>

        <h2>Our Approach</h2>
        <p>
          Our &quot;Essentials Cost Pressure&quot; metric specifically tracks
          inflation for unavoidable expenses. This shows what families actually
          feel, rather than an average that includes things people can choose to
          delay buying.
        </p>
      </>
    ),
  },
  'labor-market-indicators': {
    title: 'Labor Market Indicators Explained',
    description:
      'Discover why the unemployment rate misses important details and how prime-age employment ratios give a clearer picture.',
    category: 'Employment',
    readTime: '4 min read',
    content: (
      <>
        <p className="lead">
          The unemployment rate is the most-watched labor market indicator, but
          it has significant limitations. Understanding alternative measures
          gives a clearer picture of job market health.
        </p>

        <h2>What Unemployment Misses</h2>
        <p>
          The official unemployment rate only counts people who are actively
          looking for work. It misses:
        </p>
        <ul>
          <li>
            <strong>Discouraged workers</strong> who have given up searching
          </li>
          <li>
            <strong>Part-time workers</strong> who want full-time jobs
          </li>
          <li>
            <strong>People who left the labor force</strong> for caregiving,
            disability, or other reasons
          </li>
        </ul>

        <h2>Prime-Age Employment Ratios</h2>
        <p>
          Economists often prefer the <strong>prime-age employment rate</strong>
          —the percentage of people aged 25-54 who are employed. This group
          excludes students and retirees, giving a cleaner signal of labor
          market strength.
        </p>

        <h2>Why It Matters</h2>
        <p>
          The unemployment rate can fall simply because people stop looking for
          work. The prime-age employment ratio only rises when more people
          actually have jobs. It&apos;s a more demanding measure of labor market
          health.
        </p>
      </>
    ),
  },
  'alternative-economic-indicators': {
    title: 'Alternative Economic Indicators: GPI, HDI, and IDI',
    description:
      'Explore broader measures of economic well-being that account for factors GDP ignores: environmental costs, health, education, and inequality.',
    category: 'Beyond GDP',
    readTime: '6 min read',
    content: (
      <>
        <p className="lead">
          GDP measures economic output, but it says nothing about environmental
          degradation, health outcomes, educational attainment, or whether
          growth is shared broadly. Several alternative indicators attempt to
          fill these gaps.
        </p>

        <h2>Genuine Progress Indicator (GPI)</h2>
        <p>
          The <strong>Genuine Progress Indicator</strong> starts with personal
          consumption (like GDP) but then adjusts for factors that GDP ignores:
        </p>
        <ul>
          <li>
            <strong>Adds value for:</strong> household work, volunteering,
            services from consumer durables
          </li>
          <li>
            <strong>Subtracts costs of:</strong> crime, pollution, family
            breakdown, loss of leisure time, depletion of natural resources
          </li>
          <li>
            <strong>Adjusts for:</strong> income inequality (a dollar matters
            more to lower-income families)
          </li>
        </ul>
        <p>
          Studies have found that while U.S. GDP grew substantially since the
          1970s, GPI has remained relatively flat—suggesting that much of our
          economic &quot;growth&quot; has been offset by environmental and social
          costs.
        </p>

        <h2>Human Development Index (HDI)</h2>
        <p>
          The <strong>Human Development Index</strong>, created by the United
          Nations, measures well-being across three dimensions:
        </p>
        <ul>
          <li>
            <strong>Health:</strong> Life expectancy at birth
          </li>
          <li>
            <strong>Education:</strong> Expected years of schooling and mean
            years of schooling
          </li>
          <li>
            <strong>Standard of living:</strong> Gross National Income per
            capita (adjusted for purchasing power)
          </li>
        </ul>
        <p>
          HDI reveals that economic output alone does not determine quality of
          life. Some countries with lower GDP per capita outperform wealthier
          nations on health and education outcomes.
        </p>

        <h2>Inclusive Development Index (IDI)</h2>
        <p>
          The <strong>Inclusive Development Index</strong>, developed by the
          World Economic Forum, evaluates economies on three pillars:
        </p>
        <ul>
          <li>
            <strong>Growth and Development:</strong> GDP per capita, labor
            productivity, employment
          </li>
          <li>
            <strong>Inclusion:</strong> Median household income, income and
            wealth inequality, poverty rate
          </li>
          <li>
            <strong>Intergenerational Equity:</strong> Adjusted net savings,
            public debt, dependency ratio, carbon intensity
          </li>
        </ul>
        <p>
          The IDI explicitly asks: Is growth being shared? Are we borrowing from
          future generations? Countries can score well on GDP but poorly on
          inclusion or sustainability.
        </p>

        <h2>Why We Don&apos;t Track These (Yet)</h2>
        <p>
          These indicators offer valuable perspectives, but they have practical
          limitations for our household-focused mission:
        </p>
        <ul>
          <li>
            <strong>Update frequency:</strong> GPI, HDI, and IDI are typically
            updated annually or less often. Our metrics update monthly or
            quarterly.
          </li>
          <li>
            <strong>Geographic scope:</strong> These are national-level measures.
            They don&apos;t show variation by region, income level, or household
            type.
          </li>
          <li>
            <strong>Complexity:</strong> The methodologies involve many
            assumptions that reasonable people can debate.
          </li>
        </ul>

        <h2>The Bigger Picture</h2>
        <p>
          No single metric captures everything that matters. GDP measures output
          but not distribution or sustainability. Our household metrics show
          immediate impacts on families but not long-term environmental costs or
          health outcomes.
        </p>
        <p>
          These alternative indicators remind us that economic well-being is
          multidimensional. A complete picture requires looking at multiple
          measures—including ones that question whether &quot;more&quot; always
          means &quot;better.&quot;
        </p>

        <h2>Learn More</h2>
        <ul className="resources-list">
          <li>
            <a
              href="https://gnhusa.org/genuine-progress-indicator/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GPI: Genuine Progress Indicator (GNH USA)
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li>
            <a
              href="https://hdr.undp.org/data-center/human-development-index"
              target="_blank"
              rel="noopener noreferrer"
            >
              HDI: Human Development Reports (UNDP)
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.weforum.org/publications/the-inclusive-development-index-2018/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IDI: Inclusive Development Index (World Economic Forum)
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
        </ul>
      </>
    ),
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} | People's Economy Hub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
    },
  };
}

function ArticleJsonLd({ slug, article }: { slug: string; article: ArticleData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://peopleseconomyhub.github.io/learn/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: "People's Economy Hub",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  // Find related articles (excluding current)
  const relatedArticles = Object.entries(articles)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({ slug: key, ...value }));

  return (
    <>
      <ArticleJsonLd slug={slug} article={article} />

      {/* Article header */}
      <header className="relative gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 pattern-grid opacity-30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/learn"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li aria-hidden="true" className="text-subtle">/</li>
              <li>
                <span className="text-neutral font-medium" aria-current="page">
                  {article.category}
                </span>
              </li>
            </ol>
          </nav>

          <div className="animate-fade-in-up">
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide bg-primary-subtle px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-muted">{article.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg md:text-xl text-muted max-w-2xl">
              {article.description}
            </p>
          </div>
        </div>
      </header>

      {/* Article content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="article-content animate-fade-in">
          {article.content}
        </article>

        {/* Article footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section aria-labelledby="related-heading" className="mb-12">
              <h2
                id="related-heading"
                className="text-lg font-semibold text-neutral mb-6"
              >
                Continue Reading
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/learn/${related.slug}`}
                    className="group block bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-white transition-all"
                  >
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {related.category}
                    </span>
                    <h3 className="text-base font-semibold text-neutral mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to all articles
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
            >
              View our methodology
              <svg
                className="w-4 h-4"
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
        </footer>
      </main>
    </>
  );
}
