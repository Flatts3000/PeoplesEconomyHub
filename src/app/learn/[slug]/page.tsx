import Link from 'next/link';
import { notFound } from 'next/navigation';

const articles: Record<
  string,
  { title: string; content: React.ReactNode }
> = {
  'gdp-vs-wellbeing': {
    title: 'Why GDP ≠ Household Well-being',
    content: (
      <>
        <p>
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
    content: (
      <>
        <p>
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
    content: (
      <>
        <p>
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
    content: (
      <>
        <p>
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
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/learn"
        className="text-positive hover:underline mb-8 inline-block"
      >
        ← Back to Learn
      </Link>

      <article className="prose max-w-none">
        <h1 className="text-4xl font-bold text-neutral mb-8">{article.title}</h1>
        <div className="text-neutral leading-relaxed space-y-4">
          {article.content}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/methodology" className="text-positive hover:underline">
          Learn more about our methodology →
        </Link>
      </div>
    </div>
  );
}
