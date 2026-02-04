import Link from 'next/link';

const articles = [
  {
    slug: 'gdp-vs-wellbeing',
    title: 'Why GDP ≠ Household Well-being',
    description:
      'Understanding why a growing economy does not always mean families are better off.',
  },
  {
    slug: 'mean-vs-median',
    title: 'Mean vs. Median: Why It Matters',
    description:
      'How averages can be misleading and why we focus on the median household.',
  },
  {
    slug: 'inflation-baskets',
    title: 'Understanding Inflation Baskets',
    description:
      'Why official inflation may not match what you experience at the grocery store.',
  },
  {
    slug: 'labor-market-indicators',
    title: 'Labor Market Indicators Explained',
    description:
      'Beyond the unemployment rate: what prime-age participation tells us.',
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-neutral mb-4">Learn</h1>
      <p className="text-xl text-muted mb-12">
        Plain-language explanations of economic concepts that matter for
        understanding household finances.
      </p>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/learn/${article.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-neutral mb-2">
              {article.title}
            </h2>
            <p className="text-muted">{article.description}</p>
            <span className="text-positive font-medium mt-4 inline-block">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
